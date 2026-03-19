import { Router, Request, Response } from 'express';
import Lead, { ILead } from '../models/Lead';
import { sendLeadEmail } from '../utils/notifier'; // 🚀 The new name works!

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, clinicName, monthlyVolume, source, lastSearch } = req.body;

    const newLead = new Lead({
      name,
      email,
      clinicName,
      monthlyVolume,
      source,
      lastSearch
    });

    const savedLead: ILead = await newLead.save();

    // 📬 Background Email Trigger
    // Using 'as any' to bridge the Mongoose Doc to our clean interface
    sendLeadEmail(savedLead.toObject() as any).catch((err: any) => 
      console.error("Email Notify Failed:", err)
    );

    res.status(201).json(savedLead);
  } catch (err: any) {
    console.error("Backend Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;