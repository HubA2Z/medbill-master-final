// Run: npx tsx scripts/test-scrub.ts   (no DB or network needed)
import assert from 'node:assert/strict';
import { parsePtp, parseMue, pickLatest, zipLinks } from './ncci-parse';
import { scrubClaim } from '../src/scrub/engine';
import { memoryStore, encodePtp, decodePtp } from '../src/scrub/store';
import type { IcdLookup } from '../src/scrub/icd';

let passed = 0;
const t = async (name: string, fn: () => Promise<void> | void) => {
  try { await fn(); passed++; console.log('  ✓', name); } catch (e) { console.error('  ✗', name); throw e; }
};

const PTP_TXT = [
  'CPT only copyright 2025 American Medical Association. All rights reserved.',
  'Column 1\tColumn 2\t*=in existence prior to 1996\tEffective Date\tDeletion Date *=no data\tModifier 0=not allowed 1=allowed 9=not applicable\tPTP Edit Rationale',
  '11042\t97597\t\t20130101\t*\t1\tMisuse of column two code with column one code',
  '29881\t29877\t\t20120101\t*\t0\tMutually exclusive procedures',
  '99213\t36415\t\t20150101\t*\t1\tStandards of medical / surgical practice',
  '12001\t11042\t\t19960101\t20200101\t1\tDeleted long ago',
  '20610\t76942\t\t20150101\t*\t0\tMisuse of column two code with column one code',
  '20610\tJ1030\t\t20190101\t*\t9\tNot applicable',
].join('\r\n');

const MUE_CSV = [
  '"CPT codes, descriptions and other data only are copyright 2025 American Medical Association."',
  'HCPCS/CPT Code,Practitioner Services MUE Values,MUE Adjudication Indicator,MUE Rationale',
  '20610,2,"2 Date of Service Edit: Policy",Anatomic Consideration',
  '36415,2,"3 Date of Service Edit: Clinical",Clinical: Data',
  '97110,6,"3 Date of Service Edit: Clinical",Clinical: Data',
  '11042,1,"1 Line Edit",Code Descriptor / CPT Instruction',
].join('\n');

const fakeIcd: IcdLookup = async (codes) => {
  const db: Record<string, string> = {
    'E11.9': 'Type 2 diabetes mellitus without complications',
    'M17.11': 'Unilateral primary osteoarthritis, right knee',
    'M17.12': 'Unilateral primary osteoarthritis, left knee',
    'L97.212': 'Non-pressure chronic ulcer of right calf with fat layer exposed',
    'W19.XXXA': 'Unspecified fall, initial encounter',
    'S83.241A': 'Other tear of medial meniscus, current injury, right knee, initial encounter',
    'I10': 'Essential (primary) hypertension',
  };
  return Object.fromEntries(codes.map((c) => [c, db[c] ? { code: c, found: true, description: db[c] } : { code: c, found: false }]));
};

(async () => {
  console.log('Parsers');
  const ptpMap = parsePtp(PTP_TXT, 20240101);
  await t('parses PTP rows and skips headers', () => {
    assert.equal(ptpMap.get('11042')?.[0].col2, '97597');
    assert.equal(ptpMap.get('29881')?.[0].mi, '0');
    assert.equal(ptpMap.get('20610')?.length, 2);
  });
  await t('drops edits deleted before cutoff', () => assert.equal(ptpMap.has('12001'), false));
  await t('encode/decode round-trip', () => assert.deepEqual(decodePtp(encodePtp(ptpMap.get('20610')!)), ptpMap.get('20610')));
  const mueRows = parseMue(MUE_CSV);
  await t('parses MUE CSV with quoted MAI', () => {
    assert.equal(mueRows.length, 4);
    assert.deepEqual(mueRows[0], { code: '20610', mue: 2, mai: '2', rationale: 'Anatomic Consideration' });
    assert.equal(mueRows[3].mai, '1');
  });
  await t('picks newest quarter zips', () => {
    const urls = zipLinks(
      '<a href="/files/zip/medicare-ncci-2026q3-practitioner-ptp-edits-ccipra-v320r0-f1.zip">a</a>' +
      '<a href="/files/zip/medicare-ncci-2026q4-practitioner-ptp-edits-ccipra-v321r0-f1.zip">b</a>' +
      '<a href="/files/zip/medicare-ncci-2026q4-practitioner-ptp-edits-ccipra-v321r0-f2.zip">c</a>' +
      '<a href="/files/zip/medicare-ncci-2026q4-hospital-ptp-edits-ccioph-v321r0-f1.zip">d</a>',
      'https://www.cms.gov/x',
    );
    const p = pickLatest(urls, /practitioner.*ptp/i);
    assert.equal(p.length, 2);
    assert.ok(p.every((u) => u.includes('2026q4') && u.startsWith('https://www.cms.gov/files/zip/')));
  });

  const store = memoryStore(
    Object.fromEntries(ptpMap),
    Object.fromEntries(mueRows.map((r) => [r.code, { code: r.code, mue: r.mue, mai: r.mai, rationale: r.rationale }])),
  );
  const run = (input: any) => scrubClaim({ dos: '2026-09-01', ...input }, store, fakeIcd);
  const has = (r: any, sev: string, rule: string, re: RegExp) => r.findings.some((f: any) => f.severity === sev && f.rule === rule && re.test(f.message));

  console.log('Rules');
  await t('clean claim passes', async () => {
    const r = await run({ diagnoses: ['I10'], lines: [{ cpt: '99213', units: 1, dxPointers: ['A'] }] });
    assert.equal(r.status, 'clean', JSON.stringify(r.findings));
  });
  await t('PTP indicator 0 is an error', async () => {
    const r = await run({ diagnoses: ['S83.241A'], lines: [{ cpt: '29881', modifiers: ['RT'], dxPointers: ['A'] }, { cpt: '29877', modifiers: ['RT'], dxPointers: ['A'] }] });
    assert.ok(has(r, 'error', 'ptp', /never be paid/));
  });
  await t('PTP indicator 1 without modifier is an error; with 59 passes', async () => {
    const base = { diagnoses: ['L97.212'], lines: [{ cpt: '11042', dxPointers: ['A'] }, { cpt: '97597', dxPointers: ['A'] }] };
    assert.ok(has(await run(base), 'error', 'ptp', /bundled into 11042/));
    const withMod = await run({ ...base, lines: [base.lines[0], { ...base.lines[1], modifiers: ['59'] }] });
    assert.ok(has(withMod, 'pass', 'ptp', /bypassed by modifier 59/));
    assert.ok(!has(withMod, 'error', 'ptp', /./));
  });
  await t('PTP indicator 9 and deleted edits are ignored', async () => {
    const r = await run({ diagnoses: ['M17.11'], lines: [{ cpt: '20610', modifiers: ['RT'], dxPointers: ['A'] }, { cpt: 'J1030', dxPointers: ['A'] }] });
    assert.ok(!r.findings.some((f: any) => f.rule === 'ptp' && f.severity !== 'info'));
  });
  await t('edit not yet effective on DOS is ignored', async () => {
    const r = await scrubClaim({ dos: '2010-01-01', diagnoses: ['L97.212'], lines: [{ cpt: '11042', dxPointers: ['A'] }, { cpt: '97597', dxPointers: ['A'] }] }, store, fakeIcd);
    assert.ok(!has(r, 'error', 'ptp', /./));
  });
  await t('MUE over limit flagged (MAI 2 = error)', async () => {
    const r = await run({ diagnoses: ['M17.11'], lines: [{ cpt: '20610', units: 3, modifiers: ['RT'], dxPointers: ['A'] }] });
    assert.ok(has(r, 'error', 'mue', /limit is 2 per day and cannot be exceeded/));
  });
  await t('MUE MAI 1 checks per line, MAI 3 per day totals', async () => {
    const r1 = await run({ diagnoses: ['L97.212'], lines: [{ cpt: '11042', units: 1, dxPointers: ['A'] }, { cpt: '11042', units: 1, modifiers: ['59'], dxPointers: ['A'] }] });
    assert.ok(!has(r1, 'warning', 'mue', /./) && !has(r1, 'error', 'mue', /./));
    const r3 = await run({ diagnoses: ['I10'], lines: [{ cpt: '97110', units: 4, dxPointers: ['A'] }, { cpt: '97110', units: 3, modifiers: ['59'], dxPointers: ['A'] }] });
    assert.ok(has(r3, 'warning', 'mue', /7 units; the CMS limit is 6 per day/));
  });
  await t('laterality mismatch RT vs left-knee dx', async () => {
    const r = await run({ diagnoses: ['M17.12'], lines: [{ cpt: '20610', modifiers: ['RT'], dxPointers: ['A'] }] });
    assert.ok(has(r, 'error', 'modifier', /billed RT \(right\).*left side/));
  });
  await t('25 on a non-E/M code is an error', async () => {
    const r = await run({ diagnoses: ['M17.11'], lines: [{ cpt: '20610', modifiers: ['25', 'RT'], dxPointers: ['A'] }] });
    assert.ok(has(r, 'error', 'modifier', /Modifier 25 is for E\/M services only/));
  });
  await t('E/M with procedure and no 25 warns', async () => {
    const r = await run({ diagnoses: ['M17.11'], lines: [{ cpt: '99213', dxPointers: ['A'] }, { cpt: '20610', modifiers: ['RT'], dxPointers: ['A'] }] });
    assert.ok(has(r, 'warning', 'em', /without modifier 25/));
  });
  await t('26 + TC conflict, 59 + XS conflict', async () => {
    const r = await run({ diagnoses: ['I10'], lines: [{ cpt: '93000', modifiers: ['26', 'TC'], dxPointers: ['A'] }, { cpt: '97110', modifiers: ['59', 'XS'], dxPointers: ['A'] }] });
    assert.ok(has(r, 'error', 'modifier', /both 26 and TC/));
    assert.ok(has(r, 'warning', 'modifier', /Don't report 59 together/));
  });
  await t('invalid / non-billable dx, external cause first, bad pointer', async () => {
    const r = await run({ diagnoses: ['W19.XXXA', 'E11', 'ZZZ'], lines: [{ cpt: '99213', dxPointers: ['A', 'F'] }] });
    assert.ok(has(r, 'error', 'diagnosis', /External cause code W19.XXXA cannot be the first-listed/));
    assert.ok(has(r, 'error', 'diagnosis', /E11 is not a billable/));
    assert.ok(has(r, 'error', 'diagnosis', /"ZZZ" is not a valid ICD-10-CM format/));
    assert.ok(has(r, 'error', 'diagnosis', /points to Dx "F"/));
  });
  await t('new + established E/M on same claim', async () => {
    const r = await run({ diagnoses: ['I10'], lines: [{ cpt: '99203', dxPointers: ['A'] }, { cpt: '99213', dxPointers: ['A'] }] });
    assert.ok(has(r, 'error', 'em', /new-patient.*established-patient/));
  });
  await t('bad CPT format + unknown modifier', async () => {
    const r = await run({ diagnoses: ['I10'], lines: [{ cpt: '9921', modifiers: ['ZQ'], dxPointers: ['A'] }] });
    assert.ok(has(r, 'error', 'format', /not a valid CPT or HCPCS/));
    assert.ok(has(r, 'warning', 'modifier', /ZQ isn't in our reference list/));
  });
  await t('reports when NCCI data not loaded', async () => {
    const empty = memoryStore({}, {}, {});
    const r = await scrubClaim({ diagnoses: ['I10'], lines: [{ cpt: '99213', dxPointers: ['A'] }] }, empty, fakeIcd);
    assert.equal(r.data.ptp, false);
    assert.ok(has(r, 'info', 'ptp', /isn't loaded yet/));
  });

  console.log(`\n${passed} tests passed`);
})().catch(() => process.exit(1));
