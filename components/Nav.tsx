'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/',        label: 'Dashboard' },
  { href: '/log',     label: 'Log Test'  },
  { href: '/history', label: 'History'   },
  { href: '/timer',   label: 'Timer'     },
]

export function Nav() {
  const pathname = usePathname()
  return (
    <nav className="sticky top-0 z-50 border-b border-border/60 bg-white/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-extrabold tracking-tight text-primary">ACT</span>
          <span className="text-lg font-extrabold tracking-tight text-foreground">Optimizer</span>
        </Link>
        <div className="flex items-center gap-1">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={
                pathname === href
                  ? 'px-4 py-1.5 rounded-full text-sm font-semibold bg-primary text-white'
                  : 'px-4 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors'
              }
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
