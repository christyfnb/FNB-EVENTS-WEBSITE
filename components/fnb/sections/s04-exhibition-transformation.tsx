'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { MediaSlot } from '@/components/fnb/media-slot'
import { BUILD_STAGES, MEDIA } from '@/lib/content'

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
 * S04 EXHIBITION TRANSFORMATION — ScrollStory, TRUE PIN.
 * Ten build states: Floor, Plan, Frame, Panels, Material, Graphics,
 * Light, AV, Furniture, Live. Scroll maps to a 0-1 timeline.
 *
 * Rendering tier: the spec's SC-01 WebGL scene awaits real 3D assets;
 * this ships the medium-tier SVG build sequence which conveys the same
 * layer-separation argument. The Signal is the drawing line (state 02),
 * becomes the frame contour (03), the dimension measure (04-05), and
 * the integrated light line (07).
 *
 * A11y: the canvas is aria-hidden; the ten stages exist as an ordered
 * list in the DOM and are keyboard steppable. Reduced motion shows the
 * final state plus the full list.
 */
export function S04ExhibitionTransformation() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [stage, setStage] = useState(0)
  const reduced = useSyncExternalStore(subscribeToReducedMotion, getReducedMotionSnapshot, () => false)

  useEffect(() => {
    if (reduced) {
      return
    }
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const track = trackRef.current
        if (!track) return
        const rect = track.getBoundingClientRect()
        const total = rect.height - window.innerHeight
        if (total <= 0) return
        const progress = Math.min(1, Math.max(0, -rect.top / total))
        setStage(Math.min(BUILD_STAGES.length - 1, Math.floor(progress * BUILD_STAGES.length)))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  const s = reduced ? BUILD_STAGES.length - 1 : stage

  return (
    <section id="s04-transformation" aria-labelledby="s04-heading" className="border-t border-steel/40 bg-void">
      {/* Scroll track: tall to create the pin duration */}
      <div ref={trackRef} className="relative" style={{ height: reduced ? 'auto' : '400vh' }}>
        <div className={`${reduced ? '' : 'sticky top-0'} flex min-h-dvh flex-col justify-center overflow-hidden`}>
          <div className="mx-auto grid w-full max-w-[1600px] grid-cols-12 items-center gap-6 px-5 py-24 md:px-10">
            {/* Copy + stage labels C1-C3 */}
            <div className="col-span-12 lg:col-span-3">
              <h2 id="s04-heading" className="fnb-label text-ash">
                How a stand becomes a space
              </h2>
              {/* Ordered list of stages — real DOM text, keyboard steppable */}
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

            {/* Build canvas — decorative, meaning carried by the stage list */}
            <div className="col-span-12 mt-10 lg:col-span-8 lg:col-start-4 lg:mt-0" aria-hidden="true">
              <svg viewBox="0 0 800 500" fill="none" className="w-full">
                {/* 01 Floor */}
                <g style={{ opacity: s >= 0 ? 1 : 0, transition: 'opacity 480ms cubic-bezier(0.25,1,0.5,1)' }}>
                  <path d="M 120 400 L 400 470 L 680 400 L 400 330 Z" stroke="var(--fnb-slate)" strokeWidth="1.5" />
                  <path d="M 190 383 L 470 452 M 260 365 L 540 435 M 330 348 L 610 417" stroke="var(--fnb-steel)" strokeWidth="1" />
                  <path d="M 155 418 L 435 348 M 225 435 L 505 365 M 295 452 L 575 383" stroke="var(--fnb-steel)" strokeWidth="1" />
                </g>
                {/* 02 Plan — the Signal drawing line */}
                <g style={{ opacity: s >= 1 ? 1 : 0, transition: 'opacity 480ms cubic-bezier(0.25,1,0.5,1)' }}>
                  <path d="M 200 395 L 400 445 L 600 395 L 400 345 Z" stroke="var(--fnb-signal)" strokeWidth="2" />
                  <path d="M 280 375 L 400 405 M 400 445 L 400 405 M 520 375 L 400 405" stroke="var(--fnb-signal-trace)" strokeWidth="1.5" />
                </g>
                {/* 03 Frame — Signal becomes frame contour */}
                <g style={{ opacity: s >= 2 ? 1 : 0, transition: 'opacity 480ms cubic-bezier(0.25,1,0.5,1)' }}>
                  <path d="M 200 395 L 200 215 M 400 345 L 400 165 M 600 395 L 600 215 M 400 445 L 400 265" stroke="var(--fnb-mist)" strokeWidth="1.5" />
                  <path d="M 200 215 L 400 165 L 600 215 M 200 215 L 400 265 L 600 215" stroke="var(--fnb-signal)" strokeWidth="1.5" />
                  <path d="M 200 305 L 400 255 L 600 305 M 200 305 L 400 355 L 600 305" stroke="var(--fnb-steel)" strokeWidth="1" />
                </g>
                {/* 04-05 Panels + Material — Signal as dimension measure */}
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
                {/* 07 Light — Signal as integrated light line */}
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

            {/* Stage counter C11-C12 */}
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
              See how we build stands {'\u2192'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
