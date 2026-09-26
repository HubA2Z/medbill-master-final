import axios from 'axios';
import { normIcd } from './codes';

export interface IcdInfo {
  code: string;
  found: boolean;
  description?: string;
  unknown?: boolean; // lookup service unavailable
}

export type IcdLookup = (codes: string[]) => Promise<Record<string, IcdInfo>>;

const cache = new Map<string, { v: IcdInfo; t: number }>();
const TTL = 6 * 60 * 60 * 1000;

/**
 * Checks each code against the NLM Clinical Tables ICD-10-CM dataset (billable codes).
 * A header/category code (e.g. "E11") is not in the billable set and comes back found=false.
 */
export const nlmIcdLookup: IcdLookup = async (codes) => {
  const out: Record<string, IcdInfo> = {};
  await Promise.all(
    codes.map(async (raw) => {
      const code = normIcd(raw);
      const hit = cache.get(code);
      if (hit && Date.now() - hit.t < TTL) { out[code] = hit.v; return; }
      try {
        const url = `https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code&df=code,name&maxList=20&terms=${encodeURIComponent(code)}`;
        const r = await axios.get(url, { timeout: 6000 });
        const rows: string[][] = Array.isArray(r.data?.[3]) ? r.data[3] : [];
        const exact = rows.find((x) => (x[0] || '').toUpperCase() === code);
        const v: IcdInfo = exact ? { code, found: true, description: exact[1] } : { code, found: false };
        cache.set(code, { v, t: Date.now() });
        out[code] = v;
      } catch {
        // Unknown (network) — don't flag as invalid.
        out[code] = { code, found: true, unknown: true };
      }
    }),
  );
  return out;
};
