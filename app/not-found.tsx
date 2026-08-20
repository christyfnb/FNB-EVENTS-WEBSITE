import Link from 'next/link'
import { getNotFoundContent } from '@/lib/task5-institutional-content'

export default function NotFound() {
  const content = getNotFoundContent()
  return (
    <main id="main" data-institutional-route="not-found" data-publication-status={content.publicationStatus} className="bg-void pt-16">
      <section aria-labelledby="not-found-heading" className="relative min-h-[calc(100dvh-4rem)] overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,transparent_49.9%,var(--fnb-signal-trace)_50%,transparent_50.1%)] opacity-50" />
        <div className="relative mx-auto flex min-h-[calc(100dvh-4rem)] max-w-[1600px] flex-col justify-end px-5 py-16 md:px-10 md:py-24">
          <p className="fnb-label text-signal">{content.eyebrow}</p>
          <h1 id="not-found-heading" className="fnb-display mt-7 max-w-[12ch] text-5xl text-warm-white sm:text-6xl md:text-8xl">{content.title}</h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-mist">{content.lead}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            {content.actions.map((action, index) => <Link key={action.href} href={action.href} className={index === 0 ? 'fnb-btn-primary' : 'fnb-btn-ghost'}>{action.label}</Link>)}
          </div>
        </div>
      </section>
    </main>
  )
}
