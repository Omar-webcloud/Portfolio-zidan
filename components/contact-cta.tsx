import { ArrowUpRight, Mail } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const socials = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Behance', href: 'https://behance.net' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Dribbble', href: 'https://dribbble.com' },
]

export function ContactCta() {
  return (
    <section id="contact" className="bg-primary py-24 text-primary-foreground md:py-36">
      <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
        <Reveal>
          <h2 className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl">
            Have an Idea Worth <span className="font-serif font-normal italic">Visualizing?</span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-md text-pretty text-lg leading-relaxed text-primary-foreground/70">
            Let&apos;s turn your next idea into something people remember.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <a
            href="mailto:hello@zidansharma.com"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-5 text-base font-medium text-accent-foreground transition-transform hover:scale-[1.03]"
          >
            Start a Conversation
            <ArrowUpRight className="size-5 transition-transform group-hover:rotate-45" />
          </a>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-12 flex flex-col items-center gap-5">
            <a
              href="mailto:hello@zidansharma.com"
              className="inline-flex items-center gap-2 text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              <Mail className="size-4" />
              hello@zidansharma.com
            </a>
            <ul className="flex flex-wrap justify-center gap-6">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-foreground/60 underline-offset-4 transition-colors hover:text-primary-foreground hover:underline"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
