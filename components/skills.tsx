import Image from 'next/image'
import { Reveal } from '@/components/reveal'

const skills = [
  'Visual Design',
  'Art Direction',
  'Creative Concepting',
  'Typography',
  'Composition',
  'Branding',
  '3D Visualization',
  'Motion / Animation',
]

const tools = [
  'Adobe Photoshop',
  'Illustrator',
  'After Effects',
  'Premiere Pro',
  'Blender',
  'Figma',
  'Cinema 4D',
]

export function Skills() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
      <div className="mt-14 grid gap-12 lg:grid-cols-5 lg:gap-16">
        <Reveal className="lg:col-span-2">
          <figure className="relative aspect-[5/6] overflow-hidden rounded-3xl">
            <Image
              src="/images/work-digital.png"
              alt="Digital interface design work"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              unoptimized
            />
          </figure>
        </Reveal>

        <div className="flex flex-col justify-center lg:col-span-3">
          <Reveal>
            <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
              A practice built on <span className="font-serif font-normal italic">curiosity</span>
            </h2>
            <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              I believe the strongest visuals come from restraint — knowing what to leave out is as important as
              knowing what to add. Every project starts with questions, not templates, and ends with work that feels
              inevitable rather than decorated.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h3 className="mt-10 text-xs font-medium uppercase tracking-widest text-muted-foreground">Skills</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <li key={skill} className="rounded-full bg-secondary px-4 py-2 text-sm font-medium">
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={220}>
            <h3 className="mt-8 text-xs font-medium uppercase tracking-widest text-muted-foreground">Tools</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {tools.map((tool) => (
                <li
                  key={tool}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
