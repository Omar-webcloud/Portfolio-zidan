import { ArrowUpRight, Mail } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import type { ReactNode } from 'react'

export function ContactCta({ profile }: { profile: any }) {
  const email = profile?.email || 'hello@zidansharma.com'
  
  // Build dynamic socials list
  const socials: { label: string; href: string; icon: ReactNode }[] = []
  
  if (profile?.instagram) {
    socials.push({
      label: 'Instagram',
      href: profile.instagram,
      icon: (
        <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      )
    })
  }
  if (profile?.behance) {
    socials.push({
      label: 'Behance',
      href: profile.behance,
      icon: (
        <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 7h-7v-2h7v2zM11.5 14.6c0-3.1-2.4-5.2-6.1-5.2H0v15h5.5c3.7 0 6-2.1 6-5.2 0-2.3-1.2-3.8-3.3-4.4 1.7-.5 3.3-1.9 3.3-4.6v-.6zm-6.1-2H3v-3.7h2.4c1.8 0 2.5 1 2.5 2 0 .9-.8 1.7-2.5 1.7zm.2 6H3v-3.8h2.6c1.8 0 2.9.9 2.9 1.9 0 1-1 1.9-2.9 1.9zM24 14.5c0-4.6-3.7-7-7.5-7-4.1 0-7.3 3.1-7.3 7 0 4.2 3.1 7.2 7.5 7.2 3.9 0 7-2.1 7.2-6h-3c-.2 1.9-2 2.9-4.2 2.9-2.2 0-4.2-1.2-4.2-4.2h11.4v.1zm-7.6-4c1.8 0 3.7 1 4 3H13c.4-1.9 1.9-3 3.4-3z" />
        </svg>
      )
    })
  }
  if (profile?.linkedin) {
    socials.push({
      label: 'LinkedIn',
      href: profile.linkedin,
      icon: (
        <svg className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    })
  }
  if (profile?.dribbble) {
    socials.push({
      label: 'Dribbble',
      href: profile.dribbble,
      icon: (
        <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm8.795-12.023c-.22-.058-2.585-.634-5.405-.285.918 2.533 1.488 4.793 1.636 5.433 1.706-1.393 2.92-3.376 3.42-5.7-1.392-.61-2.91-1.026-4.52-1.228-2.195 4.604-4.843 8.358-5.112 8.74 3.738.934 7.625-.138 10.02-3.11-1.46-1.503-3.415-2.518-5.63-2.934.34-3.52-1.332-6.528-1.554-6.852-2.128 3.5-5.12 6.55-7.464 8.528-1.09-3.238-.344-7.228.318-9.45.626 2.384 3.326 5.093 6.136 5.86 2.65-.664 5.385-1.928 6.556-2.59-1.986-1.983-4.708-3.21-7.734-3.21-2.73 0-5.232 1.01-7.14 2.673 2.222 1.098 5.494 2.112 8.24 2.176 1.155.025 2.155-.098 3.01-.26-1.635-4.594-4.38-8.232-4.66-8.59-3.93.817-7.202 3.31-8.9 6.74 1.763-1.676 4.722-2.887 7.74-3.08-1.1-1.89-2.483-3.66-4.067-5.26C3.99 4.316 1.764 7.842 1.764 12c0 2.99 1.114 5.72 2.956 7.784 1.95-1.928 4.364-4.636 6.302-7.854-3.09-1.29-6.3-2.127-6.59-2.203.748 4.544 4.148 8.082 8.563 8.868.514-.627 3.308-4.225 5.568-9.213C20.316 11.238 21.033 11.838 21.378 12c-.524 3.125-2.25 5.797-4.582 7.553C19.345 17.518 20.89 14.935 20.8 11.977z" />
        </svg>
      )
    })
  }
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
            href={`mailto:${email}`}
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-5 text-base font-medium text-accent-foreground transition-transform hover:scale-[1.03]"
          >
            Start a Conversation
            <ArrowUpRight className="size-5 transition-transform group-hover:rotate-45" />
          </a>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-12 flex flex-col items-center gap-5">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              <Mail className="size-4" />
              {email}
            </a>
            <ul className="flex flex-wrap justify-center gap-6">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-sm text-primary-foreground/60 transition-all hover:text-primary-foreground hover:-translate-y-0.5"
                    aria-label={social.label}
                  >
                    <span className="text-primary-foreground/60 transition-colors group-hover:text-primary-foreground">
                      {social.icon}
                    </span>
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
