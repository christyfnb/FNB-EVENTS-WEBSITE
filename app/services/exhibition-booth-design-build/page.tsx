import type { Metadata } from 'next'
import Link from 'next/link'
import { ConceptualMedia } from '@/components/fnb/editorial/conceptual-media'
import { EditorialHero } from '@/components/fnb/editorial/editorial-hero'
import { EditorialSection } from '@/components/fnb/editorial/editorial-section'
import { ProjectEnquiryCta } from '@/components/fnb/editorial/project-enquiry-cta'
import { ServiceCopy } from '@/components/fnb/services/service-primitives'
import { getTask4ServiceBlock, getTask4ServiceContent } from '@/lib/task4-service-content'
import { getTask4HeroMedia, getTask4ServiceMedia } from '@/lib/task4-service-media'

const content = getTask4ServiceContent('/services/exhibition-booth-design-build')
const s = content.sections

export const metadata: Metadata = content.metadata

export default function ExhibitionBoothPage() {
  return (
    <main id="main">
      <EditorialHero
        {...content.hero}
        media={getTask4HeroMedia(content)}
        mediaDisclosure={content.media.disclosure}
        serviceBlock={getTask4ServiceBlock(content, 0)}
      >
        <p className="fnb-label text-ash">{content.media.disclosure}</p>
      </EditorialHero>

      <EditorialSection {...s.strategicProposition} serviceBlock={getTask4ServiceBlock(content, 1)}>
        <ServiceCopy paragraphs={s.strategicProposition.body} />
      </EditorialSection>

      <EditorialSection {...s.concept} serviceBlock={getTask4ServiceBlock(content, 2)} className="bg-void">
        <ServiceCopy paragraphs={s.concept.body} />
      </EditorialSection>

      <EditorialSection {...s.sketchDesign} serviceBlock={getTask4ServiceBlock(content, 3)}>
        <ServiceCopy paragraphs={s.sketchDesign.body} />
      </EditorialSection>

      <section
        id={s.spatialPlanning.id}
        aria-labelledby={`${s.spatialPlanning.id}-heading`}
        data-service-block={getTask4ServiceBlock(content, 4)}
        data-service-kind="scope-list"
        className="border-t border-steel/40 bg-void"
      >
        <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
          <p className="fnb-label text-signal">{s.spatialPlanning.index}</p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)]">
            <h2 id={`${s.spatialPlanning.id}-heading`} className="fnb-head max-w-[12ch] text-3xl text-warm-white md:text-5xl">{s.spatialPlanning.title}</h2>
            <ol className="grid border-t border-steel/50 sm:grid-cols-2">
              {s.spatialPlanning.items?.map((item, index) => (
                <li key={item} className="border-b border-steel/50 py-6 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6">
                  <span className="fnb-label text-ash">{String(index + 1).padStart(2, '0')}</span>
                  <p className="mt-3 text-lg text-mist">{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <EditorialSection {...s.engineering} serviceBlock={getTask4ServiceBlock(content, 5)}>
        <ServiceCopy paragraphs={s.engineering.body} />
      </EditorialSection>

      <EditorialSection {...s.materialThinking} serviceBlock={getTask4ServiceBlock(content, 6)} className="bg-void">
        <ServiceCopy paragraphs={s.materialThinking.body} />
      </EditorialSection>

      <section
        id={s.fabrication.id}
        aria-labelledby={`${s.fabrication.id}-heading`}
        data-service-block={getTask4ServiceBlock(content, 7)}
        data-service-kind="media-feature"
        data-media-position={content.media.mediaPosition}
        data-media-aspect={content.media.mediaAspect}
        data-media-rhythm={content.media.rhythm}
        className="border-t border-steel/40 bg-obsidian"
      >
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,0.76fr)_minmax(22rem,1fr)] lg:items-center">
          <div>
            <p className="fnb-label text-signal">{s.fabrication.index}</p>
            <h2 id={`${s.fabrication.id}-heading`} className="fnb-head mt-5 max-w-[12ch] text-3xl text-warm-white md:text-5xl">{s.fabrication.title}</h2>
            <div className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
              <ServiceCopy paragraphs={s.fabrication.body} />
            </div>
          </div>
          <ConceptualMedia asset={getTask4ServiceMedia(content)} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[3/2]" label={content.media.disclosure} />
        </div>
      </section>

      <EditorialSection {...s.buildProgression} serviceBlock={getTask4ServiceBlock(content, 8)} className="bg-void">
        <ServiceCopy paragraphs={s.buildProgression.body} />
      </EditorialSection>

      <EditorialSection {...s.installation} serviceBlock={getTask4ServiceBlock(content, 9)}>
        <ServiceCopy paragraphs={s.installation.body} />
      </EditorialSection>

      <EditorialSection {...s.experienceDelivery} serviceBlock={getTask4ServiceBlock(content, 10)} className="bg-void">
        <ServiceCopy paragraphs={s.experienceDelivery.body} />
      </EditorialSection>

      <section
        id={content.related!.id}
        aria-labelledby={`${content.related!.id}-heading`}
        data-service-block={getTask4ServiceBlock(content, 11)}
        data-service-kind="related-services"
        className="border-t border-steel/40 bg-obsidian"
      >
        <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
          <p className="fnb-label text-signal">{content.related!.label}</p>
          <h2 id={`${content.related!.id}-heading`} className="fnb-head mt-5 max-w-[16ch] text-3xl text-warm-white md:text-5xl">{content.related!.title}</h2>
          <ul className="mt-12 border-t border-steel/50">
            {content.related!.items.map((service) => (
              <li key={service.href} className="border-b border-steel/50">
                <Link href={service.href} className="group grid gap-4 py-7 sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:items-center">
                  <span className="fnb-label text-signal">{service.number}</span>
                  <span className="fnb-head text-2xl text-warm-white transition-colors group-hover:text-signal">{service.name}</span>
                  <span className="fnb-label text-ash">{content.related!.linkLabel} <span aria-hidden="true">&#8594;</span></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProjectEnquiryCta {...content.cta} serviceBlock={getTask4ServiceBlock(content, 12)} linkLabel={content.cta.label} />
    </main>
  )
}
