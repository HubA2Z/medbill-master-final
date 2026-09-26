import { Router, Request, Response } from 'express';
import { scrubClaim, type ScrubInput } from '../scrub/engine';
import { mongoStore } from '../scrub/store';
import { nlmIcdLookup } from '../scrub/icd';

const router = Router();

// POST /api/scrub  { dos, diagnoses: [...], lines: [{ cpt, modifiers, units, dxPointers }] }
router.post('/', async (req: Request, res: Response) => {
  try {
    const b = req.body || {};
    const input: ScrubInput = {
      dos: typeof b.dos === 'string' ? b.dos.slice(0, 10) : undefined,
      diagnoses: Array.isArray(b.diagnoses) ? b.diagnoses.slice(0, 12).map(String) : [],
      lines: Array.isArray(b.lines)
        ? b.lines.slice(0, 50).map((l: any) => ({
            cpt: String(l?.cpt || '').slice(0, 7),
            modifiers: Array.isArray(l?.modifiers) ? l.modifiers.slice(0, 4).map((m: any) => String(m).slice(0, 2)) : [],
            units: Number(l?.units) || 1,
            dxPointers: Array.isArray(l?.dxPointers) ? l.dxPointers.slice(0, 4).map((p: any) => String(p).slice(0, 1)) : [],
          }))
        : [],
    };
    const result = await scrubClaim(input, mongoStore, nlmIcdLookup);
    return res.json(result);
  } catch (err: any) {
    console.error('Scrub error:', err);
    return res.status(500).json({ error: 'The claim check failed. Please try again.' });
  }
});

// GET /api/scrub/status — which datasets are loaded
router.get('/status', async (_req, res) => {
  const meta = await mongoStore.meta().catch(() => null);
  res.json({ ptp: Boolean(meta?.ptpVersion), mue: Boolean(meta?.mueVersion), ptpVersion: meta?.ptpVersion, mueVersion: meta?.mueVersion, loadedAt: meta?.loadedAt });
});

export default router;
