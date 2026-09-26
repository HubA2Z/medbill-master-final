// Thin client for the Express API that Vercel mounts at /api (see /vercel.json).
// Endpoints are unchanged from the previous site.

export type IcdResult = { code: string; description: string };

export async function searchIcd(query: string, limit = 50, signal?: AbortSignal): Promise<IcdResult[]> {
  const q = query.trim();
  if (!q) return [];
  const res = await fetch(`/api/codes/search?query=${encodeURIComponent(q)}&limit=${limit}`, { signal });
  if (!res.ok) throw new Error(`Search failed (${res.status})`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export type LeadPayload = {
  name: string;
  email: string;
  clinicName: string;
  monthlyVolume?: string;
  source: string;
  lastSearch?: string;
  website?: string; // honeypot — must stay empty
};

export async function submitLead(payload: LeadPayload): Promise<void> {
  const res = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let detail = '';
    try { detail = (await res.json())?.details ?? ''; } catch { /* ignore */ }
    throw new Error(detail || `Request failed (${res.status})`);
  }
}

// ── Claim scrubber ───────────────────────────────────────────────────────────
export type ScrubSeverity = 'error' | 'warning' | 'info' | 'pass';
export type ScrubFinding = { severity: ScrubSeverity; rule: string; line?: number; code?: string; message: string; fix?: string };
export type ScrubResponse = {
  status: 'clean' | 'warnings' | 'errors';
  counts: Record<ScrubSeverity, number>;
  findings: ScrubFinding[];
  diagnoses: { letter: string; code: string; valid: boolean; description?: string }[];
  data: { ptp: boolean; mue: boolean; ptpVersion?: string; mueVersion?: string };
};
export type ScrubRequest = {
  dos?: string;
  diagnoses: string[];
  lines: { cpt: string; modifiers: string[]; units: number; dxPointers: string[] }[];
};

export async function scrubClaim(body: ScrubRequest): Promise<ScrubResponse> {
  const res = await fetch('/api/scrub', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`Check failed (${res.status})`);
  return res.json();
}
