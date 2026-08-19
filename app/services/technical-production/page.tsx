import type { Metadata } from 'next'
import { EditorialHero } from '@/components/fnb/editorial/editorial-hero'
import { EditorialSection } from '@/components/fnb/editorial/editorial-section'
import { ProjectEnquiryCta } from '@/components/fnb/editorial/project-enquiry-cta'
import { ServiceDecisionFlow, ServiceMediaFeature, ServiceScopeList } from '@/components/fnb/services/service-primitives'
import { FNB_MEDIA } from '@/lib/media-registry'

export const metadata: Metadata = {
  title: 'Technical Production | FNB Events',
  description: 'Technical production planning across AV signal paths, lighting, audio, LED and display, control systems, show integration and on-site execution.',
}

export default function TechnicalProductionPage() {
  return (
    <main id="main">
      <EditorialHero eyebrow="Service 04 · Technical systems" title="Technical Production" lead="Technical production connects the show’s intent to signal, power, light, sound, display, control and the people responsible for operating each system." />

      <EditorialSection id="technical-planning" index="01 · Technical planning" title="Resolve requirements before selecting a system." aside="Technical design, structural loads, electrical distribution, rigging and life-safety matters require qualified review plus venue and relevant authority approval where applicable.">
        <p>The planning conversation begins with content, audience, room, programme and operational needs. Constraints and interfaces are documented before a technical approach is confirmed.</p>
        <p>No equipment inventory, brand of hardware, quantity, coverage figure or performance metric is claimed on this capability page.</p>
      </EditorialSection>

      <ServiceMediaFeature id="signal-paths" index="02 · AV signal paths" title="Make every source, destination and fallback legible." asset={FNB_MEDIA.technicalControl} boundary="The conceptual control-room image is not project evidence and does not represent an owned FNB equipment inventory." portrait={false}>
        <p>AV planning maps sources, routing, processing, playback, display and monitoring as a coordinated path. Redundancy and fallback needs are determined by the approved brief and risk context.</p>
      </ServiceMediaFeature>

      <section id="lighting" aria-labelledby="lighting-heading" className="border-t border-steel/40 bg-obsidian">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] lg:gap-16">
          <div><p className="fnb-label text-signal">03 · Lighting</p><h2 id="lighting-heading" className="fnb-head mt-5 max-w-[12ch] text-3xl text-warm-white md:text-5xl">Light for people, cameras, content and atmosphere.</h2></div>
          <ServiceScopeList ariaLabel="Lighting planning considerations" items={['Audience and speaker visibility', 'Camera and presentation requirements', 'Architectural and scenic integration', 'Cue states, control and safe access']} />
        </div>
      </section>

      <EditorialSection id="audio" index="04 · Audio" title="Design around intelligibility and programme needs." className="bg-void">
        <p>Audio planning considers spoken word, programme material, audience geometry, monitoring and operator requirements. System specification remains dependent on measured venue conditions and qualified technical design.</p>
      </EditorialSection>

      <EditorialSection id="led-display" index="05 · LED / display" title="Match the display surface to the content and room.">
        <p>Viewing distance, ambient light, camera use, content format, mounting and signal distribution influence display decisions. Final systems remain subject to engineering, venue and authority requirements where applicable.</p>
      </EditorialSection>

      <section id="control-systems" aria-labelledby="control-systems-heading" className="border-t border-steel/40 bg-void">
        <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24"><p className="fnb-label text-signal">06 · Control systems</p><h2 id="control-systems-heading" className="fnb-head mt-5 max-w-[16ch] text-3xl text-warm-white md:text-5xl">Give operators one coherent picture of the show.</h2><div className="mt-10"><ServiceDecisionFlow label="Control-system decision flow" steps={[{ title: 'Observe', copy: 'Define sources, destinations and monitoring needs.' }, { title: 'Coordinate', copy: 'Align cue ownership, communications and interfaces.' }, { title: 'Respond', copy: 'Document fallback decisions and escalation paths.' }]} /></div></div>
      </section>

      <EditorialSection id="show-integration" index="07 · Show integration" title="Treat technical disciplines as one live system."><p>Integration reviews the timing and interfaces between stage action, lighting, audio, video, playback and communications so the live team can work from a shared sequence.</p></EditorialSection>
      <EditorialSection id="on-site-execution" index="08 · On-site execution" title="Commission, rehearse and hand over deliberately." className="bg-void" aside="On-site work remains subject to the approved scope, appointed qualified specialists, venue rules and relevant permits or authority sign-off."><p>Execution thinking includes access, installation order, inspection points, testing, rehearsal, operator information and strike constraints. Each requirement is confirmed for the actual event context.</p></EditorialSection>
      <ProjectEnquiryCta id="project-enquiry" eyebrow="Technical enquiry" title="Start with the room, programme and technical dependencies." copy="Share the venue context, event format, content needs, audience conditions and known interfaces. A technical approach can only follow review of those constraints." />
    </main>
  )
}
