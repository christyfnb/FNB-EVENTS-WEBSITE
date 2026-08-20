import type { Metadata } from 'next'
import { InstitutionalPage } from '@/components/fnb/institutional/institutional-page'
import { TeamPortraitGrid } from '@/components/fnb/institutional/team-portrait-grid'
import { FNB_MEDIA } from '@/lib/media-registry'
import { getInstitutionalContent, TEAM_PORTRAIT_PRESENTATION } from '@/lib/task5-institutional-content'

const content = getInstitutionalContent('/team')

export const metadata: Metadata = content.metadata

export default function Page() {
  return <InstitutionalPage content={content}><TeamPortraitGrid portraits={FNB_MEDIA.teamPortraits} presentation={TEAM_PORTRAIT_PRESENTATION} /></InstitutionalPage>
}
