'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MediaSlot } from '@/components/fnb/media-slot'
import { DIGITAL_CAPABILITIES, MEDIA } from '@/lib/content'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * S08 DIGITAL CAPABILITIES, AUTOMATION & AI.
 * Technical workflow narrative representing digital systems, automation, and AI workflows.
 * Truth-safe classification: CONCEPTUAL_CAPABILITY_MEDIA.
 *
 * A11y & Performance:
 * - Workflow steps exist in semantic <ul>/<li> tags and remain fully readable without animation.
 * - GSAP ScrollTrigger executes sequential illumination on desktop (≥1024px).
 * - Mobile & prefers-reduced-motion render static workflow items immediately.
 */
export function S08DigitalCapabilities() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const list = listRef.current
    if (!section || !list) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const ctx = gsap.context(() => {
      const items = list.querySelectorAll('li')
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        gsap.fromTo(
          items,
          { opacity: 0.35, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="s08-digital" aria-labelledby="s08-heading" className="border-t border-steel/40 bg-obsidian">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-x-6 gap-y-10 px-5 py-24 md:px-10 md:py-32">
        {/* Copy C1-C4, vertically offset */}
        <div className="order-2 col-span-12 md:order-1 md:col-span-4 md:pt-16">
          <p className="fnb-label text-signal">05 / DIGITAL & AI WORKFLOWS</p>
          <h2 id="s08-heading" className="fnb-head mt-4 text-3xl font-light text-warm-white md:text-4xl">
            Digital Capabilities & Automation
          </h2>
          <p className="mt-4 text-sm font-mono text-ash uppercase">
            Conceptual Workflow Capability
          </p>

          <ul ref={listRef} className="mt-8 flex flex-col gap-5" aria-label="Digital capability steps">
            {DIGITAL_CAPABILITIES.lines.map((line, i) => (
              <li key={i} className="flex gap-4">
                <span aria-hidden="true" className="mt-2.5 h-px w-6 shrink-0 bg-signal" />
                <span className="text-pretty leading-relaxed text-mist">{line}</span>
              </li>
            ))}
          </ul>

          <Link
            href={DIGITAL_CAPABILITIES.cta.href}
            className="fnb-label mt-10 inline-block text-signal transition-colors hover:text-signal-hot"
          >
            {DIGITAL_CAPABILITIES.cta.label} {'\u2192'}
          </Link>
        </div>

        {/* Interface media C6-C12 */}
        <div className="order-1 col-span-12 md:order-2 md:col-span-7 md:col-start-6">
          <div className="overflow-hidden border border-steel/40">
            <MediaSlot
              asset={MEDIA.digitalInterface}
              className="aspect-[16/10] w-full md:aspect-auto md:h-[520px]"
              sizes="(max-width: 767px) 100vw, 58vw"
            />
          </div>
          <figcaption className="mt-4 flex items-center justify-between gap-4 border-t border-steel/40 pt-4">
            <span className="fnb-label text-signal">Conceptual interface visualization</span>
            <span className="fnb-label text-ash">Not client telemetry</span>
          </figcaption>
        </div>
      </div>
    </section>
  )
}
