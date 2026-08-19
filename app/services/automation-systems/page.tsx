import type { Metadata } from 'next'
import { EditorialHero } from '@/components/fnb/editorial/editorial-hero'
import { EditorialSection } from '@/components/fnb/editorial/editorial-section'
import { ProjectEnquiryCta } from '@/components/fnb/editorial/project-enquiry-cta'
import { ServiceCopy, ServiceDecisionFlow, ServiceMediaFeature, ServiceScopeList } from '@/components/fnb/services/service-primitives'
import { getTask4ServiceBlock, getTask4ServiceContent } from '@/lib/task4-service-content'
import { getTask4ServiceMedia } from '@/lib/task4-service-media'

const content = getTask4ServiceContent('/services/automation-systems')
export const metadata: Metadata = content.metadata

export default function AutomationSystemsPage() {
  const s = content.sections
  return (
    <main id="main">
      <EditorialHero {...content.hero} serviceBlock={getTask4ServiceBlock(content, 0)} />
      <section id={s.discovery.id} aria-labelledby={`${s.discovery.id}-heading`} data-service-block={getTask4ServiceBlock(content, 1)} data-service-kind="split" className="border-t border-steel/40 bg-obsidian"><div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)] lg:gap-16"><div><p className="fnb-label text-signal">{s.discovery.index}</p><h2 id={`${s.discovery.id}-heading`} className="fnb-head mt-5 max-w-[13ch] text-3xl text-warm-white md:text-5xl">{s.discovery.title}</h2></div><div className="space-y-5 text-lg leading-relaxed text-mist"><ServiceCopy paragraphs={s.discovery.body} /><p data-truth-boundary={`${getTask4ServiceBlock(content, 1)}:aside`} className="border-l border-signal/60 pl-5 text-sm text-ash">{s.discovery.aside}</p></div></div></section>
      <EditorialSection {...s.mapping} serviceBlock={getTask4ServiceBlock(content, 2)} className="bg-void"><ServiceCopy paragraphs={s.mapping.body} /><ServiceDecisionFlow label={s.mapping.ariaLabel!} steps={s.mapping.flow!} /></EditorialSection>
      <ServiceMediaFeature {...s.integration} serviceBlock={getTask4ServiceBlock(content, 3)} asset={getTask4ServiceMedia(content)} mediaPosition={content.media.mediaPosition} portrait={content.media.mediaAspect === 'portrait'} rhythm={content.media.rhythm} boundary={content.media.boundary} disclosure={content.media.disclosure}><ServiceCopy paragraphs={s.integration.body} /></ServiceMediaFeature>
      <EditorialSection {...s.customer} serviceBlock={getTask4ServiceBlock(content, 4)}><ServiceCopy paragraphs={s.customer.body} /></EditorialSection>
      <section id={s.operational.id} aria-labelledby={`${s.operational.id}-heading`} data-service-block={getTask4ServiceBlock(content, 5)} data-service-kind="scope-list" className="border-t border-steel/40 bg-void"><div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24"><p className="fnb-label text-signal">{s.operational.index}</p><h2 id={`${s.operational.id}-heading`} className="fnb-head mt-5 max-w-[15ch] text-3xl text-warm-white md:text-5xl">{s.operational.title}</h2><div className="mt-10"><ServiceScopeList ariaLabel={s.operational.ariaLabel!} items={s.operational.items!} /></div></div></section>
      <EditorialSection {...s.data} serviceBlock={getTask4ServiceBlock(content, 6)}><ServiceCopy paragraphs={s.data.body} /></EditorialSection>
      <EditorialSection {...s.controls} serviceBlock={getTask4ServiceBlock(content, 7)} className="bg-void"><ServiceCopy paragraphs={s.controls.body} /></EditorialSection>
      <ProjectEnquiryCta {...content.cta} serviceBlock={getTask4ServiceBlock(content, 8)} linkLabel={content.cta.label} />
    </main>
  )
}
