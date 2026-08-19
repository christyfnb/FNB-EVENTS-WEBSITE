import type { Metadata } from 'next'
import Link from 'next/link'
import { ConceptualMedia } from '@/components/fnb/editorial/conceptual-media'
import { EditorialHero } from '@/components/fnb/editorial/editorial-hero'
import { ProjectEnquiryCta } from '@/components/fnb/editorial/project-enquiry-cta'
import { getMedia } from '@/lib/media-registry'
import { SERVICE_REGISTRY } from '@/lib/site-registry'

export const metadata: Metadata = {
  title: 'Services | FNB Events',
  description: 'Eight connected FNB capabilities across exhibitions, events, branding, technical production, digital experiences, automation, AI workflows and interiors.',
}

export default function ServicesPage() {
  return (
    <main id="main">
      <EditorialHero
        eyebrow="Services · Capability index"
        title="One practice. Eight ways to build presence."
        lead="Physical environments and digital systems are considered as connected parts of the same brand experience. Explore each capability through the problem it is designed to resolve."
      >
        <Link href="#service-index" className="fnb-btn-ghost">
          Explore the index <span aria-hidden="true">&#8595;</span>
        </Link>
      </EditorialHero>

      <section id="service-index" aria-labelledby="services-heading" className="bg-obsidian">
        <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
          <div className="grid gap-8 border-b border-steel/50 pb-12 lg:grid-cols-[minmax(0,0.35fr)_minmax(0,1fr)]">
            <p className="fnb-label text-signal">01–08 · Full spectrum</p>
            <h2 id="services-heading" className="fnb-head max-w-[18ch] text-3xl text-warm-white md:text-5xl">
              Start with the constraint. Follow it to the right discipline.
            </h2>
          </div>

          <ol>
            {SERVICE_REGISTRY.map((service, index) => {
              const media = getMedia(service.mediaId)
              const mediaFirst = index % 2 === 1
              return (
                <li key={service.href} className="border-b border-steel/50 py-12 md:py-16">
                  <article className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(22rem,0.72fr)] lg:items-center lg:gap-16">
                    <div className={mediaFirst ? 'lg:order-2' : undefined}>
                      <div className="flex items-center justify-between gap-5">
                        <span className="fnb-label text-signal">{service.number}</span>
                        <span className="fnb-label text-ash">{service.cluster}</span>
                      </div>
                      <h3 className="fnb-head mt-8 max-w-[15ch] text-3xl text-warm-white md:text-5xl">{service.name}</h3>
                      <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">{service.problem}</p>
                      <p className="mt-4 max-w-xl leading-relaxed text-ash">{service.summary}</p>
                      <Link href={service.href} className="fnb-btn-ghost mt-8" aria-label={`Explore ${service.name}`}>
                        Explore capability <span aria-hidden="true">&#8594;</span>
                      </Link>
                    </div>
                    <ConceptualMedia
                      asset={media}
                      sizes="(min-width: 1024px) 38vw, 100vw"
                      className={`aspect-[4/3] ${mediaFirst ? 'lg:order-1' : ''}`}
                    />
                  </article>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <ProjectEnquiryCta
        title="Bring us the brief, the date and the constraint."
        copy="A useful first conversation starts with what must be built, who it must work for and what cannot move."
      />
    </main>
  )
}
