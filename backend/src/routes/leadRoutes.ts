// backend/src/routes/leadRoutes.ts
import { Router, Request, Response } from 'express';
import Lead from '../models/Lead';
import { sendLeadEmail } from '../utils/notifier';

const router = Router();

const clean = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

router.post('/', async (req: Request, res: Response) => {
  const body = req.body || {};

  // Honeypot: real users never fill this hidden field; bots usually do.
  if (clean(body.website)) return res.status(201).json({ success: true });

  const lead = {
    name: clean(body.name, 120),
    email: clean(body.email, 200).toLowerCase(),
    clinicName: clean(body.clinicName, 200),
    monthlyVolume: clean(body.monthlyVolume, 50),
    source: clean(body.source, 80) || 'General Inquiry',
    lastSearch: clean(body.lastSearch, 200),
  };

  if (!lead.name || !lead.clinicName || !isEmail(lead.email)) {
    return res.status(400).json({ success: false, error: 'Name, practice name and a valid email are required.' });
  }

  // Save and notify independently, so a database hiccup never stops the email
  // (and a mail hiccup never loses the lead).
  const [saved, emailed] = await Promise.allSettled([
    // @ts-ignore - mongoose model typing quirk on Vercel builds
    Lead.create(lead),
    sendLeadEmail(lead),
  ]);

  if (saved.status === 'rejected') console.error('Lead save failed:', saved.reason);
  if (emailed.status === 'rejected') console.error('Lead email failed:', emailed.reason);

  if (saved.status === 'rejected' && emailed.status === 'rejected') {
    const why = (r: PromiseRejectedResult) => String((r.reason && (r.reason.code || r.reason.message)) || r.reason).slice(0, 160);
    return res.status(500).json({
      success: false,
      error: 'Could not record your request. Please try again.',
      // TEMP diagnostics (no secrets): remove once alerts are confirmed working
      diag: { db: why(saved as PromiseRejectedResult), email: why(emailed as PromiseRejectedResult) },
    });
  }

  return res.status(201).json({ success: true });
});

export default router;
