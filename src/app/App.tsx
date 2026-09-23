import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppProviders } from '@/app/providers'
import { HomePage } from '@/routes/home'

export function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<main className="not-found"><h1>Page not found.</h1><a href="/">Back to Agentnonymous</a></main>} />
        </Routes>
      </BrowserRouter>
    </AppProviders>
  )
}
