import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Container, PageHero } from '@/components/ui';
import { pageMeta } from '@/lib/site';
import { formatDate } from '@/lib/posts';
import { getAllListings } from '@/lib/blog';
import { CATEGORIES } from '@/lib/categories';

export const revalidate = 60;
export const dynamicParams = false;
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const c = CATEGORIES.find((x) => x.slug === category);
  if (!c) return { title: 'Category not found', robots: { index: false } };
  return pageMeta({ title: `${c.label}: Medical Billing Articles`, description: c.description, path: `/blog/category/${c.slug}` });
}

const GUIDES = [
  { href: '/billing-specialist-guide', title: 'What a medical billing specialist does', body: 'Daily duties, the claim lifecycle, skills, and how to get started.' },
  { href: '/billing-specialist-guide/salary', title: 'Medical billing salary guide', body: 'What drives pay, career paths, and how to negotiate.' },
  { href: '/billing-specialist-guide/certification', title: 'Certification guide: CPC, CPB, CCS and more', body: 'AAPC vs AHIMA credentials and how to choose.' },
  { href: '/billing-specialist-guide/resume-tips', title: 'Resume tips for billers and coders', body: 'Skills to list, sample bullets, and interview questions.' },
];

export default async function Page({ params }: Props) {
  const { category } = await params;
  const c = CATEGORIES.find((x) => x.slug === category);
  if (!c) notFound();
  const posts = (await getAllListings()).filter((p) => p.category.toLowerCase() === c.name.toLowerCase());

  return (
    <>
      <PageHero crumbs={[{ name: 'Blog', href: '/blog' }, { name: c.label, href: `/blog/category/${c.slug}` }]} eyebrow="Topic" title={c.label} subtitle={c.description} />
      <section className="py-14">
        <Container>
          <nav aria-label="Topics" className="mb-10 flex flex-wrap gap-2">
            <Link href="/blog" className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium text-ink-2 hover:border-brand hover:text-brand-ink">All articles</Link>
            {CATEGORIES.map((x) => (
              <Link key={x.slug} href={`/blog/category/${x.slug}`} aria-current={x.slug === c.slug ? 'page' : undefined}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium ${x.slug === c.slug ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink-2 hover:border-brand hover:text-brand-ink'}`}>
                {x.label}
              </Link>
            ))}
          </nav>

          {posts.length > 0 && (
            <div className="grid gap-5 md:grid-cols-3">
              {posts.map((p) => (
                <Link key={p.slug} href={p.slug} className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition-colors hover:border-brand/40">
                  <p className="text-xs text-ink-3"><span className="font-semibold text-brand-ink">{c.label}</span> · {formatDate(p.date)}</p>
                  <h2 className="mt-3 text-lg font-semibold leading-snug text-ink group-hover:text-brand-ink">{p.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-2">{p.description}</p>
                  <span className="mt-5 text-xs text-ink-3">{p.readTime} read</span>
                </Link>
              ))}
            </div>
          )}

          {c.slug === 'careers' && (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-ink">Career guides</h2>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {GUIDES.map((g) => (
                  <Link key={g.href} href={g.href} className="group rounded-2xl border border-line bg-bg-tint p-6 hover:border-brand/40">
                    <h3 className="font-semibold text-ink group-hover:text-brand-ink">{g.title}</h3>
                    <p className="mt-1 text-sm text-ink-2">{g.body}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {posts.length === 0 && c.slug !== 'careers' && (
            <p className="text-ink-2">New articles in this topic are on the way. Browse <Link href="/blog" className="font-semibold text-brand-ink hover:underline">all articles</Link> in the meantime.</p>
          )}
        </Container>
      </section>
    </>
  );
}
