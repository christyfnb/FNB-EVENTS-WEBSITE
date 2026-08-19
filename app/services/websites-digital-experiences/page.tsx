import type { Metadata } from 'next'
import Link from 'next/link'
import { EditorialHero } from '@/components/fnb/editorial/editorial-hero'
import { EditorialSection } from '@/components/fnb/editorial/editorial-section'
import { ProjectEnquiryCta } from '@/components/fnb/editorial/project-enquiry-cta'
import { ServiceDecisionFlow, ServiceMediaFeature, ServiceScopeList } from '@/components/fnb/services/service-primitives'
import { FNB_MEDIA } from '@/lib/media-registry'

export const metadata: Metadata = {
  title: 'Websites & Digital Experiences | FNB Events',
  description: 'Digital strategy, UX, UI, responsive web experience, interactive storytelling, conversion thinking and brand consistency as an advisory capability.',
}

export default function DigitalExperiencesPage() {
  return (
    <main id="main">
      <EditorialHero eyebrow="Service 05 · Digital experiences" title="Websites & Digital Experiences" lead="Digital experience design connects user intent, content, interface behaviour and brand expression—before a screen is treated as a collection of components.">
        <Link href="#digital-strategy" className="fnb-btn-ghost">Follow the experience logic <span aria-hidden="true">&#8595;</span></Link>
      </EditorialHero>

      <EditorialSection id="digital-strategy" index="01 · Digital strategy" title="Define the role of the experience." aside="This page describes strategy and design capability. It does not claim a deployed product, integration or outcome for an unverified project.">
        <p>Strategy identifies the audience, priority actions, content responsibilities and relationship between the digital experience and the wider brand or event journey.</p>
      </EditorialSection>

      <section id="ux" aria-labelledby="ux-heading" className="border-t border-steel/40 bg-void">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)] lg:gap-16"><div><p className="fnb-label text-signal">02 · UX</p><h2 id="ux-heading" className="fnb-head mt-5 max-w-[12ch] text-3xl text-warm-white md:text-5xl">Organise the path around user intent.</h2></div><ServiceDecisionFlow label="User-experience decision flow" steps={[{ title: 'Understand', copy: 'Clarify users, contexts and priority tasks.' }, { title: 'Structure', copy: 'Arrange information, journeys and decision points.' }, { title: 'Test', copy: 'Review whether the proposed flow communicates clearly.' }]} /></div>
      </section>

      <EditorialSection id="ui" index="03 · UI" title="Make hierarchy visible in every state."><p>Interface design translates structure into typography, spacing, controls, feedback and responsive behaviour. Accessibility and native interaction semantics remain part of the design decision, not a later visual correction.</p></EditorialSection>

      <ServiceMediaFeature id="web-experience" index="04 · Web experience" title="Connect content, interaction and system behaviour." asset={FNB_MEDIA.digitalDashboard} portrait boundary="This conceptual interface is not a delivered client product, live dashboard or evidence of deployment.">
        <p>A web experience is considered across page architecture, component behaviour, content states, performance needs and the technical context approved for the project.</p>
      </ServiceMediaFeature>

      <EditorialSection id="interactive-storytelling" index="05 · Interactive storytelling" title="Use interaction to reveal meaning." className="bg-obsidian"><p>Motion and progressive disclosure can clarify sequence, comparison or transformation. They remain restrained, keyboard-compatible and respectful of reduced-motion preferences.</p></EditorialSection>

      <section id="responsive-systems" aria-labelledby="responsive-systems-heading" className="border-t border-steel/40 bg-void">
        <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24"><p className="fnb-label text-signal">06 · Responsive systems</p><h2 id="responsive-systems-heading" className="fnb-head mt-5 max-w-[16ch] text-3xl text-warm-white md:text-5xl">Design continuity across changing space and input.</h2><div className="mt-10"><ServiceScopeList ariaLabel="Responsive system considerations" items={['Content priority and reflow', 'Touch, pointer and keyboard input', 'Readable type and target sizing', 'Media loading and performance budgets']} /></div></div>
      </section>

      <EditorialSection id="conversion-thinking" index="07 · Conversion thinking" title="Make the next useful action clear."><p>Conversion thinking examines decision context, friction, reassurance and the information a user needs before acting. It does not promise a commercial result or substitute invented metrics for evaluation.</p></EditorialSection>
      <EditorialSection id="brand-consistency" index="08 · Brand consistency" title="Carry the same intent without freezing the medium." className="bg-void"><p>Digital behaviour, language, image, motion and typography can express the brand while adapting to accessibility, device and performance constraints.</p></EditorialSection>
      <ProjectEnquiryCta id="project-enquiry" eyebrow="Digital enquiry" title="Start with the user, the content and the decision." copy="Share the audience, essential journeys, available content, brand inputs and known technical constraints. Delivery scope remains subject to discovery and approval." />
    </main>
  )
}
