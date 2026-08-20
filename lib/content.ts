import { FNB_MEDIA, getMedia, type MediaAsset } from '@/lib/media-registry'
import { SERVICE_REGISTRY, type ServiceHref } from '@/lib/site-registry'

/** FNB DIGITAL FLAGSHIP — homepage content model. */

export const MEDIA = {
  hero: FNB_MEDIA.hero,
  editorialGateway: FNB_MEDIA.editorialGateway,
  boothBuild: FNB_MEDIA.boothBuild,
  eventProduction: FNB_MEDIA.eventKeynote,
  digitalInterface: FNB_MEDIA.digitalDashboard,
  interiorSpace: FNB_MEDIA.interiorsLobby,
} as const

export const HERO = {
  eyebrow: 'FNB EVENTS \u00B7 FUTURE NEXT BRANDING',
  headline: 'Presence, engineered.',
  lead: 'FNB designs, engineers and builds the environments brands appear in, then extends that presence into the digital systems behind them.',
  primaryCta: { label: 'Start a project', href: '/project-enquiry' },
  secondaryCta: { label: 'See the work', href: '/portfolio' },
}

export const BRAND_STATEMENT = {
  label: 'S02 \u00B7 The practice',
  statement: [
    'We work in two materials: physical space and digital systems.',
    'Exhibitions, events, technical production and interiors give a brand somewhere to stand. Websites, automation and AI workflows give it somewhere to operate.',
  ],
}

/** S04 stage labels — canonical, mono uppercase. */
export const BUILD_STAGES = [
  'Floor',
  'Plan',
  'Frame',
  'Panels',
  'Material',
  'Graphics',
  'Light',
  'AV',
  'Furniture',
  'Live',
] as const

export type Capability = {
  number: string
  name: string
  problem: string
  route: ServiceHref
  cluster: string
  image: MediaAsset
}

/** S05 — canonical service entities from spec/services.json + copy deck problem lines. */
export const CAPABILITIES: Capability[] = SERVICE_REGISTRY.map((service) => ({
  number: service.number,
  name: service.name,
  problem: service.problem,
  route: service.href,
  cluster: service.cluster.toUpperCase(),
  image: getMedia(service.mediaId),
}))

export const EVENT_PRODUCTION = {
  statement: 'Hundreds of moving parts. One show with no room for improvisation.',
  cta: { label: 'Event production', href: '/services/event-production' },
}

export const PHYSICAL_TO_DIGITAL = {
  statement:
    'The same discipline that keeps a stage safe keeps a system reliable. Structure, sequence, tolerances, handover.',
  links: [
    { label: 'Websites & Digital Experiences', href: '/services/websites-digital-experiences' },
    { label: 'Automation Systems', href: '/services/automation-systems' },
    { label: 'AI Workflow Solutions', href: '/services/ai-workflow-solutions' },
  ],
}

export const DIGITAL_CAPABILITIES = {
  lines: [
    'Websites engineered for performance, not just launch day.',
    'Automation that moves work between systems without hands.',
    'AI workflows where a model helps and a person decides.',
  ],
  cta: { label: 'Websites & Digital Experiences', href: '/services/websites-digital-experiences' },
}

export const INTERIORS = {
  caption: 'From plan to place.',
  cta: { label: 'Interiors & Commercial Spaces', href: '/services/interiors-commercial-spaces' },
}

/**
 * S10 INDUSTRIES — renders only VERIFIED industries per spec.
 * Placeholder sector-constraint framing pending truth-registry verification.
 */
export const INDUSTRIES: { name: string; constraint: string }[] = [
  { name: 'Technology', constraint: 'Launch windows that do not move and demos that cannot fail.' },
  { name: 'Automotive', constraint: 'Vehicles on stands: weight, access, turntables and reveal timing.' },
  { name: 'Healthcare', constraint: 'Compliance in every claim, on every printed and projected surface.' },
  { name: 'Finance', constraint: 'Trust communicated through restraint, precision and security.' },
  { name: 'Government & Public', constraint: 'Procurement discipline, documentation and accountability.' },
  { name: 'Retail & FMCG', constraint: 'Footfall conversion measured in seconds of attention.' },
]

/** S11 PROCESS — terminology pending validation per copy deck. */
export const PROCESS_STAGES = [
  { name: 'Discover', line: 'Understand the brief, the audience and the constraint that matters.' },
  { name: 'Define', line: 'Fix scope, budget envelope and the measure of done.' },
  { name: 'Design', line: 'Spatial, graphic and system design as one coordinated intent.' },
  { name: 'Engineer', line: 'Structures calculated, systems specified, tolerances set.' },
  { name: 'Produce', line: 'Fabrication and build under one production standard.' },
  { name: 'Install / Launch', line: 'On site or online, sequenced to the hour.' },
  { name: 'Deliver', line: 'Live operation with named accountability.' },
  { name: 'Optimise', line: 'Measure, learn and improve the next iteration.' },
] as const

/**
 * S12 PROOF — spec: renders NOTHING when no proof is verified.
 * Truth registry TR-040..046 not yet cleared, so this stays empty
 * and the section intentionally does not render.
 */
export const VERIFIED_PROOF: { value: string; label: string }[] = []

/**
 * S13 INSIGHTS — spec: renders nothing if fewer than two published.
 * No published insights yet, so the section does not render.
 */
export const INSIGHTS: { topic: string; title: string; readingTime: string; href: string }[] = []

export const CLOSING = {
  headline: 'Tell us what you are planning.',
  sub: 'Send the brief, the dates and the constraints. We will tell you what is possible.',
  primaryCta: { label: 'Start a project', href: '/project-enquiry' },
  contactCta: { label: 'Contact', href: '/contact' },
}
