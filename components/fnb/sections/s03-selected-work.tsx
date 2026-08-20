'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MediaSlot } from '@/components/fnb/media-slot'
import { MEDIA } from '@/lib/content'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * S03 SPATIAL CAPABILITY STUDY (formerly S03SelectedWork).
 * Conceptual spatial capability showcase using bounded GSAP parallax.
 * Truth-safe framing: communicates spatial design atmosphere, not delivered-project proof.
 */
export function S03SelectedWork() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const imageContainer = imageContainerRef.current
    if (!section || !imageContainer) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        gsap.fromTo(
          imageContainer,
          { y: -20 },
          {
            y: 20,
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
    <section ref={sectionRef} id="s03-work" aria-labelledby="s03-heading" className="border-t border-steel/40 bg-obsidian">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-x-6 gap-y-10 px-5 py-24 md:px-10 md:py-32">
        <div className="col-span-12 lg:col-span-4 lg:pt-16">
          <p className="fnb-label text-ash">Spatial Capability Study · publication review</p>
          <h2 id="s03-heading" className="fnb-head mt-6 max-w-[12ch] text-4xl text-warm-white md:text-6xl">
            Atmosphere & Spatial Scale.
          </h2>
          <p className="mt-8 max-w-md text-pretty leading-relaxed text-mist">
            Spatial capability study illustrating architectural volume, material contrast, and integrated lighting systems.
            This gateway presents conceptual spatial design thinking—not delivered-project proof.
          </p>
          <Link
            href="/portfolio"
            className="fnb-label mt-10 inline-flex h-12 items-center border border-steel px-6 text-warm-white transition-colors hover:border-signal hover:text-signal"
          >
            Portfolio publication status
          </Link>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <div className="overflow-hidden border border-steel/40">
            <div ref={imageContainerRef} className="will-change-transform">
              <MediaSlot
                asset={MEDIA.editorialGateway}
                className="aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[4/3]"
                sizes="(max-width: 1023px) 100vw, 58vw"
              />
            </div>
          </div>
          <figcaption className="mt-4 flex items-center justify-between gap-4 border-t border-steel/40 pt-4">
            <span className="fnb-label text-signal">Conceptual capability visualization</span>
            <span className="fnb-label text-ash">Not project evidence</span>
          </figcaption>
        </div>
      </div>
    </section>
  )
}
