import { pathToFileURL } from 'node:url'
import { TASK5_INSTITUTIONAL_ROUTES, getInstitutionalContent, getNotFoundContent } from '../lib/task5-institutional-content.ts'
import { getVerifiedSiteUrl } from '../lib/task5-seo.ts'

function decodeHtml(value) {
  return value.replace(/<[^>]+>/g, '').replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#x27;', "'").replaceAll('&#39;', "'").replaceAll('&nbsp;', ' ').trim()
}

export function auditInstitutionalRouteHtml({ status, html, expected }) {
  const failures = []
  const mainMatches = [...html.matchAll(/<main\b([^>]*)>/gi)]
  const h1Matches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)]
  const mainAttributes = mainMatches[0]?.[1] ?? ''
  const h1Text = h1Matches[0] ? decodeHtml(h1Matches[0][1]) : ''
  const expectedStatus = expected.status ?? 200
  if (status !== expectedStatus) failures.push(`${expected.route}: expected status ${expectedStatus}, received ${status}`)
  if (mainMatches.length !== 1 || !/\bid=["']main["']/.test(mainAttributes)) failures.push(`${expected.route}: expected one main landmark`)
  if (h1Matches.length !== 1) failures.push(`${expected.route}: expected one h1, found ${h1Matches.length}`)
  if (h1Text !== expected.h1) failures.push(`${expected.route}: expected h1 "${expected.h1}", received "${h1Text}"`)
  if (!mainAttributes.includes(`data-institutional-route="${expected.route}"`) && !mainAttributes.includes(`data-institutional-route='${expected.route}'`)) failures.push(`${expected.route}: route marker is absent`)
  if (!mainAttributes.includes(`data-publication-status="${expected.publicationStatus}"`) && !mainAttributes.includes(`data-publication-status='${expected.publicationStatus}'`)) failures.push(`${expected.route}: publication status marker is absent`)
  if (expected.teamPortraitCount) {
    const portraitCount = (html.match(/\bdata-team-portrait=["'][^"']+["']/g) ?? []).length
    if (portraitCount !== expected.teamPortraitCount) failures.push(`${expected.route}: expected ${expected.teamPortraitCount} rendered team portraits, found ${portraitCount}`)
  }
  if (expected.accessibleEnquiryForm) {
    const formContracts = [
      ['form', /<form\b/i], ['connected labels', /<label\b[^>]*\bfor=["'][^"']+["']/i],
      ['fieldset', /<fieldset\b/i], ['legend', /<legend\b/i], ['described fields', /\baria-describedby=["'][^"']+["']/i],
      ['live status', /\baria-live=["']polite["']/i], ['not-sent state', /NOT_SENT/],
    ]
    for (const [label, pattern] of formContracts) if (!pattern.test(html)) failures.push(`${expected.route}: accessible enquiry ${label} marker is absent`)
    if (/successfully sent|message sent|thank you for your submission/i.test(html)) failures.push(`${expected.route}: enquiry renders a false delivery-success state`)
  }
  return failures
}

export function auditSeoText({ robots, sitemap, verifiedSiteUrl }) {
  const failures = []
  if (/localhost|127\.0\.0\.1|0\.0\.0\.0/i.test(`${robots}\n${sitemap}`)) failures.push('SEO output contains a localhost or loopback URL')
  const robotsUrls = [...robots.matchAll(/^Sitemap:\s*(https?:\/\/\S+)/gim)].map((match) => match[1])
  const sitemapUrls = [...sitemap.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/gi)].map((match) => match[1])
  const absoluteUrls = [...robotsUrls, ...sitemapUrls]
  if (!verifiedSiteUrl && absoluteUrls.length) failures.push('SEO output contains an unverified absolute URL')
  if (verifiedSiteUrl && absoluteUrls.some((url) => !url.startsWith(verifiedSiteUrl))) failures.push('SEO output contains an absolute URL outside the verified site origin')
  return failures
}

export async function auditTask5Routes(baseUrl, fetchImpl = fetch) {
  const results = []
  for (const route of TASK5_INSTITUTIONAL_ROUTES) {
    const content = getInstitutionalContent(route)
    const response = await fetchImpl(new URL(route, baseUrl))
    const html = await response.text()
    results.push({ route, status: response.status, failures: auditInstitutionalRouteHtml({ status: response.status, html, expected: {
      route, h1: content.hero.title, publicationStatus: content.publicationStatus,
      ...(route === '/team' ? { teamPortraitCount: 23 } : {}),
      ...(route === '/project-enquiry' ? { accessibleEnquiryForm: true } : {}),
    } }) })
  }
  const notFoundContent = getNotFoundContent()
  const notFoundRoute = '/__task5-not-found-audit__'
  const notFoundResponse = await fetchImpl(new URL(notFoundRoute, baseUrl))
  const notFoundHtml = await notFoundResponse.text()
  results.push({ route: notFoundRoute, status: notFoundResponse.status, failures: auditInstitutionalRouteHtml({ status: notFoundResponse.status, html: notFoundHtml, expected: { route: 'not-found', status: 404, h1: notFoundContent.title, publicationStatus: notFoundContent.publicationStatus } }) })

  const [robotsResponse, sitemapResponse] = await Promise.all([fetchImpl(new URL('/robots.txt', baseUrl)), fetchImpl(new URL('/sitemap.xml', baseUrl))])
  const [robots, sitemap] = await Promise.all([robotsResponse.text(), sitemapResponse.text()])
  const verifiedSiteUrl = getVerifiedSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)
  const seoFailures = auditSeoText({ robots, sitemap, verifiedSiteUrl })
  if (robotsResponse.status !== 200) seoFailures.push(`robots.txt expected status 200, received ${robotsResponse.status}`)
  if (sitemapResponse.status !== 200) seoFailures.push(`sitemap.xml expected status 200, received ${sitemapResponse.status}`)
  results.push({ route: '/robots.txt + /sitemap.xml', status: seoFailures.length ? 500 : 200, failures: seoFailures })
  return results
}

function parseBaseUrl() {
  const index = process.argv.indexOf('--base-url')
  return index >= 0 ? process.argv[index + 1] : process.env.INSTITUTIONAL_AUDIT_BASE_URL ?? 'http://127.0.0.1:3118'
}

async function main() {
  const results = await auditTask5Routes(parseBaseUrl())
  for (const result of results) {
    console.log(`${result.failures.length ? 'FAIL' : 'PASS'} ${result.status} ${result.route}`)
    for (const failure of result.failures) console.error(`  ${failure}`)
  }
  const failures = results.flatMap((result) => result.failures)
  if (failures.length) process.exitCode = 1
  else console.log(`PASS ${results.length}/${results.length} Task 5 institutional/SEO checks`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main()
