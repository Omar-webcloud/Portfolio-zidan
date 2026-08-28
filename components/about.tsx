import Image from 'next/image'
import { Eye, Compass, BookOpen, Megaphone } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const highlights = [
  { icon: Eye, label: 'Creative Visualization' },
  { icon: Compass, label: 'Art Direction' },
  { icon: BookOpen, label: 'Visual Storytelling' },
  { icon: Megaphone, label: 'Brand Communication' },
]

export function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
      <Reveal>
        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          <span className="size-1.5 rounded-full bg-accent" />
          About Me
        </p>
        <h2 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
          Behind <span className="font-serif font-normal italic">the visuals</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal variant="image">
          <figure className="relative overflow-hidden rounded-3xl">
            <Image
              src="/images/zidan-portrait.png"
              alt="Editorial portrait of Zidan Sharma"
              width={720}
              height={860}
              className="h-full w-full object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-16">
              <p className="text-2xl font-bold text-white">Zidan Sharma</p>
              <p className="text-sm text-white/80">Visualizer / Visual Designer</p>
            </figcaption>
          </figure>
        </Reveal>

        <div className="flex flex-col justify-center gap-8">
          <Reveal delay={100}>
            <p className="text-pretty text-xl leading-relaxed md:text-2xl">
              I&apos;m Zidan Sharma, a Visualizer focused on turning ideas into visuals that communicate, connect and
              leave an impression.
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              My work combines composition, storytelling, design thinking and visual experimentation to create work
              that feels intentional and memorable.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {highlights.map((item, i) => (
              <Reveal key={item.label} delay={150 + i * 80}>
                <div className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <item.icon className="size-5" />
                  </span>
                  <span className="font-medium">{item.label}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <blockquote className="border-l-2 border-accent pl-5 font-serif text-2xl italic text-muted-foreground">
              &ldquo;Every visual should earn its attention.&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
