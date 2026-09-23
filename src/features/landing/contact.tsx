import { useState, type FormEvent } from 'react'
import { ArrowUpRight, ChevronDown, X } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'
import { SectionHeading } from './sections'

export function Contact({ selectedPlan, onClearPlan }: { selectedPlan: string; onClearPlan: () => void }) {
  const [notice, setNotice] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNotice(true)
  }

  return (
    <section id="contact" className="contact design-section" aria-label="Get in touch">
      <div className="contact-art" aria-hidden="true" />
      <SectionHeading eyebrow="Get In Touch" description={<>Tell us the one task your team dreads every week. On the first call we will<br className="desktop-break" /> tell you, for free, whether it is worth automating and roughly what it would<br className="desktop-break" /> take.</>}>
        Show Us Your Most Annoying<br />Workflow.
      </SectionHeading>
      <Reveal className="contact-form-wrapper">
        <form className="contact-form" onSubmit={handleSubmit} onChange={() => setNotice(false)}>
          <h3>Start a project.</h3>
          {selectedPlan && <div className="selected-plan">Interested in {selectedPlan}<button type="button" onClick={onClearPlan} aria-label="Clear selected plan"><X size={14} /></button></div>}
          <div className="form-grid">
            <label><span className="field-label">Name</span><input name="name" placeholder="Jane Smith" autoComplete="name" required maxLength={100} /></label>
            <label><span className="field-label">Email</span><input name="email" type="email" placeholder="example@email.com" autoComplete="email" required maxLength={254} /></label>
            <label><span className="field-label">What are you looking for?</span><span className="select-wrap"><select name="service" defaultValue="manual"><option value="manual">Too much manual work</option><option value="support">AI customer support</option><option value="knowledge">A custom knowledge agent</option><option value="other">Something else</option></select><ChevronDown size={15} aria-hidden="true" /></span></label>
            <label><span className="field-label">What’s your budget?</span><span className="select-wrap"><select name="budget" defaultValue="under-5k"><option value="under-5k">Under $5k</option><option value="5k-10k">$5k – $10k</option><option value="10k-25k">$10k – $25k</option><option value="25k-plus">$25k+</option><option value="unsure">Let’s discuss</option></select><ChevronDown size={15} aria-hidden="true" /></span></label>
            <label className="full-width"><span className="field-label">Tell us more</span><textarea name="message" rows={3} placeholder="Got anything else to add?" maxLength={5000} /></label>
          </div>
          <div className="form-actions"><Button className="brand-button" type="submit">Let’s talk <ArrowUpRight size={16} aria-hidden="true" /></Button><span>Let’s make the repetitive work disappear.</span></div>
          {notice && <p role="status" className="form-notice">Online submissions are not available yet. Nothing has been sent. You can contact us directly at <a href="mailto:info@agentnonymous.com">info@agentnonymous.com</a>.</p>}
        </form>
      </Reveal>
    </section>
  )
}
