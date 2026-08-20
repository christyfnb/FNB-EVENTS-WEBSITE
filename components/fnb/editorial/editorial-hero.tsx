import type { ReactNode } from 'react'
import type { MediaAsset } from '@/lib/media-registry'
import { ConceptualMedia } from '@/components/fnb/editorial/conceptual-media'

type EditorialHeroProps = {
  eyebrow: string
  title: string
  lead: string
  media?: MediaAsset
  mediaDisclosure?: string
  children?: ReactNode
  serviceBlock?: string
}

export function EditorialHero({ eyebrow, title, lead, media, mediaDisclosure, children, serviceBlock }: EditorialHeroProps) {
  return (
    <section aria-labelledby="page-heading" data-service-block={serviceBlock} data-service-kind={serviceBlock ? 'hero' : undefined} className="relative overflow-hidden border-b border-steel/50 bg-void pt-28 md:pt-36">
      <div className="pointer-events-none absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-signal/70 to-transparent" />
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 pb-16 md:px-10 md:pb-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)] lg:items-end">
        <div>
          <p className="fnb-label text-signal">{eyebrow}</p>
          <h1 id="page-heading" className="fnb-display mt-7 max-w-[12ch] text-5xl text-warm-white sm:text-6xl md:text-8xl">
            {title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-mist md:text-xl">{lead}</p>
          {children ? <div className="mt-10">{children}</div> : null}
        </div>
        {media ? (
          <ConceptualMedia asset={media} sizes="(min-width: 1024px) 44vw, 100vw" className="aspect-[4/3] lg:aspect-[5/6]" label={mediaDisclosure} preload />
        ) : (
          <div aria-hidden="true" className="hidden min-h-80 border-l border-steel/50 pl-8 lg:block">
            <div className="h-full border-y border-steel/30 bg-[linear-gradient(135deg,transparent_49.8%,var(--fnb-signal-trace)_50%,transparent_50.2%)]" />
          </div>
        )}
      </div>
    </section>
  )
}
