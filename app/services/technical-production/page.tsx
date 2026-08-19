import type { Metadata } from 'next'
import { EditorialHero } from '@/components/fnb/editorial/editorial-hero'
import { EditorialSection } from '@/components/fnb/editorial/editorial-section'
import { ProjectEnquiryCta } from '@/components/fnb/editorial/project-enquiry-cta'
import { ServiceCopy, ServiceDecisionFlow, ServiceMediaFeature, ServiceScopeList } from '@/components/fnb/services/service-primitives'
import { getTask4ServiceContent } from '@/lib/task4-service-content'
import { getTask4ServiceMedia } from '@/lib/task4-service-media'

const content = getTask4ServiceContent('/services/technical-production')
export const metadata: Metadata = content.metadata

export default function TechnicalProductionPage() {
  const s = content.sections
  return (
    <main id="main">
      <EditorialHero {...content.hero} />
      <EditorialSection {...s.planning}><ServiceCopy paragraphs={s.planning.body} /></EditorialSection>
      <ServiceMediaFeature {...s.signals} asset={getTask4ServiceMedia(content)} mediaPosition={content.media.mediaPosition} portrait={content.media.mediaAspect === 'portrait'} boundary={content.media.boundary} disclosure={content.media.disclosure}><ServiceCopy paragraphs={s.signals.body} /></ServiceMediaFeature>
      <section id={s.lighting.id} aria-labelledby={`${s.lighting.id}-heading`} className="border-t border-steel/40 bg-obsidian"><div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] lg:gap-16"><div><p className="fnb-label text-signal">{s.lighting.index}</p><h2 id={`${s.lighting.id}-heading`} className="fnb-head mt-5 max-w-[12ch] text-3xl text-warm-white md:text-5xl">{s.lighting.title}</h2></div><ServiceScopeList ariaLabel={s.lighting.ariaLabel!} items={s.lighting.items!} /></div></section>
      <EditorialSection {...s.audio} className="bg-void"><ServiceCopy paragraphs={s.audio.body} /></EditorialSection>
      <EditorialSection {...s.display}><ServiceCopy paragraphs={s.display.body} /></EditorialSection>
      <section id={s.controls.id} aria-labelledby={`${s.controls.id}-heading`} className="border-t border-steel/40 bg-void"><div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24"><p className="fnb-label text-signal">{s.controls.index}</p><h2 id={`${s.controls.id}-heading`} className="fnb-head mt-5 max-w-[16ch] text-3xl text-warm-white md:text-5xl">{s.controls.title}</h2><div className="mt-10"><ServiceDecisionFlow label={s.controls.ariaLabel!} steps={s.controls.flow!} /></div></div></section>
      <EditorialSection {...s.integration}><ServiceCopy paragraphs={s.integration.body} /></EditorialSection>
      <EditorialSection {...s.execution} className="bg-void"><ServiceCopy paragraphs={s.execution.body} /></EditorialSection>
      <ProjectEnquiryCta {...content.cta} linkLabel={content.cta.label} />
    </main>
  )
}
