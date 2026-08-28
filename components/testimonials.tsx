import { Star } from 'lucide-react'
import { Reveal } from '@/components/reveal'

// Placeholder testimonials — replace with real client quotes.
const testimonials = [
  {
    quote:
      'Zidan took a half-formed idea and turned it into a visual direction the whole team rallied behind. The clarity he brings is rare.',
    name: 'Client Name',
    role: 'Marketing Lead, Placeholder Co.',
  },
  {
    quote:
      'Every deliverable felt intentional. Nothing decorative, nothing wasted — just visuals that did exactly what the campaign needed.',
    name: 'Client Name',
    role: 'Founder, Placeholder Studio',
  },
  {
    quote:
      'Fast, thoughtful and genuinely collaborative. Our brand has never looked this consistent across channels.',
    name: 'Client Name',
    role: 'Brand Manager, Placeholder Brand',
  },
]

export function Testimonials() {
  return (
    <section id="reviews" className="bg-secondary/60 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <h2 className="text-balance text-center text-4xl font-bold tracking-tight md:text-6xl">
            Words From People <span className="font-serif font-normal italic">I&apos;ve Worked With</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.role} delay={i * 100}>
              <figure className="flex h-full flex-col justify-between rounded-3xl bg-card p-7 shadow-sm">
                <div>
                  <div className="flex gap-1" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="size-4 fill-accent text-accent" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="mt-5 font-serif text-xl italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                </div>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <p className="font-bold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
