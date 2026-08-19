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
      <main id="main">
        <div className="contents" data-home-section="s01-hero">
          <S01Hero />
        </div>
        <div className="contents" data-home-section="s02-brand">
          <S02BrandStatement />
        </div>
        <div className="contents" data-home-section="s03-work">
          <S03SelectedWork />
        </div>
        <div className="contents" data-home-section="s04-transformation">
          <S04ExhibitionTransformation />
        </div>
        <div className="contents" data-home-section="s05-capabilities">
          <S05CapabilityIndex />
        </div>
        <div className="contents" data-home-section="s06-events">
          <S06EventProduction />
        </div>
        <div className="contents" data-home-section="s07-physical-digital">
          <S07PhysicalToDigital />
        </div>
        <div className="contents" data-home-section="s08-digital">
          <S08DigitalCapabilities />
        </div>
        <div className="contents" data-home-section="s09-interiors">
          <S09Interiors />
        </div>
        <div className="contents" data-home-section="s10-industries">
          <S10Industries />
        </div>
        <div className="contents" data-home-section="s11-process">
          <S11Process />
        </div>
        <div className="contents" data-home-section="s12-proof">
          <S12Proof />
        </div>
        <div className="contents" data-home-section="s13-insights">
          <S13Insights />
        </div>
        <div className="contents" data-home-section="s14-closing">
          <S14Closing />
        </div>
      </main>
    </>
  )
}
