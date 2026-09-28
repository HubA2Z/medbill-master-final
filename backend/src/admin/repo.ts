import crypto from 'crypto';
import { Post, type PostDoc } from './posts';

export interface PostRepo {
  listPublished(): Promise<PostDoc[]>;
  listAll(): Promise<PostDoc[]>;
  bySlug(slug: string): Promise<PostDoc | null>;
  byId(id: string): Promise<PostDoc | null>;
  create(d: Partial<PostDoc>): Promise<PostDoc>;
  update(id: string, d: Partial<PostDoc>): Promise<PostDoc | null>;
  remove(id: string): Promise<boolean>;
}

const summary = '-contentHtml';

const mongoRepo: PostRepo = {
  listPublished: async () => (await Post.find({ status: 'published' }).select(summary).sort({ publishedAt: -1 }).lean()) as any,
  listAll: async () => (await Post.find({}).select(summary).sort({ updatedAt: -1 }).lean()) as any,
  bySlug: async (slug) => (await Post.findOne({ slug }).lean()) as any,
  byId: async (id) => (/^[a-f0-9]{24}$/.test(id) ? ((await Post.findById(id).lean()) as any) : null),
  create: async (d) => (await Post.create(d)).toObject(),
  update: (id, d) => (/^[a-f0-9]{24}$/.test(id) ? Post.findByIdAndUpdate(id, { $set: d }, { new: true, runValidators: true }).lean() : Promise.resolve(null)) as any,
  remove: async (id) => (/^[a-f0-9]{24}$/.test(id) ? Boolean(await Post.findByIdAndDelete(id)) : false),
};

// In-memory repo for local testing (MEMORY_DB=1). Not used in production.
const mem = new Map<string, PostDoc>();
const strip = ({ contentHtml, ...rest }: PostDoc) => rest as PostDoc;
const dupCheck = (slug: string | undefined, id?: string) => {
  if (slug && Array.from(mem.values()).some((p) => p.slug === slug && p._id !== id)) {
    const e: any = new Error('duplicate'); e.code = 11000; throw e;
  }
};
const memoryRepo: PostRepo = {
  async listPublished() { return Array.from(mem.values()).filter((p) => p.status === 'published').sort((a, b) => +new Date(b.publishedAt!) - +new Date(a.publishedAt!)).map(strip); },
  async listAll() { return Array.from(mem.values()).sort((a, b) => +new Date(b.updatedAt!) - +new Date(a.updatedAt!)).map(strip); },
  async bySlug(slug) { return Array.from(mem.values()).find((p) => p.slug === slug) || null; },
  async byId(id) { return mem.get(id) || null; },
  async create(d) { dupCheck(d.slug); const now = new Date(); const p = { ...d, _id: crypto.randomBytes(12).toString('hex'), createdAt: now, updatedAt: now } as PostDoc; mem.set(p._id!, p); return p; },
  async update(id, d) { const p = mem.get(id); if (!p) return null; dupCheck(d.slug, id); const n = { ...p, ...d, updatedAt: new Date() }; mem.set(id, n); return n; },
  async remove(id) { return mem.delete(id); },
};

export const postRepo: PostRepo = process.env.MEMORY_DB === '1' ? memoryRepo : mongoRepo;
