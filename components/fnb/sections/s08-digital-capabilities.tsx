import Link from 'next/link'
import { Reveal } from '@/components/fnb/reveal'
import { MediaSlot } from '@/components/fnb/media-slot'
import { DIGITAL_CAPABILITIES, MEDIA } from '@/lib/content'

/**
 * S08 DIGITAL CAPABILITIES — ImagePair.
 * Asymmetric pairing: interface media C6-C12, copy C1-C4, vertically
 * offset so it does not read as a two-column card. The interface image
 * remains explicitly conceptual and is not presented as a shipped product.
 */
export function S08DigitalCapabilities() {
  return (
    <section id="s08-digital" aria-labelledby="s08-heading" className="border-t border-steel/40 bg-obsidian">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-x-6 gap-y-10 px-5 py-24 md:px-10 md:py-32">
        {/* Copy C1-C4, offset down */}
        <div className="order-2 col-span-12 md:order-1 md:col-span-4 md:pt-24">
          <Reveal>
            <h2 id="s08-heading" className="fnb-label text-ash">
              Digital capabilities
            </h2>
            <ul className="mt-8 flex flex-col gap-5" role="list">
              {DIGITAL_CAPABILITIES.lines.map((line, i) => (
                <Reveal key={i} as="li" delay={i * 50} className="flex gap-4">
                  <span aria-hidden="true" className="mt-2.5 h-px w-6 shrink-0 bg-signal" />
                  <span className="text-pretty leading-relaxed text-mist">{line}</span>
                </Reveal>
              ))}
            </ul>
            <Link
              href={DIGITAL_CAPABILITIES.cta.href}
              className="fnb-label mt-10 inline-block text-signal transition-colors hover:text-signal-hot"
            >
              {DIGITAL_CAPABILITIES.cta.label} {'\u2192'}
            </Link>
          </Reveal>
        </div>

        {/* Interface media C6-C12 */}
        <Reveal className="order-1 col-span-12 md:order-2 md:col-span-7 md:col-start-6">
          <MediaSlot
            asset={MEDIA.digitalInterface}
            className="aspect-[16/10] w-full md:aspect-auto md:h-[520px]"
            sizes="(max-width: 767px) 100vw, 58vw"
          />
        </Reveal>
      </div>
    </section>
  )
}
