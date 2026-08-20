'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { PHYSICAL_TO_DIGITAL } from '@/lib/content'

/**
 * S07 PHYSICAL → DIGITAL — ScrollStory + TechnicalDiagram, TRUE PIN.
 * Truss topology resolves into an interface grid and node system across
 * three scroll states: structure, dissolve, system grid. The Signal
 * enters as a rig line and exits as an interface connector.
 * Line-based, no textures — the SVG morph carries the SC-02 argument
 * on every tier. Reduced motion / mobile shows the resolved grid.
 * Copy enters at state two; labels stagger at state three.
 */

const STATE_COUNT = 3
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const MOBILE_QUERY = '(max-width: 767px)'

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

export function S07PhysicalToDigital() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState(0)
  const reduced = useSyncExternalStore(subscribeToStaticMode, getStaticModeSnapshot, () => false)

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

  const t = 'transition-opacity duration-[480ms] ease-out'
  const currentState = reduced ? STATE_COUNT - 1 : state

  return (
    <section id="s07-physical-digital" aria-labelledby="s07-heading" className="border-t border-steel/40 bg-void">
      <div ref={trackRef} className="relative" style={{ height: reduced ? 'auto' : '300vh' }}>
        <div className={`${reduced ? '' : 'sticky top-0'} flex min-h-dvh items-center overflow-hidden`}>
          <div className="mx-auto grid w-full max-w-[1600px] grid-cols-12 items-center gap-6 px-5 py-24 md:px-10">
            {/* Morph canvas — decorative; meaning fully stated in the copy */}
            <div className="col-span-12 lg:col-span-6" aria-hidden="true">
              <svg viewBox="0 0 600 480" fill="none" className="w-full max-w-xl">
                {/* State 1: truss structure — Signal as rig line */}
                <g className={t} style={{ opacity: currentState === 0 ? 1 : currentState === 1 ? 0.35 : 0 }}>
                  <path d="M 60 120 L 540 120 M 60 160 L 540 160" stroke="var(--fnb-mist)" strokeWidth="1.5" />
                  <path d="M 60 120 L 100 160 L 140 120 L 180 160 L 220 120 L 260 160 L 300 120 L 340 160 L 380 120 L 420 160 L 460 120 L 500 160 L 540 120" stroke="var(--fnb-slate)" strokeWidth="1" />
                  <path d="M 100 160 L 100 400 M 500 160 L 500 400" stroke="var(--fnb-mist)" strokeWidth="1.5" />
                  <path d="M 60 140 L 540 140" stroke="var(--fnb-signal)" strokeWidth="2" />
                  <path d="M 100 400 L 500 400" stroke="var(--fnb-steel)" strokeWidth="1.5" />
                </g>

                {/* State 2: dissolve — members fragmenting into points */}
                <g className={t} style={{ opacity: currentState === 1 ? 1 : 0 }}>
                  {Array.from({ length: 48 }).map((_, i) => {
                    const x = 80 + (i % 12) * 40
                    const y = 140 + Math.floor(i / 12) * 70 + (i % 3) * 8
                    return <circle key={i} cx={x} cy={y} r="2" fill="var(--fnb-slate)" />
                  })}
                  <path d="M 80 140 L 540 140" stroke="var(--fnb-signal)" strokeWidth="1.5" strokeDasharray="6 10" />
                </g>

                {/* State 3: interface grid + connected nodes — Signal as connector */}
                <g className={t} style={{ opacity: currentState === 2 ? 1 : 0 }}>
                  {/* grid */}
                  {Array.from({ length: 5 }).map((_, r) => (
                    <path key={`h${r}`} d={`M 80 ${120 + r * 70} L 520 ${120 + r * 70}`} stroke="var(--fnb-steel)" strokeWidth="1" />
                  ))}
                  {Array.from({ length: 7 }).map((_, c) => (
                    <path key={`v${c}`} d={`M ${80 + c * 73.3} 120 L ${80 + c * 73.3} 400`} stroke="var(--fnb-steel)" strokeWidth="1" />
                  ))}
                  {/* nodes */}
                  <circle cx="153" cy="190" r="5" fill="var(--fnb-signal)" />
                  <circle cx="373" cy="190" r="5" fill="var(--fnb-mist)" />
                  <circle cx="227" cy="330" r="5" fill="var(--fnb-mist)" />
                  <circle cx="447" cy="260" r="5" fill="var(--fnb-signal)" />
                  <circle cx="300" cy="120" r="5" fill="var(--fnb-mist)" />
                  {/* Signal as interface connector / workflow edge */}
                  <path d="M 153 190 L 300 120 L 373 190 L 447 260 M 153 190 L 227 330 L 447 260" stroke="var(--fnb-signal)" strokeWidth="1.5" />
                </g>
              </svg>
            </div>

            {/* Copy C7-C11, enters at state two */}
            <div className="col-span-12 mt-10 lg:col-span-5 lg:col-start-8 lg:mt-0">
              <h2 id="s07-heading" className="fnb-label text-ash">
                Physical {'\u2192'} digital
              </h2>
              <p
                data-reveal={currentState >= 1 ? 'in' : ''}
                className="fnb-head mt-6 text-pretty text-2xl text-warm-white md:text-3xl"
              >
                {PHYSICAL_TO_DIGITAL.statement}
              </p>

              {/* Three capability labels — real links, stagger at state three */}
              <ul className="mt-10 flex flex-col" role="list">
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
