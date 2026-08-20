import Link from 'next/link'
import type { HoldingPageContent } from '@/lib/holding-pages'

export function HoldingPage({ content }: { content: HoldingPageContent }) {
  return (
    <main id="main" className="bg-obsidian pt-16">
      <section aria-labelledby="holding-heading" className="relative min-h-[calc(100dvh-4rem)] overflow-hidden border-b border-steel/50">
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,transparent_49.9%,var(--fnb-signal-trace)_50%,transparent_50.1%)] opacity-40" />
        <div className="relative mx-auto grid min-h-[calc(100dvh-4rem)] max-w-[1600px] gap-12 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.42fr)] lg:items-end">
          <div>
            <p className="fnb-label text-signal">{content.eyebrow}</p>
            <h1 id="holding-heading" className="fnb-display mt-7 max-w-[13ch] text-5xl text-warm-white sm:text-6xl md:text-8xl">
              {content.title}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-mist md:text-xl">{content.summary}</p>
          </div>

          <aside className="border-l border-signal/60 pl-6">
            <p className="fnb-label text-ash">Publication status</p>
            <p className="mt-4 text-lg leading-relaxed text-warm-white">{content.status}</p>
            <p className="mt-5 text-sm leading-relaxed text-ash">{content.notice}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={content.primaryHref} className="fnb-btn-primary">{content.primaryLabel}</Link>
              <Link href="/" className="fnb-btn-ghost">Return home</Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
