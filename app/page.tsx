import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Services } from '@/components/services'
import { Work } from '@/components/work'
import { Stats } from '@/components/stats'
import { Process } from '@/components/process'
import { Testimonials } from '@/components/testimonials'
import { Skills } from '@/components/skills'
import { ContactCta } from '@/components/contact-cta'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <SiteNav />
      <main>
        <Hero />
        <About />
        <Services />
        <Work />
        <Stats />
        <Process />
        <Testimonials />
        <Skills />
        <ContactCta />
      </main>
      <SiteFooter />
    </>
  )
}
