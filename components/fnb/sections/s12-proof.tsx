import { Reveal } from '@/components/fnb/reveal'
import { VERIFIED_PROOF } from '@/lib/content'

/**
 * S12 — PROOF. Spec rule: renders NOTHING unless proof entries are
 * verified in the truth registry. VERIFIED_PROOF is currently empty,
 * so this section returns null by design.
 */
export function S12Proof() {
  if (VERIFIED_PROOF.length === 0) return null

  return (
    <section aria-labelledby="proof-heading" className="border-t border-slate/40 bg-void">
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <p className="fnb-label text-signal">S12 &middot; Proof</p>
          <h2 id="proof-heading" className="sr-only">
            Verified numbers
          </h2>
        </Reveal>
        <dl className="mt-12 grid grid-cols-2 gap-px bg-slate/40 md:grid-cols-4">
          {VERIFIED_PROOF.map((item, i) => (
            <Reveal key={item.label} delay={i * 80} className="bg-void p-8">
              <dd className="text-4xl font-semibold text-warm-white md:text-5xl">{item.value}</dd>
              <dt className="fnb-label mt-3 text-ash">{item.label}</dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
