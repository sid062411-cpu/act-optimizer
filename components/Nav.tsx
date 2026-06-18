'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ThemeToggle } from '@/components/ThemeToggle'

const LINKS = [
  { href: '/',           label: 'Dashboard'   },
  { href: '/tests',      label: 'Practice'    },
  { href: '/log',        label: 'Log Test'    },
  { href: '/history',    label: 'History'     },
  { href: '/calculator', label: 'Calculator'  },
  { href: '/insights',   label: 'Insights'    },
  { href: '/timer',      label: 'Timer'       },
]

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const linkCls = (href: string) =>
    pathname === href
      ? 'px-4 py-1.5 rounded-full text-sm font-semibold bg-primary text-white'
      : 'px-4 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors'

  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-white/80 dark:bg-background/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-lg font-extrabold tracking-tight text-primary">ACT</span>
          <span className="text-lg font-extrabold tracking-tight text-foreground">Optimizer</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={linkCls(href)}>{label}</Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setOpen((p) => !p)}
            className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-border/60 bg-white/95 dark:bg-background/95 px-6 py-3 flex flex-col gap-1">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`${linkCls(href)} block w-full`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
