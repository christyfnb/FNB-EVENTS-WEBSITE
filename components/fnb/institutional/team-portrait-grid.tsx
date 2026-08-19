import type { MediaAsset } from '@/lib/media-registry'
import type { TEAM_PORTRAIT_PRESENTATION } from '@/lib/task5-institutional-content'
import { MediaSlot } from '@/components/fnb/media-slot'

type Presentation = (typeof TEAM_PORTRAIT_PRESENTATION)[number]

export function TeamPortraitGrid({ portraits, presentation }: { portraits: readonly MediaAsset[]; presentation: readonly Presentation[] }) {
  if (portraits.length !== presentation.length) throw new Error('Team portrait media and presentation registries are not aligned')
  return (
    <section aria-labelledby="team-portrait-grid-heading" className="border-b border-steel/40 bg-void">
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
        <h2 id="team-portrait-grid-heading" className="sr-only">{presentation[0]?.identityLabel}</h2>
        <ul className="grid grid-cols-2 gap-px bg-steel/50 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {portraits.map((portrait, index) => {
            const item = presentation[index]
            if (portrait.id !== item.mediaId) throw new Error(`Unexpected team portrait order at ${portrait.id}`)
            return (
              <li key={portrait.id} data-team-portrait={portrait.id} className="min-w-0 bg-obsidian">
                <figure>
                  <MediaSlot asset={portrait} sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" className="aspect-[3/4]" imgClassName="object-cover" />
                  <figcaption className="border-t border-steel/40 px-4 py-5">
                    <p className="fnb-label text-signal">{item.displayLabel}</p>
                    <p className="mt-3 text-sm text-warm-white">{item.identityLabel}</p>
                    <p className="mt-1 text-xs text-ash">{item.roleLabel}</p>
                  </figcaption>
                </figure>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
