import Link from 'next/link'
import { Reveal } from '@/components/fnb/reveal'
import { INSIGHTS } from '@/lib/content'

/**
 * S13 — INSIGHTS. Spec rule: renders nothing when fewer than two
 * insights are published. INSIGHTS is currently empty, so this
 * section returns null by design.
 */
export function S13Insights() {
  if (INSIGHTS.length < 2) return null

  return (
    <section aria-labelledby="insights-heading" className="border-t border-slate/40 bg-obsidian">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <p className="fnb-label text-signal">S13 &middot; Insights</p>
          <h2 id="insights-heading" className="mt-4 text-3xl font-semibold text-warm-white md:text-4xl">
            Thinking from the floor and the codebase.
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-px bg-slate/40 md:grid-cols-2">
          {INSIGHTS.slice(0, 4).map((insight, i) => (
            <Reveal key={insight.href} delay={i * 60} className="bg-obsidian">
              <Link href={insight.href} className="group block p-8 transition-colors hover:bg-void">
                <p className="fnb-label text-ash">
                  {insight.topic} &middot; {insight.readingTime}
                </p>
                <h3 className="mt-4 text-xl font-semibold text-balance text-warm-white group-hover:text-signal">
                  {insight.title}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
