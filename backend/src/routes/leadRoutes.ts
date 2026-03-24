// backend/src/routes/leadRoutes.ts
import { Router } from 'express';
import nodemailer from 'nodemailer';
import Lead from '../models/Lead'; 

const router = Router();

router.post('/', async (req, res) => {
  try {
    // ✅ Extract all fields sent by both the ICD search and the Audit Form
    const { name, email, clinicName, monthlyVolume, source, lastSearch } = req.body;

    // 1. Save to MongoDB 
    // (Ensure your Lead Model in ../models/Lead includes monthlyVolume and source)
    const newLead = await Lead.create({ 
      name, 
      email, 
      clinicName, 
      monthlyVolume, 
      source: source || 'General Inquiry', 
      lastSearch 
    });

    // 2. Setup Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
    });

    // 3. Prepare the Email Content dynamically
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

    // 4. CRITICAL: Await the email send
    await transporter.sendMail({
      from: `"Enhance Billing Leads" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
      subject: `🔥 New Lead: ${name} (${clinicName})`,
      text: emailText,
    });

    return res.status(201).json({ success: true, data: newLead });

  } catch (error: any) {
    console.error("Lead Error:", error);
    // Return the error message to help debug in Vercel logs
    return res.status(500).json({ 
      success: false, 
      error: 'Internal Server Error',
      details: error.message 
    });
  }
});

export default router;
