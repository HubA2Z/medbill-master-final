/**
 * Downloads the latest CMS NCCI practitioner PTP edits and practitioner MUE tables
 * and loads them into MongoDB for the Enhancely claim scrubber.
 *
 * Runs in GitHub Actions (.github/workflows/ncci-import.yml). Needs env MONGO_URI.
 * Optional overrides: PTP_URLS / MUE_URLS (comma-separated zip URLs) if CMS changes its pages.
 *
 *   npx tsx scripts/import-ncci.ts
 */
import AdmZip from 'adm-zip';
import { MongoClient } from 'mongodb';
import { parsePtp, parseMue, pickLatest, zipLinks } from './ncci-parse';
import { encodePtp, type PtpEdit } from '../src/scrub/store';

const PTP_PAGE = 'https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits/medicare-ncci-procedure-procedure-ptp-edits';
const MUE_PAGE = 'https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits/medicare-ncci-medically-unlikely-edits';
const UA = { 'User-Agent': 'Mozilla/5.0 (EnhancelyNCCIImporter; +https://www.enhancely.in)' };

async function get(url: string): Promise<Buffer> {
  const r = await fetch(url, { headers: UA, redirect: 'follow' });
  if (!r.ok) throw new Error(`GET ${url} -> ${r.status}`);
  return Buffer.from(await r.arrayBuffer());
}

async function discover(page: string, match: RegExp, override?: string): Promise<string[]> {
  if (override) return override.split(',').map((s) => s.trim()).filter(Boolean);
  const html = (await get(page)).toString('utf8');
  const links = zipLinks(html, page);
  const picked = pickLatest(links, match);
  if (!picked.length) throw new Error(`No zip links matching ${match} found on ${page}. Set the *_URLS env override.`);
  return picked;
}

function textFiles(buf: Buffer): { name: string; text: string }[] {
  const zip = new AdmZip(buf);
  const out: { name: string; text: string }[] = [];
  for (const e of zip.getEntries()) {
    if (e.isDirectory) continue;
    const name = e.entryName.toLowerCase();
    if (name.endsWith('.zip')) out.push(...textFiles(e.getData()));
    else if (name.endsWith('.txt') || name.endsWith('.csv')) out.push({ name: e.entryName, text: e.getData().toString('latin1') });
  }
  return out;
}

const versionFrom = (urls: string[]) => {
  const m = urls.join(' ').toLowerCase().match(/(20\d\d)[-_]?q([1-4])/);
  return m ? `${m[1]} Q${m[2]}` : new Date().toISOString().slice(0, 10);
};

async function main() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGO_URI is not set');

  // Keep edits deleted within the last 2 years so older dates of service still check correctly.
  const d = new Date(); d.setFullYear(d.getFullYear() - 2);
  const keepAfter = parseInt(d.toISOString().slice(0, 10).replace(/-/g, ''), 10);

  console.log('Discovering CMS files…');
  const ptpUrls = await discover(PTP_PAGE, /practitioner.*ptp|ptp.*practitioner|ccipra/i, process.env.PTP_URLS);
  const mueUrls = await discover(MUE_PAGE, /practitioner/i, process.env.MUE_URLS);
  console.log('PTP:', ptpUrls, '\nMUE:', mueUrls);
  gh('notice', `Found ${ptpUrls.length} PTP and ${mueUrls.length} MUE files: ${[...ptpUrls, ...mueUrls].map((u) => u.split('/').pop()).join(', ')}`);

  // ── PTP ──
  const ptp = new Map<string, PtpEdit[]>();
  for (const u of ptpUrls) {
    for (const f of textFiles(await get(u))) {
      const part = parsePtp(f.text, keepAfter);
      let rows = 0;
      part.forEach((edits, col1) => { rows += edits.length; ptp.set(col1, [...(ptp.get(col1) || []), ...edits]); });
      console.log(`  ${f.name}: ${rows} edits`);
    }
  }
  const ptpRows = Array.from(ptp.values()).reduce((a, b) => a + b.length, 0);
  if (ptpRows < 100000) throw new Error(`Only ${ptpRows} PTP edits parsed — refusing to replace data (format change?).`);

  // ── MUE ──
  const mue = new Map<string, { v: number; a: string; r: string }>();
  for (const u of mueUrls) {
    for (const f of textFiles(await get(u))) {
      const rows = parseMue(f.text);
      rows.forEach((r) => mue.set(r.code, { v: r.mue, a: r.mai, r: r.rationale }));
      console.log(`  ${f.name}: ${rows.length} MUE rows`);
    }
  }
  if (mue.size < 5000) throw new Error(`Only ${mue.size} MUE rows parsed — refusing to replace data.`);

  // ── Load (into temp collections, then swap) ──
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(); // database from the URI path
  const swap = async (name: string, docs: any[]) => {
    const tmp = `${name}_tmp`;
    await db.collection(tmp).drop().catch(() => {});
    for (let i = 0; i < docs.length; i += 2000) await db.collection(tmp).insertMany(docs.slice(i, i + 2000), { ordered: false });
    await db.collection(tmp).rename(name, { dropTarget: true });
    console.log(`Loaded ${docs.length} docs into ${name}`);
  };

  await swap('ncci_ptp', Array.from(ptp.entries()).map(([col1, edits]) => ({ _id: col1, e: encodePtp(edits) })));
  await swap('ncci_mue', Array.from(mue.entries()).map(([code, x]) => ({ _id: code, ...x })));
  await db.collection('ncci_meta').updateOne(
    { _id: 'current' as any },
    { $set: { ptpVersion: versionFrom(ptpUrls), mueVersion: versionFrom(mueUrls), ptpRows, mueRows: mue.size, loadedAt: new Date().toISOString(), sources: { ptpUrls, mueUrls } } },
    { upsert: true },
  );
  await client.close();
  gh('notice', `Loaded ${ptpRows} PTP edits across ${ptp.size} codes and ${mue.size} MUEs.`);
}

const gh = (level: 'notice' | 'error', msg: string) =>
  process.env.GITHUB_ACTIONS ? console.log(`::${level}::${msg.replace(/\r?\n/g, ' | ').slice(0, 900)}`) : console.log(msg);

main()
  .then(() => gh('notice', 'NCCI import finished successfully.'))
  .catch((e) => { console.error(e); gh('error', `NCCI import failed: ${e?.message || e}`); process.exit(1); });
