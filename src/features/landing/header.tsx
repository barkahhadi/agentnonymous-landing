import { useEffect, useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navigation = [
  { label: 'Features', href: '#features' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact Us', href: '#contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const sentinel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sentinel.current || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    observer.observe(sentinel.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="nav-sentinel" ref={sentinel} aria-hidden="true" />
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#home" aria-label="Agentnonymous home" className="nav-logo">
            <img src="/images/logo-white.webp" width="280" height="65" alt="Agentnonymous" />
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>
          <div className="nav-actions">
            <Dialog.Root>
              <Dialog.Trigger asChild><Button className="brand-button sign-in">Sign in</Button></Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="dialog-overlay" />
                <Dialog.Content className="dialog-content">
                  <Dialog.Title>Welcome to Agentnonymous.</Dialog.Title>
                  <Dialog.Description>Sign-in will be available when the agent workspace is connected. For now, you can reach our team at info@agentnonymous.com.</Dialog.Description>
                  <Dialog.Close asChild><button className="dialog-close" aria-label="Close sign-in dialog"><X size={20} /></button></Dialog.Close>
                  <Dialog.Close asChild><a className="brand-button dialog-cta" href="#contact">Contact us</a></Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
            <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
              <Dialog.Trigger asChild><button className="mobile-menu-trigger" aria-label="Open navigation"><Menu /></button></Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="dialog-overlay" />
                <Dialog.Content className="mobile-menu">
                  <Dialog.Title className="sr-only">Navigation</Dialog.Title>
                  <Dialog.Description className="sr-only">Explore Agentnonymous.</Dialog.Description>
                  <Dialog.Close asChild><button className="dialog-close" aria-label="Close navigation"><X /></button></Dialog.Close>
                  <nav aria-label="Mobile navigation">
                    {navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
                  </nav>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </header>
    </>
  )
}
