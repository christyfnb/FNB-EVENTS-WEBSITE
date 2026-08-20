import type { Metadata } from 'next'
import { EditorialHero } from '@/components/fnb/editorial/editorial-hero'
import { EditorialSection } from '@/components/fnb/editorial/editorial-section'
import { ProjectEnquiryCta } from '@/components/fnb/editorial/project-enquiry-cta'
import { ServiceCopy, ServiceDecisionFlow, ServiceMediaFeature, ServiceScopeList } from '@/components/fnb/services/service-primitives'
import { getTask4ServiceBlock, getTask4ServiceContent } from '@/lib/task4-service-content'
import { getTask4ServiceMedia } from '@/lib/task4-service-media'

const content = getTask4ServiceContent('/services/ai-workflow-solutions')
export const metadata: Metadata = content.metadata

export default function AiWorkflowSolutionsPage() {
  const s = content.sections
  return (
    <main id="main">
      <EditorialHero {...content.hero} serviceBlock={getTask4ServiceBlock(content, 0)} />
      <EditorialSection {...s.strategy} serviceBlock={getTask4ServiceBlock(content, 1)}><ServiceCopy paragraphs={s.strategy.body} /></EditorialSection>
      <ServiceMediaFeature {...s.orchestration} serviceBlock={getTask4ServiceBlock(content, 2)} asset={getTask4ServiceMedia(content)} mediaPosition={content.media.mediaPosition} portrait={content.media.mediaAspect === 'portrait'} rhythm={content.media.rhythm} boundary={content.media.boundary} disclosure={content.media.disclosure}><ServiceCopy paragraphs={s.orchestration.body} /></ServiceMediaFeature>
      <section id={s.knowledge.id} aria-labelledby={`${s.knowledge.id}-heading`} data-service-block={getTask4ServiceBlock(content, 3)} data-service-kind="scope-list" className="border-t border-steel/40 bg-obsidian"><div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24"><p className="fnb-label text-signal">{s.knowledge.index}</p><h2 id={`${s.knowledge.id}-heading`} className="fnb-head mt-5 max-w-[16ch] text-3xl text-warm-white md:text-5xl">{s.knowledge.title}</h2><div className="mt-10"><ServiceScopeList ariaLabel={s.knowledge.ariaLabel!} items={s.knowledge.items!} /></div></div></section>
      <EditorialSection {...s.review} serviceBlock={getTask4ServiceBlock(content, 4)} className="bg-void"><ServiceCopy paragraphs={s.review.body} /><ServiceDecisionFlow label={s.review.ariaLabel!} steps={s.review.flow!} /></EditorialSection>
      <EditorialSection {...s.governance} serviceBlock={getTask4ServiceBlock(content, 5)}><ServiceCopy paragraphs={s.governance.body} /></EditorialSection>
      <EditorialSection {...s.intelligence} serviceBlock={getTask4ServiceBlock(content, 6)} className="bg-void"><ServiceCopy paragraphs={s.intelligence.body} /></EditorialSection>
      <EditorialSection {...s.integration} serviceBlock={getTask4ServiceBlock(content, 7)}><ServiceCopy paragraphs={s.integration.body} /></EditorialSection>
      <ProjectEnquiryCta {...content.cta} serviceBlock={getTask4ServiceBlock(content, 8)} linkLabel={content.cta.label} />
    </main>
  )
}
