import Link from 'next/link';
import NewsletterForm from '@/components/NewsletterForm';
import { Container, PageHero } from '@/components/ui';
import AdSlot from '@/components/AdSlot';
import { ArrowRight } from '@/components/icons';
import { pageMeta } from '@/lib/site';
import { formatDate } from '@/lib/posts';
import { getAllListings } from '@/lib/blog';

export const revalidate = 60;

export const metadata = pageMeta({
  title: 'Medical Billing & Coding Blog — 2026 Updates and Strategies',
  description:
    'Expert guidance on medical billing, ICD-10 and E/M coding updates, denial reduction, AI in revenue cycle management, and career growth for billing professionals.',
  path: '/blog',
});

export default async function Page() {
  const [featured, ...rest] = await getAllListings();
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Blog', href: '/blog' }]}
        eyebrow="Enhancely insights"
        title="Medical billing & coding, explained"
        subtitle="Coding updates, revenue cycle strategy, and career growth for healthcare billing professionals."
      />

      <section className="py-14">
        <Container>
          <Link href={featured.slug} className="group grid overflow-hidden rounded-2xl border border-line bg-white transition-colors hover:border-brand/40 md:grid-cols-2">
            <div className="relative flex min-h-48 items-end bg-navy p-8">
              <div aria-hidden className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-brand/40 blur-3xl" />
              <p className="relative text-3xl font-bold leading-tight text-white/90">{featured.category}<br /><span className="text-teal-300">{featured.date.slice(0, 4)}</span></p>
            </div>
            <div className="p-8">
              <p className="text-xs text-ink-3"><span className="font-semibold text-brand-ink">{featured.category}</span> · {formatDate(featured.date)} · {featured.readTime} read</p>
              <h2 className="mt-3 text-2xl font-bold leading-tight text-ink group-hover:text-brand-ink">{featured.title}</h2>
              <p className="mt-3 leading-relaxed text-ink-2">{featured.description}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink">Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
            </div>
          </Link>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {rest.map((p) => (
              <Link key={p.slug} href={p.slug} className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition-colors hover:border-brand/40">
                <p className="text-xs text-ink-3"><span className="font-semibold text-brand-ink">{p.category}</span> · {formatDate(p.date)}</p>
                <h2 className="mt-3 text-lg font-semibold leading-snug text-ink group-hover:text-brand-ink">{p.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">{p.description}</p>
                <span className="mt-5 text-xs text-ink-3">{p.readTime} read</span>
              </Link>
            ))}
          </div>

          <Link href="/billing-specialist-guide" className="group mt-6 flex flex-col gap-3 rounded-2xl border border-line bg-bg-tint p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">Career guide</p>
              <p className="mt-1 font-semibold text-ink">Becoming a billing specialist: salary, certification, and resume tips</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink">Read the guide <ArrowRight className="h-4 w-4" /></span>
          </Link>

          <div className="mt-14 hidden md:block"><AdSlot unit="banner728x90" /></div>
          <div className="mt-14 md:hidden"><AdSlot unit="banner300x250" /></div>

          <div className="mt-14 flex flex-col items-start gap-5 rounded-2xl border border-line bg-bg-soft p-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-xl font-bold text-ink">Stay ahead in medical billing</h2>
              <p className="mt-1 text-ink-2">Monthly coding updates and revenue tips. Unsubscribe anytime.</p>
            </div>
            <NewsletterForm />
          </div>
        </Container>
      </section>
    </>
  );
}
