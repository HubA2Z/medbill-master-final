import { Router, Request, Response } from 'express';
import Lead from '../models/Lead';
import { sendLeadEmail } from '../utils/notifier';

const router = Router();

// Basic email format check
const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, clinicName, monthlyVolume, source, lastSearch } = req.body;

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ message: 'A valid name is required' });
    }
    if (!email || typeof email !== 'string' || !isValidEmail(email.trim())) {
      return res.status(400).json({ message: 'A valid email address is required' });
    }

    const newLead = new Lead({
      name:          name.trim(),
      email:         email.trim().toLowerCase(),
      clinicName:    clinicName?.trim()    || undefined,
      monthlyVolume: monthlyVolume?.trim() || undefined,
      source:        source?.trim()        || 'Home Page',
      lastSearch:    lastSearch?.trim()    || undefined,
    });

    const savedLead = await newLead.save();

    // Fire-and-forget email notification
    sendLeadEmail(savedLead.toObject() as any).catch((err: any) =>
      console.error('Email notification failed:', err.message)
    );

    return res.status(201).json({
      success: true,
      id:      (savedLead as any)._id,
    });

  } catch (err: any) {
    console.error('Lead save error:', err.message);
    return res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

export default router;
