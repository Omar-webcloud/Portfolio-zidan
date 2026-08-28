import { Reveal } from '@/components/reveal'

// Replace these values with real numbers as needed.
const stats = [
  { value: '50+', label: 'Visual Projects' },
  { value: '25+', label: 'Creative Collaborations' },
  { value: '10+', label: 'Brands & Campaigns' },
  { value: '5+', label: 'Years Exploring Visuals' },
]

export function Stats() {
  return (
    <section className="bg-primary py-20 text-primary-foreground md:py-28" aria-label="Statistics">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 px-4 md:grid-cols-4 md:px-8">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 90} className="text-center">
            <p className="text-6xl font-bold tracking-tight md:text-7xl lg:text-8xl">{stat.value}</p>
            <p className="mt-3 text-sm text-primary-foreground/70 md:text-base">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
