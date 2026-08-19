import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'

const root = process.cwd()
const read = (relativePath) => readFile(path.join(root, relativePath), 'utf8')

const serviceContracts = [
  {
    route: '/services/event-production',
    title: 'Event Production',
    sections: ['planning', 'show-direction', 'staging', 'live-systems-coordination', 'production-control', 'guest-experience', 'execution', 'related-services', 'project-enquiry'],
  },
  {
    route: '/services/branding-advertising',
    title: 'Branding & Advertising',
    sections: ['brand-strategy', 'visual-systems', 'campaign-thinking', 'spatial-branding', 'event-branding', 'advertising', 'content-surfaces', 'physical-digital-consistency', 'project-enquiry'],
  },
  {
    route: '/services/technical-production',
    title: 'Technical Production',
    sections: ['technical-planning', 'signal-paths', 'lighting', 'audio', 'led-display', 'control-systems', 'show-integration', 'on-site-execution', 'project-enquiry'],
  },
  {
    route: '/services/websites-digital-experiences',
    title: 'Websites & Digital Experiences',
    sections: ['digital-strategy', 'ux', 'ui', 'web-experience', 'interactive-storytelling', 'responsive-systems', 'conversion-thinking', 'brand-consistency', 'project-enquiry'],
  },
  {
    route: '/services/automation-systems',
    title: 'Automation Systems',
    sections: ['workflow-discovery', 'process-mapping', 'system-integration', 'lead-customer-flows', 'operational-automation', 'data-movement', 'human-controls', 'project-enquiry'],
  },
  {
    route: '/services/ai-workflow-solutions',
    title: 'AI Workflow Solutions',
    sections: ['ai-workflow-strategy', 'agent-orchestration', 'knowledge-systems', 'human-review', 'governance', 'workflow-intelligence', 'business-integration', 'project-enquiry'],
  },
  {
    route: '/services/interiors-commercial-spaces',
    title: 'Interiors & Commercial Spaces',
    sections: ['spatial-strategy', 'functional-planning', 'material-language', 'brand-integration', 'commercial-environments', 'design-development', 'execution-thinking', 'project-enquiry'],
  },
]

const pageFileForRoute = (route) => `app${route}/page.tsx`

test('all seven Task 4 routes are complete service pages with route metadata and canonical enquiry CTAs', async () => {
  const cta = await read('components/fnb/editorial/project-enquiry-cta.tsx')
  assert.match(cta, /href="\/project-enquiry"/)

  for (const contract of serviceContracts) {
    const source = await read(pageFileForRoute(contract.route))
    assert.doesNotMatch(source, /HoldingPage|getHoldingPageContent|getHoldingPageMetadata/)
    assert.match(source, /import type \{ Metadata \} from 'next'/)
    assert.match(source, /export const metadata: Metadata/)
    assert.match(source, new RegExp(`title:\\s*['\"]${contract.title.replace(/[&]/g, '\\&')}`))
    assert.match(source, /description:\s*['"][^'"]{60,}['"]/)
    assert.match(source, /<main id="main">/)
    assert.match(source, /<ProjectEnquiryCta/)
    assert.match(source, /ConceptualMedia|ServiceMedia/)
  }
})

test('each service exposes its complete, genuinely distinct narrative sequence', async () => {
  const signatures = new Set()

  for (const contract of serviceContracts) {
    const source = await read(pageFileForRoute(contract.route))
    let cursor = -1
    for (const section of contract.sections) {
      const position = source.indexOf(`id="${section}"`)
      assert.ok(position > cursor, `${contract.route} must include ${section} in its required narrative order`)
      cursor = position
    }
    const signature = contract.sections.join('>')
    assert.equal(signatures.has(signature), false, `${contract.route} must not reuse another route's section order`)
    signatures.add(signature)
  }

  assert.equal(signatures.size, serviceContracts.length)
})

test('conceptual media is registry-bound and always disclosed as not project evidence', async () => {
  const [mediaRegistry, conceptualMedia] = await Promise.all([
    read('lib/media-registry.ts'),
    read('components/fnb/editorial/conceptual-media.tsx'),
  ])

  for (const key of ['eventKeynote', 'brandingLobby', 'technicalControl', 'digitalDashboard', 'automationAnalytics', 'aiPavilion', 'interiorsLobby']) {
    assert.match(mediaRegistry, new RegExp(`${key}:\\s*getMedia\\(`))
  }
  assert.match(conceptualMedia, /Conceptual capability imagery — not project evidence/)
  const caption = conceptualMedia.match(/<figcaption[\s\S]*?<\/figcaption>/)?.[0] ?? ''
  assert.doesNotMatch(caption, /\bhidden\b|\b(?:sm|md|lg|xl):hidden\b/)
})

test('higher-risk service copy keeps advisory, product, venue, and approval boundaries explicit', async () => {
  const [technical, digital, automation, ai, interiors] = await Promise.all([
    read(pageFileForRoute('/services/technical-production')),
    read(pageFileForRoute('/services/websites-digital-experiences')),
    read(pageFileForRoute('/services/automation-systems')),
    read(pageFileForRoute('/services/ai-workflow-solutions')),
    read(pageFileForRoute('/services/interiors-commercial-spaces')),
  ])

  assert.match(technical, /venue/i)
  assert.match(technical, /qualified|engineering|authority/i)
  assert.match(technical, /no equipment inventory/i)
  assert.match(digital, /conceptual interface|not (?:a )?deployed product|not delivered/i)
  assert.match(automation, /discovery|advisory/i)
  assert.match(automation, /not (?:a )?deployed product|implementation remains subject/i)
  assert.match(ai, /human review/i)
  assert.match(ai, /no proprietary|not (?:a )?deployed product/i)
  assert.match(interiors, /authority|qualified|approval/i)
})

test('service copy contains no banned proof, metric, certification, or holding-page placeholders', async () => {
  const banned = [
    /Project slot\s*0?1/i,
    /\b\d+(?:\.\d+)?%\b/,
    /trusted by/i,
    /award[- ]winning/i,
    /certified/i,
    /guaranteed/i,
    /full service narrative scheduled/i,
    /detailed scope.+remain.+unpublished/i,
  ]

  for (const contract of serviceContracts) {
    const source = await read(pageFileForRoute(contract.route))
    for (const pattern of banned) assert.doesNotMatch(source, pattern, `${contract.route} contains banned or placeholder copy`)
  }
})

test('Task 4 preserves all 20 canonical route page files', async () => {
  const registry = JSON.parse(await read('data/site-registry.json'))
  assert.equal(registry.routes.length, 20)
  for (const route of registry.routes) {
    const file = route.href === '/' ? 'app/page.tsx' : pageFileForRoute(route.href)
    await access(path.join(root, file))
  }
})
