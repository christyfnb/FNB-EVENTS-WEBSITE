/**
 * FNB DIGITAL FLAGSHIP — homepage content model.
 * Copy authority: docs/10-COPY-DECK.md
 * Service entities: spec/services.json (canonical, do not rename)
 *
 * MEDIA: all image/video src values point at /media/... placeholder
 * paths. Drop your real assets into public/media/ with these names
 * (or update the paths here) and they will appear site-wide.
 */

export const MEDIA = {
  /** VD-01 hero film, 16:9 desktop. 18–22s seamless loop, muted. */
  heroVideo: '/media/vd-01-hero.mp4',
  /** IMG-001 hero poster, 16:9. Doubles as reduced-motion hero + OG image. */
  heroPoster: '/media/img-001-hero-poster.jpg',
  /** VD-02 event production excerpt, 12–14s silent loop. */
  eventVideo: '/media/vd-02-event-production.mp4',
  /** IMG-003 event operational still (poster for VD-02). */
  eventPoster: '/media/img-003-event-still.jpg',
  /** IMG-004 digital interface still, 16:10. Real screens only. */
  digitalInterface: '/media/img-004-digital-interface.jpg',
  /** IMG-005 finished interior, 16:9. */
  interiorSpace: '/media/img-005-interior.jpg',
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

export type Project = {
  id: string
  title: string
  service: string
  location: string
  year: string
  /** Placeholder path — drop real project photography into public/media/projects/ */
  image: string
  href: string
}

/**
 * S03 SELECTED WORK — REAL_REQUIRED per spec.
 * These are placeholder slots awaiting verified project data + photography.
 * Replace title/service/location/year with real cleared projects.
 */
export const SELECTED_WORK: Project[] = [
  {
    id: 'project-01',
    title: 'Project slot 01',
    service: 'Exhibition Booth Design & Build',
    location: 'Location',
    year: '2026',
    image: '/media/projects/project-01.jpg',
    href: '/portfolio',
  },
  {
    id: 'project-02',
    title: 'Project slot 02',
    service: 'Event Production',
    location: 'Location',
    year: '2026',
    image: '/media/projects/project-02.jpg',
    href: '/portfolio',
  },
  {
    id: 'project-03',
    title: 'Project slot 03',
    service: 'Technical Production',
    location: 'Location',
    year: '2025',
    image: '/media/projects/project-03.jpg',
    href: '/portfolio',
  },
  {
    id: 'project-04',
    title: 'Project slot 04',
    service: 'Interiors & Commercial Spaces',
    location: 'Location',
    year: '2025',
    image: '/media/projects/project-04.jpg',
    href: '/portfolio',
  },
]

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
  route: string
  cluster: string
  /** Placeholder path for the capability environment image, 16:10 */
  image: string
}

/** S05 — canonical service entities from spec/services.json + copy deck problem lines. */
export const CAPABILITIES: Capability[] = [
  {
    number: '01',
    name: 'Exhibition Booth Design & Build',
    problem: 'You have floor space and one chance to be noticed.',
    route: '/services/exhibition-booth-design-build',
    cluster: 'EXPERIENCES',
    image: '/media/capabilities/cap-01-exhibition.jpg',
  },
  {
    number: '02',
    name: 'Event Production',
    problem: 'Hundreds of moving parts. One show with no room for improvisation.',
    route: '/services/event-production',
    cluster: 'EXPERIENCES',
    image: '/media/capabilities/cap-02-events.jpg',
  },
  {
    number: '03',
    name: 'Branding & Advertising',
    problem: 'Your brand must read the same in print, on screen and on a wall.',
    route: '/services/branding-advertising',
    cluster: 'BRAND & SPACE',
    image: '/media/capabilities/cap-03-branding.jpg',
  },
  {
    number: '04',
    name: 'Technical Production',
    problem: 'Stage, light, sound and control, planned before anyone arrives.',
    route: '/services/technical-production',
    cluster: 'EXPERIENCES',
    image: '/media/capabilities/cap-04-technical.jpg',
  },
  {
    number: '05',
    name: 'Websites & Digital Experiences',
    problem: 'The experience should not end when the venue empties.',
    route: '/services/websites-digital-experiences',
    cluster: 'DIGITAL SYSTEMS',
    image: '/media/capabilities/cap-05-websites.jpg',
  },
  {
    number: '06',
    name: 'Automation Systems',
    problem: 'Your team is doing work software should be doing.',
    route: '/services/automation-systems',
    cluster: 'DIGITAL SYSTEMS',
    image: '/media/capabilities/cap-06-automation.jpg',
  },
  {
    number: '07',
    name: 'AI Workflow Solutions',
    problem: 'Intelligence inside the workflow, with a human still deciding.',
    route: '/services/ai-workflow-solutions',
    cluster: 'DIGITAL SYSTEMS',
    image: '/media/capabilities/cap-07-ai.jpg',
  },
  {
    number: '08',
    name: 'Interiors & Commercial Spaces',
    problem: 'A permanent space that has to work commercially, not just look good.',
    route: '/services/interiors-commercial-spaces',
    cluster: 'BRAND & SPACE',
    image: '/media/capabilities/cap-08-interiors.jpg',
  },
]

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

export const NAV_LINKS = [
  { label: 'Work', href: '/portfolio' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Process', href: '/process' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]
