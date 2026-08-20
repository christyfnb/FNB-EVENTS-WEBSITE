import type { Metadata } from 'next'
import type { CanonicalHref, NavigationHref, ServiceHref } from '@/lib/site-registry'

type ImplementedHref = '/' | '/services' | ServiceHref
type HoldingHref = Exclude<CanonicalHref, ImplementedHref>

export type HoldingPageContent = {
  eyebrow: string
  title: string
  summary: string
  status: string
  notice: string
  primaryLabel: string
  primaryHref: NavigationHref
}

const HOLDING_PAGES = {
  '/about': { eyebrow: 'About · Publication gateway', title: 'Future Next Branding, in context.', summary: 'FNB brings strategy, design, engineering, production and digital thinking into one connected practice.', status: 'Expanded institutional narrative pending the dedicated About implementation.', notice: 'No history, awards, project counts, locations or other unverified company claims are published here.', primaryLabel: 'Explore services', primaryHref: '/services' },
  '/industries': { eyebrow: 'Industries · Capability gateway', title: 'Designed around constraints, not borrowed proof.', summary: 'The future Industries page will frame how disciplines respond to sector-specific constraints without implying unverified historical experience.', status: 'Industry evidence and publication wording remain under review.', notice: 'No sector history, named client or delivered project is published here.', primaryLabel: 'Explore services', primaryHref: '/services' },
  '/process': { eyebrow: 'Process · Route gateway', title: 'From discovery to delivery.', summary: 'The homepage retains the current process overview while the expanded process narrative is prepared.', status: 'Full process page scheduled for the institutional-route implementation task.', notice: 'Only approved capability language is shown; unverified methodology claims remain unpublished.', primaryLabel: 'Homepage process', primaryHref: '/#process' },
  '/team': { eyebrow: 'Team · Data review', title: 'People, pending publication review.', summary: 'The team composition will be published after identity, role, consent and portrait metadata are cleared together.', status: 'Team publication data is not yet approved.', notice: 'No names, roles or biographies are inferred from filenames or unpublished source material.', primaryLabel: 'Explore services', primaryHref: '/services' },
  '/contact': { eyebrow: 'Contact · Verification gate', title: 'Contact details pending verification.', summary: 'A complete contact route is reserved while publication-approved communication details are confirmed.', status: 'Verified public contact information is not yet available.', notice: 'No email address, phone number, office location or external destination is invented or inferred.', primaryLabel: 'Explore services', primaryHref: '/services' },
  '/project-enquiry': { eyebrow: 'Project Enquiry · Frontend pending', title: 'Project enquiry is being prepared.', summary: 'The complete accessible enquiry experience will be implemented with a gated delivery adapter in the conversion-route task.', status: 'No active submission provider is connected.', notice: 'This page does not collect data and does not claim that a message or brief has been delivered.', primaryLabel: 'Explore services', primaryHref: '/services' },
  '/portfolio': { eyebrow: 'Portfolio · Publication review', title: 'Selected work is being prepared for publication.', summary: 'The route is intentionally available without filling evidence gaps with invented case studies.', status: 'Approved project evidence is not yet published.', notice: 'Conceptual capability imagery elsewhere on the site is not treated as delivered work, client proof or a case study.', primaryLabel: 'Explore services', primaryHref: '/services' },
  '/insights': { eyebrow: 'Insights · Publication architecture', title: 'Insights are being prepared for publication.', summary: 'The future publication route will contain only reviewed, attributed and genuinely published material.', status: 'No approved articles are currently published.', notice: 'Titles, authors, dates and reading-time claims remain absent until source material is approved.', primaryLabel: 'Explore services', primaryHref: '/services' },
  '/privacy-policy': { eyebrow: 'Legal · Privacy', title: 'Privacy policy pending approved legal text.', summary: 'This route is reserved for reviewed privacy information and will not substitute generated wording for counsel-approved content.', status: 'Legal publication approval is pending.', notice: 'No privacy promise, retention period, controller identity or jurisdiction is inferred on this holding page.', primaryLabel: 'Return to services', primaryHref: '/services' },
  '/terms-and-conditions': { eyebrow: 'Legal · Terms', title: 'Terms and conditions pending approved legal text.', summary: 'This route is reserved for reviewed terms and will not present generated language as binding legal content.', status: 'Legal publication approval is pending.', notice: 'No contractual term, warranty, governing law or liability position is invented on this holding page.', primaryLabel: 'Return to services', primaryHref: '/services' },
} satisfies Record<HoldingHref, HoldingPageContent>

export function getHoldingPageContent(href: HoldingHref): HoldingPageContent {
  return HOLDING_PAGES[href]
}

export function getHoldingPageMetadata(content: HoldingPageContent): Metadata {
  return { title: `${content.title} | FNB Events`, description: content.summary }
}
