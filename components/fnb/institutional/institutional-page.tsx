import Link from 'next/link'
import type { ReactNode } from 'react'
import type { RenderableInstitutionalContent } from '@/lib/task5-institutional-content'

export function InstitutionalPage({ content, children }: { content: RenderableInstitutionalContent; children?: ReactNode }) {
  return (
    <main id="main" data-institutional-route={content.route} data-publication-status={content.publicationStatus} className="bg-obsidian pt-16">
      <section aria-labelledby="page-heading" className="relative overflow-hidden border-b border-steel/50 bg-void">
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,transparent_49.9%,var(--fnb-signal-trace)_50%,transparent_50.1%)] opacity-40" />
        <div className="relative mx-auto grid min-h-[min(48rem,calc(100dvh-4rem))] max-w-[1600px] gap-12 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.4fr)] lg:items-end">
          <div>
            <p className="fnb-label text-signal">{content.hero.eyebrow}</p>
            <h1 id="page-heading" className="fnb-display mt-7 max-w-[13ch] text-5xl text-warm-white sm:text-6xl md:text-8xl">{content.hero.title}</h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-mist md:text-xl">{content.hero.lead}</p>
          </div>
          <aside className="border-l border-signal/60 pl-6" data-truth-basis={content.truthBasis.status}>
            <p className="fnb-label text-ash">{content.statusPanel?.label ?? content.publicationStatus}</p>
            <p className="mt-4 text-xl leading-tight text-warm-white">{content.statusPanel?.title ?? content.truthBasis.status}</p>
            <p className="mt-5 text-sm leading-relaxed text-ash">{content.statusPanel?.notice ?? content.truthBasis.qualification}</p>
          </aside>
        </div>
      </section>

      {content.sections.map((section) => (
        <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="border-b border-steel/40 bg-obsidian">
          <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(11rem,0.34fr)_minmax(0,1fr)] lg:gap-16">
            <div>
              <p className="fnb-label text-signal">{section.index}{section.eyebrow ? ` · ${section.eyebrow}` : ''}</p>
              <h2 id={`${section.id}-heading`} className="fnb-head mt-4 max-w-[14ch] text-3xl text-warm-white md:text-5xl">{section.title}</h2>
            </div>
            <div>
              <div className="max-w-3xl space-y-5 text-base leading-relaxed text-mist md:text-lg">
                {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {section.items ? (
                <ol className="mt-12 border-t border-steel/50">
                  {section.items.map((item, index) => (
                    <li key={item.title} className="grid gap-3 border-b border-steel/50 py-7 sm:grid-cols-[4rem_minmax(10rem,0.36fr)_minmax(0,1fr)]">
                      <span className="fnb-label text-signal">{String(index + 1).padStart(2, '0')}</span>
                      <h3 className="fnb-head text-xl text-warm-white">{item.title}</h3>
                      <p className="max-w-xl leading-relaxed text-mist">{item.copy}</p>
                    </li>
                  ))}
                </ol>
              ) : null}
            </div>
          </div>
        </section>
      ))}

      {children}

      <section aria-labelledby="institutional-next-heading" className="border-t border-signal/40 bg-void">
        <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-20">
          <h2 id="institutional-next-heading" className="sr-only">{content.hero.title}</h2>
          <div className="flex flex-wrap gap-3">
            {content.actions.map((action, index) => (
              <Link key={action.href} href={action.href} className={index === 0 ? 'fnb-btn-primary' : 'fnb-btn-ghost'}>{action.label}</Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
