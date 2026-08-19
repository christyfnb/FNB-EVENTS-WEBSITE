import type { Metadata } from 'next'
import { EditorialHero } from '@/components/fnb/editorial/editorial-hero'
import { EditorialSection } from '@/components/fnb/editorial/editorial-section'
import { ProjectEnquiryCta } from '@/components/fnb/editorial/project-enquiry-cta'
import { RelatedServices, ServiceCopy, ServiceDecisionFlow, ServiceMediaFeature, ServiceScopeList } from '@/components/fnb/services/service-primitives'
import { getTask4ServiceContent } from '@/lib/task4-service-content'
import { getTask4ServiceMedia } from '@/lib/task4-service-media'

const content = getTask4ServiceContent('/services/event-production')
export const metadata: Metadata = content.metadata

export default function EventProductionPage() {
  const s = content.sections
  return (
    <main id="main">
      <EditorialHero {...content.hero} />
      <EditorialSection {...s.planning}><ServiceCopy paragraphs={s.planning.body} /></EditorialSection>
      <EditorialSection {...s.showDirection} className="bg-void"><ServiceCopy paragraphs={s.showDirection.body} /><ServiceDecisionFlow label={s.showDirection.ariaLabel!} steps={s.showDirection.flow!} /></EditorialSection>
      <ServiceMediaFeature {...s.staging} asset={getTask4ServiceMedia(content)} mediaPosition={content.media.mediaPosition} portrait={content.media.mediaAspect === 'portrait'} boundary={content.media.boundary} disclosure={content.media.disclosure}><ServiceCopy paragraphs={s.staging.body} /></ServiceMediaFeature>
      <section id={s.liveSystems.id} aria-labelledby={`${s.liveSystems.id}-heading`} className="border-t border-steel/40 bg-obsidian"><div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24"><p className="fnb-label text-signal">{s.liveSystems.index}</p><h2 id={`${s.liveSystems.id}-heading`} className="fnb-head mt-5 max-w-[17ch] text-3xl text-warm-white md:text-5xl">{s.liveSystems.title}</h2><div className="mt-10"><ServiceScopeList ariaLabel={s.liveSystems.ariaLabel!} items={s.liveSystems.items!} /></div></div></section>
      <EditorialSection {...s.productionControl} className="bg-void"><ServiceCopy paragraphs={s.productionControl.body} /></EditorialSection>
      <section id={s.guestExperience.id} aria-labelledby={`${s.guestExperience.id}-heading`} className="border-t border-steel/40 bg-obsidian"><div className="mx-auto grid max-w-[1600px] gap-8 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] lg:gap-16"><div><p className="fnb-label text-signal">{s.guestExperience.index}</p><h2 id={`${s.guestExperience.id}-heading`} className="fnb-head mt-5 max-w-[12ch] text-3xl text-warm-white md:text-5xl">{s.guestExperience.title}</h2></div><ServiceDecisionFlow label={s.guestExperience.ariaLabel!} steps={s.guestExperience.flow!} /></div></section>
      <EditorialSection {...s.execution} className="bg-void"><ServiceCopy paragraphs={s.execution.body} /></EditorialSection>
      <RelatedServices {...content.related!} />
      <ProjectEnquiryCta {...content.cta} linkLabel={content.cta.label} />
    </main>
  )
}
