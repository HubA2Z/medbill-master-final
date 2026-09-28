import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ArticleLayout from '@/components/ArticleLayout';
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
  if (p.coverImage) meta.openGraph = { ...meta.openGraph, images: [{ url: p.coverImage }] };
  return meta;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const p = await getDbPost(slug);
  if (!p) notFound();
  const listing = toListing(p);
  return (
    <ArticleLayout slug={listing.slug} post={listing} coverImage={p.coverImage}>
      <div dangerouslySetInnerHTML={{ __html: p.contentHtml || '' }} />
    </ArticleLayout>
  );
}
