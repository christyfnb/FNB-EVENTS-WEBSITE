import { FNBHeader } from '@/components/fnb/fnb-header'
import { FNBFooter } from '@/components/fnb/fnb-footer'
import { S01Hero } from '@/components/fnb/sections/s01-hero'
import { S02BrandStatement } from '@/components/fnb/sections/s02-brand-statement'
import { S03SelectedWork } from '@/components/fnb/sections/s03-selected-work'
import { S04ExhibitionTransformation } from '@/components/fnb/sections/s04-exhibition-transformation'
import { S05CapabilityIndex } from '@/components/fnb/sections/s05-capability-index'
import { S06EventProduction } from '@/components/fnb/sections/s06-event-production'
import { S07PhysicalToDigital } from '@/components/fnb/sections/s07-physical-to-digital'
import { S08DigitalCapabilities } from '@/components/fnb/sections/s08-digital-capabilities'
import { S09Interiors } from '@/components/fnb/sections/s09-interiors'
import { S10Industries } from '@/components/fnb/sections/s10-industries'
import { S11Process } from '@/components/fnb/sections/s11-process'
import { S12Proof } from '@/components/fnb/sections/s12-proof'
import { S13Insights } from '@/components/fnb/sections/s13-insights'
import { S14Closing } from '@/components/fnb/sections/s14-closing'

/**
 * FNB DIGITAL FLAGSHIP — homepage (Prototype A).
 * 14 canonical sections per docs/page-specs/home.md.
 * S12 and S13 self-suppress until verified content exists.
 */
export default function HomePage() {
  return (
    <>
      <FNBHeader />
      <main id="main">
        <S01Hero />
        <S02BrandStatement />
        <S03SelectedWork />
        <S04ExhibitionTransformation />
        <S05CapabilityIndex />
        <S06EventProduction />
        <S07PhysicalToDigital />
        <S08DigitalCapabilities />
        <S09Interiors />
        <S10Industries />
        <S11Process />
        <S12Proof />
        <S13Insights />
        <S14Closing />
      </main>
      <FNBFooter />
    </>
  )
}
