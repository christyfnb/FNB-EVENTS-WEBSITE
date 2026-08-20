import type { Metadata } from 'next'
import { EditorialHero } from '@/components/fnb/editorial/editorial-hero'
import { EditorialSection } from '@/components/fnb/editorial/editorial-section'
import { ProjectEnquiryCta } from '@/components/fnb/editorial/project-enquiry-cta'
import { RelatedServices, ServiceCopy, ServiceDecisionFlow, ServiceMediaFeature, ServiceScopeList } from '@/components/fnb/services/service-primitives'
import { getTask4ServiceBlock, getTask4ServiceContent } from '@/lib/task4-service-content'
import { getTask4ServiceMedia } from '@/lib/task4-service-media'

const content = getTask4ServiceContent('/services/event-production')
export const metadata: Metadata = content.metadata

export default function EventProductionPage() {
  const s = content.sections
  return (
    <main id="main">
      <EditorialHero {...content.hero} serviceBlock={getTask4ServiceBlock(content, 0)} />
      <EditorialSection {...s.planning} serviceBlock={getTask4ServiceBlock(content, 1)}><ServiceCopy paragraphs={s.planning.body} /></EditorialSection>
      <EditorialSection {...s.showDirection} serviceBlock={getTask4ServiceBlock(content, 2)} className="bg-void"><ServiceCopy paragraphs={s.showDirection.body} /><ServiceDecisionFlow label={s.showDirection.ariaLabel!} steps={s.showDirection.flow!} /></EditorialSection>
      <ServiceMediaFeature {...s.staging} serviceBlock={getTask4ServiceBlock(content, 3)} asset={getTask4ServiceMedia(content)} mediaPosition={content.media.mediaPosition} portrait={content.media.mediaAspect === 'portrait'} rhythm={content.media.rhythm} boundary={content.media.boundary} disclosure={content.media.disclosure}><ServiceCopy paragraphs={s.staging.body} /></ServiceMediaFeature>
      <section id={s.liveSystems.id} aria-labelledby={`${s.liveSystems.id}-heading`} data-service-block={getTask4ServiceBlock(content, 4)} data-service-kind="scope-list" className="border-t border-steel/40 bg-obsidian"><div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24"><p className="fnb-label text-signal">{s.liveSystems.index}</p><h2 id={`${s.liveSystems.id}-heading`} className="fnb-head mt-5 max-w-[17ch] text-3xl text-warm-white md:text-5xl">{s.liveSystems.title}</h2><div className="mt-10"><ServiceScopeList ariaLabel={s.liveSystems.ariaLabel!} items={s.liveSystems.items!} /></div></div></section>
      <EditorialSection {...s.productionControl} serviceBlock={getTask4ServiceBlock(content, 5)} className="bg-void"><ServiceCopy paragraphs={s.productionControl.body} /></EditorialSection>
      <section id={s.guestExperience.id} aria-labelledby={`${s.guestExperience.id}-heading`} data-service-block={getTask4ServiceBlock(content, 6)} data-service-kind="flow" className="border-t border-steel/40 bg-obsidian"><div className="mx-auto grid max-w-[1600px] gap-8 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] lg:gap-16"><div><p className="fnb-label text-signal">{s.guestExperience.index}</p><h2 id={`${s.guestExperience.id}-heading`} className="fnb-head mt-5 max-w-[12ch] text-3xl text-warm-white md:text-5xl">{s.guestExperience.title}</h2></div><ServiceDecisionFlow label={s.guestExperience.ariaLabel!} steps={s.guestExperience.flow!} /></div></section>
      <EditorialSection {...s.execution} serviceBlock={getTask4ServiceBlock(content, 7)} className="bg-void"><ServiceCopy paragraphs={s.execution.body} /></EditorialSection>
      <RelatedServices {...content.related!} serviceBlock={getTask4ServiceBlock(content, 8)} />
      <ProjectEnquiryCta {...content.cta} serviceBlock={getTask4ServiceBlock(content, 9)} linkLabel={content.cta.label} />
    </main>
  )
}
