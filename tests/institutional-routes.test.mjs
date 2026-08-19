import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'

const root = process.cwd()
const read = (relativePath) => readFile(path.join(root, relativePath), 'utf8')

const routes = [
  '/about',
  '/process',
  '/team',
  '/industries',
  '/portfolio',
  '/insights',
  '/contact',
  '/project-enquiry',
  '/privacy-policy',
  '/terms-and-conditions',
]

const pageFile = (route) => `app${route}/page.tsx`

test('Task 5 registry owns all substantive institutional content and gates blocked records', async () => {
  const {
    TASK5_INSTITUTIONAL_ROUTES,
    getInstitutionalContent,
    assertRenderableInstitutionalContent,
  } = await import('../lib/task5-institutional-content.ts')

  assert.deepEqual(TASK5_INSTITUTIONAL_ROUTES, routes)
  for (const route of routes) {
    const content = getInstitutionalContent(route)
    assert.equal(content.route, route)
    assert.ok(['approved-copy', 'verification-pending', 'publication-pending', 'legal-review-pending'].includes(content.publicationStatus))
    assert.ok(content.truthBasis.status)
    assert.ok(content.truthBasis.qualification.length > 30)
    assert.ok(content.metadata.title)
    assert.ok(content.metadata.description)
    assert.ok(content.hero.title)
  }

  const fixture = { ...getInstitutionalContent('/about'), publicationStatus: 'blocked' }
  assert.throws(() => assertRenderableInstitutionalContent(fixture), /not renderable/i)
})

test('all Task 5 pages consume registry content rather than holding pages or inline prose', async () => {
  for (const route of routes) {
    const source = await read(pageFile(route))
    assert.match(source, /getInstitutionalContent/)
    assert.match(source, new RegExp(`getInstitutionalContent\\(['\"]${route}['\"]\\)`))
    assert.doesNotMatch(source, /HoldingPage|getHoldingPageContent|getHoldingPageMetadata/)
    assert.doesNotMatch(source, />\s*[A-Za-z][^<{]{3,}\s*</, `${route} bypasses the registry with rendered inline prose`)
    assert.match(source, /export const metadata: Metadata = content\.metadata/)
  }
})

test('team renders all 23 unique registered web portraits without publishing filename identity metadata', async () => {
  const [registry, media, page, review] = await Promise.all([
    import('../lib/task5-institutional-content.ts'),
    read('data/media/runtime-media.json').then(JSON.parse),
    read('app/team/page.tsx'),
    read('docs/TEAM-DATA-REVIEW.md'),
  ])
  const portraits = media.filter((asset) => asset.truthClassification === 'approved-portrait-media-metadata-gated')
  assert.equal(portraits.length, 23)
  assert.equal(new Set(portraits.map((asset) => asset.runtimePath)).size, 23)
  assert.ok(portraits.every((asset) => asset.sourcePath.includes('/01-Web-Optimized/')))
  assert.ok(portraits.every((asset) => !/master/i.test(asset.sourcePath + asset.runtimePath)))
  assert.match(page, /FNB_MEDIA\.teamPortraits/)
  assert.doesNotMatch(page, /sourcePath|split\(|replace\(/)
  assert.equal(registry.TEAM_PORTRAIT_PRESENTATION.length, 23)
  assert.ok(registry.TEAM_PORTRAIT_PRESENTATION.every((item) => item.identityStatus === 'verification-pending' && item.roleStatus === 'verification-pending'))
  assert.match(review, /filename metadata is not verified/i)
  assert.match(review, /identity.*role.*consent.*publication/i)
})

test('enquiry provider is typed as not configured/not sent and performs no network delivery', async () => {
  const source = await read('lib/enquiry-provider.ts')
  assert.doesNotMatch(source, /\bfetch\s*\(|XMLHttpRequest|axios|mailto:|https?:\/\//)
  const { enquiryProvider } = await import('../lib/enquiry-provider.ts')
  let fetchCalls = 0
  const originalFetch = globalThis.fetch
  globalThis.fetch = async () => {
    fetchCalls += 1
    throw new Error('Network delivery must never occur')
  }
  try {
    const result = await enquiryProvider.getDeliveryState()
    assert.deepEqual(result, { configuration: 'NOT_CONFIGURED', delivery: 'NOT_SENT' })
    assert.equal(fetchCalls, 0)
  } finally {
    globalThis.fetch = originalFetch
  }
})

test('project enquiry exposes accessible labels, grouped services, errors, review, and copy-only summary', async () => {
  const [page, form] = await Promise.all([
    read('app/project-enquiry/page.tsx'),
    read('components/fnb/institutional/project-enquiry-form.tsx'),
  ])
  assert.match(page, /ProjectEnquiryForm/)
  for (const marker of [
    /<label[^>]+htmlFor=/,
    /<fieldset/,
    /<legend/,
    /aria-describedby=/,
    /aria-invalid=/,
    /role=["']alert["']/,
    /aria-live=/,
    /review/i,
    /copy/i,
    /navigator\.clipboard\.writeText/,
    /NOT_SENT/,
  ]) assert.match(form, marker)
  const sectionLabelReference = form.match(/<section\s+aria-labelledby=["']([^"']+)["']/)?.[1]
  assert.ok(sectionLabelReference, 'enquiry form section must declare an aria-labelledby reference')
  const referencedIdPattern = new RegExp(`\\bid=["']${sectionLabelReference}["']`, 'g')
  assert.equal((form.match(referencedIdPattern) ?? []).length, 1, `aria-labelledby must reference one unique existing id: ${sectionLabelReference}`)
  assert.doesNotMatch(form, /message sent|successfully sent|thank you for your submission|type=["']submit["']/i)
})

test('pending publication routes render deliberate states without fabricated business facts', async () => {
  const { getInstitutionalContent } = await import('../lib/task5-institutional-content.ts')
  assert.equal(getInstitutionalContent('/portfolio').publicationStatus, 'publication-pending')
  assert.equal(getInstitutionalContent('/insights').publicationStatus, 'publication-pending')
  assert.equal(getInstitutionalContent('/industries').publicationStatus, 'verification-pending')
  assert.equal(getInstitutionalContent('/contact').publicationStatus, 'verification-pending')
  assert.equal(getInstitutionalContent('/privacy-policy').publicationStatus, 'legal-review-pending')
  assert.equal(getInstitutionalContent('/terms-and-conditions').publicationStatus, 'legal-review-pending')

  const registry = await read('lib/task5-institutional-content.ts')
  for (const pattern of [
    /\b[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}\b/,
    /\+\d[\d\s()-]{7,}/,
    /\b\d+(?:\.\d+)?%\b/,
    /award[- ]winning|trusted by|certified|guaranteed response|response within/i,
  ]) assert.doesNotMatch(registry, pattern)
  assert.match(registry, /counsel-approved/i)
})

test('branded not-found and domain-safe SEO files are present while homepage process anchor remains valid', async () => {
  const [notFound, robots, sitemap, homeProcess, siteRegistry] = await Promise.all([
    read('app/not-found.tsx'),
    read('app/robots.ts'),
    read('app/sitemap.ts'),
    read('components/fnb/sections/s11-process.tsx'),
    read('data/site-registry.json').then(JSON.parse),
  ])
  assert.match(notFound, /getNotFoundContent/)
  assert.match(notFound, /<main id=["']main["']/)
  assert.match(robots, /buildRobotsConfig/)
  assert.match(sitemap, /buildSitemapEntries/)
  assert.match(homeProcess, /id=["']process["']/)
  assert.ok(siteRegistry.utilityNavigation.some((item) => item.href === '/#process'))

  const { getVerifiedSiteUrl, buildSitemapEntries, buildRobotsConfig } = await import('../lib/task5-seo.ts')
  for (const unsafe of [undefined, '', 'http://localhost:3000', 'http://127.0.0.1:3118', 'https://example.com']) {
    assert.equal(getVerifiedSiteUrl(unsafe), undefined)
  }
  assert.deepEqual(buildSitemapEntries(undefined, ['/about']), [])
  assert.doesNotMatch(JSON.stringify(buildRobotsConfig(undefined)), /localhost|127\.0\.0\.1|example\.com/)
  const verified = getVerifiedSiteUrl('https://www.fnb-events.test.invalid')
  assert.equal(verified, undefined, 'reserved or test domains must remain rejected')
  const production = getVerifiedSiteUrl('https://fnb-events.ae')
  assert.equal(production, 'https://fnb-events.ae')
  assert.deepEqual(buildSitemapEntries(production, ['/', '/about']).map((entry) => entry.url), ['https://fnb-events.ae/', 'https://fnb-events.ae/about'])
})
