import { useState } from 'react'
import { Header } from '@/features/landing/header'
import { Hero } from '@/features/landing/hero'
import { About, Features, Process, Pricing, FAQ, Footer } from '@/features/landing/sections'
import { Contact } from '@/features/landing/contact'

export function HomePage() {
  const [selectedPlan, setSelectedPlan] = useState('')

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Features />
        <Process />
        <Pricing onSelectPlan={setSelectedPlan} />
        <FAQ />
        <Contact selectedPlan={selectedPlan} onClearPlan={() => setSelectedPlan('')} />
      </main>
      <Footer />
    </>
  )
}
