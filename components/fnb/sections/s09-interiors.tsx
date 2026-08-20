'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MediaSlot } from '@/components/fnb/media-slot'
import { INTERIORS, MEDIA } from '@/lib/content'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * S09 INTERIORS & COMMERCIAL SPACES.
 * Architectural spatial presentation featuring bounded camera pan (`xPercent: 0 → -4`).
 * Truth-safe classification: CONCEPTUAL_CAPABILITY_MEDIA.
 *
 * A11y & Performance:
 * - Camera pan executes via GSAP ScrollTrigger transform on desktop (≥1024px).
 * - Image frame retains overflow-hidden.
 * - Mobile & prefers-reduced-motion render static architectural image.
 */
export function S09Interiors() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageFrameRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const imageFrame = imageFrameRef.current
    if (!section || !imageFrame) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        gsap.fromTo(
          imageFrame,
          { xPercent: 0 },
          {
            xPercent: -4,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="s09-interiors" aria-labelledby="s09-heading" className="relative border-t border-steel/40 bg-void">
      <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-video sm:max-h-[85vh]">
        {/* Conceptual spatial capability image inside bounded camera pan frame */}
        <div ref={imageFrameRef} className="absolute inset-0 h-full w-[105%] will-change-transform">
          <MediaSlot
            asset={MEDIA.interiorSpace}
            className="h-full w-full object-cover"
            sizes="100vw"
          />
        </div>

        {/* Architectural plan overlay in Signal color — decorative */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 675"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-25"
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
            06 / BRAND & SPACE
          </h2>
          <p className="fnb-head mt-3 text-2xl text-warm-white md:text-3xl">{INTERIORS.caption}</p>
          <Link
            href={INTERIORS.cta.href}
            className="fnb-label mt-5 inline-block text-signal transition-colors hover:text-signal-hot"
          >
            {INTERIORS.cta.label} {'\u2192'}
          </Link>
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-void/85 to-transparent pointer-events-none" />
      </div>
    </section>
  )
}
