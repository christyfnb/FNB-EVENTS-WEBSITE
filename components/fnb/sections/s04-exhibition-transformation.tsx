'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MediaSlot } from '@/components/fnb/media-slot'
import { BUILD_STAGES, MEDIA } from '@/lib/content'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function subscribeToReducedMotion(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY)
  mediaQuery.addEventListener('change', onStoreChange)
  return () => mediaQuery.removeEventListener('change', onStoreChange)
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches
}

/**
 * S04 EXHIBITION BOOTH DESIGN & BUILD — GSAP ScrollTrigger build sequence.
 * Ten architectural stages: Floor, Plan, Frame, Panels, Material, Graphics,
 * Light, AV, Furniture, Live.
 *
 * Truth-safe provenance: CONCEPTUAL_CAPABILITY_MEDIA.
 * A11y: SVG build canvas is aria-hidden; 10 stages exist in semantic <ol> list
 * and are keyboard steppable. Reduced motion shows final stage instantly.
 */
export function S04ExhibitionTransformation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const [stage, setStage] = useState(0)
  const reduced = useSyncExternalStore(subscribeToReducedMotion, getReducedMotionSnapshot, () => false)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const canvasContainer = canvasContainerRef.current
    if (!section || !track || reduced) return

    const ctx = gsap.context(() => {
      // 1. Clip-path reveal on entry for the canvas container
      if (canvasContainer) {
        gsap.fromTo(
          canvasContainer,
          { clipPath: 'inset(0% 100% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          },
        )
      }

      // 2. ScrollTrigger pin and progress tracking across 10 build stages
      ScrollTrigger.create({
        trigger: track,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.2,
        onUpdate: (self) => {
          const idx = Math.min(BUILD_STAGES.length - 1, Math.floor(self.progress * BUILD_STAGES.length))
          setStage(idx)
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  const s = reduced ? BUILD_STAGES.length - 1 : stage

  return (
    <section ref={sectionRef} id="s04-transformation" aria-labelledby="s04-heading" className="border-t border-steel/40 bg-void">
      {/* Scroll track for pinned duration */}
      <div ref={trackRef} className="relative" style={{ height: reduced ? 'auto' : '300vh' }}>
        <div className={`${reduced ? '' : 'sticky top-0'} flex min-h-dvh flex-col justify-center overflow-hidden`}>
          <div className="mx-auto grid w-full max-w-[1600px] grid-cols-12 items-center gap-6 px-5 py-24 md:px-10">
            {/* Copy + stage labels */}
            <div className="col-span-12 lg:col-span-3">
              <h2 id="s04-heading" className="fnb-label text-ash">
                Exhibition Booth Design & Build · Conceptual Sequence
              </h2>
              <ol className="mt-8 flex flex-col gap-1" aria-label="Build stages">
                {BUILD_STAGES.map((label, i) => (
                  <li key={label}>
                    <button
                      type="button"
                      onClick={() => setStage(i)}
                      aria-current={s === i ? 'step' : undefined}
                      className={`fnb-label flex h-8 items-center gap-3 transition-colors ${
                        s === i ? 'text-signal' : i < s ? 'text-mist' : 'text-ash/60'
                      }`}
                    >
                      <span className="w-6 text-left">{String(i + 1).padStart(2, '0')}</span>
                      {label}
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            {/* Build canvas container */}
            <div ref={canvasContainerRef} className="col-span-12 mt-10 lg:col-span-8 lg:col-start-4 lg:mt-0" aria-hidden="true">
              <svg viewBox="0 0 800 500" fill="none" className="w-full">
                {/* 01 Floor */}
                <g style={{ opacity: s >= 0 ? 1 : 0, transition: 'opacity 480ms cubic-bezier(0.25,1,0.5,1)' }}>
                  <path d="M 120 400 L 400 470 L 680 400 L 400 330 Z" stroke="var(--fnb-slate)" strokeWidth="1.5" />
                  <path d="M 190 383 L 470 452 M 260 365 L 540 435 M 330 348 L 610 417" stroke="var(--fnb-steel)" strokeWidth="1" />
                  <path d="M 155 418 L 435 348 M 225 435 L 505 365 M 295 452 L 575 383" stroke="var(--fnb-steel)" strokeWidth="1" />
                </g>
                {/* 02 Plan */}
                <g style={{ opacity: s >= 1 ? 1 : 0, transition: 'opacity 480ms cubic-bezier(0.25,1,0.5,1)' }}>
                  <path d="M 200 395 L 400 445 L 600 395 L 400 345 Z" stroke="var(--fnb-signal)" strokeWidth="2" />
                  <path d="M 280 375 L 400 405 M 400 445 L 400 405 M 520 375 L 400 405" stroke="var(--fnb-signal-trace)" strokeWidth="1.5" />
                </g>
                {/* 03 Frame */}
                <g style={{ opacity: s >= 2 ? 1 : 0, transition: 'opacity 480ms cubic-bezier(0.25,1,0.5,1)' }}>
                  <path d="M 200 395 L 200 215 M 400 345 L 400 165 M 600 395 L 600 215 M 400 445 L 400 265" stroke="var(--fnb-mist)" strokeWidth="1.5" />
                  <path d="M 200 215 L 400 165 L 600 215 M 200 215 L 400 265 L 600 215" stroke="var(--fnb-signal)" strokeWidth="1.5" />
                  <path d="M 200 305 L 400 255 L 600 305 M 200 305 L 400 355 L 600 305" stroke="var(--fnb-steel)" strokeWidth="1" />
                </g>
                {/* 04-05 Panels + Material */}
                <g style={{ opacity: s >= 3 ? 1 : 0, transition: 'opacity 480ms cubic-bezier(0.25,1,0.5,1)' }}>
                  <path d="M 200 215 L 400 165 L 400 345 L 200 395 Z" fill="var(--fnb-graphite)" fillOpacity="0.9" stroke="var(--fnb-steel)" strokeWidth="1" />
                </g>
                <g style={{ opacity: s >= 4 ? 1 : 0, transition: 'opacity 480ms cubic-bezier(0.25,1,0.5,1)' }}>
                  <path d="M 400 165 L 600 215 L 600 395 L 400 345 Z" fill="var(--fnb-steel)" fillOpacity="0.7" stroke="var(--fnb-slate)" strokeWidth="1" />
                  <path d="M 170 200 L 170 400 M 162 200 L 178 200 M 162 400 L 178 400" stroke="var(--fnb-signal)" strokeWidth="1.5" />
                </g>
                {/* 06 Graphics */}
                <g style={{ opacity: s >= 5 ? 1 : 0, transition: 'opacity 480ms cubic-bezier(0.25,1,0.5,1)' }}>
                  <rect x="260" y="240" width="90" height="56" transform="skewY(-14)" fill="var(--fnb-signal-deep)" />
                  <rect x="275" y="315" width="60" height="8" transform="skewY(-14)" fill="var(--fnb-mist)" />
                </g>
                {/* 07 Light */}
                <g style={{ opacity: s >= 6 ? 1 : 0, transition: 'opacity 480ms cubic-bezier(0.25,1,0.5,1)' }}>
                  <path d="M 200 215 L 400 165 L 600 215" stroke="var(--fnb-signal-hot)" strokeWidth="3" />
                  <path d="M 200 215 L 400 165 L 600 215 L 400 265 Z" fill="var(--fnb-signal)" fillOpacity="0.08" />
                </g>
                {/* 08 AV */}
                <g style={{ opacity: s >= 7 ? 1 : 0, transition: 'opacity 480ms cubic-bezier(0.25,1,0.5,1)' }}>
                  <rect x="455" y="235" width="100" height="62" transform="skewY(14)" fill="var(--fnb-void)" stroke="var(--fnb-signal-trace)" strokeWidth="1.5" />
                  <rect x="470" y="252" width="70" height="4" transform="skewY(14)" fill="var(--fnb-signal)" />
                  <rect x="470" y="264" width="46" height="3" transform="skewY(14)" fill="var(--fnb-slate)" />
                </g>
                {/* 09 Furniture */}
                <g style={{ opacity: s >= 8 ? 1 : 0, transition: 'opacity 480ms cubic-bezier(0.25,1,0.5,1)' }}>
                  <path d="M 340 415 L 390 427 L 390 400 L 340 388 Z" fill="var(--fnb-graphite)" stroke="var(--fnb-slate)" strokeWidth="1" />
                  <path d="M 430 420 L 470 410 L 470 385 L 430 395 Z" fill="var(--fnb-graphite)" stroke="var(--fnb-slate)" strokeWidth="1" />
                </g>
                {/* 10 Live */}
                <g style={{ opacity: s >= 9 ? 1 : 0, transition: 'opacity 640ms cubic-bezier(0.25,1,0.5,1)' }}>
                  <path d="M 120 400 L 400 470 L 680 400 L 400 330 Z" fill="var(--fnb-signal)" fillOpacity="0.05" />
                  <circle cx="310" cy="430" r="3" fill="var(--fnb-warm-white)" />
                  <circle cx="470" cy="440" r="3" fill="var(--fnb-warm-white)" />
                  <circle cx="540" cy="410" r="3" fill="var(--fnb-warm-white)" />
                  <path d="M 200 215 L 400 165 L 600 215" stroke="var(--fnb-signal-hot)" strokeWidth="3" />
                </g>
              </svg>
              <MediaSlot
                asset={MEDIA.boothBuild}
                className={`mx-auto -mt-16 aspect-[16/7] w-[88%] border border-steel/40 transition-opacity duration-[640ms] ${
                  s >= 8 ? 'opacity-75' : 'opacity-20'
                }`}
                sizes="(max-width: 1023px) 92vw, 58vw"
                decorative
              />
            </div>

            {/* Stage counter */}
            <div className="fnb-label col-span-12 mt-6 flex justify-between text-ash lg:col-span-1 lg:col-start-12 lg:mt-0 lg:flex-col lg:items-end lg:gap-2">
              <span className="text-signal">{String(s + 1).padStart(2, '0')}</span>
              <span>/ {String(BUILD_STAGES.length).padStart(2, '0')}</span>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[1600px] px-5 pb-10 md:px-10">
            <Link
              href="/services/exhibition-booth-design-build"
              className="fnb-label text-signal transition-colors hover:text-signal-hot"
            >
              Exhibition booth design capability {'\u2192'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
