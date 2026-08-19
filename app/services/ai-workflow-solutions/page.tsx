import type { Metadata } from 'next'
import { EditorialHero } from '@/components/fnb/editorial/editorial-hero'
import { EditorialSection } from '@/components/fnb/editorial/editorial-section'
import { ProjectEnquiryCta } from '@/components/fnb/editorial/project-enquiry-cta'
import { ServiceDecisionFlow, ServiceMediaFeature, ServiceScopeList } from '@/components/fnb/services/service-primitives'
import { FNB_MEDIA } from '@/lib/media-registry'

export const metadata: Metadata = {
  title: 'AI Workflow Solutions | FNB Events',
  description: 'AI workflow strategy, agent-orchestration advisory, knowledge systems, human review, governance, workflow intelligence and business integration.',
}

export default function AiWorkflowSolutionsPage() {
  return (
    <main id="main">
      <EditorialHero eyebrow="Service 07 · AI-assisted workflows" title="AI Workflow Solutions" lead="AI becomes useful inside a workflow when its task, context, limits, review points and relationship to accountable human decisions are explicit." />

      <EditorialSection id="ai-workflow-strategy" index="01 · AI workflow strategy" title="Choose the task before choosing the model." aside="This page describes advisory and workflow-design capability. It makes no proprietary model claim, deployed product claim or unsupported outcome promise.">
        <p>Strategy identifies a bounded workflow problem, the information available, the acceptable level of uncertainty and the decision that remains accountable to a person.</p>
      </EditorialSection>

      <ServiceMediaFeature id="agent-orchestration" index="02 · Agent orchestration" title="Define roles, handoffs and stopping conditions." asset={FNB_MEDIA.aiPavilion} boundary="The pavilion visualization is conceptual capability imagery—not a deployed AI product, interface or client implementation.">
        <p>Agent-orchestration advisory maps which task is assigned, what context is provided, when tools may be used, how outputs are checked and when the workflow must stop for human review.</p>
      </ServiceMediaFeature>

      <section id="knowledge-systems" aria-labelledby="knowledge-systems-heading" className="border-t border-steel/40 bg-obsidian">
        <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24"><p className="fnb-label text-signal">03 · Knowledge systems</p><h2 id="knowledge-systems-heading" className="fnb-head mt-5 max-w-[16ch] text-3xl text-warm-white md:text-5xl">Make source, freshness and access visible.</h2><div className="mt-10"><ServiceScopeList ariaLabel="Knowledge-system review areas" items={['Approved source boundaries', 'Access and permission context', 'Version and freshness signals', 'Citation, traceability and uncertainty']} /></div></div>
      </section>

      <EditorialSection id="human-review" index="04 · Human review" title="Place judgement where consequence lives." className="bg-void">
        <p>Human review is designed into the workflow with the context needed to accept, revise, reject or escalate an output. Review is not treated as a decorative confirmation step.</p>
        <ServiceDecisionFlow label="Human-review decision flow" steps={[{ title: 'Inspect', copy: 'Present the source, output and relevant uncertainty.' }, { title: 'Decide', copy: 'Give an accountable person explicit options.' }, { title: 'Record', copy: 'Retain the approved state and escalation context.' }]} />
      </EditorialSection>

      <EditorialSection id="governance" index="05 · Governance" title="Define what the workflow may and may not do." aside="Security, privacy, legal, regulatory and model-risk requirements depend on the approved use case and qualified review."><p>Governance frames data boundaries, tool permissions, review thresholds, escalation, traceability and change control for the proposed workflow.</p></EditorialSection>
      <EditorialSection id="workflow-intelligence" index="06 · Workflow intelligence" title="Use signals to support a decision, not conceal it." className="bg-void"><p>Classification, summarisation, retrieval or drafting may support a bounded workflow after evaluation. No accuracy level, productivity figure or operational result is asserted without verified evidence.</p></EditorialSection>
      <EditorialSection id="business-integration" index="07 · Business integration" title="Fit the capability to the operating environment."><p>Business integration considers existing roles, systems, permissions, exception handling and adoption needs. Any implementation remains subject to discovery, approved technology, testing and governance.</p></EditorialSection>
      <ProjectEnquiryCta id="project-enquiry" eyebrow="AI workflow enquiry" title="Start with one bounded task and its human owner." copy="Share the current workflow, source information, decision owner, risk context and expected review point. A proposed system follows discovery and evaluation." />
    </main>
  )
}
