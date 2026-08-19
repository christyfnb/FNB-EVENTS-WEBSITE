import Link from 'next/link'
import { LineReveal, Reveal } from '@/components/fnb/reveal'
import { CLOSING } from '@/lib/content'

/**
 * S14 — CLOSING / START A PROJECT. The final conversion surface.
 * Signal line re-enters as a full-width rule above the headline,
 * closing the loop opened by the hero traversal.
 */
export function S14Closing() {
  return (
    <section aria-labelledby="closing-heading" className="relative border-t border-slate/40 bg-void">
      {/* signal rule — the line comes to rest */}
      <div aria-hidden="true" className="fnb-signal-rule" />
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-10 px-6 py-28 md:px-10 md:py-40">
        <Reveal>
          <p className="fnb-label text-signal">S14 &middot; Start</p>
        </Reveal>
        <h2 id="closing-heading" className="max-w-3xl text-4xl font-semibold leading-tight text-balance text-warm-white md:text-6xl">
          <LineReveal lines={[CLOSING.headline]} />
        </h2>
        <Reveal delay={120}>
          <p className="max-w-xl text-lg leading-relaxed text-ash">{CLOSING.sub}</p>
        </Reveal>
        <Reveal delay={200} className="flex flex-wrap items-center gap-4">
          <Link href={CLOSING.primaryCta.href} className="fnb-btn-primary">
            {CLOSING.primaryCta.label}
          </Link>
          <Link href={CLOSING.contactCta.href} className="fnb-btn-ghost">
            {CLOSING.contactCta.label}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
