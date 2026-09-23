import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { App } from '@/app/App'

describe('Agentnonymous landing page', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/')
    window.localStorage.clear()
  })

  it('renders the PDF sections and real anchor destinations', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Every hello builds LOYALTY.')
    for (const name of ['About Agentnonymous', 'Key features', 'Our process', 'Pricing plans', 'Frequently asked questions', 'Get in touch']) {
      expect(screen.getByRole('region', { name })).toBeInTheDocument()
    }
    const navigation = screen.getByRole('navigation', { name: 'Main navigation' })
    for (const anchor of within(navigation).getAllByRole('link')) {
      expect(document.querySelector(anchor.getAttribute('href')!)).toBeInTheDocument()
    }
  })

  it('supports accessible accordion expansion and collapse', async () => {
    const user = userEvent.setup()
    render(<App />)
    const first = screen.getByRole('button', { name: 'Do we need an AI strategy before we talk to you?' })
    const second = screen.getByRole('button', { name: 'How fast can we see something working?' })
    expect(first).toHaveAttribute('aria-expanded', 'true')
    await user.click(second)
    expect(second).toHaveAttribute('aria-expanded', 'true')
    expect(first).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText(/The timeline depends on your workflow/)).toBeVisible()
    await user.click(second)
    expect(second).toHaveAttribute('aria-expanded', 'false')
  })

  it('passes a selected pricing plan into the contact form', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('link', { name: 'Get started with Growth' }))
    expect(screen.getByText('Interested in Growth')).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'Clear selected plan' }))
    expect(screen.queryByText('Interested in Growth')).not.toBeInTheDocument()
  })

  it('validates contact details and never reports an unsent message as sent', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Let’s talk' }))
    expect(screen.getByLabelText('Name')).toBeInvalid()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    await user.type(screen.getByLabelText('Name'), 'Jane Smith')
    await user.type(screen.getByLabelText('Email'), 'jane@example.com')
    await user.click(screen.getByRole('button', { name: 'Let’s talk' }))
    expect(screen.getByRole('status')).toHaveTextContent('Nothing has been sent.')
    expect(screen.getByLabelText('Name')).toHaveValue('Jane Smith')
  })

  it('opens and dismisses the sign-in dialog with keyboard focus restored', async () => {
    const user = userEvent.setup()
    render(<App />)
    const signIn = screen.getByRole('button', { name: 'Sign in' })
    await user.click(signIn)
    expect(screen.getByRole('dialog')).toHaveTextContent('Sign-in will be available')
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(signIn).toHaveFocus()
  })

  it('opens mobile navigation and closes it after selecting a destination', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Open navigation' }))
    const menu = screen.getByRole('navigation', { name: 'Mobile navigation' })
    await user.click(within(menu).getByRole('link', { name: 'Pricing' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(window.location.hash).toBe('#pricing')
  })
})
