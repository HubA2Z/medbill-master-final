'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo, MenuIcon, XIcon } from './icons';

const NAV = [
  { name: 'ICD-10 Search', href: '/icd10-intelligence' },
  { name: 'Claim Scrubber', href: '/claim-scrubber' },
  { name: 'Call Notes', href: '/call-note-builder' },
  { name: 'Tools', href: '/tools' },
  { name: 'Career Guide', href: '/billing-specialist-guide' },
  { name: 'Blog', href: '/blog' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:shadow">
        Skip to content
      </a>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <Link href="/" aria-label="Enhancely home"><Logo /></Link>

        <div className="hidden lg:flex items-center gap-1">
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive(l.href) ? 'text-brand-ink bg-bg-tint' : 'text-ink-2 hover:text-ink hover:bg-bg-soft'
              }`}
            >
              {l.name}
            </Link>
          ))}
          <Link href="/audit" className="ml-3 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-hover">
            Free Audit
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden -mr-2 rounded-lg p-2 text-ink-2 hover:bg-bg-soft"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-nav" className="lg:hidden border-t border-line bg-white">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-1">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-3 py-3 text-[0.95rem] font-medium ${isActive(l.href) ? 'bg-bg-tint text-brand-ink' : 'text-ink-2 hover:bg-bg-soft'}`}
              >
                {l.name}
              </Link>
            ))}
            <Link href="/audit" className="mt-2 rounded-xl bg-brand px-4 py-3 text-center font-semibold text-white">
              Request Free Audit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
