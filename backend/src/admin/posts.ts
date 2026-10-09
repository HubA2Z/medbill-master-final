import mongoose, { Schema } from 'mongoose';
import sanitizeHtml from 'sanitize-html';

export interface PostDoc {
  _id?: string;
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  category: string;
  coverImage?: string;
  contentHtml: string;
  status: 'draft' | 'published';
  author?: string;
  readTime?: string;
  publishedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

// Slugs used by the original hand-built articles — new posts can't take them.
export const RESERVED_SLUGS = new Set(['icd-10-2026-updates', 'reduce-claim-denials', 'em-coding-2026', 'ai-in-medical-billing', 'year-end-billing-checklist-2027', 'medical-claim-appeal-guide']);

const PostSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    seoTitle: String,
    description: { type: String, default: '' },
    category: { type: String, default: 'Insights' },
    coverImage: String,
    contentHtml: { type: String, default: '' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft', index: true },
    author: { type: String, default: 'Enhancely Billing Intelligence Team' },
    readTime: String,
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export const Post: mongoose.Model<any> = mongoose.models.Post || mongoose.model('Post', PostSchema);

export const slugify = (s: string) =>
  (s || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

export function cleanHtml(html: string): string {
  return sanitizeHtml(html || '', {
    allowedTags: ['h2', 'h3', 'h4', 'p', 'br', 'hr', 'strong', 'b', 'em', 'i', 'u', 's', 'a', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
    allowedAttributes: { a: ['href', 'title', 'target', 'rel'], img: ['src', 'alt', 'title', 'width', 'height'], th: ['colspan', 'rowspan'], td: ['colspan', 'rowspan'] },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: { img: ['https'] },
    exclusiveFilter: (frame) => frame.tag === 'img' && !frame.attribs.src,
    transformTags: {
      h1: 'h2',
      a: (tag, attribs) => {
        const external = /^https?:\/\//i.test(attribs.href || '') && !/enhancely\.in/i.test(attribs.href || '');
        return { tagName: 'a', attribs: external ? { ...attribs, target: '_blank', rel: 'noopener noreferrer' } : attribs };
      },
    },
  });
}

export function readTimeOf(html: string): string {
  const words = (html || '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min`;
}

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/** Validates/normalizes admin input. Returns an error string or the clean fields. */
export function normalizePostInput(b: any): { error: string } | { data: Partial<PostDoc> } {
  const title = str(b.title, 200);
  if (!title) return { error: 'Title is required.' };
  const slug = slugify(str(b.slug, 120) || title);
  if (!slug) return { error: 'Slug is invalid.' };
  if (RESERVED_SLUGS.has(slug)) return { error: 'That URL is already used by an existing article. Choose another slug.' };
  const contentHtml = cleanHtml(typeof b.contentHtml === 'string' ? b.contentHtml.slice(0, 500_000) : '');
  const status = b.status === 'published' ? 'published' : 'draft';
  const cover = str(b.coverImage, 500);
  return {
    data: {
      title,
      slug,
      seoTitle: str(b.seoTitle, 70) || undefined,
      description: str(b.description, 300),
      category: str(b.category, 40) || 'Insights',
      coverImage: /^https:\/\//.test(cover) ? cover : undefined,
      contentHtml,
      status,
      readTime: readTimeOf(contentHtml),
    },
  };
}

/** Public shape (no internal fields). */
export const publicPost = (p: any) => ({
  slug: p.slug,
  title: p.title,
  seoTitle: p.seoTitle,
  description: p.description,
  category: p.category,
  coverImage: p.coverImage,
  contentHtml: p.contentHtml,
  author: p.author,
  readTime: p.readTime,
  publishedAt: p.publishedAt,
  updatedAt: p.updatedAt,
});
