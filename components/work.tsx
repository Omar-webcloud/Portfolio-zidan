'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Reveal } from '@/components/reveal'

type Project = {
  slug: string
  title: string
  category: string
  tagline: string
  description: string
  role: string
  year: string
  approach: string
  image: string
}

const projects: Project[] = [
  {
    slug: 'monochrome-identity',
    title: 'Monochrome Identity',
    category: 'Branding',
    tagline: 'IDENTITY SYSTEM',
    description: 'A restrained, tactile identity system built around type, texture and negative space.',
    role: 'Visual Designer & Art Director',
    year: '2026',
    approach:
      'Started from the brand voice rather than the logo — building a typographic system first, then letting the mark, stationery and collateral grow out of it. Every touchpoint was designed to feel physical and considered.',
    image: '/images/work-branding.png',
  },
  {
    slug: 'city-signal',
    title: 'City Signal',
    category: 'Campaigns',
    tagline: 'LARGE FORMAT',
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
    tagline: 'PRODUCT DESIGN',
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
    tagline: 'SCULPTURAL SERIES',
    description: 'An ongoing series of sculptural 3D explorations in glass, chrome and light.',
    role: '3D Visualizer',
    year: '2025',
    approach:
      'Personal experimentation with materials and light used as a sandbox for client work — testing how far abstraction can go while staying warm and inviting.',
    image: '/images/work-3d.png',
  },
  {
    slug: 'feed-theory',
    title: 'Feed Theory',
    category: 'Social',
    tagline: 'VISUAL SYSTEM',
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
    tagline: 'ART DIRECTION',
    description: 'Editorial art direction pairing sculptural styling with a saturated single-color world.',
    role: 'Art Director',
    year: '2025',
    approach:
      'Directed the shoot around one rule: one color, one subject, maximum negative space. The constraint produced a series that feels both minimal and dramatic.',
    image: '/images/work-artdirection.png',
  },
]

const categories = ['All', 'Branding', 'Campaigns', 'Digital', '3D', 'Social', 'Art Direction']

/* ─── Fan Card Slider ─────────────────────────────────────────── */
function FanSlider({ items }: { items: Project[] }) {
  const [active, setActive] = useState(0)
  const [selected, setSelected] = useState<Project | null>(null)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(0)
  const moved = useRef(false)

  const count = items.length

  const prev = () => setActive((a) => (a - 1 + count) % count)
  const next = () => setActive((a) => (a + 1) % count)

  /* reset when list changes */
  useEffect(() => { setActive(0) }, [items])

  /* keyboard */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selected) return
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  /* drag / swipe */
  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX
    moved.current = false
    setDragging(false)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (Math.abs(e.clientX - startX.current) > 6) {
      moved.current = true
      setDragging(true)
    }
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (moved.current) {
      const dx = e.clientX - startX.current
      if (dx < -40) next()
      else if (dx > 40) prev()
    }
    setDragging(false)
  }

  /* modal */
  const closeModal = useCallback(() => setSelected(null), [])
  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [selected, closeModal])

  if (count === 0) {
    return <p className="py-20 text-center text-muted-foreground">No projects in this category.</p>
  }

  /* how many cards visible per side */
  const spread = Math.min(3, Math.floor((count - 1) / 2))

  return (
    <div className="relative w-full">
      {/* ── Fan stage ── */}
      <div
        className="relative mx-auto flex items-center justify-center select-none"
        style={{ height: 540, maxWidth: 960 }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {items.map((project, idx) => {
          /* offset from active — wrap-around */
          let offset = idx - active
          if (offset > count / 2) offset -= count
          if (offset < -count / 2) offset += count

          const absOff = Math.abs(offset)
          if (absOff > spread) return null

          const rotateY = offset * 38
          const translateX = offset * 128
          const translateZ = -absOff * 85
          const scale = 1 - absOff * 0.08
          const opacity = 1 - absOff * 0.18
          const zIndex = 20 - absOff
          const isActive = offset === 0

          return (
            <div
              key={project.slug}
              role="button"
              tabIndex={0}
              aria-label={isActive ? `Open ${project.title}` : `Go to ${project.title}`}
              onClick={() => {
                if (moved.current) return
                if (!isActive) setActive(idx)
                else setSelected(project)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  if (!isActive) setActive(idx)
                  else setSelected(project)
                }
              }}
              style={{
                position: 'absolute',
                width: 270,
                height: 420,
                borderRadius: 22,
                overflow: 'hidden',
                cursor: 'pointer',
                zIndex,
                opacity,
                transform: `perspective(1200px) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                transition: dragging
                  ? 'none'
                  : 'transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.55s ease, box-shadow 0.3s ease',
                boxShadow: isActive
                  ? '0 30px 72px rgba(0,0,0,0.30), 0 8px 24px rgba(0,0,0,0.18)'
                  : '0 8px 24px rgba(0,0,0,0.12)',
              }}
            >
              {/* image */}
              <Image
                src={project.image || '/placeholder.svg'}
                alt={project.title}
                fill
                sizes="270px"
                className="object-cover"
                priority={isActive}
              />

              {/* gradient overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.12) 52%, transparent 100%)',
              }} />

              {/* text label */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '18px 18px 20px' }}>
                <p style={{
                  margin: 0,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  color: 'rgba(255,255,255,0.65)',
                  textTransform: 'uppercase',
                }}>
                  {project.tagline}
                </p>
                <h3 style={{
                  margin: '4px 0 0',
                  fontSize: isActive ? 21 : 17,
                  fontWeight: 700,
                  color: '#fff',
                  lineHeight: 1.2,
                  transition: 'font-size 0.3s ease',
                }}>
                  {project.title}
                </h3>
              </div>

              {/* active: arrow badge */}
              {isActive && (
                <span style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(6px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <ArrowUpRight style={{ width: 15, height: 15, color: '#fff' }} />
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* ── Controls ── */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous project"
          className="flex size-11 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-all hover:border-primary hover:shadow-md active:scale-95"
        >
          <ChevronLeft className="size-5" />
        </button>

        <div className="flex gap-2" role="tablist" aria-label="Project indicators">
          {items.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              aria-label={`Go to ${p.title}`}
              style={{
                width: i === active ? 24 : 8,
                height: 8,
                borderRadius: 999,
                background: i === active ? 'var(--color-primary)' : 'var(--color-border)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next project"
          className="flex size-11 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-all hover:border-primary hover:shadow-md active:scale-95"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* ── Modal ── */}
      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.title} case study`}
          onClick={closeModal}
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
                onClick={closeModal}
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
    </div>
  )
}

/* ─── Section ─────────────────────────────────────────────────── */
export function Work() {
  const [filter, setFilter] = useState('All')
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

      <Reveal delay={200}>
        <div className="mt-14 overflow-hidden">
          <FanSlider items={visible} />
        </div>
      </Reveal>
    </section>
  )
}
