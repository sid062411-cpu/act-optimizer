'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LINKS = [
  { href: '/',          label: 'Dashboard' },
  { href: '/log',       label: 'Log Test'  },
  { href: '/history',   label: 'History'   },
  { href: '/generate',  label: 'Generate'  },
]

export function Nav() {
  const pathname = usePathname()
  return (
    <nav className="border-b px-6 py-3 flex items-center gap-6">
      <span className="font-bold text-lg">ACT Optimizer</span>
      <div className="flex gap-4 text-sm">
        {LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={
              pathname === href
                ? 'font-semibold text-primary'
                : 'text-muted-foreground hover:text-foreground transition-colors'
            }
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
