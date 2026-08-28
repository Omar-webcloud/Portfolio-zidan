'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, X } from 'lucide-react'
import { Reveal } from '@/components/reveal'

type Project = {
  slug: string
  title: string
  category: string
  description: string
  role: string
  year: string
  approach: string
  image: string
  tall?: boolean
}

const projects: Project[] = [
  {
    slug: 'monochrome-identity',
    title: 'Monochrome Identity',
    category: 'Branding',
    description: 'A restrained, tactile identity system built around type, texture and negative space.',
    role: 'Visual Designer & Art Director',
    year: '2026',
    approach:
      'Started from the brand voice rather than the logo — building a typographic system first, then letting the mark, stationery and collateral grow out of it. Every touchpoint was designed to feel physical and considered.',
    image: '/images/work-branding.png',
    tall: true,
  },
  {
    slug: 'city-signal',
    title: 'City Signal',
    category: 'Campaigns',
    description: 'A large-format campaign key visual designed to command attention at street scale.',
    role: 'Campaign Visualizer',
    year: '2026',
    approach:
      'Explored dozens of compositional directions before landing on a single bold gradient statement that reads instantly from a distance. The visual language then scaled down into digital and social formats.',
    image: '/images/work-campaign.png',
  },
  {
    slug: 'soft-interface',
    title: 'Soft Interface',
    category: 'Digital',
    description: 'A digital product presentation exploring calm, editorial UI in a dimensional space.',
    role: 'Visual Designer',
    year: '2025',
    approach:
      'Treated the interface as an editorial object — staging it in a soft studio environment so the product feels premium before a single feature is explained.',
    image: '/images/work-digital.png',
  },
  {
    slug: 'formless-studies',
    title: 'Formless Studies',
    category: '3D',
    description: 'An ongoing series of sculptural 3D explorations in glass, chrome and light.',
    role: '3D Visualizer',
    year: '2025',
    approach:
      'Personal experimentation with materials and light used as a sandbox for client work — testing how far abstraction can go while staying warm and inviting.',
    image: '/images/work-3d.png',
    tall: true,
  },
  {
    slug: 'feed-theory',
    title: 'Feed Theory',
    category: 'Social',
    description: 'A social visual system designed for consistency and scroll-stopping contrast.',
    role: 'Social Visual Designer',
    year: '2026',
    approach:
      'Built a modular template system in a tight three-color palette so every post feels unmistakably on-brand while staying fast to produce.',
    image: '/images/work-social.png',
  },
  {
    slug: 'indigo-editorial',
    title: 'Indigo Editorial',
    category: 'Art Direction',
    description: 'Editorial art direction pairing sculptural styling with a saturated single-color world.',
    role: 'Art Director',
    year: '2025',
    approach:
      'Directed the shoot around one rule: one color, one subject, maximum negative space. The constraint produced a series that feels both minimal and dramatic.',
    image: '/images/work-artdirection.png',
  },
]

const categories = ['All', 'Branding', 'Campaigns', 'Digital', '3D', 'Social', 'Art Direction']

export function Work() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<Project | null>(null)

  const close = useCallback(() => setSelected(null), [])

  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [selected, close])

  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="work" className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
      <Reveal>
        <h2 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
          Selected <span className="font-serif font-normal italic">Work</span>
        </h2>
        <p className="mt-4 max-w-md text-muted-foreground">Ideas, concepts and visuals brought to life.</p>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={
                filter === cat
                  ? 'rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground'
                  : 'rounded-full bg-secondary px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {visible.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 3) * 90}>
            <button
              type="button"
              onClick={() => setSelected(project)}
              className="group block w-full break-inside-avoid overflow-hidden rounded-3xl bg-card text-left shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image || '/placeholder.svg'}
                  alt={`${project.title} — ${project.category} project`}
                  width={720}
                  height={project.tall ? 880 : 560}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-card/90 opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100 group-hover:rotate-45">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-widest text-accent">{project.category}</p>
                <h3 className="mt-1.5 text-xl font-bold">{project.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.title} case study`}
          onClick={close}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-card sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Image
                src={selected.image || '/placeholder.svg'}
                alt={`${selected.title} large project visual`}
                width={1200}
                height={800}
                className="max-h-[45vh] w-full object-cover"
              />
              <button
                type="button"
                onClick={close}
                className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-card/90 backdrop-blur transition-colors hover:bg-card"
                aria-label="Close case study"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="p-6 md:p-10">
              <p className="text-xs font-medium uppercase tracking-widest text-accent">{selected.category}</p>
              <h3 className="mt-2 text-3xl font-bold md:text-4xl">{selected.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{selected.description}</p>

              <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-5">
                <div>
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground">Role</dt>
                  <dd className="mt-1 font-medium">{selected.role}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground">Year</dt>
                  <dd className="mt-1 font-medium">{selected.year}</dd>
                </div>
              </dl>

              <h4 className="mt-6 font-serif text-2xl italic">Creative approach</h4>
              <p className="mt-2 leading-relaxed text-muted-foreground">{selected.approach}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
