import nodemailer from 'nodemailer';

interface EmailLead {
  name: string;
  email: string;
  clinicName?: string;
  monthlyVolume?: string;
  source?: string;
  lastSearch?: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export const sendLeadEmail = async (lead: EmailLead): Promise<void> => {
  const notifyEmail = process.env.NOTIFY_EMAIL;
  if (!notifyEmail || !process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    console.warn('⚠️  Email env vars not configured — skipping notification');
    return;
  }

  const mailOptions = {
    from: `"EnhanceBilling Leads" <${process.env.GMAIL_USER}>`,
    to: notifyEmail,
    subject: `New Lead: ${lead.clinicName || lead.name} — ${lead.source || 'Home Page'}`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 520px; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: #4f46e5; padding: 24px 28px;">
          <h2 style="color: white; margin: 0; font-size: 20px; font-weight: 900; letter-spacing: -0.5px;">
            New Revenue Audit Request
          </h2>
          <p style="color: #c7d2fe; margin: 6px 0 0; font-size: 13px;">
            ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
          </p>
        </div>
        <div style="padding: 28px; background: white;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            ${[
              ['Name',           lead.name],
              ['Email',          lead.email],
              ['Clinic',         lead.clinicName  || '—'],
              ['Monthly Volume', lead.monthlyVolume || '—'],
              ['Source',         lead.source       || 'Home Page'],
              ['Last Search',    lead.lastSearch   || '—'],
            ].map(([label, value]) => `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: 700; color: #64748b; width: 140px;">${label}</td>
                <td style="padding: 10px 0; color: #1e293b;">${value}</td>
              </tr>
            `).join('')}
          </table>
        </div>
        <div style="padding: 16px 28px; background: #f8fafc; border-top: 1px solid #f1f5f9;">
          <p style="margin: 0; font-size: 11px; color: #94a3b8;">EnhanceBilling · ICD-10 Revenue Platform · 2026</p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
