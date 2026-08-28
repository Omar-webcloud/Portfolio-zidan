import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const services = [
  {
    number: '01',
    title: 'Creative Visualization',
    description: 'Turning raw ideas and briefs into clear, compelling visual directions.',
  },
  {
    number: '02',
    title: 'Art Direction',
    description: 'Guiding the look, feel and consistency of campaigns and brand imagery.',
  },
  {
    number: '03',
    title: 'Brand Visuals',
    description: 'Visual systems and assets that give brands a distinctive presence.',
  },
  {
    number: '04',
    title: 'Campaign Concepts',
    description: 'Big-picture visual concepts built to carry a campaign end to end.',
  },
  {
    number: '05',
    title: 'Social Media Visuals',
    description: 'Feed-ready visuals designed to stop the scroll and stay on-brand.',
  },
  {
    number: '06',
    title: 'Presentation & Pitch Decks',
    description: 'Decks that make ideas look as strong as they sound.',
  },
  {
    number: '07',
    title: '3D / Spatial Visualization',
    description: 'Dimensional visuals and renders that bring concepts into space.',
  },
  {
    number: '08',
    title: 'Creative Concept Development',
    description: 'Exploration and experimentation that pushes work past the expected.',
  },
]

export function Services() {
  return (
    <section id="services" className="bg-secondary/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <h2 className="text-balance text-center text-4xl font-bold tracking-tight md:text-6xl">
            What I <span className="font-serif font-normal italic">Visualize</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-center text-muted-foreground">
            Eight ways I help brands, campaigns and ideas take visual form.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.number} delay={(i % 4) * 80}>
              <div className="group flex h-full flex-col justify-between rounded-3xl bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-start justify-between">
                  <span className="font-serif text-3xl italic text-muted-foreground/60">{service.number}</span>
                  <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-foreground transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:rotate-45">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <div className="mt-10">
                  <h3 className="text-lg font-bold leading-snug">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
