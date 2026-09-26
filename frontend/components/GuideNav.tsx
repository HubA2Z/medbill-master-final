import Link from 'next/link';
import { Container } from './ui';

const PAGES = [
  { name: 'Overview', href: '/billing-specialist-guide' },
  { name: 'Salary', href: '/billing-specialist-guide/salary' },
  { name: 'Certification', href: '/billing-specialist-guide/certification' },
  { name: 'Resume & skills', href: '/billing-specialist-guide/resume-tips' },
];

export default function GuideNav({ current }: { current: string }) {
  return (
    <div className="sticky top-16 z-40 border-b border-line bg-white/95 backdrop-blur">
        <Container>
          <nav aria-label="Career guide sections" className="-mx-1 flex gap-1 overflow-x-auto py-2">
            {PAGES.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                aria-current={p.href === current ? 'page' : undefined}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium ${p.href === current ? 'bg-bg-tint text-brand-ink' : 'text-ink-2 hover:bg-bg-soft'}`}
              >
                {p.name}
              </Link>
            ))}
          </nav>
        </Container>
    </div>
  );
}

export function NextChapter({ current }: { current: string }) {
  const idx = PAGES.findIndex((p) => p.href === current);
  const next = PAGES[idx + 1];
  const prev = PAGES[idx - 1];
  return (
    <div className="mt-14 grid gap-4 sm:grid-cols-2">
      {prev ? (
        <Link href={prev.href} className="rounded-2xl border border-line p-5 hover:border-brand/40">
          <p className="text-xs text-ink-3">← Previous</p>
          <p className="mt-1 font-semibold text-ink">{prev.name}</p>
        </Link>
      ) : <span />}
      {next && (
        <Link href={next.href} className="rounded-2xl border border-line p-5 text-right hover:border-brand/40">
          <p className="text-xs text-ink-3">Next →</p>
          <p className="mt-1 font-semibold text-ink">{next.name}</p>
        </Link>
      )}
    </div>
  );
}
