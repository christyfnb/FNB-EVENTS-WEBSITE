import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'

const root = process.cwd()
const read = (relativePath) => readFile(path.join(root, relativePath), 'utf8')

const expectedCanonicalRoutes = [
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

const expectedServiceRoutes = expectedCanonicalRoutes.slice(3, 11)
const expectedHomeSections = [
  'S01Hero',
  'S02BrandStatement',
  'S03SelectedWork',
  'S04ExhibitionTransformation',
  'S05CapabilityIndex',
  'S06EventProduction',
  'S07PhysicalToDigital',
  'S08DigitalCapabilities',
  'S09Interiors',
  'S10Industries',
  'S11Process',
  'S12Proof',
  'S13Insights',
  'S14Closing',
]
const preservedHomeIds = [
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
  'process',
]

async function readRegistry() {
  return JSON.parse(await read('data/site-registry.json'))
}

async function sourceFiles(directory) {
  const entries = await readdir(path.join(root, directory), { withFileTypes: true })
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const relative = path.join(directory, entry.name)
      if (entry.isDirectory()) return sourceFiles(relative)
      return /\.(?:ts|tsx)$/.test(entry.name) ? [relative] : []
    }),
  )
  return nested.flat()
}

test('canonical route, navigation, and service registries are unique and aligned', async () => {
  const registry = await readRegistry()
  const routeHrefs = registry.routes.map((route) => route.href)
  const serviceHrefs = registry.services.map((service) => service.href)

  assert.deepEqual(routeHrefs, expectedCanonicalRoutes)
  assert.equal(new Set(routeHrefs).size, routeHrefs.length, 'canonical routes must be unique')
  assert.equal(new Set(registry.routes.map((route) => route.id)).size, registry.routes.length, 'route ids must be unique')
  assert.deepEqual(serviceHrefs, expectedServiceRoutes)
  assert.equal(new Set(serviceHrefs).size, serviceHrefs.length, 'service routes must be unique')

  for (const item of [...registry.primaryNavigation, ...registry.footerNavigation]) {
    const target = item.href.split('#')[0] || '/'
    assert.ok(routeHrefs.includes(target), `navigation target ${item.href} must be canonical`)
  }
  assert.ok(registry.utilityNavigation.some((item) => item.href === '/#process'), 'homepage process anchor must remain available')
})

test('service entries carry explicit truth-safe conceptual media status', async () => {
  const registry = await readRegistry()
  const runtimeMedia = JSON.parse(await read('data/media/runtime-media.json'))
  const mediaById = new Map(runtimeMedia.map((asset) => [asset.id, asset]))
  const forbiddenFields = ['client', 'project', 'metric', 'award', 'testimonial', 'certification']

  for (const service of registry.services) {
    assert.match(service.number, /^0[1-8]$/)
    assert.ok(service.mediaId)
    const media = mediaById.get(service.mediaId)
    assert.ok(media, `${service.mediaId} must exist in the approved runtime media registry`)
    assert.equal(service.mediaTruth, media.truthClassification)
    assert.equal(media.publicationStatus, 'approved-for-runtime')
    assert.equal(service.publicationStatus, 'approved-copy')
    for (const field of forbiddenFields) assert.equal(field in service, false, `${field} must not appear in service registry`)
  }
})

test('root layout owns one shared shell while homepage keeps its canonical 14-section sequence and ids', async () => {
  const [layout, home] = await Promise.all([read('app/layout.tsx'), read('app/page.tsx')])
  assert.equal((layout.match(/<FNBHeader\s*\/>/g) ?? []).length, 1)
  assert.equal((layout.match(/<FNBFooter\s*\/>/g) ?? []).length, 1)
  assert.doesNotMatch(home, /FNBHeader|FNBFooter/)

  const renderedSections = [...home.matchAll(/<(S\d{2}[A-Za-z]+)\s*\/>/g)].map((match) => match[1])
  assert.deepEqual(renderedSections, expectedHomeSections)

  const sectionFiles = await sourceFiles('components/fnb/sections')
  const sectionSource = (await Promise.all(sectionFiles.map(read))).join('\n')
  for (const id of preservedHomeIds) assert.match(sectionSource, new RegExp(`id=["']${id}["']`))
})

test('Task 3 routes and the complete exhibition narrative are present', async () => {
  const [services, exhibition] = await Promise.all([
    read('app/services/page.tsx'),
    read('app/services/exhibition-booth-design-build/page.tsx'),
  ])
  assert.match(services, /SERVICE_REGISTRY/)
  assert.doesNotMatch(services, /rounded-(?:lg|xl|2xl|3xl|full)/)

  const requiredNarrative = [
    'strategic-proposition',
    'concept',
    'sketch-design',
    'spatial-planning',
    'engineering',
    'material-thinking',
    'fabrication',
    'build-progression',
    'installation',
    'experience-delivery',
    'related-capabilities',
    'project-enquiry',
  ]
  for (const id of requiredNarrative) assert.match(exhibition, new RegExp(`id=["']${id}["']`))
  assert.match(exhibition, /conceptual capability imagery/i)
})

test('internal hrefs use canonical absolute forms without broken placeholders', async () => {
  const files = [...(await sourceFiles('app')), ...(await sourceFiles('components')), ...(await sourceFiles('lib'))]
  const hrefPattern = /href\s*=\s*["']([^"']+)["']/g

  for (const file of files) {
    const source = await read(file)
    for (const match of source.matchAll(hrefPattern)) {
      const href = match[1]
      assert.notEqual(href, '#', `${file} contains a placeholder href`)
      assert.doesNotMatch(href, /^javascript:/i, `${file} contains a javascript href`)
      if (href.startsWith('/')) {
        assert.doesNotMatch(href, /\/\//, `${file} contains a double-slash href`)
        assert.ok(href === '/' || !href.endsWith('/'), `${file} contains a deprecated trailing-slash href`)
      }
    }
  }
})
