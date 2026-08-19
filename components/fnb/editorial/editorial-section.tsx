import type { ReactNode } from 'react'

type EditorialSectionProps = {
  id: string
  index: string
  title: string
  children: ReactNode
  aside?: ReactNode
  className?: string
  serviceBlock?: string
}

export function EditorialSection({ id, index, title, children, aside, className, serviceBlock }: EditorialSectionProps) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} data-service-block={serviceBlock} data-service-kind={serviceBlock ? 'editorial' : undefined} className={`border-t border-steel/40 ${className ?? 'bg-obsidian'}`}>
      <div className="mx-auto grid max-w-[1600px] gap-8 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(12rem,0.38fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="fnb-label text-signal">{index}</p>
          <h2 id={headingId} className="fnb-head mt-4 max-w-[14ch] text-3xl text-warm-white md:text-5xl">
            {title}
          </h2>
        </div>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(12rem,0.42fr)]">
          <div className="max-w-2xl space-y-5 text-base leading-relaxed text-mist md:text-lg">{children}</div>
          {aside ? <aside data-truth-boundary={serviceBlock ? `${serviceBlock}:aside` : undefined} className="border-l border-signal/50 pl-5 text-sm leading-relaxed text-ash">{aside}</aside> : null}
        </div>
      </div>
    </section>
  )
}
