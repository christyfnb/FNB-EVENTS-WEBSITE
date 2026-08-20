export const TASK5_INSTITUTIONAL_ROUTES = [
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
] as const

export type Task5InstitutionalRoute = (typeof TASK5_INSTITUTIONAL_ROUTES)[number]
export type PublicationStatus = 'approved-copy' | 'verification-pending' | 'publication-pending' | 'legal-review-pending' | 'blocked'
export type TruthBasisStatus = 'owner-authorized-capability-framing' | 'verification-required' | 'source-publication-required' | 'counsel-approval-required' | 'unverified'

export type InstitutionalSection = {
  id: string
  index: string
  eyebrow?: string
  title: string
  body: readonly string[]
  items?: readonly { title: string; copy: string }[]
}

export type InstitutionalContent = {
  route: Task5InstitutionalRoute
  publicationStatus: PublicationStatus
  truthBasis: { status: TruthBasisStatus; qualification: string }
  metadata: { title: string; description: string }
  hero: { eyebrow: string; title: string; lead: string }
  sections: readonly InstitutionalSection[]
  statusPanel?: { label: string; title: string; notice: string }
  actions: readonly { label: string; href: '/' | '/services' | '/process' | '/team' | '/project-enquiry' | '/#process' }[]
}

const about: InstitutionalContent = {
  route: '/about', publicationStatus: 'approved-copy',
  truthBasis: { status: 'owner-authorized-capability-framing', qualification: 'Owner-authorized Future Next Branding philosophy and capability framing only; no history, scale, location, award or project claim is included.' },
  metadata: { title: 'About FNB Events', description: 'Future Next Branding philosophy and an integrated approach across strategy, design, engineering, production and digital thinking.' },
  hero: { eyebrow: 'About · Future Next Branding', title: 'Presence is designed as one connected system.', lead: 'Future Next Branding brings strategic, creative, spatial, production and digital decisions into the same frame.' },
  statusPanel: { label: 'Content basis', title: 'Authorized capability framing', notice: 'No history, scale, location, award or project claim is included.' },
  sections: [
    { id: 'philosophy', index: '01', eyebrow: 'Philosophy', title: 'Begin with the presence a brand needs to create.', body: ['A brief becomes more useful when it defines the audience, context, message and intended experience before choosing a format.', 'That frame can guide how identity, space, content, production and digital touchpoints relate.'] },
    { id: 'disciplines', index: '02', eyebrow: 'Integrated disciplines', title: 'Strategy. Design. Engineering. Production. Digital.', body: ['The disciplines are considered together so that creative intent can meet spatial, technical and operational constraints.'], items: [{ title: 'Strategy', copy: 'Clarify purpose, audience and priorities.' }, { title: 'Design', copy: 'Translate intent into visual, spatial and interaction systems.' }, { title: 'Engineering', copy: 'Develop feasible decisions for qualified review.' }, { title: 'Production', copy: 'Plan how approved work can move into delivery.' }, { title: 'Digital', copy: 'Extend the experience into connected interfaces and workflows.' }] },
    { id: 'approach', index: '03', eyebrow: 'Approach', title: 'Keep decisions connected from brief to outcome.', body: ['The approach is collaborative and brief-led: understand the problem, define the system, test constraints and prepare an approved route into production.', 'Exact scope, responsibilities and delivery conditions are established for each enquiry.'] },
    { id: 'gateways', index: '04', eyebrow: 'Continue', title: 'Meet the people and examine the process.', body: ['The team portrait library is available with identity details gated for verification. The process page expands the authorized working sequence.'] },
  ],
  actions: [{ label: 'Explore the process', href: '/process' }, { label: 'View the team', href: '/team' }, { label: 'Start a project enquiry', href: '/project-enquiry' }],
}

const process: InstitutionalContent = {
  route: '/process', publicationStatus: 'approved-copy',
  truthBasis: { status: 'owner-authorized-capability-framing', qualification: 'Owner-authorized process framing only; sequence and responsibilities remain subject to the approved brief, qualified review, venue conditions and applicable approvals.' },
  metadata: { title: 'Process | FNB Events', description: 'A truth-safe working progression from discovery and definition through design, engineering, production, delivery and evolution.' },
  hero: { eyebrow: 'Process · Canonical route', title: 'One line of intent, carried through every decision.', lead: 'The process keeps purpose, design, constraints and delivery thinking visible as a brief develops.' },
  statusPanel: { label: 'Process basis', title: 'Brief-led progression', notice: 'Sequence and responsibilities remain subject to the approved brief, qualified review, site conditions and applicable approvals.' },
  sections: [
    { id: 'discover', index: '01', title: 'Discover', body: ['Understand the audience, context, objectives, available information and constraints before proposing a direction.'] },
    { id: 'define', index: '02', title: 'Define', body: ['Turn discovery into priorities, scope boundaries, decision criteria and an agreed working brief.'] },
    { id: 'design', index: '03', title: 'Design', body: ['Develop the visual, spatial, content and interaction system around the defined intent.'] },
    { id: 'engineer', index: '04', title: 'Engineer', body: ['Resolve feasibility, interfaces and technical information for the qualified reviews required by the project.'] },
    { id: 'produce', index: '05', title: 'Produce', body: ['Prepare approved design information, responsibilities, sequencing and production coordination for the agreed scope.'] },
    { id: 'deliver', index: '06', title: 'Deliver', body: ['Coordinate checks, handovers and execution decisions against the approved brief and site conditions.'] },
    { id: 'evolve', index: '07', title: 'Evolve', body: ['Review what was learned and identify what should be retained, refined or reconsidered in a future brief.'] },
  ],
  actions: [{ label: 'Start a project enquiry', href: '/project-enquiry' }, { label: 'Homepage process overview', href: '/#process' }],
}

function pendingContent(input: Omit<InstitutionalContent, 'sections'> & { section: InstitutionalSection }): InstitutionalContent {
  return { ...input, sections: [input.section] }
}

const team = pendingContent({
  route: '/team', publicationStatus: 'verification-pending',
  truthBasis: { status: 'verification-required', qualification: 'Portrait media is owner-approved for runtime, while identity, role, biography, consent and complete publication metadata remain separately gated.' },
  metadata: { title: 'Team | FNB Events', description: 'The FNB team portrait composition, with public identity and role details held until owner verification and publication approval.' },
  hero: { eyebrow: 'Team · Portrait library', title: 'The people behind the work, with facts held to a higher standard.', lead: 'All approved web-optimized portraits are presented without inferring names, roles or biographies from source filenames.' },
  section: { id: 'portrait-library', index: '01', title: 'Portrait library', body: ['Identity and role details remain pending verification. Each portrait below uses the approved web-optimized runtime asset only.'] },
  statusPanel: { label: 'Identity publication', title: 'Verification pending', notice: 'Names, roles, biographies and consent statements are withheld until the owner approves the complete record.' },
  actions: [{ label: 'Explore the process', href: '/process' }, { label: 'Start a project enquiry', href: '/project-enquiry' }],
})

const industries = pendingContent({
  route: '/industries', publicationStatus: 'verification-pending',
  truthBasis: { status: 'verification-required', qualification: 'Capability-oriented decision framing only; no sector history, client relationship, project delivery or industry specialization is asserted.' },
  metadata: { title: 'Industries | FNB Events', description: 'A capability-oriented framework for considering sector context without publishing unverified experience claims.' },
  hero: { eyebrow: 'Industries · Capability framework', title: 'Context changes the brief. The evidence must remain specific.', lead: 'This route frames the questions that shape a response without implying unverified sector history.' },
  section: { id: 'context-framework', index: '01', title: 'Read the context before choosing the system.', body: ['Audience expectations, operational constraints, regulatory review, venue conditions, content needs and digital touchpoints can alter the right response.'], items: [{ title: 'Audience', copy: 'Who needs to understand, move through or interact with the experience?' }, { title: 'Environment', copy: 'What physical, technical and operational conditions shape the brief?' }, { title: 'Governance', copy: 'Which qualified reviews, permissions and stakeholder decisions are required?' }] },
  statusPanel: { label: 'Evidence status', title: 'Industry proof awaiting verification', notice: 'No client, delivered project or historical sector claim is published in the absence of approved evidence.' },
  actions: [{ label: 'Explore capabilities', href: '/services' }, { label: 'Start a project enquiry', href: '/project-enquiry' }],
})

const portfolio = pendingContent({
  route: '/portfolio', publicationStatus: 'publication-pending',
  truthBasis: { status: 'source-publication-required', qualification: 'Case studies require approved project facts, client permissions, imagery, scope and attribution; none are inferred from conceptual capability media.' },
  metadata: { title: 'Portfolio | FNB Events', description: 'Selected work publication architecture with project evidence held until facts, permissions and media are approved.' },
  hero: { eyebrow: 'Portfolio · Evidence gate', title: 'Selected work is being prepared for publication.', lead: 'Project evidence will appear only when the complete record is verified and approved.' },
  section: { id: 'publication-standard', index: '01', title: 'A case study needs more than an image.', body: ['Project identity, client permission, scope, imagery, attribution and claims must be reviewed together before publication. Conceptual imagery on this site is never substituted for delivered work.'] },
  statusPanel: { label: 'Publication status', title: 'Project evidence pending', notice: 'No fabricated projects, client names, dates, locations, metrics or outcomes are presented.' },
  actions: [{ label: 'Explore capabilities', href: '/services' }, { label: 'Start a project enquiry', href: '/project-enquiry' }],
})

const insights = pendingContent({
  route: '/insights', publicationStatus: 'publication-pending',
  truthBasis: { status: 'source-publication-required', qualification: 'Articles require reviewed source material, approved authorship, publication date and editorial approval; no publication metadata is generated.' },
  metadata: { title: 'Insights | FNB Events', description: 'The FNB insights publication architecture, held pending reviewed source material and approved attribution.' },
  hero: { eyebrow: 'Insights · Editorial gate', title: 'Insights are being prepared for publication.', lead: 'The publication system is ready to receive reviewed, attributed material without inventing an editorial archive.' },
  section: { id: 'editorial-standard', index: '01', title: 'Source first. Attribution intact.', body: ['Each future entry requires approved source material, title, author, date and editorial review before it can be published.'] },
  statusPanel: { label: 'Publication status', title: 'No approved articles published', notice: 'Titles, authors, dates, reading times and article claims remain absent until approved material exists.' },
  actions: [{ label: 'Explore capabilities', href: '/services' }, { label: 'Return home', href: '/' }],
})

const contact = pendingContent({
  route: '/contact', publicationStatus: 'verification-pending',
  truthBasis: { status: 'verification-required', qualification: 'No public email address, telephone number, office location, operating hours, social account or external contact destination is currently verified.' },
  metadata: { title: 'Contact | FNB Events', description: 'A verified-contact gateway directing project discussions to the local, non-sending project enquiry experience.' },
  hero: { eyebrow: 'Contact · Verification gate', title: 'Begin with the project context.', lead: 'Verified public contact details are not available for publication. The project enquiry route provides a local review and copy-summary workflow.' },
  section: { id: 'project-route', index: '01', title: 'Prepare the brief before choosing a delivery channel.', body: ['Use the project enquiry experience to structure the essential context, review it and copy a summary. The form does not send or store the information.'] },
  statusPanel: { label: 'Contact data', title: 'Verification pending', notice: 'No contact detail or response-time promise is displayed without owner approval.' },
  actions: [{ label: 'Open project enquiry', href: '/project-enquiry' }, { label: 'Explore capabilities', href: '/services' }],
})

export const ENQUIRY_FORM_CONTENT = {
  heading: 'Build a project brief', intro: 'Complete the fields, review the summary, then copy it for use in a separately verified communication channel.', requiredNote: 'Fields marked required must be completed before review.',
  fields: {
    name: { label: 'Name', help: 'Your preferred contact name.', required: true, error: 'Enter your name.' },
    company: { label: 'Company or organization', help: 'Optional. Add the organization connected to the brief.', required: false },
    email: { label: 'Email', help: 'Used only in the copied summary. This page does not transmit it.', required: true, error: 'Enter a valid email address.' },
    phone: { label: 'Phone', help: 'Optional. Used only in the copied summary.', required: false },
    projectType: { label: 'Project type', help: 'Choose the closest working category.', required: true, error: 'Select a project type.', options: ['Exhibition environment', 'Event production', 'Brand or advertising system', 'Technical production', 'Digital experience', 'Automation or AI workflow', 'Interior or commercial space', 'Not yet defined'] },
    services: { label: 'Required services', help: 'Select every capability that may be relevant.', required: true, error: 'Select at least one service.', options: ['Exhibition Booth Design & Build', 'Event Production', 'Branding & Advertising', 'Technical Production', 'Websites & Digital Experiences', 'Automation Systems', 'AI Workflow Solutions', 'Interiors & Commercial Spaces'] },
    location: { label: 'Project or event location', help: 'Optional. Add only the location relevant to the brief.', required: false },
    date: { label: 'Project or event date', help: 'Optional. Add a known or indicative date.', required: false },
    scale: { label: 'Approximate scale', help: 'Optional. Describe audience, footprint, duration or another useful scale indicator.', required: false },
    message: { label: 'Project context', help: 'Describe the objective, audience, constraints and known deliverables.', required: true, error: 'Add project context before review.' },
  },
  actions: { review: 'Review summary', edit: 'Edit details', copy: 'Copy summary' },
  review: { heading: 'Review your summary', notice: 'This summary has not been sent. Copy it only when you are ready to use an independently verified communication channel.', copied: 'Summary copied. It remains not sent.', copyFailed: 'Automatic copy was unavailable. Select and copy the summary manually.' },
  provider: { configuration: 'NOT_CONFIGURED', delivery: 'NOT_SENT', label: 'Delivery provider is not configured. Nothing is sent or stored by this page.' },
} as const

const projectEnquiry = pendingContent({
  route: '/project-enquiry', publicationStatus: 'approved-copy',
  truthBasis: { status: 'owner-authorized-capability-framing', qualification: 'Frontend brief-building only; delivery provider is explicitly not configured, no network request is made, and no submission success is presented.' },
  metadata: { title: 'Project Enquiry | FNB Events', description: 'An accessible local project-brief builder with review and copy-summary flow; no provider is configured and nothing is sent.' },
  hero: { eyebrow: 'Project enquiry · Local brief builder', title: 'Shape the brief before it moves.', lead: 'Structure the project context, review it and copy a summary. This page does not send or store the information.' },
  section: { id: 'brief-builder', index: '01', title: ENQUIRY_FORM_CONTENT.heading, body: [ENQUIRY_FORM_CONTENT.intro] },
  statusPanel: { label: 'Delivery state', title: ENQUIRY_FORM_CONTENT.provider.delivery, notice: ENQUIRY_FORM_CONTENT.provider.label },
  actions: [{ label: 'Explore capabilities', href: '/services' }],
})

function legal(route: '/privacy-policy' | '/terms-and-conditions', title: string, subject: string): InstitutionalContent {
  return pendingContent({
    route, publicationStatus: 'legal-review-pending',
    truthBasis: { status: 'counsel-approval-required', qualification: `No ${subject} wording is published until counsel-approved legal text and the applicable entity, jurisdiction and operational facts are confirmed.` },
    metadata: { title: `${title} | FNB Events`, description: `${title} route reserved for counsel-approved legal text; substantive wording remains publication-pending.` },
    hero: { eyebrow: `Legal · ${title}`, title: `${title} awaits counsel-approved text.`, lead: 'This route is intentionally available without presenting generated language as approved legal information.' },
    section: { id: 'legal-publication-gate', index: '01', title: 'Legal publication gate', body: [`Counsel-approved ${subject} text, applicable entity details and governing context must be supplied and reviewed before publication.`] },
    statusPanel: { label: 'Legal status', title: 'Counsel review pending', notice: 'No obligation, promise, right, retention position, warranty, liability term or governing-law statement is inferred.' },
    actions: [{ label: 'Return home', href: '/' }],
  })
}

export const TASK5_INSTITUTIONAL_CONTENT = {
  '/about': about, '/process': process, '/team': team, '/industries': industries, '/portfolio': portfolio,
  '/insights': insights, '/contact': contact, '/project-enquiry': projectEnquiry,
  '/privacy-policy': legal('/privacy-policy', 'Privacy policy', 'privacy'),
  '/terms-and-conditions': legal('/terms-and-conditions', 'Terms and conditions', 'contractual'),
} satisfies Record<Task5InstitutionalRoute, InstitutionalContent>

export type RenderableInstitutionalContent = InstitutionalContent & { publicationStatus: Exclude<PublicationStatus, 'blocked'> }

export function assertRenderableInstitutionalContent(content: InstitutionalContent): asserts content is RenderableInstitutionalContent {
  if (content.publicationStatus === 'blocked' || content.truthBasis.status === 'unverified') throw new Error(`${content.route} is not renderable under its publication state`)
}

export function getInstitutionalContent(route: Task5InstitutionalRoute): RenderableInstitutionalContent {
  const content = TASK5_INSTITUTIONAL_CONTENT[route]
  assertRenderableInstitutionalContent(content)
  return content
}

export const TEAM_PORTRAIT_PRESENTATION = Array.from({ length: 23 }, (_, index) => ({
  mediaId: `team-portrait-${String(index + 1).padStart(2, '0')}`,
  displayLabel: `Team portrait ${String(index + 1).padStart(2, '0')}`,
  identityStatus: 'verification-pending' as const,
  roleStatus: 'verification-pending' as const,
  identityLabel: 'Identity pending verification',
  roleLabel: 'Role pending verification',
}))

export const NOT_FOUND_CONTENT = {
  publicationStatus: 'approved-copy' as const,
  truthBasis: { status: 'owner-authorized-capability-framing' as const, qualification: 'Navigation utility copy only; no business or delivery claim.' },
  eyebrow: '404 · Signal interrupted', title: 'This route is outside the current system.',
  lead: 'The requested page could not be found. Return to the canonical site routes below.',
  actions: [{ label: 'Return home', href: '/' as const }, { label: 'Explore services', href: '/services' as const }],
}

export function getNotFoundContent() {
  return NOT_FOUND_CONTENT
}
