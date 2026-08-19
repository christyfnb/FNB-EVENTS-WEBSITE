'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Reveal } from '@/components/fnb/reveal'
import { MediaSlot } from '@/components/fnb/media-slot'
import { SELECTED_WORK } from '@/lib/content'

/**
 * S03 SELECTED WORK — ProjectIndex + sticky media surface.
 * Editorial index, no cards. Media column sticky within the section only.
 * Keyboard focus drives the same preview change as pointer.
 * Mobile: unpinned, each row followed by its own media.
 */
export function S03SelectedWork() {
  const [focused, setFocused] = useState(0)

  return (
    <section id="s03-work" aria-labelledby="s03-heading" className="border-t border-steel/40 bg-obsidian">
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <h2 id="s03-heading" className="fnb-label text-ash">
            Selected work
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* Project list C1-C5 */}
          <ul className="flex flex-1 flex-col lg:max-w-lg" role="list">
            {SELECTED_WORK.map((project, i) => (
              <li key={project.id} className="relative border-b border-steel/40">
                {/* Signal hairline marker at the focused row */}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-0 h-full w-0.5 bg-signal transition-opacity duration-200 ${
                    focused === i ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <Link
                  href={project.href}
                  className="group block py-6 pl-5 outline-none"
                  onMouseEnter={() => setFocused(i)}
                  onFocus={() => setFocused(i)}
                >
                  <span
                    className={`fnb-head block text-2xl transition-colors md:text-3xl ${
                      focused === i ? 'text-warm-white' : 'text-mist'
                    }`}
                  >
                    {project.title}
                  </span>
                  <span className="fnb-label mt-2 block text-ash">
                    {project.service} {'\u00B7'} {project.location} {'\u00B7'} {project.year}
                  </span>
                </Link>

                {/* Mobile: own media per row, no hover logic */}
                <div className="mb-6 lg:hidden">
                  <MediaSlot
                    src={project.image}
                    alt={`${project.title} project photography`}
                    assetId={`PROJ-${String(i + 1).padStart(2, '0')}`}
                    brief={`Real project photo, 3:2. Drop into public${project.image}`}
                    className="aspect-[3/2] w-full"
                  />
                  <Link href={project.href} className="fnb-label mt-3 inline-block text-signal">
                    View project
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          {/* Sticky media surface — desktop only */}
          <div className="hidden flex-1 lg:block">
            <div className="sticky top-24">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                {SELECTED_WORK.map((project, i) => (
                  <div
                    key={project.id}
                    aria-hidden={focused !== i}
                    className={`absolute inset-0 transition-opacity duration-[260ms] ease-out ${
                      focused === i ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <MediaSlot
                      src={project.image}
                      alt={`${project.title} project photography`}
                      assetId={`PROJ-${String(i + 1).padStart(2, '0')}`}
                      brief={`Real project photo, 16:10. Drop into public${project.image}`}
                      className="h-full w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Reveal className="mt-12">
          <Link href="/portfolio" className="fnb-label inline-flex h-12 items-center border border-steel px-6 text-warm-white transition-colors hover:border-signal hover:text-signal">
            See all work
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
