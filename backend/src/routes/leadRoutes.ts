import { Router, Request, Response } from 'express';
import nodemailer from 'nodemailer';
import Lead from '../models/Lead'; // Ensure this points to the file above

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, clinicName, monthlyVolume, source, lastSearch } = req.body;

    // ✅ FIX: Using the model with the 'new' keyword or .create() 
    // If .create() fails, you can also use:
    // const newLead = new Lead({ name, email, ... });
    // await newLead.save();

    const newLead = await Lead.create({ 
      name, 
      email, 
      clinicName, 
      monthlyVolume, 
      source: source || 'General Inquiry', 
      lastSearch 
    });

    // ... rest of your nodemailer code ...
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Enhance Billing" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
      subject: `New Lead: ${name}`,
      text: `Lead Details:\nName: ${name}\nClinic: ${clinicName}\nVolume: ${monthlyVolume}`,
    });

    return res.status(201).json({ success: true, data: newLead });

  } catch (error: any) {
    console.error("Lead Route Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
