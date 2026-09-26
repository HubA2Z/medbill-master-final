// ICD-10-CM chapter lookup by code prefix — used to label search results.
export function icdChapter(code: string): string {
  const c = code.toUpperCase();
  const L = c[0];
  const n = parseInt(c.slice(1, 3), 10);
  switch (L) {
    case 'A': case 'B': return 'Infectious & parasitic';
    case 'C': return 'Neoplasms';
    case 'D': return n <= 49 ? 'Neoplasms' : 'Blood & immune';
    case 'E': return 'Endocrine & metabolic';
    case 'F': return 'Mental & behavioral';
    case 'G': return 'Nervous system';
    case 'H': return n <= 59 ? 'Eye & adnexa' : 'Ear & mastoid';
    case 'I': return 'Circulatory';
    case 'J': return 'Respiratory';
    case 'K': return 'Digestive';
    case 'L': return 'Skin';
    case 'M': return 'Musculoskeletal';
    case 'N': return 'Genitourinary';
    case 'O': return 'Pregnancy & childbirth';
    case 'P': return 'Perinatal';
    case 'Q': return 'Congenital';
    case 'R': return 'Symptoms & signs';
    case 'S': case 'T': return 'Injury & poisoning';
    case 'U': return 'Special purpose';
    case 'V': case 'W': case 'X': case 'Y': return 'External causes';
    case 'Z': return 'Health status & services';
    default: return 'ICD-10-CM';
  }
}

export function toCsv(rows: { code: string; description: string }[]): string {
  const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
  return ['Code,Description,Chapter', ...rows.map((r) => [esc(r.code), esc(r.description), esc(icdChapter(r.code))].join(','))].join('\n');
}

export function downloadText(filename: string, text: string, type = 'text/plain') {
  const blob = new Blob([text], { type: `${type};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function safeStorage<T>(key: string, fallback: T) {
  return {
    get(): T {
      try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : fallback;
      } catch {
        return fallback;
      }
    },
    set(v: T) {
      try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* storage unavailable */ }
    },
  };
}
