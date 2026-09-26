import nodemailer from 'nodemailer';

export interface EmailLead {
  name: string;
  email: string;
  clinicName?: string;
  monthlyVolume?: string;
  source?: string;
  lastSearch?: string;
}

// Accept both naming schemes used in this repo's history.
const user = () => process.env.EMAIL_USER || process.env.GMAIL_USER || '';
const pass = () => process.env.EMAIL_PASS || process.env.GMAIL_PASS || '';
const recipients = () =>
  process.env.NOTIFICATION_EMAIL || process.env.NOTIFY_EMAIL || user();

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export const sendLeadEmail = async (lead: EmailLead): Promise<void> => {
  if (!user() || !pass() || !recipients()) {
    throw new Error('Email not configured: set EMAIL_USER, EMAIL_PASS and NOTIFICATION_EMAIL in Vercel.');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: user(), pass: pass() },
  });

  const when = new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short', timeZone: 'America/New_York' });
  const rows: [string, string][] = [
    ['Form', lead.source || 'Website'],
    ['Name', lead.name],
    ['Email', lead.email],
    ['Practice', lead.clinicName || '—'],
    ['Monthly volume', lead.monthlyVolume || '—'],
    ...(lead.lastSearch && lead.lastSearch !== 'N/A' ? [['Last ICD search', lead.lastSearch] as [string, string]] : []),
    ['Received', `${when} (ET)`],
  ];

  const text = ['New form submission on enhancely.in', '', ...rows.map(([k, v]) => `${k}: ${v}`)].join('\n');

  const html = `
  <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;border:1px solid #e3e9ef;border-radius:12px;overflow:hidden">
    <div style="background:#0d9488;padding:20px 24px">
      <h2 style="color:#fff;margin:0;font-size:18px">New ${esc(lead.source || 'website')} submission</h2>
      <p style="color:#ccfbf1;margin:6px 0 0;font-size:13px">${esc(when)} (ET)</p>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px;background:#fff">
      ${rows
        .map(
          ([k, v]) => `<tr style="border-bottom:1px solid #eef2f6">
            <td style="padding:10px 24px;color:#64748b;width:150px;font-weight:600">${esc(k)}</td>
            <td style="padding:10px 24px;color:#0b1f33">${esc(v)}</td></tr>`,
        )
        .join('')}
    </table>
    <p style="margin:0;padding:14px 24px;background:#f6f9fb;font-size:12px;color:#64748b">
      Reply to this email to respond to ${esc(lead.name)} directly.
    </p>
  </div>`;

  await transporter.sendMail({
    from: `"Enhancely Website" <${user()}>`,
    to: recipients(), // comma-separated list allowed
    replyTo: `"${lead.name.replace(/"/g, '')}" <${lead.email}>`,
    subject: `New lead: ${lead.name} — ${lead.clinicName || lead.source || 'Website'}`,
    text,
    html,
  });
};
