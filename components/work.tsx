'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Reveal } from '@/components/reveal'

/* ─── Types ──────────────────────────────────────────────────────── */
type Project = {
  slug: string
  title: string
  tagline: string
  category: string
  description: string
  role: string
  year: string
  approach: string
  image: string
}

/* ─── Data ───────────────────────────────────────────────────────── */
const projects: Project[] = [
  {
    slug: 'monochrome-identity',
    title: 'Monochrome Identity',
    tagline: 'IDENTITY SYSTEM',
    category: 'Branding',
    description:
      'A restrained, tactile identity system built around type, texture and negative space.',
    role: 'Visual Designer & Art Director',
    year: '2026',
    approach:
      'Started from the brand voice rather than the logo — building a typographic system first, then letting the mark, stationery and collateral grow out of it. Every touchpoint was designed to feel physical and considered.',
    image: '/images/work-branding.png',
  },
  {
    slug: 'city-signal',
    title: 'City Signal',
    tagline: 'LARGE FORMAT',
    category: 'Campaigns',
    description:
      'A large-format campaign key visual designed to command attention at street scale.',
    role: 'Campaign Visualizer',
    year: '2026',
    approach:
      'Explored dozens of compositional directions before landing on a single bold gradient statement that reads instantly from a distance. The visual language then scaled down into digital and social formats.',
    image: '/images/work-campaign.png',
  },
  {
    slug: 'soft-interface',
    title: 'Soft Interface',
    tagline: 'PRODUCT DESIGN',
    category: 'Digital',
    description:
      'A digital product presentation exploring calm, editorial UI in a dimensional space.',
    role: 'Visual Designer',
    year: '2025',
    approach:
      'Treated the interface as an editorial object — staging it in a soft studio environment so the product feels premium before a single feature is explained.',
    image: '/images/work-digital.png',
  },
  {
    slug: 'formless-studies',
    title: 'Formless Studies',
    tagline: 'SCULPTURAL SERIES',
    category: '3D',
    description:
      'An ongoing series of sculptural 3D explorations in glass, chrome and light.',
    role: '3D Visualizer',
    year: '2025',
    approach:
      'Personal experimentation with materials and light used as a sandbox for client work — testing how far abstraction can go while staying warm and inviting.',
    image: '/images/work-3d.png',
  },
  {
    slug: 'feed-theory',
    title: 'Feed Theory',
    tagline: 'VISUAL SYSTEM',
    category: 'Social',
    description:
      'A social visual system designed for consistency and scroll-stopping contrast.',
    role: 'Social Visual Designer',
    year: '2026',
    approach:
      'Built a modular template system in a tight three-color palette so every post feels unmistakably on-brand while staying fast to produce.',
    image: '/images/work-social.png',
  },
  {
    slug: 'indigo-editorial',
    title: 'Indigo Editorial',
    tagline: 'ART DIRECTION',
    category: 'Art Direction',
    description:
      'Editorial art direction pairing sculptural styling with a saturated single-color world.',
    role: 'Art Director',
    year: '2025',
    approach:
      'Directed the shoot around one rule: one color, one subject, maximum negative space. The constraint produced a series that feels both minimal and dramatic.',
    image: '/images/work-artdirection.png',
  },
]

const categories = ['All', 'Branding', 'Campaigns', 'Digital', '3D', 'Social', 'Art Direction']

/* ─── Coverflow geometry ─────────────────────────────────────────── */
// Each step away from center: tx = horizontal px, ry = rotateY deg, sc = scale, op = opacity
const STEPS = [
  { tx: 0,   ry: 0,  sc: 1.00, op: 1.00, z: 50 }, // 0 — center (active)
  { tx: 190, ry: 38, sc: 0.84, op: 0.78, z: 40 }, // ±1
  { tx: 340, ry: 54, sc: 0.68, op: 0.54, z: 30 }, // ±2
  { tx: 462, ry: 65, sc: 0.54, op: 0.32, z: 20 }, // ±3
]

const CARD_W = 260
const CARD_H = 440

/* ─── Coverflow Component ────────────────────────────────────────── */
function Coverflow({ items }: { items: Project[] }) {
  const [active, setActive]     = useState(0)
  const [selected, setSelected] = useState<Project | null>(null)
  const startX = useRef(0)
  const moved  = useRef(false)
  const count  = items.length

  const prev = () => setActive(a => (a - 1 + count) % count)
  const next = () => setActive(a => (a + 1) % count)

  /* reset on filter change */
  useEffect(() => { setActive(0) }, [items])

  /* keyboard nav */
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (selected) return
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  })

  /* pointer / swipe */
  const onDown = (e: React.PointerEvent) => { startX.current = e.clientX; moved.current = false }
  const onMove = (e: React.PointerEvent) => { if (Math.abs(e.clientX - startX.current) > 8) moved.current = true }
  const onUp   = (e: React.PointerEvent) => {
    if (!moved.current) return
    const d = e.clientX - startX.current
    if (d < -40) next()
    else if (d > 40) prev()
  }

  /* modal lock */
  const closeModal = useCallback(() => setSelected(null), [])
  useEffect(() => {
    if (!selected) return
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [selected, closeModal])

  if (count === 0) {
    return <p className="py-20 text-center text-muted-foreground">No projects in this category.</p>
  }

  const spread = Math.min(3, count - 1)

  return (
    <div className="relative w-full select-none">

      {/* ── Coverflow stage ── */}
      <div
        style={{
          position:          'relative',
          width:             '100%',
          height:            CARD_H + 80,
          borderRadius:      40,
          overflow:          'hidden',
          /* blue-white atmospheric background matching the reference */
          background:
            'radial-gradient(ellipse 90% 80% at 50% 100%, rgba(147,197,253,0.45) 0%, rgba(219,234,254,0.30) 45%, rgba(241,245,249,0.15) 75%, transparent 100%)',
          /* shared perspective — one vanishing point for all cards */
          perspective:       '1300px',
          perspectiveOrigin: '50% 60%',
        }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
      >
        {items.map((project, idx) => {
          /* wrap-around distance from active */
          let off = idx - active
          if (off >  count / 2) off -= count
          if (off < -count / 2) off += count

          const abs = Math.abs(off)
          if (abs > spread) return null

          const sign     = off < 0 ? -1 : 1
          const s        = STEPS[abs]
          const isActive = off === 0

          return (
            <div
              key={project.slug}
              role="button"
              tabIndex={0}
              aria-label={isActive ? `Open ${project.title}` : `Go to ${project.title}`}
              onClick={() => {
                if (moved.current) return
                if (!isActive) setActive(idx)
                else           setSelected(project)
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  if (!isActive) setActive(idx)
                  else           setSelected(project)
                }
              }}
              style={{
                position:   'absolute',
                /* vertically centre in the stage */
                top:        '50%',
                left:       '50%',
                width:      CARD_W,
                height:     CARD_H,
                marginTop:  -(CARD_H / 2),
                marginLeft: -(CARD_W / 2),
                borderRadius: 22,
                overflow:   'hidden',
                cursor:     'pointer',
                zIndex:     s.z,
                opacity:    s.op,
                /*
                  translateX positions the card horizontally.
                  rotateY gives the fan/depth angle.
                  scale handles progressive depth sizing.
                  No per-card perspective() — the container owns it.
                */
                transform:  `translateX(${sign * s.tx}px) rotateY(${sign * s.ry}deg) scale(${s.sc})`,
                transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1), opacity 0.45s ease, box-shadow 0.35s ease',
                boxShadow:  isActive
                  ? '0 36px 90px rgba(0,0,0,0.36), 0 10px 32px rgba(0,0,0,0.20)'
                  : `0 ${4 + abs * 2}px ${16 + abs * 4}px rgba(0,0,0,0.10)`,
              }}
            >
              {/* full-bleed image */}
              <Image
                src={project.image || '/placeholder.svg'}
                alt={project.title}
                fill
                sizes={`${CARD_W}px`}
                className="object-cover"
                priority={isActive}
                draggable={false}
              />

              {/* bottom vignette — keeps text legible */}
              <div
                style={{
                  position:   'absolute',
                  inset:       0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.12) 50%, transparent 100%)',
                }}
              />

              {/* title + tagline anchored at bottom-centre */}
              <div
                style={{
                  position:  'absolute',
                  bottom:     0,
                  left:       0,
                  right:      0,
                  padding:   '16px 20px 24px',
                  textAlign: 'center',
                }}
              >
                <h3
                  style={{
                    margin:         0,
                    fontSize:       isActive ? 22 : 16,
                    fontWeight:     700,
                    color:          '#fff',
                    lineHeight:     1.2,
                    letterSpacing: '-0.01em',
                    transition:    'font-size 0.3s ease',
                    whiteSpace:    'nowrap',
                    overflow:      'hidden',
                    textOverflow:  'ellipsis',
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    margin:         '6px 0 0',
                    fontSize:       10,
                    fontWeight:     700,
                    letterSpacing: '0.16em',
                    color:         'rgba(255,255,255,0.60)',
                    textTransform: 'uppercase',
                  }}
                >
                  {project.tagline}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Navigation controls ── */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous project"
          className="flex size-11 items-center justify-center rounded-full border border-border bg-card/80 shadow-sm backdrop-blur transition-all hover:border-primary hover:shadow-md active:scale-95"
        >
          <ChevronLeft className="size-5" />
        </button>

        {/* pill indicator dots */}
        <div className="flex gap-[7px]" role="tablist" aria-label="Project indicators">
          {items.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              aria-label={`Go to ${p.title}`}
              style={{
                width:      i === active ? 24 : 7,
                height:     7,
                borderRadius: 999,
                background: i === active ? 'var(--color-primary)' : 'var(--color-border)',
                border:     'none',
                padding:    0,
                cursor:     'pointer',
                transition: 'width 0.28s ease, background 0.28s ease',
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next project"
          className="flex size-11 items-center justify-center rounded-full border border-border bg-card/80 shadow-sm backdrop-blur transition-all hover:border-primary hover:shadow-md active:scale-95"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* ── Case-study modal ── */}
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
            onClick={e => e.stopPropagation()}
          >
            <div className="relative">
              <Image
                src={selected.image || '/placeholder.svg'}
                alt={`${selected.title} large visual`}
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
              <p className="text-xs font-medium uppercase tracking-widest text-accent">
                {selected.category}
              </p>
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

/* ─── Section ────────────────────────────────────────────────────── */
export function Work() {
  const [filter, setFilter] = useState('All')
  const visible = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="work" className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
      <Reveal>
        <h2 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
          Selected <span className="font-serif font-normal italic">Work</span>
        </h2>
        <p className="mt-4 max-w-md text-muted-foreground">
          Ideas, concepts and visuals brought to life.
        </p>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          {categories.map(cat => (
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
        <div className="mt-14">
          <Coverflow items={visible} />
        </div>
      </Reveal>
    </section>
  )
}
