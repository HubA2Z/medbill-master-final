import express, { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { adminConfigured, checkCredentials, makeToken, setSessionCookie, clearSessionCookie, requireAdmin, verifyToken, readCookie, loginAllowed, recordLoginFailure, clearLoginFailures } from '../admin/auth';
import { normalizePostInput, publicPost } from '../admin/posts';
import { postRepo } from '../admin/repo';

// ── Public blog API ──────────────────────────────────────────────────────────
export const publicPosts = Router();

publicPosts.get('/', async (_req, res) => {
  try {
    const posts = await postRepo.listPublished();
    res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    res.json(posts.map(publicPost));
  } catch (e) {
    console.error('List posts failed', e);
    res.json([]);
  }
});

publicPosts.get('/:slug', async (req, res) => {
  const p = await postRepo.bySlug(String(req.params.slug)).catch(() => null);
  if (!p || p.status !== 'published') return res.status(404).json({ error: 'Not found' });
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
  res.json(publicPost(p));
});

// ── Admin API ────────────────────────────────────────────────────────────────
export const admin = Router();

admin.get('/me', (req, res) => res.json({ signedIn: verifyToken(readCookie(req)), configured: adminConfigured() }));

admin.post('/login', (req: Request, res: Response) => {
  if (!adminConfigured()) return res.status(503).json({ error: 'Admin login is not set up. Add ADMIN_EMAIL and ADMIN_PASSWORD in Vercel.' });
  const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
  if (!loginAllowed(ip)) return res.status(429).json({ error: 'Too many attempts. Try again in 15 minutes.' });
  const { email, password } = req.body || {};
  if (!checkCredentials(String(email || ''), String(password || ''))) {
    recordLoginFailure(ip);
    return res.status(401).json({ error: 'Incorrect email or password.' });
  }
  clearLoginFailures(ip);
  setSessionCookie(res, makeToken());
  res.json({ ok: true });
});

admin.post('/logout', (_req, res) => { clearSessionCookie(res); res.json({ ok: true }); });

admin.use('/posts', requireAdmin);

admin.get('/posts', async (_req, res) => res.json(await postRepo.listAll()));

admin.get('/posts/:id', async (req, res) => {
  const p = await postRepo.byId(String(req.params.id));
  return p ? res.json(p) : res.status(404).json({ error: 'Not found' });
});

const saveErr = (res: Response, e: any) =>
  e?.code === 11000 ? res.status(409).json({ error: 'Another post already uses that URL slug.' }) : (console.error(e), res.status(500).json({ error: 'Could not save the post.' }));

admin.post('/posts', async (req, res) => {
  const n = normalizePostInput(req.body || {});
  if ('error' in n) return res.status(400).json({ error: n.error });
  try {
    const p = await postRepo.create({ ...n.data, publishedAt: n.data.status === 'published' ? new Date() : null });
    res.status(201).json(p);
  } catch (e) { saveErr(res, e); }
});

admin.put('/posts/:id', async (req, res) => {
  const n = normalizePostInput(req.body || {});
  if ('error' in n) return res.status(400).json({ error: n.error });
  try {
    const existing = await postRepo.byId(String(req.params.id));
    if (!existing) return res.status(404).json({ error: 'Not found' });
    const publishedAt = n.data.status === 'published' ? existing.publishedAt || new Date() : existing.publishedAt || null;
    const p = await postRepo.update(String(req.params.id), { ...n.data, publishedAt });
    res.json(p);
  } catch (e) { saveErr(res, e); }
});

admin.delete('/posts/:id', async (req, res) => {
  const ok = await postRepo.remove(String(req.params.id));
  return ok ? res.json({ ok: true }) : res.status(404).json({ error: 'Not found' });
});

// Image upload → Vercel Blob (needs BLOB_READ_WRITE_TOKEN, added automatically when you connect a Blob store).
admin.post(
  '/upload',
  requireAdmin,
  express.raw({ type: ['image/png', 'image/jpeg', 'image/webp', 'image/gif'], limit: '4mb' }),
  async (req, res) => {
    if (!process.env.BLOB_READ_WRITE_TOKEN) return res.status(501).json({ error: 'Image uploads are not set up. In Vercel, open Storage → Create → Blob and connect it to this project, then redeploy.' });
    const type = String(req.headers['content-type'] || '');
    if (!Buffer.isBuffer(req.body) || !req.body.length) return res.status(400).json({ error: 'Send a PNG, JPG, WebP, or GIF under 4 MB.' });
    const ext = type.split('/')[1]?.replace('jpeg', 'jpg') || 'img';
    try {
      const { put } = await import('@vercel/blob');
      const blob = await put(`blog/${Date.now()}-${crypto.randomBytes(4).toString('hex')}.${ext}`, req.body, { access: 'public', contentType: type });
      res.json({ url: blob.url });
    } catch (e) {
      console.error('Upload failed', e);
      res.status(500).json({ error: 'Upload failed.' });
    }
  },
);
