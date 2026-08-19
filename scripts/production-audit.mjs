import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { auditMedia } from './media-audit.mjs'

export const CANONICAL_ROUTES = [
  '/',
  '/about',
  '/services',
  '/services/exhibition-booth-design-build',
  '/services/event-production',
  '/services/branding-advertising',
  '/services/technical-production',
  '/services/websites-digital-experiences',
  '/services/automation-systems',
  '/services/ai-workflow-solutions',
  '/services/interiors-commercial-spaces',
  '/industries',
  '/process',
  '/team',
  '/contact',
  '/project-enquiry',
  '/portfolio',
  '/insights',
  '/privacy-policy',
  '/terms-and-conditions',
]

export const HOME_SECTION_IDS = [
  's01-hero',
  's02-brand',
  's03-work',
  's04-transformation',
  's05-capabilities',
  's06-events',
  's07-physical-digital',
  's08-digital',
  's09-interiors',
  's10-industries',
  's11-process',
  's12-proof',
  's13-insights',
  's14-closing',
]

const CANONICAL_SET = new Set(CANONICAL_ROUTES)
const PROHIBITED_STRINGS = [/v0\.app/i, /Project slot\s*0?1/i]
const UNSUPPORTED_PROOF = [
  /trusted by\s+\d+[\w,.]*\s+clients?/i,
  /\b\d+(?:\.\d+)?%\s+(?:growth|faster|increase|improvement|savings|conversion)/i,
  /award[- ]winning/i,
  /(?:client|customer) testimonial/i,
]

function openingTagCount(html, tag) {
  return (html.match(new RegExp(`<${tag}(?:\\s|>)`, 'gi')) ?? []).length
}

function attributeValues(html, tag, attribute) {
  const values = []
  const tagPattern = new RegExp(`<${tag}(?:\\s[^>]*?)?>`, 'gi')
  for (const match of html.matchAll(tagPattern)) {
    const attributePattern = new RegExp(`\\b${attribute}\\s*=\\s*["']([^"']*)["']`, 'i')
    const value = match[0].match(attributePattern)?.[1]
    if (value !== undefined) values.push(value.replace(/&amp;/gi, '&').replace(/&#38;/g, '&'))
  }
  return values
}

function visibleText(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#xA0;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizedInternalHref(href) {
  if (!href.startsWith('/') || href.startsWith('//')) return null
  try {
    const url = new URL(href, 'https://audit.invalid')
    return `${url.pathname}${url.hash}`
  } catch {
    return href
  }
}

export function collectDocumentTargets(html) {
  const links = attributeValues(html, 'a', 'href')
    .map(normalizedInternalHref)
    .filter(Boolean)
  const imageSources = attributeValues(html, 'img', 'src')
  // Audit the browser fallback/current source. The responsive srcset is generated
  // from the same registered binary and is exercised at real viewport widths by
  // the rendered CDP suite rather than issuing every candidate serially here.
  return { links: [...new Set(links)], images: [...new Set(imageSources)] }
}

export function auditHtmlDocument({ route, status, html, requireHomeSections = false }) {
  const errors = []
  if (status !== 200) errors.push(`${route}: expected HTTP 200; received ${status}`)
  if (!/<html(?:\s|>)/i.test(html) || !/<body(?:\s|>)/i.test(html)) errors.push(`${route}: incomplete HTML document`)

  for (const [tag, label] of [['main', 'main landmark'], ['header', 'header landmark'], ['footer', 'footer landmark'], ['h1', 'H1']]) {
    const count = openingTagCount(html, tag)
    if (count !== 1) errors.push(`${route}: expected exactly one ${label}; found ${count}`)
  }
  if (!/<main\b[^>]*\bid=["']main["']/i.test(html)) errors.push(`${route}: main landmark is missing id="main"`)

  if (/data-nextjs-dialog|next-error-h1|__next_error__|vite-error-overlay|webpack-dev-server-client-overlay/i.test(html)) {
    errors.push(`${route}: Next.js error overlay marker found`)
  }

  const text = visibleText(html)
  for (const pattern of PROHIBITED_STRINGS) {
    const match = text.match(pattern)
    if (match) errors.push(`${route}: prohibited production string: ${match[0]}`)
  }
  for (const pattern of UNSUPPORTED_PROOF) {
    const match = text.match(pattern)
    if (match) errors.push(`${route}: unsupported proof-like claim: ${match[0]}`)
  }

  const ids = new Set(attributeValues(html, '[a-z][a-z0-9-]*', 'id'))
  for (const href of collectDocumentTargets(html).links) {
    const [pathname, hash] = href.split('#')
    const targetPath = pathname || route
    if (!CANONICAL_SET.has(targetPath)) {
      errors.push(`${route}: non-canonical internal link: ${href}`)
      continue
    }
    if (hash && !(targetPath === '/' && hash === 'process') && targetPath === route && !ids.has(hash)) {
      errors.push(`${route}: missing local anchor target: ${href}`)
    }
  }

  if (requireHomeSections) {
    const actual = [...html.matchAll(/\bdata-home-section=["']([^"']+)["']/gi)].map((match) => match[1])
    if (JSON.stringify(actual) !== JSON.stringify(HOME_SECTION_IDS)) {
      errors.push(`${route}: homepage section order must be exactly ${HOME_SECTION_IDS.join(', ')}; found ${actual.join(', ') || '<none>'}`)
    }
  }

  return { errors }
}

export function auditRobotsAndSitemap({ robots, sitemap }) {
  const errors = []
  if (/https?:\/\/(?:localhost|127\.0\.0\.1|0\.0\.0\.0|[^\s/]*example\.)/i.test(robots)) {
    errors.push('unsafe robots origin')
  }
  if (/https?:\/\/(?:localhost|127\.0\.0\.1|0\.0\.0\.0|[^<\s/]*example\.)/i.test(sitemap)) {
    errors.push('unsafe sitemap origin')
  }
  return errors
}

function requestPathFromImageTarget(target) {
  if (!target.startsWith('/')) return null
  if (!target.startsWith('/_next/image')) return target
  const parsed = new URL(target, 'https://audit.invalid')
  const optimizedSource = parsed.searchParams.get('url')
  return optimizedSource?.startsWith('/') ? target : null
}

async function fetchText(baseUrl, path) {
  const response = await fetch(new URL(path, baseUrl), { redirect: 'manual' })
  return { response, text: await response.text() }
}

export async function auditProductionSite(baseUrl) {
  const startedAt = new Date().toISOString()
  const errors = []
  const documents = []
  const allLinks = new Set()
  const allImages = new Set()

  for (const route of CANONICAL_ROUTES) {
    try {
      const { response, text: html } = await fetchText(baseUrl, route)
      const routeErrors = auditHtmlDocument({ route, status: response.status, html, requireHomeSections: route === '/' }).errors
      errors.push(...routeErrors)
      const targets = collectDocumentTargets(html)
      targets.links.forEach((link) => allLinks.add(link))
      targets.images.forEach((image) => allImages.add(image))
      documents.push({ route, status: response.status, errors: routeErrors.length, links: targets.links.length, images: targets.images.length })
    } catch (error) {
      errors.push(`${route}: request failed: ${error.message}`)
    }
  }

  for (const href of allLinks) {
    const path = href.split('#')[0] || '/'
    if (!CANONICAL_SET.has(path)) continue
    try {
      const response = await fetch(new URL(path, baseUrl), { redirect: 'manual' })
      if (response.status !== 200) errors.push(`internal link target ${href}: expected HTTP 200; received ${response.status}`)
    } catch (error) {
      errors.push(`internal link target ${href}: request failed: ${error.message}`)
    }
  }

  for (const target of allImages) {
    const path = requestPathFromImageTarget(target)
    if (!path) {
      errors.push(`invalid image target: ${target}`)
      continue
    }
    try {
      const response = await fetch(new URL(path, baseUrl), { redirect: 'manual' })
      if (response.status !== 200) errors.push(`image ${target}: expected HTTP 200; received ${response.status}`)
      if (!response.headers.get('content-type')?.toLowerCase().startsWith('image/')) {
        errors.push(`image ${target}: response is not image content`)
      }
    } catch (error) {
      errors.push(`image ${target}: request failed: ${error.message}`)
    }
  }

  const [robotsResult, sitemapResult, notFoundResult] = await Promise.all([
    fetchText(baseUrl, '/robots.txt'),
    fetchText(baseUrl, '/sitemap.xml'),
    fetchText(baseUrl, '/__task-6-branded-404-check__'),
  ])
  if (robotsResult.response.status !== 200) errors.push(`robots.txt: expected HTTP 200; received ${robotsResult.response.status}`)
  if (sitemapResult.response.status !== 200) errors.push(`sitemap.xml: expected HTTP 200; received ${sitemapResult.response.status}`)
  errors.push(...auditRobotsAndSitemap({ robots: robotsResult.text, sitemap: sitemapResult.text }))
  if (notFoundResult.response.status !== 404) errors.push(`custom 404: expected HTTP 404; received ${notFoundResult.response.status}`)
  if (!/data-institutional-route=["']not-found["']/.test(notFoundResult.text)) errors.push('custom 404: branded page marker missing')
  if (/next-error-h1|data-nextjs-dialog/i.test(notFoundResult.text)) errors.push('custom 404: framework error marker found')

  const media = auditMedia()
  errors.push(...media.errors.map((error) => `media: ${error}`))

  return {
    startedAt,
    completedAt: new Date().toISOString(),
    baseUrl,
    errors,
    counts: {
      canonicalRoutes: CANONICAL_ROUTES.length,
      documents: documents.length,
      internalLinks: allLinks.size,
      imageTargets: allImages.size,
      ...media.counts,
    },
    documents,
  }
}

function argument(name) {
  const index = process.argv.indexOf(name)
  return index >= 0 ? process.argv[index + 1] : undefined
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const baseUrl = argument('--base-url') ?? process.env.QA_BASE_URL
  if (!baseUrl) {
    console.error('Usage: node scripts/production-audit.mjs --base-url http://127.0.0.1:<owned-port> [--report <path>]')
    process.exitCode = 1
  } else {
    const result = await auditProductionSite(baseUrl)
    const reportPath = argument('--report')
    if (reportPath) await writeFile(resolve(reportPath), `${JSON.stringify(result, null, 2)}\n`, 'utf8')
    if (result.errors.length) {
      console.error(result.errors.map((error) => `- ${error}`).join('\n'))
      process.exitCode = 1
    } else {
      console.log(`Production audit passed: ${JSON.stringify(result.counts)}`)
    }
  }
}
