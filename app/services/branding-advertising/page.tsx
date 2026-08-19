import type { Metadata } from 'next'
import { EditorialHero } from '@/components/fnb/editorial/editorial-hero'
import { EditorialSection } from '@/components/fnb/editorial/editorial-section'
import { ProjectEnquiryCta } from '@/components/fnb/editorial/project-enquiry-cta'
import { ServiceDecisionFlow, ServiceMediaFeature, ServiceScopeList } from '@/components/fnb/services/service-primitives'
import { FNB_MEDIA } from '@/lib/media-registry'

export const metadata: Metadata = {
  title: 'Branding & Advertising | FNB Events',
  description: 'Brand strategy, visual systems, campaign thinking, spatial and event branding, advertising, content surfaces and physical-digital consistency.',
}

export default function BrandingAdvertisingPage() {
  return (
    <main id="main">
      <EditorialHero eyebrow="Service 03 · Brand systems" title="Branding & Advertising" lead="A brand system should remain recognisable when it moves from a strategic idea into a campaign, a screen, a sign, a stage or a physical environment." />
      <EditorialSection id="brand-strategy" index="01 · Brand strategy" title="Decide what the brand must make clear." aside="Strategic direction is shaped around an approved brief; no market position or business result is asserted in advance."><p>Brand strategy establishes the organising idea: audience, purpose, proposition, tone and the priorities that should remain visible across every later expression.</p></EditorialSection>

      <section id="visual-systems" aria-labelledby="visual-systems-heading" className="border-t border-steel/40 bg-void">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)] lg:gap-16">
          <div><p className="fnb-label text-signal">02 · Visual systems</p><h2 id="visual-systems-heading" className="fnb-head mt-5 max-w-[13ch] text-3xl text-warm-white md:text-5xl">Build rules that can survive different surfaces.</h2></div>
          <ServiceScopeList columns={3} ariaLabel="Visual system components" items={['Identity hierarchy', 'Typography and colour behaviour', 'Image and graphic language', 'Layout and composition', 'Motion principles', 'Application guidance']} />
        </div>
      </section>

      <EditorialSection id="campaign-thinking" index="03 · Campaign thinking" title="Turn one proposition into a connected sequence.">
        <p>Campaign thinking defines the central message, the supporting ideas and how communication can unfold across moments rather than becoming a collection of disconnected outputs.</p>
        <ServiceDecisionFlow label="Campaign decision flow" steps={[{ title: 'Position', copy: 'Identify the communication problem and intended audience.' }, { title: 'Organise', copy: 'Build the message hierarchy and content architecture.' }, { title: 'Adapt', copy: 'Translate the idea for each approved format and context.' }]} />
      </EditorialSection>

      <ServiceMediaFeature id="spatial-branding" index="04 · Spatial branding" title="Let identity operate at architectural scale." asset={FNB_MEDIA.brandingLobby} mediaPosition="start">
        <p>Scale, movement, material, light and wayfinding change how a visual system behaves. Spatial branding considers those conditions without turning the environment into a repeated logo surface.</p>
      </ServiceMediaFeature>
      <EditorialSection id="event-branding" index="05 · Event branding" title="Create one visual language for a temporary world."><p>Event branding aligns arrival, stage, signage, presentation, environmental graphics and supporting communication around one clear experience.</p></EditorialSection>
      <EditorialSection id="advertising" index="06 · Advertising" title="Make the message earn attention." className="bg-void"><p>Advertising development begins with the approved objective, audience and channel context. Concepts and executions are evaluated for clarity, relevance and continuity with the wider brand system.</p></EditorialSection>

      <section id="content-surfaces" aria-labelledby="content-surfaces-heading" className="border-t border-steel/40 bg-obsidian">
        <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24"><p className="fnb-label text-signal">07 · Content surfaces</p><h2 id="content-surfaces-heading" className="fnb-head mt-5 max-w-[15ch] text-3xl text-warm-white md:text-5xl">Plan for where the story actually appears.</h2><div className="mt-10"><ServiceScopeList ariaLabel="Potential content surfaces" items={['Campaign and editorial layouts', 'Environmental graphics and wayfinding', 'Presentation and display content', 'Responsive digital applications']} /></div></div>
      </section>

      <EditorialSection id="physical-digital-consistency" index="08 · Physical / digital consistency" title="Keep the system recognisable without making every format identical." className="bg-void"><p>Consistency comes from shared principles, not mechanical repetition. The same hierarchy and voice can adapt to distance, duration, interaction and material while preserving the brand’s intent.</p></EditorialSection>
      <ProjectEnquiryCta id="project-enquiry" eyebrow="Brand enquiry" title="Bring the audience, message and surfaces into one brief." copy="Share the communication problem, intended audience, existing brand inputs and required physical or digital applications for a grounded first conversation." />
    </main>
  )
}
