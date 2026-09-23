import { createContext, useContext, useEffect, useRef, useState, type ComponentPropsWithoutRef, type CSSProperties, type PropsWithChildren } from 'react'
import { motionTiming } from '@/lib/motion'

const SectionRevealed = createContext(true)
const REVEAL_PROGRESS = 0.2

// Reveal the section when its 20% mark reaches the viewport. Unlike an
// intersection-ratio threshold, this also works for sections taller than the viewport.
export function RevealSection({ children, ...props }: ComponentPropsWithoutRef<'section'>) {
  const sectionRef = useRef<HTMLElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || revealed) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || section.getClientRects().length === 0) {
      setRevealed(true)
      return
    }

    let frame = 0
    const checkProgress = () => {
      const bounds = section.getBoundingClientRect()
      if (bounds.bottom > 0 && bounds.top + bounds.height * REVEAL_PROGRESS <= window.innerHeight) {
        setRevealed(true)
      }
    }
    const scheduleCheck = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        checkProgress()
      })
    }

    checkProgress()
    window.addEventListener('scroll', scheduleCheck, { passive: true })
    window.addEventListener('resize', scheduleCheck)
    return () => {
      window.removeEventListener('scroll', scheduleCheck)
      window.removeEventListener('resize', scheduleCheck)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [revealed])

  return (
    <SectionRevealed.Provider value={revealed}>
      <section {...props} ref={sectionRef} data-revealed={revealed} onFocusCapture={(event) => {
        setRevealed(true)
        props.onFocusCapture?.(event)
      }}>
        {children}
      </section>
    </SectionRevealed.Provider>
  )
}

type RevealProps = PropsWithChildren<{ className?: string; delay?: number }>

export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const revealed = useContext(SectionRevealed)
  const style = { transitionDelay: `${delay}s`, transitionDuration: `${motionTiming.duration}s` } satisfies CSSProperties

  return (
    <div className={`scroll-reveal ${className}`} data-revealed={revealed} style={style}>
      {children}
    </div>
  )
}
