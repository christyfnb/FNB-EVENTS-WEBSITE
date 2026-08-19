export const TASK4_SERVICE_ROUTES = [
  '/services/event-production',
  '/services/branding-advertising',
  '/services/technical-production',
  '/services/websites-digital-experiences',
  '/services/automation-systems',
  '/services/ai-workflow-solutions',
  '/services/interiors-commercial-spaces',
] as const

export type Task4ServiceRoute = (typeof TASK4_SERVICE_ROUTES)[number]
export type Task4MediaKey = 'eventKeynote' | 'brandingLobby' | 'technicalControl' | 'digitalDashboard' | 'automationAnalytics' | 'aiPavilion' | 'interiorsLobby'
export type ServicePrimitive = 'hero' | 'editorial' | 'split' | 'flow' | 'scope-list' | 'media-feature' | 'related-services' | 'cta'

export type ServiceSectionContent = {
  id: string
  index: string
  title: string
  body: readonly string[]
  aside?: string
  ariaLabel?: string
  items?: readonly string[]
  flow?: readonly { title: string; copy: string }[]
}

export type Task4ServiceContent = {
  route: Task4ServiceRoute
  publicationStatus: 'approved-copy' | 'blocked'
  truthBasis: {
    status: 'owner-verified-capability-scope' | 'unverified'
    qualification: string
  }
  metadata: { title: string; description: string }
  hero: { eyebrow: string; title: string; lead: string; anchorLabel?: string; anchorHref?: `#${string}` }
  sections: Readonly<Record<string, ServiceSectionContent>>
  media: {
    key: Task4MediaKey
    runtimePath: `/media/fnb/${string}`
    sectionKey: string
    mediaPosition: 'start' | 'end'
    mediaAspect: 'landscape' | 'portrait'
    rhythm: 'early' | 'middle' | 'late'
    disclosure: string
    boundary?: string
  }
  related?: { id: string; label: string; linkLabel: string; title: string; items: readonly { number: string; name: string; href: Task4ServiceRoute }[] }
  cta: { id: string; eyebrow: string; title: string; copy: string; label: string; href: '/project-enquiry' }
  composition: readonly {
    primitive: ServicePrimitive
    sectionKey?: string
    mediaPosition?: 'start' | 'end'
    mediaAspect?: 'landscape' | 'portrait'
    rhythm?: 'early' | 'middle' | 'late'
  }[]
}

export type ApprovedTask4ServiceContent = Task4ServiceContent & {
  publicationStatus: 'approved-copy'
  truthBasis: Task4ServiceContent['truthBasis'] & { status: 'owner-verified-capability-scope' }
}

const commonCtaHref = '/project-enquiry' as const
const conceptualDisclosure = 'Conceptual capability imagery — not project evidence'

export const TASK4_SERVICE_CONTENT = {
  '/services/event-production': {
    route: '/services/event-production', publicationStatus: 'approved-copy',
    truthBasis: { status: 'owner-verified-capability-scope', qualification: 'Owner-authorized capability language only; execution remains dependent on the approved brief, venue conditions, appointed teams and applicable approvals.' },
    metadata: { title: 'Event Production | FNB Events', description: 'Event production capability spanning planning, show direction, staging, live-system coordination, production control, guest experience and execution thinking.' },
    hero: { eyebrow: 'Service 02 · Live experiences', title: 'Event Production', lead: 'A live experience becomes coherent when the brief, run of show, environment, technical cues and guest journey are planned as one operating system.' },
    sections: {
      planning: { id: 'planning', index: '01 · Planning', title: 'Build the operating picture before the room fills.', body: ['Planning starts by clarifying purpose, audience, format, timing, dependencies and the decisions that cannot be left to show day.', 'The working plan connects creative intent with access, people, content, staging and technical coordination.'], aside: 'Scope, responsibilities, venue conditions and approvals are established for the specific brief; they are not assumed here.' },
      showDirection: { id: 'show-direction', index: '02 · Show direction', title: 'Give every live moment a reason and a cue.', body: ['Show direction turns content into a timed experience: entrances, transitions, speaker movement, media, light and sound are considered against the audience’s line of attention.'], ariaLabel: 'Show-direction decision flow', flow: [{ title: 'Frame', copy: 'Define the purpose, audience and essential content.' }, { title: 'Sequence', copy: 'Arrange moments, transitions and dependencies.' }, { title: 'Cue', copy: 'Make responsibilities and decision points visible.' }] },
      staging: { id: 'staging', index: '03 · Staging', title: 'Shape a platform for content, people and sightlines.', body: ['Stage form is considered through audience orientation, speaker movement, presentation surfaces, camera views and the practical systems that support them.', 'The image is an approved conceptual visualization. It communicates staging capability and is not evidence of a delivered FNB project.'] },
      liveSystems: { id: 'live-systems-coordination', index: '04 · Lighting / audio / visual coordination', title: 'Coordinate the systems the audience experiences together.', body: [], ariaLabel: 'Live systems coordination considerations', items: ['Lighting states and transitions', 'Audio coverage and programme needs', 'Visual content and display surfaces', 'Playback, cueing and technical interfaces'] },
      productionControl: { id: 'production-control', index: '05 · Production control', title: 'Keep information and authority legible.', body: ['Run sheets, cue information, escalation paths and communication roles help the live team understand what happens next and who decides when conditions change.'], aside: 'A production-control plan is scoped to the event and does not imply ownership of equipment, venue authority or a predetermined technical solution.' },
      guestExperience: { id: 'guest-experience', index: '06 · Guest experience', title: 'Design the experience beyond the stage.', body: [], ariaLabel: 'Guest experience progression', flow: [{ title: 'Arrive', copy: 'Clarify approach, welcome and orientation.' }, { title: 'Participate', copy: 'Support attention, movement and interaction.' }, { title: 'Depart', copy: 'Plan the final message and onward journey.' }] },
      execution: { id: 'execution', index: '07 · Execution', title: 'Move from plan to live decisions.', body: ['Execution thinking brings rehearsals, checks, handovers and live coordination into one sequence. The exact operating model depends on the approved scope, venue requirements and appointed delivery teams.'] },
    },
    media: { key: 'eventKeynote', runtimePath: '/media/fnb/capabilities/event-keynote-stage.png', sectionKey: 'staging', mediaPosition: 'end', mediaAspect: 'landscape', rhythm: 'early', disclosure: conceptualDisclosure },
    related: { id: 'related-services', label: 'Related services', linkLabel: 'Explore', title: 'Connect the live show to its environment and technical system.', items: [{ number: '04', name: 'Technical Production', href: '/services/technical-production' }, { number: '03', name: 'Branding & Advertising', href: '/services/branding-advertising' }] },
    cta: { id: 'project-enquiry', eyebrow: 'Event enquiry', title: 'Start with the date, audience and run of show.', copy: 'Share the event format, location, timing, expected guest context and required disciplines so the production conversation can begin with the real constraints.', label: 'Start an event enquiry', href: commonCtaHref },
    composition: [{ primitive: 'hero' }, { primitive: 'editorial', sectionKey: 'planning' }, { primitive: 'editorial', sectionKey: 'showDirection' }, { primitive: 'media-feature', sectionKey: 'staging', mediaPosition: 'end', mediaAspect: 'landscape', rhythm: 'early' }, { primitive: 'scope-list', sectionKey: 'liveSystems' }, { primitive: 'editorial', sectionKey: 'productionControl' }, { primitive: 'flow', sectionKey: 'guestExperience' }, { primitive: 'editorial', sectionKey: 'execution' }, { primitive: 'related-services' }, { primitive: 'cta' }],
  },
  '/services/branding-advertising': {
    route: '/services/branding-advertising', publicationStatus: 'approved-copy', truthBasis: { status: 'owner-verified-capability-scope', qualification: 'Owner-authorized branding capability language only; market position, channel performance, delivered campaigns and commercial results are not asserted.' },
    metadata: { title: 'Branding & Advertising | FNB Events', description: 'Brand strategy, visual systems, campaign thinking, spatial and event branding, advertising, content surfaces and physical-digital consistency.' },
    hero: { eyebrow: 'Service 03 · Brand systems', title: 'Branding & Advertising', lead: 'A brand system should remain recognisable when it moves from a strategic idea into a campaign, a screen, a sign, a stage or a physical environment.' },
    sections: {
      brandStrategy: { id: 'brand-strategy', index: '01 · Brand strategy', title: 'Decide what the brand must make clear.', body: ['Brand strategy establishes the organising idea: audience, purpose, proposition, tone and the priorities that should remain visible across every later expression.'], aside: 'Strategic direction is shaped around an approved brief; no market position or business result is asserted in advance.' },
      visualSystems: { id: 'visual-systems', index: '02 · Visual systems', title: 'Build rules that can survive different surfaces.', body: [], ariaLabel: 'Visual system components', items: ['Identity hierarchy', 'Typography and colour behaviour', 'Image and graphic language', 'Layout and composition', 'Motion principles', 'Application guidance'] },
      campaignThinking: { id: 'campaign-thinking', index: '03 · Campaign thinking', title: 'Turn one proposition into a connected sequence.', body: ['Campaign thinking defines the central message, the supporting ideas and how communication can unfold across moments rather than becoming a collection of disconnected outputs.'], ariaLabel: 'Campaign decision flow', flow: [{ title: 'Position', copy: 'Identify the communication problem and intended audience.' }, { title: 'Organise', copy: 'Build the message hierarchy and content architecture.' }, { title: 'Adapt', copy: 'Translate the idea for each approved format and context.' }] },
      spatialBranding: { id: 'spatial-branding', index: '04 · Spatial branding', title: 'Let identity operate at architectural scale.', body: ['Scale, movement, material, light and wayfinding change how a visual system behaves. Spatial branding considers those conditions without turning the environment into a repeated logo surface.'] },
      eventBranding: { id: 'event-branding', index: '05 · Event branding', title: 'Create one visual language for a temporary world.', body: ['Event branding aligns arrival, stage, signage, presentation, environmental graphics and supporting communication around one clear experience.'] },
      advertising: { id: 'advertising', index: '06 · Advertising', title: 'Make the message earn attention.', body: ['Advertising development begins with the approved objective, audience and channel context. Concepts and executions are evaluated for clarity, relevance and continuity with the wider brand system.'] },
      contentSurfaces: { id: 'content-surfaces', index: '07 · Content surfaces', title: 'Plan for where the story actually appears.', body: [], ariaLabel: 'Potential content surfaces', items: ['Campaign and editorial layouts', 'Environmental graphics and wayfinding', 'Presentation and display content', 'Responsive digital applications'] },
      consistency: { id: 'physical-digital-consistency', index: '08 · Physical / digital consistency', title: 'Keep the system recognisable without making every format identical.', body: ['Consistency comes from shared principles, not mechanical repetition. The same hierarchy and voice can adapt to distance, duration, interaction and material while preserving the brand’s intent.'] },
    },
    media: { key: 'brandingLobby', runtimePath: '/media/fnb/capabilities/branding-lobby.png', sectionKey: 'spatialBranding', mediaPosition: 'start', mediaAspect: 'landscape', rhythm: 'middle', disclosure: conceptualDisclosure },
    cta: { id: 'project-enquiry', eyebrow: 'Brand enquiry', title: 'Bring the audience, message and surfaces into one brief.', copy: 'Share the communication problem, intended audience, existing brand inputs and required physical or digital applications for a grounded first conversation.', label: 'Start a brand enquiry', href: commonCtaHref },
    composition: [{ primitive: 'hero' }, { primitive: 'editorial', sectionKey: 'brandStrategy' }, { primitive: 'scope-list', sectionKey: 'visualSystems' }, { primitive: 'editorial', sectionKey: 'campaignThinking' }, { primitive: 'media-feature', sectionKey: 'spatialBranding', mediaPosition: 'start', mediaAspect: 'landscape', rhythm: 'middle' }, { primitive: 'editorial', sectionKey: 'eventBranding' }, { primitive: 'editorial', sectionKey: 'advertising' }, { primitive: 'scope-list', sectionKey: 'contentSurfaces' }, { primitive: 'editorial', sectionKey: 'consistency' }, { primitive: 'cta' }],
  },
  '/services/technical-production': {
    route: '/services/technical-production', publicationStatus: 'approved-copy', truthBasis: { status: 'owner-verified-capability-scope', qualification: 'Owner-authorized technical capability language only; equipment ownership, system quantities and implementation proof are excluded, and qualified venue or authority review remains required.' },
    metadata: { title: 'Technical Production | FNB Events', description: 'Technical production planning across AV signal paths, lighting, audio, LED and display, control systems, show integration and on-site execution.' },
    hero: { eyebrow: 'Service 04 · Technical systems', title: 'Technical Production', lead: 'Technical production connects the show’s intent to signal, power, light, sound, display, control and the people responsible for operating each system.' },
    sections: {
      planning: { id: 'technical-planning', index: '01 · Technical planning', title: 'Resolve requirements before selecting a system.', body: ['The planning conversation begins with content, audience, room, programme and operational needs. Constraints and interfaces are documented before a technical approach is confirmed.', 'No equipment inventory, brand of hardware, quantity, coverage figure or performance metric is claimed on this capability page.'], aside: 'Technical design, structural loads, electrical distribution, rigging and life-safety matters require qualified review plus venue and relevant authority approval where applicable.' },
      signals: { id: 'signal-paths', index: '02 · AV signal paths', title: 'Make every source, destination and fallback legible.', body: ['AV planning maps sources, routing, processing, playback, display and monitoring as a coordinated path. Redundancy and fallback needs are determined by the approved brief and risk context.'] },
      lighting: { id: 'lighting', index: '03 · Lighting', title: 'Light for people, cameras, content and atmosphere.', body: [], ariaLabel: 'Lighting planning considerations', items: ['Audience and speaker visibility', 'Camera and presentation requirements', 'Architectural and scenic integration', 'Cue states, control and safe access'] },
      audio: { id: 'audio', index: '04 · Audio', title: 'Design around intelligibility and programme needs.', body: ['Audio planning considers spoken word, programme material, audience geometry, monitoring and operator requirements. System specification remains dependent on measured venue conditions and qualified technical design.'] },
      display: { id: 'led-display', index: '05 · LED / display', title: 'Match the display surface to the content and room.', body: ['Viewing distance, ambient light, camera use, content format, mounting and signal distribution influence display decisions. Final systems remain subject to engineering, venue and authority requirements where applicable.'] },
      controls: { id: 'control-systems', index: '06 · Control systems', title: 'Give operators one coherent picture of the show.', body: [], ariaLabel: 'Control-system decision flow', flow: [{ title: 'Observe', copy: 'Define sources, destinations and monitoring needs.' }, { title: 'Coordinate', copy: 'Align cue ownership, communications and interfaces.' }, { title: 'Respond', copy: 'Document fallback decisions and escalation paths.' }] },
      integration: { id: 'show-integration', index: '07 · Show integration', title: 'Treat technical disciplines as one live system.', body: ['Integration reviews the timing and interfaces between stage action, lighting, audio, video, playback and communications so the live team can work from a shared sequence.'] },
      execution: { id: 'on-site-execution', index: '08 · On-site execution', title: 'Commission, rehearse and hand over deliberately.', body: ['Execution thinking includes access, installation order, inspection points, testing, rehearsal, operator information and strike constraints. Each requirement is confirmed for the actual event context.'], aside: 'On-site work remains subject to the approved scope, appointed qualified specialists, venue rules and relevant permits or authority sign-off.' },
    },
    media: { key: 'technicalControl', runtimePath: '/media/fnb/capabilities/technical-control.png', sectionKey: 'signals', mediaPosition: 'end', mediaAspect: 'landscape', rhythm: 'early', disclosure: conceptualDisclosure, boundary: 'The conceptual control-room image is not project evidence and does not represent an owned FNB equipment inventory.' },
    cta: { id: 'project-enquiry', eyebrow: 'Technical enquiry', title: 'Start with the room, programme and technical dependencies.', copy: 'Share the venue context, event format, content needs, audience conditions and known interfaces. A technical approach can only follow review of those constraints.', label: 'Start a technical enquiry', href: commonCtaHref },
    composition: [{ primitive: 'hero' }, { primitive: 'editorial', sectionKey: 'planning' }, { primitive: 'media-feature', sectionKey: 'signals', mediaPosition: 'end', mediaAspect: 'landscape', rhythm: 'early' }, { primitive: 'scope-list', sectionKey: 'lighting' }, { primitive: 'editorial', sectionKey: 'audio' }, { primitive: 'editorial', sectionKey: 'display' }, { primitive: 'flow', sectionKey: 'controls' }, { primitive: 'editorial', sectionKey: 'integration' }, { primitive: 'editorial', sectionKey: 'execution' }, { primitive: 'cta' }],
  },
  '/services/websites-digital-experiences': {
    route: '/services/websites-digital-experiences', publicationStatus: 'approved-copy', truthBasis: { status: 'owner-verified-capability-scope', qualification: 'Owner-authorized digital strategy and design capability only; conceptual interfaces are not delivered products, integrations, deployments or outcome evidence.' },
    metadata: { title: 'Websites & Digital Experiences | FNB Events', description: 'Digital strategy, UX, UI, responsive web experience, interactive storytelling, conversion thinking and brand consistency as an advisory capability.' },
    hero: { eyebrow: 'Service 05 · Digital experiences', title: 'Websites & Digital Experiences', lead: 'Digital experience design connects user intent, content, interface behaviour and brand expression—before a screen is treated as a collection of components.', anchorLabel: 'Follow the experience logic', anchorHref: '#digital-strategy' },
    sections: {
      strategy: { id: 'digital-strategy', index: '01 · Digital strategy', title: 'Define the role of the experience.', body: ['Strategy identifies the audience, priority actions, content responsibilities and relationship between the digital experience and the wider brand or event journey.'], aside: 'This page describes strategy and design capability. It does not claim a deployed product, integration or outcome for an unverified project.' },
      ux: { id: 'ux', index: '02 · UX', title: 'Organise the path around user intent.', body: [], ariaLabel: 'User-experience decision flow', flow: [{ title: 'Understand', copy: 'Clarify users, contexts and priority tasks.' }, { title: 'Structure', copy: 'Arrange information, journeys and decision points.' }, { title: 'Test', copy: 'Review whether the proposed flow communicates clearly.' }] },
      ui: { id: 'ui', index: '03 · UI', title: 'Make hierarchy visible in every state.', body: ['Interface design translates structure into typography, spacing, controls, feedback and responsive behaviour. Accessibility and native interaction semantics remain part of the design decision, not a later visual correction.'] },
      web: { id: 'web-experience', index: '04 · Web experience', title: 'Connect content, interaction and system behaviour.', body: ['A web experience is considered across page architecture, component behaviour, content states, performance needs and the technical context approved for the project.'] },
      storytelling: { id: 'interactive-storytelling', index: '05 · Interactive storytelling', title: 'Use interaction to reveal meaning.', body: ['Motion and progressive disclosure can clarify sequence, comparison or transformation. They remain restrained, keyboard-compatible and respectful of reduced-motion preferences.'] },
      responsive: { id: 'responsive-systems', index: '06 · Responsive systems', title: 'Design continuity across changing space and input.', body: [], ariaLabel: 'Responsive system considerations', items: ['Content priority and reflow', 'Touch, pointer and keyboard input', 'Readable type and target sizing', 'Media loading and performance budgets'] },
      conversion: { id: 'conversion-thinking', index: '07 · Conversion thinking', title: 'Make the next useful action clear.', body: ['Conversion thinking examines decision context, friction, reassurance and the information a user needs before acting. It does not promise a commercial result or substitute invented metrics for evaluation.'] },
      consistency: { id: 'brand-consistency', index: '08 · Brand consistency', title: 'Carry the same intent without freezing the medium.', body: ['Digital behaviour, language, image, motion and typography can express the brand while adapting to accessibility, device and performance constraints.'] },
    },
    media: { key: 'digitalDashboard', runtimePath: '/media/fnb/capabilities/digital-dashboard.png', sectionKey: 'web', mediaPosition: 'end', mediaAspect: 'portrait', rhythm: 'middle', disclosure: conceptualDisclosure, boundary: 'This conceptual interface is not a delivered client product, live dashboard or evidence of deployment.' },
    cta: { id: 'project-enquiry', eyebrow: 'Digital enquiry', title: 'Start with the user, the content and the decision.', copy: 'Share the audience, essential journeys, available content, brand inputs and known technical constraints. Delivery scope remains subject to discovery and approval.', label: 'Start a digital enquiry', href: commonCtaHref },
    composition: [{ primitive: 'hero' }, { primitive: 'editorial', sectionKey: 'strategy' }, { primitive: 'flow', sectionKey: 'ux' }, { primitive: 'editorial', sectionKey: 'ui' }, { primitive: 'media-feature', sectionKey: 'web', mediaPosition: 'end', mediaAspect: 'portrait', rhythm: 'middle' }, { primitive: 'editorial', sectionKey: 'storytelling' }, { primitive: 'scope-list', sectionKey: 'responsive' }, { primitive: 'editorial', sectionKey: 'conversion' }, { primitive: 'editorial', sectionKey: 'consistency' }, { primitive: 'cta' }],
  },
  '/services/automation-systems': {
    route: '/services/automation-systems', publicationStatus: 'approved-copy', truthBasis: { status: 'owner-verified-capability-scope', qualification: 'Owner-authorized workflow discovery and system-design capability only; no deployed automation product, named integration, efficiency result or implementation proof is asserted.' },
    metadata: { title: 'Automation Systems | FNB Events', description: 'Workflow discovery, process mapping, system-integration advisory, lead and customer flows, operational automation, data movement and human controls.' },
    hero: { eyebrow: 'Service 06 · Operational systems', title: 'Automation Systems', lead: 'Automation starts by understanding the work: what triggers it, where information moves, which decisions need people and where repetition creates avoidable friction.' },
    sections: {
      discovery: { id: 'workflow-discovery', index: '01 · Workflow discovery', title: 'Observe the real workflow before proposing a system.', body: ['Discovery documents actors, inputs, decisions, exceptions and destinations. The aim is to expose the actual operating pattern rather than automate an assumed one.'], aside: 'This is a discovery and system-design capability. It is not a deployed product, named integration or implementation claim.' },
      mapping: { id: 'process-mapping', index: '02 · Process mapping', title: 'Make dependencies and exceptions visible.', body: ['Process mapping separates standard paths from decisions, handoffs and edge cases. It gives stakeholders a shared artifact to review before automation logic is approved.'], ariaLabel: 'Process-mapping flow', flow: [{ title: 'Trigger', copy: 'Identify what starts the workflow and with which data.' }, { title: 'Decide', copy: 'Expose rules, approvals, exceptions and ownership.' }, { title: 'Complete', copy: 'Define the intended destination and visible status.' }] },
      integration: { id: 'system-integration', index: '03 · System integration', title: 'Design the connection around ownership and control.', body: ['Integration advisory examines data boundaries, access, validation, failure states and the responsibility of each connected system. Implementation remains subject to approved platforms, access and technical validation.'] },
      customer: { id: 'lead-customer-flows', index: '04 · Lead / customer flows', title: 'Keep context intact across the handoff.', body: ['Lead and customer flows can be mapped from capture through qualification, response, follow-up and status visibility. Exact fields, systems and communications are determined only from verified requirements.'] },
      operational: { id: 'operational-automation', index: '05 · Operational automation', title: 'Automate the repeatable; expose the uncertain.', body: [], ariaLabel: 'Operational automation review areas', items: ['Repeatable triggers and actions', 'Approvals and exception routing', 'Status, notification and recovery', 'Audit information and accountable ownership'] },
      data: { id: 'data-movement', index: '06 · Data movement', title: 'Move only what the workflow needs.', body: ['Data-movement design identifies the source of truth, required fields, validation, timing and what happens when a transfer is incomplete or rejected.'], aside: 'Data access, privacy, retention, security and system permissions require review against the approved environment and applicable obligations.' },
      controls: { id: 'human-controls', index: '07 · Human controls', title: 'Keep judgement, override and accountability available.', body: ['Human controls define where review is required, who can intervene, what information supports the decision and how the system communicates its state.'] },
    },
    media: { key: 'automationAnalytics', runtimePath: '/media/fnb/capabilities/automation-analytics.png', sectionKey: 'integration', mediaPosition: 'start', mediaAspect: 'portrait', rhythm: 'early', disclosure: conceptualDisclosure, boundary: 'The interface shown is conceptual capability imagery, not a deployed analytics product or verified operational result.' },
    cta: { id: 'project-enquiry', eyebrow: 'Systems enquiry', title: 'Start with the workflow your team can describe.', copy: 'Share the current trigger, actors, handoffs, known systems and exception cases. Any implementation scope follows discovery, access review and technical approval.', label: 'Start a systems enquiry', href: commonCtaHref },
    composition: [{ primitive: 'hero' }, { primitive: 'split', sectionKey: 'discovery' }, { primitive: 'editorial', sectionKey: 'mapping' }, { primitive: 'media-feature', sectionKey: 'integration', mediaPosition: 'start', mediaAspect: 'portrait', rhythm: 'early' }, { primitive: 'editorial', sectionKey: 'customer' }, { primitive: 'scope-list', sectionKey: 'operational' }, { primitive: 'editorial', sectionKey: 'data' }, { primitive: 'editorial', sectionKey: 'controls' }, { primitive: 'cta' }],
  },
  '/services/ai-workflow-solutions': {
    route: '/services/ai-workflow-solutions', publicationStatus: 'approved-copy', truthBasis: { status: 'owner-verified-capability-scope', qualification: 'Owner-authorized AI workflow advisory language only; no proprietary model, deployed AI product, accuracy level, implementation proof or outcome promise is asserted.' },
    metadata: { title: 'AI Workflow Solutions | FNB Events', description: 'AI workflow strategy, agent-orchestration advisory, knowledge systems, human review, governance, workflow intelligence and business integration.' },
    hero: { eyebrow: 'Service 07 · AI-assisted workflows', title: 'AI Workflow Solutions', lead: 'AI becomes useful inside a workflow when its task, context, limits, review points and relationship to accountable human decisions are explicit.' },
    sections: {
      strategy: { id: 'ai-workflow-strategy', index: '01 · AI workflow strategy', title: 'Choose the task before choosing the model.', body: ['Strategy identifies a bounded workflow problem, the information available, the acceptable level of uncertainty and the decision that remains accountable to a person.'], aside: 'This page describes advisory and workflow-design capability. It makes no proprietary model claim, deployed product claim or unsupported outcome promise.' },
      orchestration: { id: 'agent-orchestration', index: '02 · Agent orchestration', title: 'Define roles, handoffs and stopping conditions.', body: ['Agent-orchestration advisory maps which task is assigned, what context is provided, when tools may be used, how outputs are checked and when the workflow must stop for human review.'] },
      knowledge: { id: 'knowledge-systems', index: '03 · Knowledge systems', title: 'Make source, freshness and access visible.', body: [], ariaLabel: 'Knowledge-system review areas', items: ['Approved source boundaries', 'Access and permission context', 'Version and freshness signals', 'Citation, traceability and uncertainty'] },
      review: { id: 'human-review', index: '04 · Human review', title: 'Place judgement where consequence lives.', body: ['Human review is designed into the workflow with the context needed to accept, revise, reject or escalate an output. Review is not treated as a decorative confirmation step.'], ariaLabel: 'Human-review decision flow', flow: [{ title: 'Inspect', copy: 'Present the source, output and relevant uncertainty.' }, { title: 'Decide', copy: 'Give an accountable person explicit options.' }, { title: 'Record', copy: 'Retain the approved state and escalation context.' }] },
      governance: { id: 'governance', index: '05 · Governance', title: 'Define what the workflow may and may not do.', body: ['Governance frames data boundaries, tool permissions, review thresholds, escalation, traceability and change control for the proposed workflow.'], aside: 'Security, privacy, legal, regulatory and model-risk requirements depend on the approved use case and qualified review.' },
      intelligence: { id: 'workflow-intelligence', index: '06 · Workflow intelligence', title: 'Use signals to support a decision, not conceal it.', body: ['Classification, summarisation, retrieval or drafting may support a bounded workflow after evaluation. No accuracy level, productivity figure or operational result is asserted without verified evidence.'] },
      integration: { id: 'business-integration', index: '07 · Business integration', title: 'Fit the capability to the operating environment.', body: ['Business integration considers existing roles, systems, permissions, exception handling and adoption needs. Any implementation remains subject to discovery, approved technology, testing and governance.'] },
    },
    media: { key: 'aiPavilion', runtimePath: '/media/fnb/capabilities/ai-pavilion.png', sectionKey: 'orchestration', mediaPosition: 'end', mediaAspect: 'landscape', rhythm: 'early', disclosure: conceptualDisclosure, boundary: 'The pavilion visualization is conceptual capability imagery—not a deployed AI product, interface or client implementation.' },
    cta: { id: 'project-enquiry', eyebrow: 'AI workflow enquiry', title: 'Start with one bounded task and its human owner.', copy: 'Share the current workflow, source information, decision owner, risk context and expected review point. A proposed system follows discovery and evaluation.', label: 'Start an AI workflow enquiry', href: commonCtaHref },
    composition: [{ primitive: 'hero' }, { primitive: 'editorial', sectionKey: 'strategy' }, { primitive: 'media-feature', sectionKey: 'orchestration', mediaPosition: 'end', mediaAspect: 'landscape', rhythm: 'early' }, { primitive: 'scope-list', sectionKey: 'knowledge' }, { primitive: 'editorial', sectionKey: 'review' }, { primitive: 'editorial', sectionKey: 'governance' }, { primitive: 'editorial', sectionKey: 'intelligence' }, { primitive: 'editorial', sectionKey: 'integration' }, { primitive: 'cta' }],
  },
  '/services/interiors-commercial-spaces': {
    route: '/services/interiors-commercial-spaces', publicationStatus: 'approved-copy', truthBasis: { status: 'owner-verified-capability-scope', qualification: 'Owner-authorized interiors capability language only; site conditions, regulated work, engineering, landlord requirements and authority approvals remain project-specific.' },
    metadata: { title: 'Interiors & Commercial Spaces | FNB Events', description: 'Spatial strategy, functional planning, material language, brand integration, commercial environments, design development and execution thinking.' },
    hero: { eyebrow: 'Service 08 · Enduring environments', title: 'Interiors & Commercial Spaces', lead: 'A commercial interior has to organise people, activity, operations and brand expression within a real building—not simply create a view.' },
    sections: {
      strategy: { id: 'spatial-strategy', index: '01 · Spatial strategy', title: 'Begin with use, movement and commercial purpose.', body: [], ariaLabel: 'Spatial-strategy decision flow', flow: [{ title: 'Observe', copy: 'Clarify users, activities and operational constraints.' }, { title: 'Organise', copy: 'Set adjacencies, hierarchy and movement principles.' }, { title: 'Express', copy: 'Connect the spatial idea to brand and atmosphere.' }] },
      planning: { id: 'functional-planning', index: '02 · Functional planning', title: 'Give every zone a role and a relationship.', body: ['Functional planning considers arrival, circulation, work, service, support, storage, accessibility and the interfaces between public and operational areas.'], aside: 'Measured surveys, landlord requirements, building conditions, codes and authority approvals must be verified for the actual site.' },
      materials: { id: 'material-language', index: '03 · Material language', title: 'Use material to carry function, atmosphere and identity.', body: ['Material thinking considers touch, reflectance, durability, maintenance, junctions and how light changes the surface. Selection remains tied to the approved use and site conditions.'] },
      brand: { id: 'brand-integration', index: '04 · Brand integration', title: 'Make the brand part of the environment’s logic.', body: ['Identity can appear through proportion, colour, material, signage, content and service moments. The aim is a recognisable environment, not an interior covered in marks.'] },
      commercial: { id: 'commercial-environments', index: '05 · Commercial environments', title: 'Coordinate the customer-facing and operational space.', body: [], ariaLabel: 'Commercial environment considerations', items: ['Arrival and orientation', 'Customer and team movement', 'Display, service and communication', 'Back-of-house and operational support'] },
      development: { id: 'design-development', index: '06 · Design development', title: 'Resolve the concept into coordinated information.', body: ['Plans, elevations, details, finishes, lighting, graphics and consultant interfaces develop together through review. Qualified engineering and specialist design remain subject to appointment and approval.'] },
      execution: { id: 'execution-thinking', index: '07 · Execution thinking', title: 'Plan how the environment will be approved, built and handed over.', body: ['Execution thinking considers packages, interfaces, samples, mock-ups, procurement dependencies, site sequence, inspection and handover without claiming a predetermined construction scope.'], aside: 'Construction, MEP, structure, fire and life-safety, accessibility and other regulated work remain subject to qualified professionals, landlord or venue constraints and relevant authority approval.' },
    },
    media: { key: 'interiorsLobby', runtimePath: '/media/fnb/capabilities/interiors-lobby.png', sectionKey: 'materials', mediaPosition: 'start', mediaAspect: 'landscape', rhythm: 'early', disclosure: conceptualDisclosure, boundary: 'This approved conceptual interior is not project evidence. Final materials and assemblies require specification, samples and qualified technical review.' },
    cta: { id: 'project-enquiry', eyebrow: 'Interiors enquiry', title: 'Start with the site, the users and the operating need.', copy: 'Share available drawings, location, intended use, brand inputs, programme and known building constraints. Scope follows verification of the actual site and approvals path.', label: 'Start an interiors enquiry', href: commonCtaHref },
    composition: [{ primitive: 'hero' }, { primitive: 'flow', sectionKey: 'strategy' }, { primitive: 'editorial', sectionKey: 'planning' }, { primitive: 'media-feature', sectionKey: 'materials', mediaPosition: 'start', mediaAspect: 'landscape', rhythm: 'early' }, { primitive: 'editorial', sectionKey: 'brand' }, { primitive: 'scope-list', sectionKey: 'commercial' }, { primitive: 'editorial', sectionKey: 'development' }, { primitive: 'editorial', sectionKey: 'execution' }, { primitive: 'cta' }],
  },
} as const satisfies Record<Task4ServiceRoute, Task4ServiceContent>

export function assertApprovedTask4ServiceContent(content: Task4ServiceContent): asserts content is ApprovedTask4ServiceContent {
  if (content.publicationStatus !== 'approved-copy' || content.truthBasis.status !== 'owner-verified-capability-scope') {
    throw new Error(`Task 4 service content for ${content.route} is not approved for publication`)
  }
}

export function getTask4ServiceContent(route: Task4ServiceRoute): ApprovedTask4ServiceContent {
  const content = TASK4_SERVICE_CONTENT[route] as Task4ServiceContent | undefined
  if (!content) throw new Error(`Unknown Task 4 service route: ${route}`)
  assertApprovedTask4ServiceContent(content)
  return content
}
