import { HoldingPage } from '@/components/fnb/editorial/holding-page'
import { getHoldingPageContent, getHoldingPageMetadata } from '@/lib/holding-pages'

const content = getHoldingPageContent('/contact')

export const metadata = getHoldingPageMetadata(content)

export default function Page() {
  return <HoldingPage content={content} />
}
