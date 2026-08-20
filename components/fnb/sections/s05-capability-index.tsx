'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { Reveal } from '@/components/fnb/reveal'
import { MediaSlot } from '@/components/fnb/media-slot'
import { CAPABILITIES } from '@/lib/content'

const CROSSFADE_DURATION_MS = 320
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
 * S05 CAPABILITY INDEX — CapabilityIndex + ServiceIndex.
 * Eight numbered rows, client problem leads. Architectural index,
 * explicitly NOT eight cards. Shared media column sticky within the
 * section, environment cross-fades on focus (320ms).
 * Mobile: eight stacked capability stories, each with its own image.
 */
export function S05CapabilityIndex() {
  const [focused, setFocused] = useState(0)
  const [outgoing, setOutgoing] = useState<number | null>(null)
  const focusedRef = useRef(0)
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const reducedMotion = useSyncExternalStore(subscribeToReducedMotion, getReducedMotionSnapshot, () => false)
  const activeCapability = CAPABILITIES[focused]

  useEffect(
    () => () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current)
    },
    [],
  )

  const selectCapability = (index: number) => {
    const previous = focusedRef.current
    if (index === previous) return

    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current)
      transitionTimerRef.current = null
    }

    focusedRef.current = index
    setFocused(index)

    if (reducedMotion) {
      setOutgoing(null)
      return
    }

    setOutgoing(previous)
    transitionTimerRef.current = setTimeout(() => {
      setOutgoing(null)
      transitionTimerRef.current = null
    }, CROSSFADE_DURATION_MS)
  }

  return (
    <section id="s05-capabilities" aria-labelledby="s05-heading" className="border-t border-steel/40 bg-obsidian">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <h2 id="s05-heading" className="fnb-label text-ash">
            Capabilities
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* Numbered rows C1-C6 */}
          <ul className="flex flex-1 flex-col" role="list">
            {CAPABILITIES.map((cap, i) => (
              <li key={cap.number} className="border-b border-steel/40">
                <Link
                  href={cap.route}
                  className="group block py-7 outline-none"
                  onMouseEnter={() => selectCapability(i)}
                  onFocus={() => selectCapability(i)}
                >
                  <div className="flex items-baseline gap-5">
                    <span className={`fnb-label transition-colors ${focused === i ? 'text-signal' : 'text-ash'}`}>
                      {cap.number}
                    </span>
                    <div className="flex-1">
                      <p
                        className={`fnb-head text-pretty text-xl transition-colors md:text-2xl ${
                          focused === i ? 'text-warm-white' : 'text-mist'
                        }`}
                      >
                        {cap.problem}
                      </p>
                      <p className="fnb-label mt-3 flex items-center gap-2 text-ash">
                        <span
                          aria-hidden="true"
                          className={`h-px bg-signal transition-all duration-300 ${focused === i ? 'w-8' : 'w-0'}`}
                        />
                        {cap.name}
                      </p>
                    </div>
                  </div>

                  {/* Mobile: own media per capability */}
                  <div className="mt-5 lg:hidden">
                    <MediaSlot
                      asset={cap.image}
                      className="aspect-[16/10] w-full"
                      sizes="(max-width: 1023px) 100vw, 38vw"
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Shared environment plane — sticky within section, desktop only */}
          <div className="hidden w-[38%] lg:block">
            <div className="sticky top-24">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                {outgoing !== null && !reducedMotion ? (
                  <div
                    key={`outgoing-${outgoing}-${focused}`}
                    aria-hidden="true"
                    className="absolute inset-0 animate-out fade-out fill-mode-forwards duration-[320ms]"
                  >
                    <MediaSlot
                      asset={CAPABILITIES[outgoing].image}
                      className="h-full w-full"
                      sizes="38vw"
                      decorative
                    />
                  </div>
                ) : null}
                <div
                  key={`incoming-${activeCapability.number}`}
                  aria-hidden="true"
                  className={`absolute inset-0 ${reducedMotion ? '' : 'animate-in fade-in duration-[320ms]'}`}
                >
                  <MediaSlot
                    asset={activeCapability.image}
                    className="h-full w-full"
                    sizes="38vw"
                    decorative
                  />
                </div>
              </div>
              <p className="fnb-label mt-4 text-ash">{activeCapability.cluster}</p>
            </div>
          </div>
        </div>

        <Reveal className="mt-12">
          <Link
            href="/services"
            className="fnb-label inline-flex h-12 items-center border border-steel px-6 text-warm-white transition-colors hover:border-signal hover:text-signal"
          >
            All capabilities
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
