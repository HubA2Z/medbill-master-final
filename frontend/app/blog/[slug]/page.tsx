import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ArticleLayout from '@/components/ArticleLayout';
import AdSlot from '@/components/AdSlot';
import { getDbPost, toListing } from '@/lib/blog';
import { pageMeta } from '@/lib/site';

// Articles written in /admin. The four original articles have their own folders
// under /blog and take precedence over this dynamic route.
export const revalidate = 60;
export const dynamicParams = true;
export async function generateStaticParams() { return []; }

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getDbPost(slug);
  if (!p) return { title: 'Article not found', robots: { index: false } };
  const meta = pageMeta({ title: p.seoTitle || p.title, description: p.description, path: `/blog/${p.slug}`, type: 'article', publishedTime: p.publishedAt });
  if (p.coverImage) {
    meta.openGraph = { ...meta.openGraph, images: [{ url: p.coverImage }] };
    meta.twitter = { ...meta.twitter, images: [p.coverImage] };
  }
  return meta;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const p = await getDbPost(slug);
  if (!p) notFound();
  const listing = toListing(p);
  // Mid-article ad: before the 3rd section heading, when the article is long enough.
  const html = p.contentHtml || '';
  const idx = [...html.matchAll(/<h2[\s>]/g)].map((m) => m.index ?? -1)[2] ?? -1;
  const first = idx > 0 ? html.slice(0, idx) : null;
  const rest = idx > 0 ? html.slice(idx) : '';
  return (
    <ArticleLayout slug={listing.slug} post={listing} coverImage={p.coverImage}>
      {first !== null ? (
        <>
          <div dangerouslySetInnerHTML={{ __html: first }} />
          <div className="not-prose my-10"><AdSlot unit="banner300x250" /></div>
          <div dangerouslySetInnerHTML={{ __html: rest }} />
        </>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      )}
    </ArticleLayout>
  );
}
