import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import {
  auditHtmlDocument,
  auditInternalLinkTargets,
  auditRobotsAndSitemap,
  collectDocumentTargets,
  HOME_SECTION_IDS,
} from '../scripts/production-audit.mjs'
import { auditEnquiryCopyOutcome } from '../scripts/browser-qa.mjs'

const validHtml = `<!doctype html><html><head><title>FNB Events</title></head><body>
<header><nav><a href="#main">Skip</a><a href="/services">Services</a><a href="/#process">Process</a></nav></header>
<main id="main"><section id="process"><h1>Presence, engineered.</h1><img src="/media/fnb/home/hero-stage.png" alt="Conceptual event environment"></section></main>
<footer><a href="/privacy-policy">Privacy</a></footer></body></html>`

test('accepts a canonical, truth-safe document and collects internal link and image targets', () => {
  const result = auditHtmlDocument({ route: '/', status: 200, html: validHtml })
  assert.deepEqual(result.errors, [])
  assert.deepEqual(collectDocumentTargets(validHtml, '/'), {
    links: [
      { sourceRoute: '/', href: '#main', targetRoute: '/', fragment: 'main' },
      { sourceRoute: '/', href: '/services', targetRoute: '/services', fragment: '' },
      { sourceRoute: '/', href: '/#process', targetRoute: '/', fragment: 'process' },
      { sourceRoute: '/', href: '/privacy-policy', targetRoute: '/privacy-policy', fragment: '' },
    ],
    images: ['/media/fnb/home/hero-stage.png'],
  })
})

test('validates fragment-only links locally and cross-route fragments against destination ids', () => {
  const aboutHtml = validHtml
    .replace('<main id="main">', '<main id="main"><div id="details"></div>')
    .replace('</main>', '</main></main>')
    .replace('href="/services"', 'href="/#process"')
  const homeHtml = validHtml.replace('href="/services"', 'href="/about#details"')

  assert.deepEqual(auditInternalLinkTargets([
    { route: '/', html: homeHtml },
    { route: '/about', html: aboutHtml },
  ]), [])

  const errors = auditInternalLinkTargets([
    { route: '/', html: homeHtml.replace('/about#details', '/about#missing') },
    { route: '/about', html: aboutHtml },
  ])
  assert.ok(errors.some((error) => error.includes('/about#missing') && error.includes('destination fragment')))
})

test('decodes HTML entities in generated Next image optimizer targets', () => {
  const generated = validHtml.replace(
    '/media/fnb/home/hero-stage.png',
    '/_next/image?url=%2Fmedia%2Ffnb%2Fhome%2Fhero-stage.png&amp;w=640&amp;q=75',
  )
  assert.deepEqual(collectDocumentTargets(generated).images, [
    '/_next/image?url=%2Fmedia%2Ffnb%2Fhome%2Fhero-stage.png&w=640&q=75',
  ])
})

test('rejects status, landmark, anchor, image, framework-error, and prohibited-copy failures', () => {
  const invalid = validHtml
    .replace('<main id="main">', '<main id="main"><main>')
    .replace('</main>', '</main></main>')
    .replace('href="/services"', 'href="/missing#ghost"')
    .replace('hero-stage.png', 'broken.png')
    .replace('<h1>', '<div data-nextjs-dialog><h1>')
    .replace('</h1>', '</h1></div><p>Trusted by 500 clients. Project slot 01. v0.app</p>')
  const result = auditHtmlDocument({ route: '/', status: 500, html: invalid })

  for (const expected of [
    'expected HTTP 200; received 500',
    'expected exactly one main landmark; found 2',
    'non-canonical internal link: /missing#ghost',
    'Next.js error overlay marker',
    'prohibited production string: v0.app',
    'prohibited production string: Project slot 01',
    'unsupported proof-like claim: Trusted by 500 clients',
  ]) assert.ok(result.errors.some((error) => error.includes(expected)), expected)
})

test('rejects a homepage whose fourteen generated section markers are missing or out of order', () => {
  const complete = validHtml.replace(
    '<section id="process">',
    HOME_SECTION_IDS.map((id) => `<div data-home-section="${id}"></div>`).join('') + '<section id="process">',
  )
  assert.deepEqual(auditHtmlDocument({ route: '/', status: 200, html: complete, requireHomeSections: true }).errors, [])

  const wrongOrder = complete.replace(
    `data-home-section="${HOME_SECTION_IDS[0]}"`,
    `data-home-section="${HOME_SECTION_IDS[1]}"`,
  )
  assert.ok(
    auditHtmlDocument({ route: '/', status: 200, html: wrongOrder, requireHomeSections: true }).errors
      .some((error) => error.includes('homepage section order')),
  )
})

test('rejects unsafe robots and sitemap output while accepting a domain-gated empty sitemap', () => {
  assert.deepEqual(auditRobotsAndSitemap({ robots: 'User-agent: *\nAllow: /', sitemap: '<urlset></urlset>' }), [])
  const errors = auditRobotsAndSitemap({
    robots: 'User-agent: *\nSitemap: http://localhost:3000/sitemap.xml',
    sitemap: '<urlset><loc>https://example.com/about</loc></urlset>',
  })
  assert.ok(errors.some((error) => error.includes('unsafe robots origin')))
  assert.ok(errors.some((error) => error.includes('unsafe sitemap origin')))
})

test('Vercel Analytics is emitted only inside an actual Vercel runtime', async () => {
  const layout = await readFile(new URL('../app/layout.tsx', import.meta.url), 'utf8')
  assert.match(layout, /process\.env\.VERCEL\s*===\s*['"]1['"][\s\S]*?<Analytics\s*\/>/)
})

test('enquiry copy outcome requires a real invoked control and an approved terminal status', () => {
  const approved = ['Summary copied. It remains not sent.', 'Automatic copy was unavailable. Select and copy the summary manually.']
  const base = { controlFound: true, invoked: true, providerText: true, noSuccess: true }

  assert.deepEqual(auditEnquiryCopyOutcome({ ...base, status: approved[0] }, approved), [])
  assert.deepEqual(auditEnquiryCopyOutcome({ ...base, status: approved[1] }, approved), [])
  assert.ok(auditEnquiryCopyOutcome({ ...base, controlFound: false, invoked: false, status: '' }, approved).some((error) => error.includes('control')))
  assert.ok(auditEnquiryCopyOutcome({ ...base, status: 'This summary has not been sent.' }, approved).some((error) => error.includes('approved')))
})
