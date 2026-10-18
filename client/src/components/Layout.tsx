import { Outlet, ScrollRestoration } from 'react-router'
import { useSectionTones } from '../hooks/useSectionTones'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout() {
  useSectionTones()

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  )
}
