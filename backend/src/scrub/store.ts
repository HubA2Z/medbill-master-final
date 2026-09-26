import mongoose from 'mongoose';

/** One NCCI procedure-to-procedure edit where `col1` is the column-one code. */
export interface PtpEdit {
  col2: string;
  /** 0 = never allowed, 1 = allowed with an appropriate modifier, 9 = not applicable */
  mi: '0' | '1' | '9';
  eff: number; // yyyymmdd
  del: number; // yyyymmdd, 0 = still active
}

export interface MueEntry {
  code: string;
  mue: number;
  mai: string; // 1 = line edit, 2 = absolute date-of-service edit, 3 = date-of-service edit (clinical)
  rationale?: string;
}

export interface DataMeta {
  ptpVersion?: string;
  mueVersion?: string;
  loadedAt?: string;
}

export interface ScrubStore {
  getPtp(col1: string): Promise<PtpEdit[]>;
  getMue(code: string): Promise<MueEntry | null>;
  meta(): Promise<DataMeta | null>;
}

// ── Storage format (compact, see scripts/import-ncci.ts) ─────────────────────
// ncci_ptp: { _id: "<col1>", e: "col2|mi|eff|del;col2|mi|eff|del;..." }
// ncci_mue: { _id: "<code>", v: <mue>, a: "<mai>", r: "<rationale>" }
// ncci_meta: { _id: "current", ptpVersion, mueVersion, loadedAt }

export function decodePtp(e: string): PtpEdit[] {
  if (!e) return [];
  return e.split(';').filter(Boolean).map((row) => {
    const [col2, mi, eff, del] = row.split('|');
    return { col2, mi: (mi as PtpEdit['mi']) || '1', eff: parseInt(eff, 10) || 0, del: parseInt(del, 10) || 0 };
  });
}

export function encodePtp(edits: PtpEdit[]): string {
  return edits.map((x) => `${x.col2}|${x.mi}|${x.eff}|${x.del}`).join(';');
}

export const mongoStore: ScrubStore = {
  async getPtp(col1) {
    const db = mongoose.connection.db;
    if (!db) return [];
    const doc = await db.collection('ncci_ptp').findOne({ _id: col1 as any });
    return doc ? decodePtp((doc as any).e) : [];
  },
  async getMue(code) {
    const db = mongoose.connection.db;
    if (!db) return null;
    const d: any = await db.collection('ncci_mue').findOne({ _id: code as any });
    return d ? { code, mue: d.v, mai: String(d.a || ''), rationale: d.r } : null;
  },
  async meta() {
    const db = mongoose.connection.db;
    if (!db) return null;
    return (await db.collection('ncci_meta').findOne({ _id: 'current' as any })) as any;
  },
};

/** In-memory store used by tests. */
export function memoryStore(ptp: Record<string, PtpEdit[]>, mue: Record<string, MueEntry>, meta: DataMeta = { ptpVersion: 'test', mueVersion: 'test' }): ScrubStore {
  return {
    async getPtp(c) { return ptp[c] || []; },
    async getMue(c) { return mue[c] || null; },
    async meta() { return meta; },
  };
}
