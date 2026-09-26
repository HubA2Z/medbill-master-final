// Code-format helpers and modifier reference for the claim scrubber.
// Modifier descriptions are Enhancely's own short plain-language summaries.

export const CPT_RE = /^(\d{5}|\d{4}[FTU])$/;          // CPT Cat I, II (F), III (T), PLA (U)
export const HCPCS_RE = /^[A-V]\d{4}$/;                 // HCPCS Level II
export const ICD_RE = /^[A-TV-Z]\d[0-9A-Z](\.?[0-9A-Z]{1,4})?$/;

export const normCode = (s: string) => (s || '').toUpperCase().replace(/\s+/g, '');
export const normIcd = (s: string) => {
  const c = normCode(s).replace('.', '');
  return c.length > 3 ? `${c.slice(0, 3)}.${c.slice(3)}` : c;
};

const num = (c: string) => (/^\d{5}$/.test(c) ? parseInt(c, 10) : NaN);

export const isEM = (c: string) => {
  const n = num(c);
  return (n >= 99202 && n <= 99499) || (n >= 92002 && n <= 92014);
};
export const isSurgery = (c: string) => {
  const n = num(c);
  return n >= 10004 && n <= 69990;
};
export const isLab = (c: string) => {
  const n = num(c);
  return n >= 80047 && n <= 89398;
};
export const isNewPatientEM = (c: string) => {
  const n = num(c);
  return n >= 99202 && n <= 99205;
};
export const isEstablishedEM = (c: string) => {
  const n = num(c);
  return n >= 99211 && n <= 99215;
};

/** Modifiers that CMS recognizes as able to bypass an NCCI PTP edit with modifier indicator "1". */
export const NCCI_BYPASS = new Set([
  '59', 'XE', 'XS', 'XP', 'XU', '24', '25', '27', '57', '58', '78', '79', '91',
  'E1', 'E2', 'E3', 'E4', 'FA', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9',
  'TA', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9',
  'LT', 'RT', 'LC', 'LD', 'LM', 'RC', 'RI',
]);

export const MODIFIERS: Record<string, string> = {
  '22': 'Increased procedural services',
  '23': 'Unusual anesthesia',
  '24': 'Unrelated E/M during a postoperative period',
  '25': 'Significant, separately identifiable E/M on the same day as a procedure',
  '26': 'Professional component',
  '27': 'Multiple outpatient hospital E/M encounters same date',
  '32': 'Mandated services',
  '33': 'Preventive services',
  '47': 'Anesthesia by surgeon',
  '50': 'Bilateral procedure',
  '51': 'Multiple procedures',
  '52': 'Reduced services',
  '53': 'Discontinued procedure',
  '54': 'Surgical care only',
  '55': 'Postoperative management only',
  '56': 'Preoperative management only',
  '57': 'Decision for surgery',
  '58': 'Staged or related procedure during the postoperative period',
  '59': 'Distinct procedural service',
  '62': 'Two surgeons',
  '63': 'Procedure on infants under 4 kg',
  '66': 'Surgical team',
  '76': 'Repeat procedure by the same physician',
  '77': 'Repeat procedure by another physician',
  '78': 'Unplanned return to the OR during the postoperative period',
  '79': 'Unrelated procedure during the postoperative period',
  '80': 'Assistant surgeon',
  '81': 'Minimum assistant surgeon',
  '82': 'Assistant surgeon when a qualified resident is unavailable',
  '90': 'Reference (outside) laboratory',
  '91': 'Repeat clinical diagnostic lab test',
  '92': 'Alternative lab platform testing',
  '93': 'Synchronous telemedicine via audio only',
  '95': 'Synchronous telemedicine via audio and video',
  '96': 'Habilitative services',
  '97': 'Rehabilitative services',
  '99': 'Multiple modifiers',
  TC: 'Technical component',
  RT: 'Right side',
  LT: 'Left side',
  E1: 'Upper left eyelid', E2: 'Lower left eyelid', E3: 'Upper right eyelid', E4: 'Lower right eyelid',
  FA: 'Left hand, thumb', F1: 'Left hand, 2nd digit', F2: 'Left hand, 3rd digit', F3: 'Left hand, 4th digit', F4: 'Left hand, 5th digit',
  F5: 'Right hand, thumb', F6: 'Right hand, 2nd digit', F7: 'Right hand, 3rd digit', F8: 'Right hand, 4th digit', F9: 'Right hand, 5th digit',
  TA: 'Left foot, great toe', T1: 'Left foot, 2nd digit', T2: 'Left foot, 3rd digit', T3: 'Left foot, 4th digit', T4: 'Left foot, 5th digit',
  T5: 'Right foot, great toe', T6: 'Right foot, 2nd digit', T7: 'Right foot, 3rd digit', T8: 'Right foot, 4th digit', T9: 'Right foot, 5th digit',
  LC: 'Left circumflex coronary artery', LD: 'Left anterior descending coronary artery', LM: 'Left main coronary artery',
  RC: 'Right coronary artery', RI: 'Ramus intermedius coronary artery',
  XE: 'Separate encounter', XS: 'Separate structure/organ', XP: 'Separate practitioner', XU: 'Unusual non-overlapping service',
  GA: 'Waiver of liability (ABN) on file', GX: 'Voluntary ABN on file', GY: 'Statutorily excluded service', GZ: 'Expected denial, no ABN on file',
  GC: 'Service performed in part by a resident', GE: 'Resident without teaching physician presence (primary care exception)',
  GN: 'Speech-language pathology plan of care', GO: 'Occupational therapy plan of care', GP: 'Physical therapy plan of care',
  GT: 'Telehealth via interactive audio/video (institutional)', GQ: 'Telehealth via asynchronous telecommunications',
  KX: 'Requirements in medical policy met', QW: 'CLIA-waived test', Q5: 'Reciprocal billing arrangement', Q6: 'Fee-for-time locum tenens',
  AI: 'Principal physician of record', AS: 'Assistant at surgery (PA, NP, CNS)', SA: 'NP/PA with physician',
  CR: 'Catastrophe/disaster related', CS: 'Cost-sharing waived', FS: 'Split/shared E/M visit', FT: 'Unrelated E/M in a global period (separately identifiable)',
  JW: 'Drug amount discarded', JZ: 'Zero drug amount discarded', JG: 'Drug acquired with 340B discount', TB: '340B-acquired drug (tracking)',
  PO: 'Excepted off-campus provider-based department', PN: 'Non-excepted off-campus provider-based department',
  QK: 'Anesthesia medical direction of 2–4 cases', QX: 'CRNA with medical direction', QZ: 'CRNA without medical direction', AA: 'Anesthesia performed personally by anesthesiologist',
  QS: 'Monitored anesthesia care', G8: 'MAC for deep complex procedure', G9: 'MAC for patient with severe cardiopulmonary condition',
  AF: 'Specialty physician', AG: 'Primary physician', HQ: 'Group setting', UN: 'Two patients served', UP: 'Three patients served',
};

/** Modifiers that belong on E/M codes only. */
export const EM_ONLY = new Set(['24', '25', '27', '57', 'FS', 'FT']);
/** Modifiers that belong on surgical/procedural codes. */
export const PROCEDURE_ONLY = new Set(['22', '47', '50', '51', '54', '55', '56', '58', '62', '66', '78', '79', '80', '81', '82']);
