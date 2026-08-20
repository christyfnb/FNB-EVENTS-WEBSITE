'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { HERO, MEDIA } from '@/lib/content'
import { MediaSlot } from '@/components/fnb/media-slot'

/**
 * S01 HERO — CinematicHero.
 * VD-01 film background (poster-first), FNB Signal traverses from
 * lower-left through the frame once and its arrival triggers the
 * line-masked headline reveal. Signal does not loop.
 */
export function S01Hero() {
  const [signalArrived, setSignalArrived] = useState(false)

  useEffect(() => {
    // Signal travel is 2200ms + 300ms delay; headline reveal fires as it arrives.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = setTimeout(() => setSignalArrived(true), reduced ? 0 : 1600)
    return () => clearTimeout(t)
  }, [])

  const headlineLines = ['Presence,', 'engineered.']

  return (
    <section id="s01-hero" aria-label="Hero" className="relative flex min-h-dvh flex-col justify-end overflow-hidden bg-void">
      {/* Source-eligible conceptual image; registry classification prevents proof claims. */}
      <div className="absolute inset-0" aria-hidden="true">
        <MediaSlot
          asset={MEDIA.hero}
          className="h-full w-full"
          imgClassName="scale-[1.02]"
          sizes="100vw"
          preload
          decorative
        />
        {/* controlled scrim — copy legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/55 to-void/25" />
      </div>

      {/* FNB Signal — single molten traversal, lower-left to headline. Does not loop. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMax slice"
      >
        <path
          className="fnb-signal-path"
          d="M -40 880 L 240 880 L 320 800 L 560 800 L 640 720 L 900 720 L 940 680 L 940 560 L 90 560"
          stroke="var(--fnb-signal)"
          strokeWidth="2"
        />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-16 pt-32 md:px-10 md:pb-20">
        {/* Descriptor label C1-C3 */}
        <p
          data-reveal={signalArrived ? 'in' : ''}
          className="fnb-label mb-6 text-signal"
        >
          {HERO.eyebrow}
        </p>

        {/* Display headline, lower third, line-masked reveal triggered by Signal arrival */}
        <h1
          data-reveal={signalArrived ? 'in' : ''}
          className="fnb-display text-warm-white"
          style={{ fontSize: 'clamp(3.25rem, 1.2rem + 9vw, 11rem)' }}
        >
          {headlineLines.map((line, i) => (
            <span key={line} className="fnb-line-mask" style={{ ['--reveal-delay' as string]: `${i * 60}ms` }}>
              <span style={{ ['--reveal-delay' as string]: `${i * 60}ms` }}>{line}</span>
            </span>
          ))}
        </h1>

        {/* Secondary line C1-C5 */}
        <p
          data-reveal={signalArrived ? 'in' : ''}
          style={{ ['--reveal-delay' as string]: '840ms' }}
          className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-mist md:text-lg"
        >
          {HERO.lead}
        </p>

        {/* CTA cluster C1-C4 at baseline */}
        <div
          data-reveal={signalArrived ? 'in' : ''}
          style={{ ['--reveal-delay' as string]: '1160ms' }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <Link
            href={HERO.primaryCta.href}
            className="fnb-label flex h-14 items-center justify-center bg-signal px-8 text-void transition-colors hover:bg-signal-hot"
          >
            {HERO.primaryCta.label}
          </Link>
          <Link
            href={HERO.secondaryCta.href}
            className="fnb-label flex h-14 items-center justify-center border border-steel px-8 text-warm-white transition-colors hover:border-mist"
          >
            {HERO.secondaryCta.label}
          </Link>
        </div>
      </div>

      {/* Scroll cue C12 bottom right — decorative */}
      <div aria-hidden="true" className="absolute bottom-8 right-8 hidden flex-col items-center gap-2 md:flex">
        <span className="fnb-label text-ash">Scroll</span>
        <span className="fnb-scroll-cue block h-8 w-px bg-signal" />
      </div>
    </section>
  )
}
