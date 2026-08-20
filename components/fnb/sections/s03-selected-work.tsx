import Link from 'next/link'
import { Reveal } from '@/components/fnb/reveal'
import { MediaSlot } from '@/components/fnb/media-slot'
import { MEDIA } from '@/lib/content'

/** Truth-safe editorial gateway until cleared project evidence is available. */
export function S03SelectedWork() {
  return (
    <section id="s03-work" aria-labelledby="s03-heading" className="border-t border-steel/40 bg-obsidian">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-x-6 gap-y-10 px-5 py-24 md:px-10 md:py-32">
        <Reveal className="col-span-12 lg:col-span-4 lg:pt-16">
          <p className="fnb-label text-ash">Selected work · publication review</p>
          <h2 id="s03-heading" className="fnb-head mt-6 max-w-[12ch] text-4xl text-warm-white md:text-6xl">
            The evidence matters.
          </h2>
          <p className="mt-8 max-w-md text-pretty leading-relaxed text-mist">
            Selected work is being prepared for publication. Until project facts and photography are cleared, this
            gateway uses conceptual imagery to communicate atmosphere—not delivered-project proof.
          </p>
          <Link
            href="/portfolio"
            className="fnb-label mt-10 inline-flex h-12 items-center border border-steel px-6 text-warm-white transition-colors hover:border-signal hover:text-signal"
          >
            Portfolio publication status
          </Link>
        </Reveal>

        <Reveal className="col-span-12 lg:col-span-7 lg:col-start-6">
          <MediaSlot
            asset={MEDIA.editorialGateway}
            className="aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[4/3]"
            sizes="(max-width: 1023px) 100vw, 58vw"
          />
          <div className="mt-4 flex items-center justify-between gap-4 border-t border-steel/40 pt-4">
            <span className="fnb-label text-signal">Conceptual capability image</span>
            <span className="fnb-label text-ash">Not project evidence</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
