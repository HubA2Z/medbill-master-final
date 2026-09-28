import Link from 'next/link';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Breadcrumbs, Container, CtaBand, JsonLd } from './ui';
import { getPost, POSTS, formatDate, type Post } from '@/lib/posts';
import { pageMeta, SITE } from '@/lib/site';

export function articleMeta(slug: string): Metadata {
  const p = getPost(slug);
  return pageMeta({ title: p.seoTitle, description: p.description, path: p.slug, type: 'article', publishedTime: p.date });
}

export default function ArticleLayout({
  slug,
  post,
  coverImage,
  children,
  cta,
}: {
  slug: string;
  post?: Post; // admin-written articles pass their data directly
  coverImage?: string;
  children: ReactNode;
  cta?: { title: string; body: string; label: string; href: string };
}) {
  const p = post ?? getPost(slug);
  const related = POSTS.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: p.title,
            description: p.description,
            datePublished: p.date,
            dateModified: p.date,
            url: `${SITE.url}${p.slug}`,
            mainEntityOfPage: `${SITE.url}${p.slug}`,
            author: { '@type': 'Organization', name: 'Enhancely Billing Intelligence Team' },
            publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.url}/blog` },
              { '@type': 'ListItem', position: 3, name: p.title, item: `${SITE.url}${p.slug}` },
            ],
          },
        ]}
      />
      <header className="border-b border-line bg-bg-soft">
        <Container size="sm" className="py-12 sm:py-14">
          <Breadcrumbs items={[{ name: 'Blog', href: '/blog' }, { name: p.category, href: p.slug }]} />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-brand">{p.category}</p>
          <h1 className="mt-3 text-3xl sm:text-[2.6rem] font-bold leading-[1.15] tracking-tight text-ink text-balance">{p.title}</h1>
          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-3">
            <span>By the Enhancely Billing Intelligence Team</span>
            <span aria-hidden>·</span>
            <time dateTime={p.date}>{formatDate(p.date)}</time>
            <span aria-hidden>·</span>
            <span>{p.readTime} read</span>
          </p>
        </Container>
      </header>

      <Container size="sm" className="py-12">
        {coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={coverImage} alt="" className="mb-10 w-full rounded-2xl border border-line object-cover" />
        )}
        <article className="prose-clinical">{children}</article>

        <aside className="mt-14 rounded-2xl border border-line bg-bg-tint p-6">
          <p className="font-semibold text-ink">Look up any code mentioned in this article</p>
          <p className="mt-1 text-sm text-ink-2">Search the live 2026 ICD-10-CM code set from the National Library of Medicine — free.</p>
          <Link href="/icd10-intelligence" className="mt-4 inline-block rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover">Open ICD-10 search →</Link>
        </aside>
      </Container>

      <section className="border-t border-line bg-bg-soft py-14">
        <Container>
          <h2 className="text-xl font-bold text-ink">Keep reading</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={r.slug} className="group rounded-2xl border border-line bg-white p-6 hover:border-brand/40">
                <p className="text-xs text-ink-3"><span className="font-semibold text-brand-ink">{r.category}</span> · {r.readTime}</p>
                <h3 className="mt-2 font-semibold leading-snug text-ink group-hover:text-brand-ink">{r.title}</h3>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        title={cta?.title}
        body={cta?.body}
        primary={cta ? { label: cta.label, href: cta.href } : undefined}
      />
    </>
  );
}
