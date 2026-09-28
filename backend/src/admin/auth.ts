import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';

// Single-admin auth. Configure in Vercel → Environment Variables:
//   ADMIN_EMAIL     your login email
//   ADMIN_PASSWORD  your login password (use a long one)
//   ADMIN_SECRET    optional; random string used to sign sessions (defaults to one derived from the password)
const COOKIE = 'enh_admin';
const MAX_AGE_S = 7 * 24 * 60 * 60;

const email = () => (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
const password = () => process.env.ADMIN_PASSWORD || '';
const secret = () => process.env.ADMIN_SECRET || crypto.createHash('sha256').update(`enh:${password()}:${email()}`).digest('hex');

export const adminConfigured = () => Boolean(email() && password());

const sha = (s: string) => crypto.createHash('sha256').update(s).digest();
const safeEqual = (a: string, b: string) => crypto.timingSafeEqual(sha(a), sha(b));

function sign(payload: string) {
  return crypto.createHmac('sha256', secret()).update(payload).digest('base64url');
}

export function makeToken(): string {
  const payload = Buffer.from(JSON.stringify({ e: email(), x: Math.floor(Date.now() / 1000) + MAX_AGE_S })).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token?: string): boolean {
  if (!token || !adminConfigured()) return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig || !safeEqual(sig, sign(payload))) return false;
  try {
    const { e, x } = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return e === email() && typeof x === 'number' && x > Date.now() / 1000;
  } catch {
    return false;
  }
}

export function checkCredentials(e: string, p: string): boolean {
  if (!adminConfigured()) return false;
  const okEmail = safeEqual((e || '').trim().toLowerCase(), email());
  const okPass = safeEqual(p || '', password());
  return okEmail && okPass;
}

export function readCookie(req: Request, name = COOKIE): string | undefined {
  const raw = req.headers.cookie || '';
  for (const part of raw.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return decodeURIComponent(v.join('='));
  }
  return undefined;
}

export function setSessionCookie(res: Response, token: string) {
  const secure = process.env.NODE_ENV === 'production' || process.env.VERCEL ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${MAX_AGE_S}${secure}`);
}

export function clearSessionCookie(res: Response) {
  res.setHeader('Set-Cookie', `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
}

/** Blocks cross-site writes: mutating requests must come from our own origin. */
function sameOrigin(req: Request) {
  const origin = req.headers.origin;
  if (!origin) return true; // same-origin fetches from older browsers / server tools
  try {
    const o = new URL(origin).host;
    return o === req.headers.host || o === req.headers['x-forwarded-host'];
  } catch {
    return false;
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!verifyToken(readCookie(req))) return res.status(401).json({ error: 'Not signed in' });
  if (req.method !== 'GET' && !sameOrigin(req)) return res.status(403).json({ error: 'Bad origin' });
  next();
}

// Best-effort login throttling (per serverless instance): 8 wrong passwords per 15 minutes per IP.
const failures = new Map<string, { n: number; t: number }>();
const WINDOW = 15 * 60 * 1000;
export function loginAllowed(ip: string): boolean {
  const a = failures.get(ip);
  if (!a || Date.now() - a.t > WINDOW) return true;
  return a.n < 8;
}
export function recordLoginFailure(ip: string) {
  const a = failures.get(ip);
  if (!a || Date.now() - a.t > WINDOW) failures.set(ip, { n: 1, t: Date.now() });
  else a.n++;
}
export function clearLoginFailures(ip: string) { failures.delete(ip); }
