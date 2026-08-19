import Link from 'next/link'
import { Reveal } from '@/components/fnb/reveal'
import { MediaSlot } from '@/components/fnb/media-slot'
import { EVENT_PRODUCTION, MEDIA } from '@/lib/content'

/**
 * S06 EVENT PRODUCTION — FullBleedMedia.
 * Approved conceptual still. Copy inset C1-C4 bottom left on a
 * controlled scrim. No Signal here — the lighting in the image
 * performs that role. Mobile: copy below the film, not overlaid.
 */
export function S06EventProduction() {
  return (
    <section id="s06-events" aria-labelledby="s06-heading" className="relative border-t border-steel/40 bg-void">
      <div className="relative aspect-[4/5] w-full sm:aspect-video sm:max-h-[85vh]">
        <MediaSlot
          asset={MEDIA.eventProduction}
          className="absolute inset-0 h-full w-full"
          sizes="100vw"
        />
        {/* controlled scrim bottom-left */}
        <div aria-hidden="true" className="absolute inset-0 hidden bg-gradient-to-t from-void/85 via-transparent to-transparent sm:block" />

        {/* Desktop overlay copy C1-C4 */}
        <div className="absolute bottom-0 left-0 z-10 hidden max-w-md p-10 sm:block">
          <Reveal>
            <h2 id="s06-heading" className="fnb-label text-ash">
              Event production
            </h2>
            <p className="fnb-head mt-4 text-pretty text-2xl text-warm-white md:text-3xl">
              {EVENT_PRODUCTION.statement}
            </p>
            <Link
              href={EVENT_PRODUCTION.cta.href}
              className="fnb-label mt-6 inline-block text-signal transition-colors hover:text-signal-hot"
            >
              {EVENT_PRODUCTION.cta.label} {'\u2192'}
            </Link>
          </Reveal>
        </div>
      </div>

      {/* Mobile: copy below the film */}
      <div className="px-5 py-10 sm:hidden">
        <Reveal>
          <h2 className="fnb-label text-ash">Event production</h2>
          <p className="fnb-head mt-4 text-pretty text-2xl text-warm-white">{EVENT_PRODUCTION.statement}</p>
          <Link href={EVENT_PRODUCTION.cta.href} className="fnb-label mt-6 inline-block text-signal">
            {EVENT_PRODUCTION.cta.label} {'\u2192'}
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
