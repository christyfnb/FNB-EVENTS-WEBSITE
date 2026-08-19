'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { MediaSlot } from '@/components/fnb/media-slot'
import { INTERIORS, MEDIA } from '@/lib/content'

/**
 * S09 INTERIORS — MediaSequence.
 * Full-bleed architectural image with the FNB Signal as a floor-plan
 * line: plan lines draw in, then cross-fade to the finished space.
 * Two states only. Reduced motion shows the finished space.
 */
export function S09Interiors() {
  const ref = useRef<HTMLElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setRevealed(true)
      return
    }
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // plan draws first, finished space fades in after
          setTimeout(() => setRevealed(true), 1400)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} id="s09-interiors" aria-labelledby="s09-heading" className="relative border-t border-steel/40 bg-void">
      <div className="relative aspect-[4/5] w-full sm:aspect-video sm:max-h-[85vh]">
        {/* Finished space — IMG-005 */}
        <div className={`absolute inset-0 transition-opacity duration-[480ms] ${revealed ? 'opacity-100' : 'opacity-40'}`}>
          <MediaSlot
            src={MEDIA.interiorSpace}
            alt="Finished commercial interior with designed lighting and corrected verticals"
            assetId="IMG-005"
            brief="Finished interior, 16:9, architectural discipline. Drop img-005-interior.jpg into public/media/"
            className="h-full w-full"
          />
        </div>

        {/* Plan overlay in Signal colour — decorative */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 675"
          className={`pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-[640ms] ${
            revealed ? 'opacity-15' : 'opacity-90'
          }`}
          preserveAspectRatio="xMidYMid slice"
        >
          <g stroke="var(--fnb-signal)" strokeWidth="1.5" fill="none">
            <path d="M 200 130 L 1000 130 L 1000 545 L 200 545 Z" />
            <path d="M 200 340 L 560 340 M 560 130 L 560 340 M 760 340 L 1000 340 M 760 340 L 760 545" />
            <path d="M 380 130 L 380 250 M 560 460 L 660 460" strokeDasharray="8 8" />
            <circle cx="470" cy="235" r="26" strokeDasharray="4 6" />
            <path d="M 160 130 L 160 545 M 152 130 L 168 130 M 152 545 L 168 545" strokeWidth="1" />
          </g>
        </svg>

        {/* Caption C1-C3 */}
        <div className="absolute bottom-0 left-0 z-10 max-w-sm p-6 sm:p-10">
          <h2 id="s09-heading" className="fnb-label text-ash">
            Interiors
          </h2>
          <p className="fnb-head mt-3 text-2xl text-warm-white md:text-3xl">{INTERIORS.caption}</p>
          <Link
            href={INTERIORS.cta.href}
            className="fnb-label mt-5 inline-block text-signal transition-colors hover:text-signal-hot"
          >
            {INTERIORS.cta.label} {'\u2192'}
          </Link>
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-void/85 to-transparent" />
      </div>
    </section>
  )
}
