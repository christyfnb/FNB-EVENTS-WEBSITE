import type { Metadata } from 'next'
import { EditorialHero } from '@/components/fnb/editorial/editorial-hero'
import { EditorialSection } from '@/components/fnb/editorial/editorial-section'
import { ProjectEnquiryCta } from '@/components/fnb/editorial/project-enquiry-cta'
import { RelatedServices, ServiceDecisionFlow, ServiceMediaFeature, ServiceScopeList } from '@/components/fnb/services/service-primitives'
import { FNB_MEDIA } from '@/lib/media-registry'

export const metadata: Metadata = {
  title: 'Event Production | FNB Events',
  description: 'Event production capability spanning planning, show direction, staging, live-system coordination, production control, guest experience and execution thinking.',
}

export default function EventProductionPage() {
  return (
    <main id="main">
      <EditorialHero eyebrow="Service 02 · Live experiences" title="Event Production" lead="A live experience becomes coherent when the brief, run of show, environment, technical cues and guest journey are planned as one operating system." />

      <EditorialSection id="planning" index="01 · Planning" title="Build the operating picture before the room fills." aside="Scope, responsibilities, venue conditions and approvals are established for the specific brief; they are not assumed here.">
        <p>Planning starts by clarifying purpose, audience, format, timing, dependencies and the decisions that cannot be left to show day.</p>
        <p>The working plan connects creative intent with access, people, content, staging and technical coordination.</p>
      </EditorialSection>

      <EditorialSection id="show-direction" index="02 · Show direction" title="Give every live moment a reason and a cue." className="bg-void">
        <p>Show direction turns content into a timed experience: entrances, transitions, speaker movement, media, light and sound are considered against the audience’s line of attention.</p>
        <ServiceDecisionFlow label="Show-direction decision flow" steps={[{ title: 'Frame', copy: 'Define the purpose, audience and essential content.' }, { title: 'Sequence', copy: 'Arrange moments, transitions and dependencies.' }, { title: 'Cue', copy: 'Make responsibilities and decision points visible.' }]} />
      </EditorialSection>

      <ServiceMediaFeature id="staging" index="03 · Staging" title="Shape a platform for content, people and sightlines." asset={FNB_MEDIA.eventKeynote}>
        <p>Stage form is considered through audience orientation, speaker movement, presentation surfaces, camera views and the practical systems that support them.</p>
        <p>The image is an approved conceptual visualization. It communicates staging capability and is not evidence of a delivered FNB project.</p>
      </ServiceMediaFeature>

      <section id="live-systems-coordination" aria-labelledby="live-systems-coordination-heading" className="border-t border-steel/40 bg-obsidian">
        <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
          <p className="fnb-label text-signal">04 · Lighting / audio / visual coordination</p>
          <h2 id="live-systems-coordination-heading" className="fnb-head mt-5 max-w-[17ch] text-3xl text-warm-white md:text-5xl">Coordinate the systems the audience experiences together.</h2>
          <div className="mt-10"><ServiceScopeList ariaLabel="Live systems coordination considerations" items={['Lighting states and transitions', 'Audio coverage and programme needs', 'Visual content and display surfaces', 'Playback, cueing and technical interfaces']} /></div>
        </div>
      </section>

      <EditorialSection id="production-control" index="05 · Production control" title="Keep information and authority legible." className="bg-void" aside="A production-control plan is scoped to the event and does not imply ownership of equipment, venue authority or a predetermined technical solution.">
        <p>Run sheets, cue information, escalation paths and communication roles help the live team understand what happens next and who decides when conditions change.</p>
      </EditorialSection>

      <section id="guest-experience" aria-labelledby="guest-experience-heading" className="border-t border-steel/40 bg-obsidian">
        <div className="mx-auto grid max-w-[1600px] gap-8 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] lg:gap-16">
          <div><p className="fnb-label text-signal">06 · Guest experience</p><h2 id="guest-experience-heading" className="fnb-head mt-5 max-w-[12ch] text-3xl text-warm-white md:text-5xl">Design the experience beyond the stage.</h2></div>
          <ServiceDecisionFlow label="Guest experience progression" steps={[{ title: 'Arrive', copy: 'Clarify approach, welcome and orientation.' }, { title: 'Participate', copy: 'Support attention, movement and interaction.' }, { title: 'Depart', copy: 'Plan the final message and onward journey.' }]} />
        </div>
      </section>

      <EditorialSection id="execution" index="07 · Execution" title="Move from plan to live decisions." className="bg-void">
        <p>Execution thinking brings rehearsals, checks, handovers and live coordination into one sequence. The exact operating model depends on the approved scope, venue requirements and appointed delivery teams.</p>
      </EditorialSection>

      <RelatedServices id="related-services" title="Connect the live show to its environment and technical system." hrefs={['/services/technical-production', '/services/branding-advertising', '/services/exhibition-booth-design-build']} />
      <ProjectEnquiryCta id="project-enquiry" eyebrow="Event enquiry" title="Start with the date, audience and run of show." copy="Share the event format, location, timing, expected guest context and required disciplines so the production conversation can begin with the real constraints." />
    </main>
  )
}
