import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { motionTiming } from '@/lib/motion'
import { Reveal, RevealSection } from '@/components/motion/reveal'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { benefits, faqs, planFeatures, plans, steps } from './content'

export function SectionHeading({ eyebrow, children, description }: { eyebrow: string; children: ReactNode; description: ReactNode }) {
  return (
    <div className="section-heading">
      <Reveal><div className="eyebrow"><img src="/images/brand-mark.webp" width="28" height="28" alt="" />{eyebrow}</div></Reveal>
      <Reveal delay={motionTiming.stagger}><h2>{children}</h2></Reveal>
      <Reveal delay={motionTiming.stagger * 2}><p>{description}</p></Reveal>
    </div>
  )
}

export function About() {
  return (
    <RevealSection className="about design-section" id="about" aria-label="About Agentnonymous">
      <SectionHeading eyebrow="About" description={<>Our custom AI solutions deliver measurable growth and operational excellence. We believe that AI should not just automate tasks, but amplify the creative and strategic potential of every human.</>}>
        Automate The Manual.<br />Accelerate The Future.
      </SectionHeading>
      <div className="benefits">
        {benefits.map((benefit, index) => (
          <Reveal key={benefit.title} delay={index * motionTiming.stagger}>
            <article className="benefit">
              <div className="benefit-heading"><span aria-hidden="true">{index + 1}</span><h3>{benefit.title}</h3></div>
              <p>{benefit.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </RevealSection>
  )
}

function FeatureCard({ title, description, children, className = '', delay = 0 }: {
  title: string; description: string; children: ReactNode; className?: string; delay?: number
}) {
  return (
    <Reveal delay={delay} className={`feature-reveal ${className}`}>
      <article className="feature-card interactive-card">
        <div className="feature-copy"><h3>{title}</h3><p>{description}</p></div>
        {children}
      </article>
    </Reveal>
  )
}

export function Features() {
  return (
    <RevealSection id="features" className="features design-section" aria-label="Key features">
      <SectionHeading eyebrow="Key Features" description={<>Packed with powerful, easy-to-use features that give you complete<br className="desktop-break" /> control over your AI agents.</>}>
        Build Your Powerful Agents.<br />All In One Place
      </SectionHeading>
      <div className="features-grid">
        <FeatureCard title="Multi-Knowledge Based" description="Transform your documents such as text files, PDFs, or website content into accurate insights that serve as a knowledge base for AI agents.">
          <div className="feature-visual grid-visual"><img className="upload-art" src="/images/upload.webp" width="640" height="365" alt="Project Brief.txt being uploaded to the knowledge base" loading="lazy" /></div>
        </FeatureCard>
        <FeatureCard title="Seamless Integration" description="Integrates with AI models by link your accounts and let your AI agents work across all your platforms, ensuring a cohesive experience." delay={motionTiming.stagger}>
          <div className="feature-visual grid-visual integration-visual" role="img" aria-label="Agentnonymous connects with OpenAI, Google, Meta, and DeepSeek">
            <div className="integration-logos">
              <img className="integration-top" src="/images/deepseek.webp" alt="" width="44" height="44" loading="lazy" />
              <img className="integration-left" src="/images/openai.webp" alt="" width="44" height="44" loading="lazy" />
              <div className="integration-center"><img src="/images/brand-mark.webp" alt="" width="30" height="30" /></div>
              <img className="integration-right" src="/images/google.webp" alt="" width="44" height="44" loading="lazy" />
              <img className="integration-bottom" src="/images/meta.webp" alt="" width="44" height="28" loading="lazy" />
            </div>
          </div>
        </FeatureCard>
        <FeatureCard className="analytics-card" title="Conversation Analytics Dashboard" description="Unlock actionable insights and accurate forecasts for smarter decisions.">
          <div className="feature-visual grid-visual metrics-visual" role="img" aria-label="Three circular performance metrics on the analytics dashboard">
            {[0, 1, 2].map((index) => <img key={index} src="/images/metric.webp" alt="" width="220" height="294" loading="lazy" style={{ transitionDelay: `${index * 120}ms` }} />)}
          </div>
        </FeatureCard>
        <FeatureCard title="Ticketing System" description="Create, send, and track invoices effortlessly while automating payments and keeping finances organized in one place.">
          <div className="feature-visual grid-visual" aria-hidden="true" />
        </FeatureCard>
        <FeatureCard title="Plan Management" description="Track work hours, monitor productivity, and log tasks accurately to improve efficiency and keep projects on schedule." delay={motionTiming.stagger}>
          <div className="feature-visual grid-visual" aria-hidden="true" />
        </FeatureCard>
      </div>
    </RevealSection>
  )
}

export function Process() {
  return (
    <RevealSection id="process" className="process design-section" aria-label="Our process">
      <SectionHeading eyebrow="The Process" description="From your content to a live agent in four steps.">
        From Your Content to<br />A Live Agent in Four Steps.
      </SectionHeading>
      <div className="process-grid">
        {steps.map((step, index) => (
          <Reveal key={step.title.join(' ')} className={`process-step step-${index + 1}`} delay={index * motionTiming.stagger}>
            <article>
              <span className="step-number">0{index + 1}.</span>
              <h3>{step.title[0]}<br />{step.title[1]}</h3>
              <p>{step.description}</p>
            </article>
          </Reveal>
        ))}
        <Reveal className="process-mark mark-one" delay={motionTiming.stagger}><div><img src="/images/brand-mark.webp" width="120" height="120" alt="" loading="lazy" /></div></Reveal>
        <Reveal className="process-mark mark-two" delay={motionTiming.stagger * 2}><div><img src="/images/brand-mark.webp" width="120" height="120" alt="" loading="lazy" /></div></Reveal>
      </div>
    </RevealSection>
  )
}

export function Pricing({ onSelectPlan }: { onSelectPlan: (plan: string) => void }) {
  return (
    <RevealSection id="pricing" className="pricing design-section" aria-label="Pricing plans">
      <SectionHeading eyebrow="Pricing Plan" description={<>Build your AI workforce with pricing that actually makes sense.<br />No hidden costs, just high-performance results.</>}>
        Flexible Plans for Every<br />Stage of Growth
      </SectionHeading>
      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <Reveal key={plan.name} delay={index * motionTiming.stagger}>
            <article className={`pricing-card interactive-card ${plan.name === 'Growth' ? 'popular-plan' : ''}`}>
              <div className="plan-summary">
                <div className="plan-label"><h3>{plan.name}</h3><span>{plan.badge}</span></div>
                <p className="plan-price">{plan.price}</p>
                <p className="plan-description">{plan.description}</p>
              </div>
              <ul>{planFeatures.map((feature, featureIndex) => (
                <li key={feature} className={featureIndex >= plan.included ? 'not-included' : ''}>
                  <span className="check-dot"><Check size={9} strokeWidth={3} aria-hidden="true" /></span>
                  <span>{feature}</span>{featureIndex >= plan.included && <span className="sr-only"> (not included)</span>}
                </li>
              ))}</ul>
              <Button asChild className="plan-button"><a href="#contact" aria-label={`Get started with ${plan.name}`} onClick={() => onSelectPlan(plan.name)}>Get started</a></Button>
            </article>
          </Reveal>
        ))}
      </div>
    </RevealSection>
  )
}

export function FAQ() {
  return (
    <RevealSection className="faq design-section" id="faq" aria-label="Frequently asked questions">
      <SectionHeading eyebrow="FAQ" description="Find quick answers to the most common support questions">
        Have Questions?<br />We’ve Got Answers.
      </SectionHeading>
      <Reveal className="faq-container">
        <Accordion type="single" collapsible defaultValue="faq-0">
          {faqs.map((faq, index) => <AccordionItem key={faq.question} value={`faq-${index}`}><AccordionTrigger>{faq.question}</AccordionTrigger><AccordionContent>{faq.answer}</AccordionContent></AccordionItem>)}
        </Accordion>
      </Reveal>
    </RevealSection>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <a href="#home" aria-label="Agentnonymous home"><img className="footer-logo" src="/images/logo-color.webp" width="1000" height="220" alt="Agentnonymous" loading="lazy" /></a>
        <p>Empower your business with cutting-edge AI technology that transforms raw data into actionable insights.</p>
        <a className="footer-email" href="mailto:info@agentnonymous.com">info@agentnonymous.com</a>
        <div className="footer-socials"><span>Follow us</span><img src="/images/socials.webp" width="100" height="35" alt="X, Instagram, and Dribbble — profiles coming soon" loading="lazy" /></div>
      </div>
      <small>©2026 Agentnonymous. All rights reserved.</small>
    </footer>
  )
}
