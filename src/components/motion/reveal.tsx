import { useEffect, useRef, type PropsWithChildren } from 'react'
import { useAnimate, useReducedMotion } from 'framer-motion'
import { motionTiming } from '@/lib/motion'

type RevealProps = PropsWithChildren<{ className?: string; delay?: number; blur?: boolean }>

// Content is visible by default. Animation is applied only when observation works,
// so a failed animation never strands text at opacity: 0.
export function Reveal({ children, className = '', delay = 0, blur = false }: RevealProps) {
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const reducedMotion = useReducedMotion()
  const revealed = useRef(false)

  useEffect(() => {
    const node = scope.current
    if (!node || revealed.current || reducedMotion || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || revealed.current) return
      revealed.current = true
      observer.disconnect()
      void animate(node, {
        opacity: [0, 1],
        y: [18, 0],
        ...(blur ? { filter: ['blur(3px)', 'blur(0px)'] } : {}),
      }, { duration: motionTiming.duration, delay, ease: motionTiming.ease })
    }, { threshold: 0.12 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [animate, blur, delay, reducedMotion, scope])

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  )
}
