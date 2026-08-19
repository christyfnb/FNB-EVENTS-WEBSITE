import type { ReactNode } from 'react'
import Link from 'next/link'
import { ConceptualMedia } from '@/components/fnb/editorial/conceptual-media'
import type { MediaAsset } from '@/lib/media-registry'
import { getServiceByHref, type ServiceHref } from '@/lib/site-registry'

type ServiceScopeListProps = {
  items: readonly string[]
  ariaLabel: string
  columns?: 2 | 3
}

export function ServiceScopeList({ items, ariaLabel, columns = 2 }: ServiceScopeListProps) {
  return (
    <ul aria-label={ariaLabel} className={`border-t border-steel/50 sm:grid ${columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
      {items.map((item, index) => (
        <li key={item} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 border-b border-steel/50 py-5 sm:px-5 sm:first:pl-0">
          <span className="fnb-label text-signal">{String(index + 1).padStart(2, '0')}</span>
          <span className="leading-relaxed text-mist">{item}</span>
        </li>
      ))}
    </ul>
  )
}

type ServiceDecisionFlowProps = {
  label: string
  steps: readonly { title: string; copy: string }[]
}

export function ServiceDecisionFlow({ label, steps }: ServiceDecisionFlowProps) {
  return (
    <ol aria-label={label} className="grid border-t border-steel/50 md:grid-cols-3">
      {steps.map((step, index) => (
        <li key={step.title} className="border-b border-steel/50 py-7 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
          <span className="fnb-label text-signal">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="fnb-head mt-4 text-xl text-warm-white">{step.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-ash">{step.copy}</p>
        </li>
      ))}
    </ol>
  )
}

type ServiceMediaFeatureProps = {
  id: string
  index: string
  title: string
  asset: MediaAsset
  children: ReactNode
  mediaPosition?: 'start' | 'end'
  portrait?: boolean
  boundary?: string
}

export function ServiceMediaFeature({
  id,
  index,
  title,
  asset,
  children,
  mediaPosition = 'end',
  portrait = false,
  boundary,
}: ServiceMediaFeatureProps) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className="border-t border-steel/40 bg-void">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,0.78fr)_minmax(22rem,1fr)] lg:items-center lg:gap-16">
        <div className={mediaPosition === 'start' ? 'lg:order-2' : undefined}>
          <p className="fnb-label text-signal">{index}</p>
          <h2 id={headingId} className="fnb-head mt-5 max-w-[13ch] text-3xl text-warm-white md:text-5xl">{title}</h2>
          <div className="mt-6 max-w-2xl space-y-5 text-base leading-relaxed text-mist md:text-lg">{children}</div>
          {boundary ? <p className="mt-7 border-l border-signal/60 pl-5 text-sm leading-relaxed text-ash">{boundary}</p> : null}
        </div>
        <ConceptualMedia
          asset={asset}
          sizes="(min-width: 1024px) 48vw, 100vw"
          className={`${portrait ? 'aspect-[4/5] lg:max-h-[44rem]' : 'aspect-[3/2]'} ${mediaPosition === 'start' ? 'lg:order-1' : ''}`}
        />
      </div>
    </section>
  )
}

type RelatedServicesProps = {
  id?: string
  title: string
  hrefs: readonly ServiceHref[]
}

export function RelatedServices({ id = 'related-services', title, hrefs }: RelatedServicesProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="border-t border-steel/40 bg-obsidian">
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
        <p className="fnb-label text-signal">Related services</p>
        <h2 id={`${id}-heading`} className="fnb-head mt-5 max-w-[16ch] text-3xl text-warm-white md:text-5xl">{title}</h2>
        <ul className="mt-10 border-t border-steel/50">
          {hrefs.map((href) => {
            const service = getServiceByHref(href)
            return (
              <li key={href} className="border-b border-steel/50">
                <Link href={href} className="group grid min-h-20 gap-3 py-6 sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:items-center">
                  <span className="fnb-label text-signal">{service.number}</span>
                  <span className="fnb-head text-xl text-warm-white transition-colors group-hover:text-signal">{service.name}</span>
                  <span className="fnb-label text-ash">Explore <span aria-hidden="true">&#8594;</span></span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
