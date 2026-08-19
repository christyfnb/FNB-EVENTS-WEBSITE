import type { Metadata } from 'next'
import { EditorialHero } from '@/components/fnb/editorial/editorial-hero'
import { EditorialSection } from '@/components/fnb/editorial/editorial-section'
import { ProjectEnquiryCta } from '@/components/fnb/editorial/project-enquiry-cta'
import { ServiceDecisionFlow, ServiceMediaFeature, ServiceScopeList } from '@/components/fnb/services/service-primitives'
import { FNB_MEDIA } from '@/lib/media-registry'

export const metadata: Metadata = {
  title: 'Interiors & Commercial Spaces | FNB Events',
  description: 'Spatial strategy, functional planning, material language, brand integration, commercial environments, design development and execution thinking.',
}

export default function InteriorsCommercialSpacesPage() {
  return (
    <main id="main">
      <EditorialHero eyebrow="Service 08 · Enduring environments" title="Interiors & Commercial Spaces" lead="A commercial interior has to organise people, activity, operations and brand expression within a real building—not simply create a view." />

      <section id="spatial-strategy" aria-labelledby="spatial-strategy-heading" className="border-t border-steel/40 bg-obsidian">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] lg:gap-16"><div><p className="fnb-label text-signal">01 · Spatial strategy</p><h2 id="spatial-strategy-heading" className="fnb-head mt-5 max-w-[13ch] text-3xl text-warm-white md:text-5xl">Begin with use, movement and commercial purpose.</h2></div><ServiceDecisionFlow label="Spatial-strategy decision flow" steps={[{ title: 'Observe', copy: 'Clarify users, activities and operational constraints.' }, { title: 'Organise', copy: 'Set adjacencies, hierarchy and movement principles.' }, { title: 'Express', copy: 'Connect the spatial idea to brand and atmosphere.' }]} /></div>
      </section>

      <EditorialSection id="functional-planning" index="02 · Functional planning" title="Give every zone a role and a relationship." className="bg-void" aside="Measured surveys, landlord requirements, building conditions, codes and authority approvals must be verified for the actual site.">
        <p>Functional planning considers arrival, circulation, work, service, support, storage, accessibility and the interfaces between public and operational areas.</p>
      </EditorialSection>

      <ServiceMediaFeature id="material-language" index="03 · Material language" title="Use material to carry function, atmosphere and identity." asset={FNB_MEDIA.interiorsLobby} mediaPosition="start" boundary="This approved conceptual interior is not project evidence. Final materials and assemblies require specification, samples and qualified technical review.">
        <p>Material thinking considers touch, reflectance, durability, maintenance, junctions and how light changes the surface. Selection remains tied to the approved use and site conditions.</p>
      </ServiceMediaFeature>

      <EditorialSection id="brand-integration" index="04 · Brand integration" title="Make the brand part of the environment’s logic."><p>Identity can appear through proportion, colour, material, signage, content and service moments. The aim is a recognisable environment, not an interior covered in marks.</p></EditorialSection>

      <section id="commercial-environments" aria-labelledby="commercial-environments-heading" className="border-t border-steel/40 bg-void">
        <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24"><p className="fnb-label text-signal">05 · Commercial environments</p><h2 id="commercial-environments-heading" className="fnb-head mt-5 max-w-[16ch] text-3xl text-warm-white md:text-5xl">Coordinate the customer-facing and operational space.</h2><div className="mt-10"><ServiceScopeList ariaLabel="Commercial environment considerations" items={['Arrival and orientation', 'Customer and team movement', 'Display, service and communication', 'Back-of-house and operational support']} /></div></div>
      </section>

      <EditorialSection id="design-development" index="06 · Design development" title="Resolve the concept into coordinated information."><p>Plans, elevations, details, finishes, lighting, graphics and consultant interfaces develop together through review. Qualified engineering and specialist design remain subject to appointment and approval.</p></EditorialSection>
      <EditorialSection id="execution-thinking" index="07 · Execution thinking" title="Plan how the environment will be approved, built and handed over." className="bg-void" aside="Construction, MEP, structure, fire and life-safety, accessibility and other regulated work remain subject to qualified professionals, landlord or venue constraints and relevant authority approval."><p>Execution thinking considers packages, interfaces, samples, mock-ups, procurement dependencies, site sequence, inspection and handover without claiming a predetermined construction scope.</p></EditorialSection>
      <ProjectEnquiryCta id="project-enquiry" eyebrow="Interiors enquiry" title="Start with the site, the users and the operating need." copy="Share available drawings, location, intended use, brand inputs, programme and known building constraints. Scope follows verification of the actual site and approvals path." />
    </main>
  )
}
