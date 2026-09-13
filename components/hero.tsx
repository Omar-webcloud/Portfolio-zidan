import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'

export function Hero({ profile }: { profile: any }) {
  return (
    <section id="home" className="hero-gradient relative overflow-hidden pb-24 pt-36 md:pb-32 md:pt-44">
      <div className="mx-auto max-w-6xl px-4 text-center md:px-8">
        <Reveal>
          <h1 className="text-balance text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Visuals That
            <br />
            Make Ideas
            <br />
            <span className="font-serif font-normal italic">Impossible to Ignore.</span>
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-6 font-serif text-2xl italic text-muted-foreground md:text-3xl">
            Turning Concepts Into Visual Experiences.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg whitespace-pre-wrap">
            {profile?.bio || 'I create striking visuals, compositions and creative experiences that help brands, campaigns and ideas stand out.'}
          </p>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-medium text-accent-foreground transition-transform hover:scale-[1.03]"
            >
              View My Work
              <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-4 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Let&apos;s Collaborate
            </a>
          </div>
        </Reveal>

        <Reveal delay={360}>
          <div className="mt-10 flex items-center justify-center gap-3">
            <Image
              src={(profile?.heroImage && profile.heroImage.trim() !== "" && profile.heroImage !== "null") 
                ? profile.heroImage 
                : (profile?.profileImage && profile.profileImage.trim() !== "" && profile.profileImage !== "null")
                  ? profile.profileImage
                  : "/images/zidan-portrait.jpg"}
              alt={`Portrait of ${profile?.name?.trim() ? profile.name : 'Zidan Sharma'}`}
              width={48}
              height={48}
              className="size-12 rounded-full border-2 border-card object-cover shadow-md"
              unoptimized
            />
            <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              <span className="text-sm text-muted-foreground">Available for selected creative projects</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
