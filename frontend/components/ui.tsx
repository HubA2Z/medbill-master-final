import Link from 'next/link';
import type { ReactNode } from 'react';

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(' ');
}

export function Container({ children, className, size = 'lg' }: { children: ReactNode; className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const max = size === 'sm' ? 'max-w-3xl' : size === 'md' ? 'max-w-5xl' : 'max-w-6xl';
  return <div className={cx(max, 'mx-auto px-4 sm:px-6', className)}>{children}</div>;
}

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'white';
  size?: 'md' | 'lg';
  className?: string;
};

const btnBase =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-150 whitespace-nowrap';
const btnVariants = {
  primary: 'bg-brand text-white hover:bg-brand-hover shadow-sm',
  secondary: 'bg-white text-ink border border-line-strong hover:border-brand hover:text-brand-ink',
  ghost: 'text-brand-ink hover:bg-bg-tint',
  white: 'bg-white text-navy hover:bg-brand-soft',
};
const btnSizes = { md: 'px-4 py-2.5 text-sm', lg: 'px-6 py-3.5 text-[0.95rem]' };

export function ButtonLink({ href, children, variant = 'primary', size = 'md', className }: BtnProps) {
  return (
    <Link href={href} className={cx(btnBase, btnVariants[variant], btnSizes[size], className)}>
      {children}
    </Link>
  );
}

export function btnClass(variant: keyof typeof btnVariants = 'primary', size: keyof typeof btnSizes = 'md') {
  return cx(btnBase, btnVariants[variant], btnSizes[size]);
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx('text-xs font-semibold uppercase tracking-[0.14em] text-brand', className)}>{children}</p>
  );
}

export function Badge({ children, tone = 'brand' }: { children: ReactNode; tone?: 'brand' | 'slate' | 'warn' | 'ok' }) {
  const tones = {
    brand: 'bg-brand-soft text-brand-ink',
    slate: 'bg-bg-soft text-ink-2 border border-line',
    warn: 'bg-warn-soft text-warn',
    ok: 'bg-emerald-50 text-ok',
  };
  return (
    <span className={cx('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold', tones[tone])}>
      {children}
    </span>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('rounded-2xl border border-line bg-white', className)}>{children}</div>;
}

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-ink-3">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link href="/" className="hover:text-brand-ink">Home</Link></li>
        {items.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1.5">
            <span aria-hidden className="text-line-strong">/</span>
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-ink-2 font-medium">{c.name}</span>
            ) : (
              <Link href={c.href} className="hover:text-brand-ink">{c.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  crumbs,
  children,
  align = 'left',
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  align?: 'left' | 'center';
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-bg-soft">
      <div aria-hidden className="bg-grid absolute inset-0" />
      <Container className={cx('relative py-12 sm:py-16', align === 'center' && 'text-center')}>
        {crumbs && (
          <div className={cx('mb-6', align === 'center' && 'flex justify-center')}>
            <Breadcrumbs items={crumbs} />
          </div>
        )}
        {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
        <h1 className={cx('text-3xl sm:text-5xl font-bold tracking-tight text-ink leading-[1.1] text-balance', align === 'center' ? 'mx-auto max-w-3xl' : 'max-w-3xl')}>
          {title}
        </h1>
        {subtitle && (
          <p className={cx('mt-4 text-lg text-ink-2 leading-relaxed', align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl')}>
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, center }: { eyebrow?: string; title: ReactNode; subtitle?: ReactNode; center?: boolean }) {
  return (
    <div className={cx('mb-10', center && 'text-center')}>
      {eyebrow && <Eyebrow className="mb-2">{eyebrow}</Eyebrow>}
      <h2 className={cx('text-2xl sm:text-3xl font-bold tracking-tight text-ink text-balance', center && 'mx-auto max-w-2xl')}>{title}</h2>
      {subtitle && <p className={cx('mt-3 text-ink-2 leading-relaxed', center ? 'mx-auto max-w-2xl' : 'max-w-2xl')}>{subtitle}</p>}
    </div>
  );
}

export function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <svg className="mt-1 h-4 w-4 shrink-0 text-brand" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path fillRule="evenodd" d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 111.4-1.4L8 12.58l7.3-7.3a1 1 0 011.4 0z" clipRule="evenodd" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

export function Callout({ title, children, tone = 'brand' }: { title?: string; children: ReactNode; tone?: 'brand' | 'warn' }) {
  const t = tone === 'warn' ? 'border-amber-300 bg-warn-soft/60 text-amber-900' : 'border-brand/30 bg-bg-tint text-brand-ink';
  return (
    <div className={cx('rounded-2xl border-l-4 p-5 sm:p-6 not-italic', t)}>
      {title && <p className="font-semibold mb-1">{title}</p>}
      <div className="text-[0.95rem] leading-relaxed">{children}</div>
    </div>
  );
}

/** Dark navy call-to-action band used at the bottom of most pages. */
export function CtaBand({
  title = 'Find the revenue your practice is missing.',
  body = 'Get a complimentary 48-hour revenue integrity audit from our certified billing team. No obligation.',
  primary = { label: 'Request free audit', href: '/audit' },
  secondary = { label: 'Explore free tools', href: '/tools' },
}: {
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-12 sm:px-12 sm:py-14 text-white">
          <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/30 blur-3xl" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance">{title}</h2>
              <p className="mt-3 text-slate-300 leading-relaxed">{body}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={primary.href} variant="white" size="lg">{primary.label} →</ButtonLink>
              {secondary && (
                <Link href={secondary.href} className={cx(btnBase, btnSizes.lg, 'border border-white/25 text-white hover:bg-white/10')}>
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
