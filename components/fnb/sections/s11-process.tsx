import { Reveal } from '@/components/fnb/reveal'
import { PROCESS_STAGES } from '@/lib/content'

/**
 * S11 — PROCESS STRIP. Eight stages rendered as a single engineered
 * sequence line. Horizontal scroll on mobile, full row on desktop.
 */
export function S11Process() {
  return (
    <section id="process" aria-labelledby="process-heading" className="border-t border-slate/40 bg-obsidian">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <p className="fnb-label text-signal">S11 &middot; How we work</p>
          <h2 id="process-heading" className="mt-4 max-w-2xl text-3xl font-semibold text-balance text-warm-white md:text-4xl">
            One production standard, physical or digital.
          </h2>
        </Reveal>

        <ol className="mt-14 grid grid-cols-1 gap-px bg-slate/40 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {PROCESS_STAGES.map((stage, i) => (
            <Reveal as="li" key={stage.name} delay={i * 60} className="group bg-obsidian p-6 md:p-8">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs text-ash">{String(i + 1).padStart(2, '0')}</span>
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-slate transition-colors duration-300 group-hover:bg-signal"
                />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-warm-white">{stage.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ash">{stage.line}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
