import type { Metadata } from 'next'
import { InstitutionalPage } from '@/components/fnb/institutional/institutional-page'
import { getInstitutionalContent } from '@/lib/task5-institutional-content'

const content = getInstitutionalContent('/insights')

export const metadata: Metadata = content.metadata

export default function Page() {
  return <InstitutionalPage content={content} />
}
