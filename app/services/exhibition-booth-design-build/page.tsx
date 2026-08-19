import type { Metadata } from 'next'
import Link from 'next/link'
import { ConceptualMedia } from '@/components/fnb/editorial/conceptual-media'
import { EditorialHero } from '@/components/fnb/editorial/editorial-hero'
import { EditorialSection } from '@/components/fnb/editorial/editorial-section'
import { ProjectEnquiryCta } from '@/components/fnb/editorial/project-enquiry-cta'
import { FNB_MEDIA } from '@/lib/media-registry'
import { SERVICE_REGISTRY } from '@/lib/site-registry'

export const metadata: Metadata = {
  title: 'Exhibition Booth Design & Build | FNB Events',
  description: 'Exhibition booth strategy, concept, spatial planning, engineering coordination, material thinking, fabrication, installation and experience delivery.',
}

const conceptualDisclosure = 'Conceptual capability imagery — not project evidence'
const relatedServices = SERVICE_REGISTRY.filter((service) => ['02', '03', '04'].includes(service.number))

export default function ExhibitionBoothPage() {
  return (
    <main id="main">
      <EditorialHero
        eyebrow="Service 01 · Exhibition environments"
        title="Exhibition Booth Design & Build"
        lead="A booth is a temporary piece of architecture with one job: make the brand legible, useful and memorable inside a crowded environment."
        media={FNB_MEDIA.exhibitionStudio}
      >
        <p className="fnb-label text-ash">{conceptualDisclosure}</p>
      </EditorialHero>

      <EditorialSection
        id="strategic-proposition"
        index="01 · Strategic proposition"
        title="Begin with what the space must do."
        aside="The proposition is capability-oriented. No project, client or venue claim is implied."
      >
        <p>Floor area is only the starting condition. The stronger question is how the environment should direct attention, support conversation and express the brand under real operational constraints.</p>
        <p>Strategy aligns audience, message, movement and practical delivery before a visual language is allowed to take over.</p>
      </EditorialSection>

      <EditorialSection id="concept" index="02 · Concept" title="Translate the brief into a spatial idea." className="bg-void">
        <p>A clear concept gives every later decision a reason: what visitors encounter first, what they understand next and where the experience becomes useful.</p>
        <p>It is a framework for form, content, light, graphics and interaction—not a decorative theme applied at the end.</p>
      </EditorialSection>

      <EditorialSection id="sketch-design" index="03 · Sketch / design" title="Test hierarchy before detail.">
        <p>Early plans, elevations and visual studies are used to test proportion, sightlines, brand presence and the relationship between open and controlled areas.</p>
        <p>Design develops through review. Each pass should remove ambiguity before fabrication information becomes expensive to change.</p>
      </EditorialSection>

      <section id="spatial-planning" aria-labelledby="spatial-planning-heading" className="border-t border-steel/40 bg-void">
        <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
          <p className="fnb-label text-signal">04 · Spatial planning</p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)]">
            <h2 id="spatial-planning-heading" className="fnb-head max-w-[12ch] text-3xl text-warm-white md:text-5xl">Plan movement, pause and purpose.</h2>
            <div className="grid border-t border-steel/50 sm:grid-cols-2">
              {['Arrival and first read', 'Circulation and access', 'Conversation and demonstration', 'Storage and operational support'].map((item, index) => (
                <div key={item} className="border-b border-steel/50 py-6 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6">
                  <span className="fnb-label text-ash">0{index + 1}</span>
                  <p className="mt-3 text-lg text-mist">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <EditorialSection
        id="engineering"
        index="05 · Engineering"
        title="Resolve the build behind the image."
        aside="Structural, electrical and venue-critical decisions remain subject to the relevant qualified review and approvals."
      >
        <p>Design intent has to become coordinated information: structure, interfaces, power, lighting, AV, access and installation sequence.</p>
        <p>Engineering thinking exposes conflicts early and keeps the visible environment connected to the practical systems supporting it.</p>
      </EditorialSection>

      <EditorialSection id="material-thinking" index="06 · Material thinking" title="Choose materials for effect and consequence." className="bg-void">
        <p>Finish, reflectance, weight, durability, assembly and recovery all affect the final decision. Material language should support the concept while remaining appropriate to the build and venue context.</p>
        <p>Samples and mock-ups can make colour, junctions and illuminated surfaces tangible before production is committed.</p>
      </EditorialSection>

      <section id="fabrication" aria-labelledby="fabrication-heading" className="border-t border-steel/40 bg-obsidian">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,0.76fr)_minmax(22rem,1fr)] lg:items-center">
          <div>
            <p className="fnb-label text-signal">07 · Fabrication</p>
            <h2 id="fabrication-heading" className="fnb-head mt-5 max-w-[12ch] text-3xl text-warm-white md:text-5xl">Turn coordinated intent into buildable parts.</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">Fabrication information connects dimensions, finishes, graphics and service interfaces. Sequencing is considered alongside the object so the environment can move from workshop logic to site logic.</p>
          </div>
          <ConceptualMedia asset={FNB_MEDIA.boothBuild} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[3/2]" label={conceptualDisclosure} />
        </div>
      </section>

      <EditorialSection id="build-progression" index="08 · Build progression" title="Make the sequence visible." className="bg-void">
        <p>Base, frame, services, surfaces, graphics, light, AV and furniture form an interdependent sequence. A clear progression helps teams understand what must be complete before the next layer arrives.</p>
        <p>Reviews throughout the build focus on alignment with coordinated intent rather than treating completion as the first inspection point.</p>
      </EditorialSection>

      <EditorialSection id="installation" index="09 · Installation" title="Plan the site as a controlled handover.">
        <p>Access windows, logistics, venue rules, adjacent contractors and commissioning requirements shape installation planning.</p>
        <p>The goal is a deliberate transition from build environment to visitor environment, with safety and approvals treated as real dependencies.</p>
      </EditorialSection>

      <EditorialSection id="experience-delivery" index="10 · Experience delivery" title="The environment is ready when it works." className="bg-void">
        <p>Final delivery connects the physical space with content, technical systems and the people operating it. The visitor should encounter one coherent experience, not the seams between disciplines.</p>
        <p>Operational information and handover points stay explicit so the live environment can be used as intended.</p>
      </EditorialSection>

      <section id="related-capabilities" aria-labelledby="related-capabilities-heading" className="border-t border-steel/40 bg-obsidian">
        <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
          <p className="fnb-label text-signal">Related capabilities</p>
          <h2 id="related-capabilities-heading" className="fnb-head mt-5 max-w-[16ch] text-3xl text-warm-white md:text-5xl">Connect the environment to the systems around it.</h2>
          <ul className="mt-12 border-t border-steel/50">
            {relatedServices.map((service) => (
              <li key={service.href} className="border-b border-steel/50">
                <Link href={service.href} className="group grid gap-4 py-7 sm:grid-cols-[4rem_minmax(0,1fr)_auto] sm:items-center">
                  <span className="fnb-label text-signal">{service.number}</span>
                  <span className="fnb-head text-2xl text-warm-white transition-colors group-hover:text-signal">{service.name}</span>
                  <span className="fnb-label text-ash">Explore <span aria-hidden="true">&#8594;</span></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProjectEnquiryCta
        id="project-enquiry"
        eyebrow="Project enquiry"
        title="Start with the floor plan and the constraint."
        copy="Share the brief, location, date, required services and approximate scale. The enquiry route will collect the project context without implying a confirmed scope or delivery promise."
      />
    </main>
  )
}
