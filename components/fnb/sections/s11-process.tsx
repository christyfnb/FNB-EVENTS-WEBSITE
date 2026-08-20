'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROCESS_STAGES } from '@/lib/content'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * S11 — ARCHITECTURAL PROCESS TIMELINE (`#process`).
 * Canonical process stages rendered with GSAP ScrollTrigger progress line.
 * Desktop: horizontal progress bar; Mobile: vertical progress bar.
 * Reduced motion: renders complete progress line instantly.
 */
export function S11Process() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const progressBar = progressBarRef.current
    if (!section || !progressBar) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressBar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 0.3,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="process" aria-labelledby="process-heading" className="border-t border-slate/40 bg-obsidian">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div>
          <p className="fnb-label text-signal">S11 &middot; How we work</p>
          <h2 id="process-heading" className="mt-4 max-w-2xl text-3xl font-semibold text-balance text-warm-white md:text-4xl">
            One production standard, physical or digital.
          </h2>
        </div>

        {/* Process progress bar container */}
        <div className="relative mt-12 mb-6 h-1 w-full bg-slate/40 overflow-hidden" aria-hidden="true">
          <div
            ref={progressBarRef}
            className="h-full w-full bg-signal origin-left will-change-transform"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        <ol className="grid grid-cols-1 gap-px bg-slate/40 sm:grid-cols-2 lg:grid-cols-4" aria-label="Process stages">
          {PROCESS_STAGES.map((stage, i) => (
            <li key={stage.name} className="group bg-obsidian p-6 md:p-8">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs text-ash">{String(i + 1).padStart(2, '0')}</span>
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-slate transition-colors duration-300 group-hover:bg-signal"
                />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-warm-white">{stage.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ash">{stage.line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
