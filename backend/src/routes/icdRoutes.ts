import axios from 'axios';
import { Router, Request, Response } from 'express';

const router = Router();

// ── Synonym map: common lay-terms → clinical terms ──────────────────────────
const synonymMap: Record<string, string> = {
  'sugar':               'diabetes',
  'blood sugar':         'diabetes',
  'high blood pressure': 'hypertension',
  'bp':                  'hypertension',
  'heart attack':        'myocardial infarction',
  'stroke':              'cerebrovascular accident',
  'brain attack':        'cerebrovascular accident',
  'flu':                 'influenza',
  'sore throat':         'pharyngitis',
  'pink eye':            'conjunctivitis',
  'ear infection':       'otitis media',
  'kidney stones':       'urolithiasis',
  'broken bone':         'fracture',
  'back pain':           'dorsalgia',
  'stomach pain':        'abdominal pain',
  'chest pain':          'chest pain',
  'shortness of breath': 'dyspnea',
  'sob':                 'dyspnea',
  'copd':                'chronic obstructive pulmonary disease',
  'uti':                 'urinary tract infection',
  'gerd':                'gastroesophageal reflux disease',
  'acid reflux':         'gastroesophageal reflux',
  'high cholesterol':    'hypercholesterolemia',
  'depression':          'depressive disorder',
  'anxiety':             'anxiety disorder',
  'seizure':             'epilepsy',
  'joint pain':          'arthralgia',
  'obesity':             'obesity',
  'anemia':              'anemia',
  'allergy':             'allergic reaction',
};

// ── Simple in-memory cache with 10-minute TTL ────────────────────────────────
interface CacheEntry { data: unknown[]; expiresAt: number; }
const cache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

function getCached(key: string): unknown[] | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) { cache.delete(key); return null; }
  return entry.data;
}

function setCache(key: string, data: unknown[]): void {
  cache.set(key, { data, expiresAt: Date.now() + CACHE_TTL_MS });
  // Evict oldest entries if cache grows large
  if (cache.size > 500) {
    const firstKey = cache.keys().next().value;
    if (firstKey) cache.delete(firstKey);
  }
}

// ── GET /api/codes/search ────────────────────────────────────────────────────
router.get('/search', async (req: Request, res: Response) => {
  try {
    const { query, limit } = req.query;

    if (!query || typeof query !== 'string' || !query.trim()) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    const maxResults = Math.min(parseInt(limit as string) || 50, 100);
    const searchTerm  = query.toLowerCase().trim();
    const mappedQuery = synonymMap[searchTerm] || searchTerm;
    const cacheKey    = `${mappedQuery}:${maxResults}`;

    // Return from cache if available
    const cached = getCached(cacheKey);
    if (cached) {
      res.setHeader('X-Cache', 'HIT');
      return res.json(cached);
    }

    const url = `https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code,name&df=code,name&maxList=${maxResults}&terms=${encodeURIComponent(mappedQuery)}`;

    const response = await axios.get(url, { timeout: 6000 });
    const rawData  = Array.isArray(response.data?.[3]) ? response.data[3] : [];

    const formatted = rawData.map((item: string[]) => ({
      code:        item[0] || 'N/A',
      description: item[1] || 'No description available',
    }));

    setCache(cacheKey, formatted);
    res.setHeader('X-Cache', 'MISS');
    return res.json(formatted);

  } catch (error: any) {
    console.error('ICD Search Error:', error.message);
    // Soft-fail: return empty array so the frontend stays stable
    return res.status(200).json([]);
  }
});

// ── GET /api/codes/trending — hand-curated popular searches ─────────────────
router.get('/trending', (_req: Request, res: Response) => {
  const trending = [
    { term: 'Diabetes',     query: 'diabetes mellitus' },
    { term: 'Hypertension', query: 'hypertension' },
    { term: 'Anxiety',      query: 'anxiety disorder' },
    { term: 'Depression',   query: 'depressive disorder' },
    { term: 'Asthma',       query: 'asthma' },
    { term: 'COVID-19',     query: 'covid-19' },
    { term: 'Back Pain',    query: 'dorsalgia' },
    { term: 'Influenza',    query: 'influenza' },
  ];
  return res.json(trending);
});

export default router;
