import type { Metadata } from 'next'
import Link from 'next/link'
import { EditorialHero } from '@/components/fnb/editorial/editorial-hero'
import { EditorialSection } from '@/components/fnb/editorial/editorial-section'
import { ProjectEnquiryCta } from '@/components/fnb/editorial/project-enquiry-cta'
import { ServiceCopy, ServiceDecisionFlow, ServiceMediaFeature, ServiceScopeList } from '@/components/fnb/services/service-primitives'
import { getTask4ServiceBlock, getTask4ServiceContent } from '@/lib/task4-service-content'
import { getTask4ServiceMedia } from '@/lib/task4-service-media'

const content = getTask4ServiceContent('/services/websites-digital-experiences')
export const metadata: Metadata = content.metadata

export default function DigitalExperiencesPage() {
  const s = content.sections
  return (
    <main id="main">
      <EditorialHero eyebrow={content.hero.eyebrow} title={content.hero.title} lead={content.hero.lead} serviceBlock={getTask4ServiceBlock(content, 0)}><Link href={content.hero.anchorHref!} className="fnb-btn-ghost">{content.hero.anchorLabel} <span aria-hidden="true">&#8595;</span></Link></EditorialHero>
      <EditorialSection {...s.strategy} serviceBlock={getTask4ServiceBlock(content, 1)}><ServiceCopy paragraphs={s.strategy.body} /></EditorialSection>
      <section id={s.ux.id} aria-labelledby={`${s.ux.id}-heading`} data-service-block={getTask4ServiceBlock(content, 2)} data-service-kind="flow" className="border-t border-steel/40 bg-void"><div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)] lg:gap-16"><div><p className="fnb-label text-signal">{s.ux.index}</p><h2 id={`${s.ux.id}-heading`} className="fnb-head mt-5 max-w-[12ch] text-3xl text-warm-white md:text-5xl">{s.ux.title}</h2></div><ServiceDecisionFlow label={s.ux.ariaLabel!} steps={s.ux.flow!} /></div></section>
      <EditorialSection {...s.ui} serviceBlock={getTask4ServiceBlock(content, 3)}><ServiceCopy paragraphs={s.ui.body} /></EditorialSection>
      <ServiceMediaFeature {...s.web} serviceBlock={getTask4ServiceBlock(content, 4)} asset={getTask4ServiceMedia(content)} mediaPosition={content.media.mediaPosition} portrait={content.media.mediaAspect === 'portrait'} rhythm={content.media.rhythm} boundary={content.media.boundary} disclosure={content.media.disclosure}><ServiceCopy paragraphs={s.web.body} /></ServiceMediaFeature>
      <EditorialSection {...s.storytelling} serviceBlock={getTask4ServiceBlock(content, 5)} className="bg-obsidian"><ServiceCopy paragraphs={s.storytelling.body} /></EditorialSection>
      <section id={s.responsive.id} aria-labelledby={`${s.responsive.id}-heading`} data-service-block={getTask4ServiceBlock(content, 6)} data-service-kind="scope-list" className="border-t border-steel/40 bg-void"><div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24"><p className="fnb-label text-signal">{s.responsive.index}</p><h2 id={`${s.responsive.id}-heading`} className="fnb-head mt-5 max-w-[16ch] text-3xl text-warm-white md:text-5xl">{s.responsive.title}</h2><div className="mt-10"><ServiceScopeList ariaLabel={s.responsive.ariaLabel!} items={s.responsive.items!} /></div></div></section>
      <EditorialSection {...s.conversion} serviceBlock={getTask4ServiceBlock(content, 7)}><ServiceCopy paragraphs={s.conversion.body} /></EditorialSection>
      <EditorialSection {...s.consistency} serviceBlock={getTask4ServiceBlock(content, 8)} className="bg-void"><ServiceCopy paragraphs={s.consistency.body} /></EditorialSection>
      <ProjectEnquiryCta {...content.cta} serviceBlock={getTask4ServiceBlock(content, 9)} linkLabel={content.cta.label} />
    </main>
  )
}
