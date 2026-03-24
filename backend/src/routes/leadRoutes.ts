// backend/src/routes/leadRoutes.ts
import { Router, Request, Response } from 'express';
import nodemailer from 'nodemailer';
import Lead from '../models/Lead'; 

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, clinicName, monthlyVolume, source, lastSearch } = req.body;

    // 1. Save to MongoDB
    // @ts-ignore - This bypasses the TS2349 "not callable" error during Vercel build
    const newLead = await Lead.create({ 
      name, 
      email, 
      clinicName, 
      monthlyVolume, 
      source: source || 'General Inquiry', 
      lastSearch 
    });

    // 2. Setup Transporter for Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. Prepare Email Content
    const emailText = `
      🚀 New Lead Received!
      -----------------------
      Source: ${source || 'Website Search'}
      Name: ${name}
      Email: ${email}
      Clinic: ${clinicName}
      ${monthlyVolume ? `Monthly Volume: ${monthlyVolume}` : ''}
      ${lastSearch ? `Last ICD Search: ${lastSearch}` : ''}
      -----------------------
      Timestamp: ${new Date().toLocaleString()}
    `;

    // 4. Await Email Send
    await transporter.sendMail({
      from: `"Enhance Billing Leads" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
      subject: `🔥 New Lead: ${name} (${clinicName})`,
      text: emailText,
    });

    return res.status(201).json({ success: true, data: newLead });

  } catch (error: any) {
    console.error("Lead Route Error:", error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal Server Error',
      details: error.message 
    });
  }
});

export default router;
