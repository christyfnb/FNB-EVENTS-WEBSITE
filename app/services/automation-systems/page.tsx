import type { Metadata } from 'next'
import { EditorialHero } from '@/components/fnb/editorial/editorial-hero'
import { EditorialSection } from '@/components/fnb/editorial/editorial-section'
import { ProjectEnquiryCta } from '@/components/fnb/editorial/project-enquiry-cta'
import { ServiceDecisionFlow, ServiceMediaFeature, ServiceScopeList } from '@/components/fnb/services/service-primitives'
import { FNB_MEDIA } from '@/lib/media-registry'

export const metadata: Metadata = {
  title: 'Automation Systems | FNB Events',
  description: 'Workflow discovery, process mapping, system-integration advisory, lead and customer flows, operational automation, data movement and human controls.',
}

export default function AutomationSystemsPage() {
  return (
    <main id="main">
      <EditorialHero eyebrow="Service 06 · Operational systems" title="Automation Systems" lead="Automation starts by understanding the work: what triggers it, where information moves, which decisions need people and where repetition creates avoidable friction." />

      <section id="workflow-discovery" aria-labelledby="workflow-discovery-heading" className="border-t border-steel/40 bg-obsidian">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)] lg:gap-16">
          <div><p className="fnb-label text-signal">01 · Workflow discovery</p><h2 id="workflow-discovery-heading" className="fnb-head mt-5 max-w-[13ch] text-3xl text-warm-white md:text-5xl">Observe the real workflow before proposing a system.</h2></div>
          <div className="space-y-5 text-lg leading-relaxed text-mist"><p>Discovery documents actors, inputs, decisions, exceptions and destinations. The aim is to expose the actual operating pattern rather than automate an assumed one.</p><p className="border-l border-signal/60 pl-5 text-sm text-ash">This is a discovery and system-design capability. It is not a deployed product, named integration or implementation claim.</p></div>
        </div>
      </section>

      <EditorialSection id="process-mapping" index="02 · Process mapping" title="Make dependencies and exceptions visible." className="bg-void">
        <p>Process mapping separates standard paths from decisions, handoffs and edge cases. It gives stakeholders a shared artifact to review before automation logic is approved.</p>
        <ServiceDecisionFlow label="Process-mapping flow" steps={[{ title: 'Trigger', copy: 'Identify what starts the workflow and with which data.' }, { title: 'Decide', copy: 'Expose rules, approvals, exceptions and ownership.' }, { title: 'Complete', copy: 'Define the intended destination and visible status.' }]} />
      </EditorialSection>

      <ServiceMediaFeature id="system-integration" index="03 · System integration" title="Design the connection around ownership and control." asset={FNB_MEDIA.automationAnalytics} mediaPosition="start" portrait boundary="The interface shown is conceptual capability imagery, not a deployed analytics product or verified operational result.">
        <p>Integration advisory examines data boundaries, access, validation, failure states and the responsibility of each connected system. Implementation remains subject to approved platforms, access and technical validation.</p>
      </ServiceMediaFeature>

      <EditorialSection id="lead-customer-flows" index="04 · Lead / customer flows" title="Keep context intact across the handoff.">
        <p>Lead and customer flows can be mapped from capture through qualification, response, follow-up and status visibility. Exact fields, systems and communications are determined only from verified requirements.</p>
      </EditorialSection>

      <section id="operational-automation" aria-labelledby="operational-automation-heading" className="border-t border-steel/40 bg-void">
        <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24"><p className="fnb-label text-signal">05 · Operational automation</p><h2 id="operational-automation-heading" className="fnb-head mt-5 max-w-[15ch] text-3xl text-warm-white md:text-5xl">Automate the repeatable; expose the uncertain.</h2><div className="mt-10"><ServiceScopeList ariaLabel="Operational automation review areas" items={['Repeatable triggers and actions', 'Approvals and exception routing', 'Status, notification and recovery', 'Audit information and accountable ownership']} /></div></div>
      </section>

      <EditorialSection id="data-movement" index="06 · Data movement" title="Move only what the workflow needs." aside="Data access, privacy, retention, security and system permissions require review against the approved environment and applicable obligations.">
        <p>Data-movement design identifies the source of truth, required fields, validation, timing and what happens when a transfer is incomplete or rejected.</p>
      </EditorialSection>
      <EditorialSection id="human-controls" index="07 · Human controls" title="Keep judgement, override and accountability available." className="bg-void"><p>Human controls define where review is required, who can intervene, what information supports the decision and how the system communicates its state.</p></EditorialSection>
      <ProjectEnquiryCta id="project-enquiry" eyebrow="Systems enquiry" title="Start with the workflow your team can describe." copy="Share the current trigger, actors, handoffs, known systems and exception cases. Any implementation scope follows discovery, access review and technical approval." />
    </main>
  )
}
