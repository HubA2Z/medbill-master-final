// backend/src/routes/leadRoutes.ts
import { Router } from 'express';
import nodemailer from 'nodemailer';
import Lead from '../models/Lead'; // Assuming you have a Lead model

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, clinicName, lastSearch } = req.body;

    // 1. Save to MongoDB
    const newLead = await Lead.create({ name, email, clinicName, lastSearch });

    // 2. Setup Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Or your SMTP provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use App Password for Gmail!
      },
    });

    // 3. CRITICAL: You MUST await the email send on Vercel
    await transporter.sendMail({
      from: `"Enhance Billing" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
      subject: `New Lead: ${name} from ${clinicName}`,
      text: `New lead received!\n\nName: ${name}\nEmail: ${email}\nClinic: ${clinicName}\nLast Search: ${lastSearch}`,
    });

    return res.status(201).json({ success: true, data: newLead });

  } catch (error) {
    console.error("Lead Error:", error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

export default router;
