'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { useRouter } from 'next/navigation'

export type Project = {
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
  const router = useRouter()
  const [active, setActive]     = useState(0)
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
                else           router.push(`/work/${project.slug}`)
              }}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  if (!isActive) setActive(idx)
                  else           router.push(`/work/${project.slug}`)
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
    </div>
  )
}

/* ─── Section ────────────────────────────────────────────────────── */
export function Work({ initialProjects = [] }: { initialProjects?: Project[] }) {
  const [filter, setFilter] = useState('All')
  
  // Extract unique categories from projects
  const uniqueCategories = Array.from(new Set(initialProjects.map(p => p.category)))
  const categories = ['All', ...uniqueCategories]

  const visible = filter === 'All' ? initialProjects : initialProjects.filter(p => p.category === filter)

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
