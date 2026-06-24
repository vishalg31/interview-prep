'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// Vishal Builds top bar, same pattern as Tailor and Dak: sticky, hides on
// scroll-down and reappears on scroll-up, brand on the left, links on the right.
export function NavBar() {
  const [visible, setVisible] = useState(true)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (y < 60) setVisible(true)
      else if (y > lastY.current) setVisible(false)
      else setVisible(true)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="sticky top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur transition-transform duration-300"
      style={{ transform: visible ? 'translateY(0)' : 'translateY(-100%)' }}
    >
      <div className="mx-auto flex h-14 max-w-[64rem] items-center justify-between px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-display text-base font-semibold tracking-tight text-ink">
            Product Interview Q&A
          </span>
          <span
            aria-hidden
            className="h-1.5 w-1.5 rounded-full bg-[#FBBF24]"
          />
          <span className="font-mono text-[0.6875rem] tracking-wide text-muted">
            by Vishal Builds
          </span>
        </Link>

        {/* Links */}
        <nav
          aria-label="Site navigation"
          className="flex items-center gap-5 font-mono text-[0.6875rem] uppercase tracking-wider text-muted"
        >
          <Link href="/" className="transition-colors hover:text-move">
            Home
          </Link>
          <a
            href="https://www.vishalbuilds.com/#projects"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-move"
          >
            Products
          </a>
        </nav>
      </div>
    </header>
  )
}
