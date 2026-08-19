import type { Metadata } from 'next'
import { EditorialHero } from '@/components/fnb/editorial/editorial-hero'
import { EditorialSection } from '@/components/fnb/editorial/editorial-section'
import { ProjectEnquiryCta } from '@/components/fnb/editorial/project-enquiry-cta'
import { ServiceCopy, ServiceDecisionFlow, ServiceMediaFeature, ServiceScopeList } from '@/components/fnb/services/service-primitives'
import { getTask4ServiceContent } from '@/lib/task4-service-content'
import { getTask4ServiceMedia } from '@/lib/task4-service-media'

const content = getTask4ServiceContent('/services/interiors-commercial-spaces')
export const metadata: Metadata = content.metadata

export default function InteriorsCommercialSpacesPage() {
  const s = content.sections
  return (
    <main id="main">
      <EditorialHero {...content.hero} />
      <section id={s.strategy.id} aria-labelledby={`${s.strategy.id}-heading`} className="border-t border-steel/40 bg-obsidian"><div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] lg:gap-16"><div><p className="fnb-label text-signal">{s.strategy.index}</p><h2 id={`${s.strategy.id}-heading`} className="fnb-head mt-5 max-w-[13ch] text-3xl text-warm-white md:text-5xl">{s.strategy.title}</h2></div><ServiceDecisionFlow label={s.strategy.ariaLabel!} steps={s.strategy.flow!} /></div></section>
      <EditorialSection {...s.planning} className="bg-void"><ServiceCopy paragraphs={s.planning.body} /></EditorialSection>
      <ServiceMediaFeature {...s.materials} asset={getTask4ServiceMedia(content)} mediaPosition={content.media.mediaPosition} portrait={content.media.mediaAspect === 'portrait'} boundary={content.media.boundary} disclosure={content.media.disclosure}><ServiceCopy paragraphs={s.materials.body} /></ServiceMediaFeature>
      <EditorialSection {...s.brand}><ServiceCopy paragraphs={s.brand.body} /></EditorialSection>
      <section id={s.commercial.id} aria-labelledby={`${s.commercial.id}-heading`} className="border-t border-steel/40 bg-void"><div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24"><p className="fnb-label text-signal">{s.commercial.index}</p><h2 id={`${s.commercial.id}-heading`} className="fnb-head mt-5 max-w-[16ch] text-3xl text-warm-white md:text-5xl">{s.commercial.title}</h2><div className="mt-10"><ServiceScopeList ariaLabel={s.commercial.ariaLabel!} items={s.commercial.items!} /></div></div></section>
      <EditorialSection {...s.development}><ServiceCopy paragraphs={s.development.body} /></EditorialSection>
      <EditorialSection {...s.execution} className="bg-void"><ServiceCopy paragraphs={s.execution.body} /></EditorialSection>
      <ProjectEnquiryCta {...content.cta} linkLabel={content.cta.label} />
    </main>
  )
}
