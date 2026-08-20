import type { Metadata } from 'next'
import { InstitutionalPage } from '@/components/fnb/institutional/institutional-page'
import { ProjectEnquiryForm } from '@/components/fnb/institutional/project-enquiry-form'
import { getInstitutionalContent } from '@/lib/task5-institutional-content'

const content = getInstitutionalContent('/project-enquiry')

export const metadata: Metadata = content.metadata

export default function Page() {
  return <InstitutionalPage content={content}><ProjectEnquiryForm /></InstitutionalPage>
}
