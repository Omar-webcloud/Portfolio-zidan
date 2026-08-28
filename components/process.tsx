import { Reveal } from '@/components/reveal'

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understand the idea, audience and objective.',
  },
  {
    number: '02',
    title: 'Concept',
    description: 'Turn the brief into a strong visual direction.',
  },
  {
    number: '03',
    title: 'Visualize',
    description: 'Build and refine the visual experience.',
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'Create polished, purposeful final work.',
  },
]

export function Process() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
      <Reveal>
        <h2 className="text-balance text-center text-4xl font-bold tracking-tight md:text-6xl">
          From Idea <span className="font-serif font-normal italic">to Impact</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-muted-foreground">
          A simple, deliberate process behind every project.
        </p>
      </Reveal>

      <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
        <div aria-hidden="true" className="absolute left-0 right-0 top-7 hidden h-px bg-border md:block" />
        {steps.map((step, i) => (
          <Reveal key={step.number} delay={i * 120} as="div" className="relative">
            <li className="flex flex-col items-start gap-4 md:items-center md:text-center">
              <span className="relative z-10 flex size-14 items-center justify-center rounded-full bg-card font-serif text-xl italic shadow-sm ring-1 ring-border">
                {step.number}
              </span>
              <div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
