import Link from 'next/link'
import { Reveal } from '@/components/fnb/reveal'
import { INDUSTRIES } from '@/lib/content'

/**
 * S10 INDUSTRIES — typographic index, deliberately quiet.
 * Two columns, hairline separated. No icons, no logos, no media.
 * Renders nothing if no industries are verified.
 */
export function S10Industries() {
  if (INDUSTRIES.length === 0) return null

  return (
    <section id="s10-industries" aria-labelledby="s10-heading" className="border-t border-steel/40 bg-obsidian">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <h2 id="s10-heading" className="fnb-label text-ash">
            Industries
          </h2>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-x-16 md:grid-cols-2" role="list">
          {INDUSTRIES.map((industry, i) => (
            <Reveal
              key={industry.name}
              as="li"
              delay={Math.min(i * 50, 350)}
              className="flex flex-col gap-2 border-b border-steel/40 py-6"
            >
              <span className="fnb-head text-xl text-warm-white">{industry.name}</span>
              <span className="text-pretty text-sm leading-relaxed text-ash">{industry.constraint}</span>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12">
          <Link
            href="/industries"
            className="fnb-label inline-flex h-12 items-center border border-steel px-6 text-warm-white transition-colors hover:border-signal hover:text-signal"
          >
            Industries
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
