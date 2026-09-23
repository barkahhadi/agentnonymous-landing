import { act, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Reveal, RevealSection } from './reveal'

afterEach(() => vi.restoreAllMocks())

describe('section scroll reveal', () => {
  it('keeps content hidden until the 20% point enters the viewport', () => {
    let top = 700
    // Taller than the viewport: an IntersectionObserver threshold of 0.2
    // could never fire, but the section-progress mark still can.
    const height = 5_000

    vi.spyOn(window, 'matchMedia').mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
    vi.spyOn(HTMLElement.prototype, 'getClientRects').mockReturnValue([{}] as unknown as DOMRectList)
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => ({
      top,
      bottom: top + height,
      height,
      left: 0,
      right: 100,
      width: 100,
      x: 0,
      y: top,
      toJSON: () => ({}),
    }))
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      callback(0)
      return 1
    })

    render(<RevealSection aria-label="Test section"><Reveal>Content</Reveal></RevealSection>)
    const section = screen.getByRole('region', { name: 'Test section' })
    expect(section).toHaveAttribute('data-revealed', 'false')

    act(() => {
      top = window.innerHeight - height * 0.2
      window.dispatchEvent(new Event('scroll'))
    })

    expect(section).toHaveAttribute('data-revealed', 'true')
    expect(screen.getByText('Content')).toHaveAttribute('data-revealed', 'true')
  })
})
