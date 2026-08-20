import type { Metadata } from 'next'
import { EditorialHero } from '@/components/fnb/editorial/editorial-hero'
import { EditorialSection } from '@/components/fnb/editorial/editorial-section'
import { ProjectEnquiryCta } from '@/components/fnb/editorial/project-enquiry-cta'
import { ServiceCopy, ServiceDecisionFlow, ServiceMediaFeature, ServiceScopeList } from '@/components/fnb/services/service-primitives'
import { getTask4ServiceBlock, getTask4ServiceContent } from '@/lib/task4-service-content'
import { getTask4ServiceMedia } from '@/lib/task4-service-media'

const content = getTask4ServiceContent('/services/branding-advertising')
export const metadata: Metadata = content.metadata

export default function BrandingAdvertisingPage() {
  const s = content.sections
  return (
    <main id="main">
      <EditorialHero {...content.hero} serviceBlock={getTask4ServiceBlock(content, 0)} />
      <EditorialSection {...s.brandStrategy} serviceBlock={getTask4ServiceBlock(content, 1)}><ServiceCopy paragraphs={s.brandStrategy.body} /></EditorialSection>
      <section id={s.visualSystems.id} aria-labelledby={`${s.visualSystems.id}-heading`} data-service-block={getTask4ServiceBlock(content, 2)} data-service-kind="scope-list" className="border-t border-steel/40 bg-void"><div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)] lg:gap-16"><div><p className="fnb-label text-signal">{s.visualSystems.index}</p><h2 id={`${s.visualSystems.id}-heading`} className="fnb-head mt-5 max-w-[13ch] text-3xl text-warm-white md:text-5xl">{s.visualSystems.title}</h2></div><ServiceScopeList columns={3} ariaLabel={s.visualSystems.ariaLabel!} items={s.visualSystems.items!} /></div></section>
      <EditorialSection {...s.campaignThinking} serviceBlock={getTask4ServiceBlock(content, 3)}><ServiceCopy paragraphs={s.campaignThinking.body} /><ServiceDecisionFlow label={s.campaignThinking.ariaLabel!} steps={s.campaignThinking.flow!} /></EditorialSection>
      <ServiceMediaFeature {...s.spatialBranding} serviceBlock={getTask4ServiceBlock(content, 4)} asset={getTask4ServiceMedia(content)} mediaPosition={content.media.mediaPosition} portrait={content.media.mediaAspect === 'portrait'} rhythm={content.media.rhythm} boundary={content.media.boundary} disclosure={content.media.disclosure}><ServiceCopy paragraphs={s.spatialBranding.body} /></ServiceMediaFeature>
      <EditorialSection {...s.eventBranding} serviceBlock={getTask4ServiceBlock(content, 5)}><ServiceCopy paragraphs={s.eventBranding.body} /></EditorialSection>
      <EditorialSection {...s.advertising} serviceBlock={getTask4ServiceBlock(content, 6)} className="bg-void"><ServiceCopy paragraphs={s.advertising.body} /></EditorialSection>
      <section id={s.contentSurfaces.id} aria-labelledby={`${s.contentSurfaces.id}-heading`} data-service-block={getTask4ServiceBlock(content, 7)} data-service-kind="scope-list" className="border-t border-steel/40 bg-obsidian"><div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24"><p className="fnb-label text-signal">{s.contentSurfaces.index}</p><h2 id={`${s.contentSurfaces.id}-heading`} className="fnb-head mt-5 max-w-[15ch] text-3xl text-warm-white md:text-5xl">{s.contentSurfaces.title}</h2><div className="mt-10"><ServiceScopeList ariaLabel={s.contentSurfaces.ariaLabel!} items={s.contentSurfaces.items!} /></div></div></section>
      <EditorialSection {...s.consistency} serviceBlock={getTask4ServiceBlock(content, 8)} className="bg-void"><ServiceCopy paragraphs={s.consistency.body} /></EditorialSection>
      <ProjectEnquiryCta {...content.cta} serviceBlock={getTask4ServiceBlock(content, 9)} linkLabel={content.cta.label} />
    </main>
  )
}
