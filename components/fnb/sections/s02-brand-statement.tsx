import { Reveal } from '@/components/fnb/reveal'
import { BRAND_STATEMENT } from '@/lib/content'

/**
 * S02 BRAND PROPOSITION — EditorialHeadline.
 * Pure typography on obsidian, no media. Signal appears only as a
 * short underline beneath the final clause.
 */
export function S02BrandStatement() {
  return (
    <section id="s02-brand" aria-labelledby="s02-heading" className="bg-obsidian">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-x-6 px-5 py-28 md:px-10 md:py-44">
        <Reveal className="col-span-12 md:col-span-9 md:col-start-2">
          <h2
            id="s02-heading"
            className="fnb-head text-balance text-warm-white"
            style={{ fontSize: 'clamp(1.5rem, 1rem + 2.4vw, 3.25rem)' }}
          >
            {BRAND_STATEMENT.statement[0]}{' '}
            <span className="text-mist">
              Exhibitions, events, technical production and interiors give a brand somewhere to stand.{' '}
            </span>
            <span className="relative inline">
              Websites, automation and AI workflows give it somewhere to operate.
              <span aria-hidden="true" className="absolute -bottom-2 left-0 h-0.5 w-24 bg-signal" />
            </span>
          </h2>
        </Reveal>
        <Reveal delay={200} className="col-span-12 mt-10 md:col-span-2 md:col-start-11 md:mt-0">
          <span className="fnb-label text-ash">{BRAND_STATEMENT.label}</span>
        </Reveal>
      </div>
    </section>
  )
}
