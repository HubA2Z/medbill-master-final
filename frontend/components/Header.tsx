'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Logo, MenuIcon, XIcon } from './icons';
import { CATEGORIES } from '@/lib/categories';

type Item = { name: string; href: string };
type Group = { name: string; href: string; items: Item[] };

const TOOLS: Item[] = [
  { name: 'ICD-10 Code Search', href: '/icd10-intelligence' },
  { name: 'Claim Scrubber', href: '/claim-scrubber' },
  { name: 'E/M Audit Tool 2026', href: '/em-audit-tool' },
  { name: 'Call Note Builder', href: '/call-note-builder' },
  { name: 'All free tools', href: '/tools' },
];
const TOPICS: Item[] = [...CATEGORIES.map((c) => ({ name: c.label, href: `/blog/category/${c.slug}` })), { name: 'All articles', href: '/blog' }];

const GROUPS: Group[] = [
  { name: 'Tools', href: '/tools', items: TOOLS },
  { name: 'Topics', href: '/blog', items: TOPICS },
];
const LINKS: Item[] = [
  { name: 'Blog', href: '/blog' },
  { name: 'Career Guide', href: '/billing-specialist-guide' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

function Dropdown({ group, active }: { group: Group; active: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hoverAt = useRef(0);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDoc); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => { hoverAt.current = Date.now(); setOpen(true); }}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        // A click right after hover-open shouldn't close the menu again.
        onClick={() => { if (Date.now() - hoverAt.current < 500) return; setOpen((o) => !o); }}
        className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${active ? 'text-brand-ink bg-bg-tint' : 'text-ink-2 hover:text-ink hover:bg-bg-soft'}`}
      >
        {group.name} <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 pt-2">
          <ul className="w-64 rounded-xl border border-line bg-white p-2 shadow-lg shadow-slate-200/70">
            {group.items.map((it) => (
              <li key={it.href}>
                <Link href={it.href} className={`block rounded-lg px-3 py-2 text-sm ${it.href === pathname ? 'bg-bg-tint font-semibold text-brand-ink' : 'text-ink-2 hover:bg-bg-soft hover:text-ink'}`}>{it.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');
  const groupActive = (g: Group) => g.items.some((i) => i.href !== '/blog' && i.href !== '/tools' && isActive(i.href)) || (g.name === 'Tools' && pathname === '/tools');

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:shadow">
        Skip to content
      </a>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <Link href="/" aria-label="Enhancely home"><Logo /></Link>

        <div className="hidden lg:flex items-center gap-1">
          {GROUPS.map((g) => <Dropdown key={g.name} group={g} active={groupActive(g)} />)}
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive(l.href) && !(l.href === '/blog' && pathname.startsWith('/blog/category')) ? 'text-brand-ink bg-bg-tint' : 'text-ink-2 hover:text-ink hover:bg-bg-soft'
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
        <div id="mobile-nav" className="lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-line bg-white">
          <div className="mx-auto max-w-6xl px-4 py-3">
            {GROUPS.map((g) => (
              <div key={g.name} className="mb-3">
                <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-ink-3">{g.name}</p>
                <div className="grid grid-cols-2 gap-1">
                  {g.items.map((it) => (
                    <Link key={it.href} href={it.href} className={`rounded-lg px-3 py-2.5 text-[0.92rem] ${it.href === pathname ? 'bg-bg-tint font-semibold text-brand-ink' : 'text-ink-2 hover:bg-bg-soft'}`}>{it.name}</Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="border-t border-line pt-2">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} className={`block rounded-lg px-3 py-3 text-[0.95rem] font-medium ${isActive(l.href) ? 'bg-bg-tint text-brand-ink' : 'text-ink-2 hover:bg-bg-soft'}`}>{l.name}</Link>
              ))}
            </div>
            <Link href="/audit" className="mt-2 mb-2 block rounded-xl bg-brand px-4 py-3 text-center font-semibold text-white">
              Request Free Audit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
