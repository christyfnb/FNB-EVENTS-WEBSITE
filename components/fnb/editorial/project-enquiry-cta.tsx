import Link from 'next/link'

type ProjectEnquiryCtaProps = {
  id?: string
  eyebrow?: string
  title: string
  copy: string
  linkLabel?: string
  href?: '/project-enquiry'
  serviceBlock?: string
}

export function ProjectEnquiryCta({ id = 'project-enquiry', eyebrow = 'Next move', title, copy, linkLabel = 'Start a project', href = '/project-enquiry', serviceBlock }: ProjectEnquiryCtaProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} data-service-block={serviceBlock} data-service-kind={serviceBlock ? 'cta' : undefined} className="border-t border-signal/40 bg-void">
      <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
        <p className="fnb-label text-signal">{eyebrow}</p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.42fr)] lg:items-end">
          <h2 id={`${id}-heading`} className="fnb-display max-w-[13ch] text-4xl text-warm-white md:text-7xl">
            {title}
          </h2>
          <div>
            <p className="max-w-xl leading-relaxed text-mist">{copy}</p>
            <Link href={href} className="fnb-btn-primary mt-8">
              {linkLabel} <span aria-hidden="true">&#8594;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
