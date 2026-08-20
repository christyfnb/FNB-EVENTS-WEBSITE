'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { PHYSICAL_TO_DIGITAL } from '@/lib/content'
import { PhysicalDigitalCanvas } from '@/components/fnb/canvas/physical-digital-canvas'

const STATE_COUNT = 3
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const MOBILE_QUERY = '(max-width: 1023px)'

function subscribeToStaticMode(onStoreChange: () => void) {
  const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY)
  const mobileViewport = window.matchMedia(MOBILE_QUERY)
  reducedMotion.addEventListener('change', onStoreChange)
  mobileViewport.addEventListener('change', onStoreChange)
  return () => {
    reducedMotion.removeEventListener('change', onStoreChange)
    mobileViewport.removeEventListener('change', onStoreChange)
  }
}

function getStaticModeSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches || window.matchMedia(MOBILE_QUERY).matches
}

/**
 * S07 PHYSICAL → DIGITAL CONTINUITY.
 * Conceptual capability visualization featuring interactive Three.js 3D WebGL Canvas (`PhysicalDigitalCanvas`)
 * and canonical semantic HTML capability links.
 *
 * A11y & Performance:
 * - WebGL Canvas is aria-hidden="true" and pointer-events: none.
 * - Meaningful capability content exists 100% in semantic HTML outside canvas.
 * - Mobile (<1024px) & reduced-motion fallback to 2D asset `digital-dashboard.png`.
 * - Truth-safe classification: CONCEPTUAL_CAPABILITY_MEDIA.
 */
export function S07PhysicalToDigital() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState(0)
  const reduced = useSyncExternalStore(subscribeToStaticMode, getStaticModeSnapshot, () => false)

  useEffect(() => {
    if (reduced) return

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
        setState(Math.min(STATE_COUNT - 1, Math.floor(progress * STATE_COUNT)))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  const currentState = reduced ? STATE_COUNT - 1 : state

  return (
    <section id="s07-physical-digital" aria-labelledby="s07-heading" className="border-t border-steel/40 bg-void">
      <div ref={trackRef} className="relative" style={{ height: reduced ? 'auto' : '250vh' }}>
        <div className={`${reduced ? '' : 'sticky top-0'} flex min-h-dvh items-center overflow-hidden`}>
          <div className="mx-auto grid w-full max-w-[1600px] grid-cols-12 items-center gap-6 px-5 py-24 md:px-10">
            {/* 3D WebGL Canvas container — decorative; meaning fully stated in semantic HTML */}
            <div className="col-span-12 lg:col-span-6 flex justify-center" aria-hidden="true">
              <PhysicalDigitalCanvas />
            </div>

            {/* Copy & Semantic Links, enters at state two */}
            <div className="col-span-12 mt-10 lg:col-span-5 lg:col-start-8 lg:mt-0">
              <h2 id="s07-heading" className="fnb-label text-ash">
                Physical {'\u2192'} digital continuity
              </h2>
              <p
                data-reveal={currentState >= 1 ? 'in' : ''}
                className="fnb-head mt-6 text-pretty text-2xl text-warm-white md:text-3xl"
              >
                {PHYSICAL_TO_DIGITAL.statement}
              </p>

              {/* Three capability links — real semantic links */}
              <ul className="mt-10 flex flex-col" aria-label="Digital capability channels">
                {PHYSICAL_TO_DIGITAL.links.map((link, i) => (
                  <li
                    key={link.href}
                    data-reveal={currentState >= 2 ? 'in' : ''}
                    style={{ ['--reveal-delay' as string]: `${i * 50}ms` }}
                    className="border-b border-steel/40"
                  >
                    <Link
                      href={link.href}
                      className="group fnb-label flex h-14 items-center justify-between text-warm-white transition-colors hover:text-signal"
                    >
                      {link.label}
                      <span aria-hidden="true" className="text-signal">
                        {'\u2192'}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
