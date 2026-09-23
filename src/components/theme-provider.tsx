import { useEffect, useState, type PropsWithChildren } from 'react'
import { ThemeContext, type Theme } from '@/components/theme-context'

function getInitialTheme(): Theme { return window.localStorage.getItem('theme') === 'dark' ? 'dark' : 'light' }

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark'); window.localStorage.setItem('theme', theme) }, [theme])
  return <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme((current) => current === 'dark' ? 'light' : 'dark') }}>{children}</ThemeContext.Provider>
}
