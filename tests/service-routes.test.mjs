import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'

const root = process.cwd()
const read = (relativePath) => readFile(path.join(root, relativePath), 'utf8')

const assignments = [
  ['/services/event-production', 'eventKeynote'],
  ['/services/branding-advertising', 'brandingLobby'],
  ['/services/technical-production', 'technicalControl'],
  ['/services/websites-digital-experiences', 'digitalDashboard'],
  ['/services/automation-systems', 'automationAnalytics'],
  ['/services/ai-workflow-solutions', 'aiPavilion'],
  ['/services/interiors-commercial-spaces', 'interiorsLobby'],
]

const pageFileForRoute = (route) => `app${route}/page.tsx`

test('Task 4 content registry gates every rendered record by explicit publication status and truth basis', async () => {
  const { TASK4_SERVICE_ROUTES, getTask4ServiceContent, assertApprovedTask4ServiceContent } = await import('../lib/task4-service-content.ts')
  assert.deepEqual(TASK4_SERVICE_ROUTES, assignments.map(([route]) => route))

  for (const [route, mediaKey] of assignments) {
    const content = getTask4ServiceContent(route)
    assert.equal(content.route, route)
    assert.equal(content.publicationStatus, 'approved-copy')
    assert.equal(content.truthBasis.status, 'owner-verified-capability-scope')
    assert.ok(content.truthBasis.qualification.length > 40)
    assert.equal(content.media.key, mediaKey)
    assert.equal(content.cta.href, '/project-enquiry')
    assert.ok(content.cta.label)
    assert.ok(content.metadata.title)
    assert.ok(content.metadata.description.length > 60)
  }

  const blocked = { ...getTask4ServiceContent(assignments[0][0]), publicationStatus: 'blocked' }
  assert.throws(() => assertApprovedTask4ServiceContent(blocked), /not approved for publication/i)

  const event = getTask4ServiceContent('/services/event-production')
  assert.ok(event.related.items.some((item) => item.href === '/services/exhibition-booth-design-build'), 'Event Production must retain the Exhibition Booth related link')
  assert.match(await read('lib/task4-service-content.ts'), /href:\s*ServiceHref/)
})

test('all seven routes consume only their assigned approved registry record and contain no substantive inline copy or media selection', async () => {
  for (const [route] of assignments) {
    const source = await read(pageFileForRoute(route))
    assert.match(source, /getTask4ServiceContent/)
    assert.match(source, new RegExp(`getTask4ServiceContent\\(['\"]${route}['\"]\\)`))
    assert.doesNotMatch(source, /HoldingPage|getHoldingPageContent|getHoldingPageMetadata|FNB_MEDIA\./)
    assert.doesNotMatch(source, />\s*[A-Za-z][^<{]{3,}\s*</, `${route} contains rendered inline prose instead of registry content`)
    assert.match(source, /export const metadata: Metadata = content\.metadata/)
    assert.match(source, /<main id="main">/)
    assert.match(source, /<ProjectEnquiryCta/)
    assert.match(source, /ServiceMediaFeature/)
  }
})

test('registry composition signatures prove unique primitive order and media rhythm, not renamed ids', async () => {
  const { TASK4_SERVICE_ROUTES, getTask4ServiceContent } = await import('../lib/task4-service-content.ts')
  const signatures = new Set()

  for (const route of TASK4_SERVICE_ROUTES) {
    const content = getTask4ServiceContent(route)
    assert.equal(content.composition[0].primitive, 'hero')
    assert.equal(content.composition.at(-1).primitive, 'cta')
    const media = content.composition.filter((entry) => entry.primitive === 'media-feature')
    assert.equal(media.length, 1, `${route} must define one intentional media beat`)
    assert.ok(['start', 'end'].includes(media[0].mediaPosition))
    assert.ok(['landscape', 'portrait'].includes(media[0].mediaAspect))
    assert.ok(['early', 'middle', 'late'].includes(media[0].rhythm))

    const structuralSignature = content.composition.map(({ primitive, mediaPosition, mediaAspect, rhythm }) =>
      [primitive, mediaPosition, mediaAspect, rhythm].filter(Boolean).join(':'),
    ).join('>')
    assert.equal(signatures.has(structuralSignature), false, `${route} duplicates another primitive/media rhythm`)
    signatures.add(structuralSignature)
  }
  assert.equal(signatures.size, 7)
})

test('conceptual media remains registry-bound and fully disclosed at every breakpoint', async () => {
  const [mediaRegistry, conceptualMedia] = await Promise.all([read('lib/media-registry.ts'), read('components/fnb/editorial/conceptual-media.tsx')])
  for (const [, key] of assignments) assert.match(mediaRegistry, new RegExp(`${key}:\\s*getMedia\\(`))
  assert.match(conceptualMedia, /Conceptual capability imagery — not project evidence/)
  const caption = conceptualMedia.match(/<figcaption[\s\S]*?<\/figcaption>/)?.[0] ?? ''
  assert.doesNotMatch(caption, /\bhidden\b|\b(?:sm|md|lg|xl):hidden\b/)
})

test('service copy contains no banned proof, metric, certification, or holding placeholders', async () => {
  const registry = await read('lib/task4-service-content.ts')
  for (const pattern of [/Project slot\s*0?1/i, /\b\d+(?:\.\d+)?%\b/, /trusted by/i, /award[- ]winning/i, /certified/i, /guaranteed/i, /full service narrative scheduled/i]) {
    assert.doesNotMatch(registry, pattern)
  }
})

test('Task 4 preserves all 20 canonical route page files', async () => {
  const registry = JSON.parse(await read('data/site-registry.json'))
  assert.equal(registry.routes.length, 20)
  for (const route of registry.routes) await access(path.join(root, route.href === '/' ? 'app/page.tsx' : pageFileForRoute(route.href)))
})
