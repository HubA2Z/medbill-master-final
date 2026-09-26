import Link from 'next/link';
import { Container, PageHero, ButtonLink } from '@/components/ui';
import { LockIcon, ShieldIcon } from '@/components/icons';
import { pageMeta } from '@/lib/site';

export const metadata = pageMeta({
  title: 'HIPAA Compliance & Data Security',
  description:
    'How Enhancely protects data: a non-PHI environment, TLS encryption in transit, encrypted lead data, MFA-protected admin access, and data minimization. BAA available for partnership clients.',
  path: '/hipaa',
});

const MATRIX = [
  { l: 'TLS 1.3', s: 'Encrypted data in transit' },
  { l: 'No PHI storage', s: 'B2B information only' },
  { l: 'AES-256', s: 'Lead data encrypted at rest' },
  { l: 'MFA protected', s: 'Admin dashboard access' },
  { l: 'HTTPS only', s: 'All requests encrypted' },
  { l: 'Audit logs', s: 'Full access trail' },
];

const SAFEGUARDS = [
  { t: 'Access control', d: 'Only authorized personnel with verified credentials access lead management dashboards, protected by multi-factor authentication (MFA).' },
  { t: 'Transmission security', d: 'Every search on Enhancely is routed over a secure HTTPS / TLS connection, keeping data confidential between the user and our NLM gateway.' },
  { t: 'Data minimization', d: 'We collect only what is necessary — practice name, provider email, and claim volume. No patient identifiers are ever transmitted or stored.' },
  { t: 'Incident response', d: 'We maintain a documented incident response plan with a 72-hour breach notification commitment.' },
];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'HIPAA', href: '/hipaa' }]}
        eyebrow="Health data security"
        title="HIPAA compliance & data integrity"
        subtitle="Enhancely operates in strict adherence to the Administrative Simplification provisions of the Health Insurance Portability and Accountability Act."
      />

      <section className="border-b border-line py-10">
        <Container>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {MATRIX.map((m) => (
              <li key={m.l} className="rounded-xl border border-line bg-white p-4 text-center">
                <LockIcon className="mx-auto h-5 w-5 text-brand" />
                <p className="mt-2 text-sm font-semibold text-ink">{m.l}</p>
                <p className="mt-0.5 text-xs text-ink-3">{m.s}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-12 lg:grid-cols-[1fr_320px]">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-ink">1. Non-PHI environment declaration</h2>
              <blockquote className="mt-4 rounded-r-2xl border-l-4 border-brand bg-bg-tint px-6 py-4 italic leading-relaxed text-ink-2">
                “Enhancely is engineered as a reference utility for the healthcare billing industry. Our public search infrastructure does not require, request, or store Protected Health Information (PHI).”
              </blockquote>
              <p className="mt-4 leading-relaxed text-ink-2">As a B2B platform we only collect business-level information (practice name, provider email) for revenue cycle consulting. Users must not enter patient names, SSNs, or dates of birth into search queries or lead forms. The Call Note Builder runs entirely in your browser — nothing you type into it is sent to our servers.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-ink">2. Technical safeguards</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {SAFEGUARDS.map((s) => (
                  <div key={s.t} className="rounded-2xl border border-line p-5">
                    <h3 className="font-semibold text-ink">{s.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.d}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-tight text-ink">3. Administrative simplification</h2>
              <p className="mt-4 leading-relaxed text-ink-2">In alignment with 2026 CMS standards, Enhancely streamlines the administrative burden of medical coding. By providing a secure portal for ICD-10-CM research, we help clinics maintain their own HIPAA compliance by reducing human error in the coding process — a major source of audit failures.</p>
            </div>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-line bg-bg-soft p-6">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-3"><span className="h-2 w-2 rounded-full bg-ok" /> Compliance status</p>
              <p className="mt-3 text-lg font-semibold text-ok">Active & compliant</p>
              <p className="text-sm text-ink-3">Last security review: Q1 2026</p>
            </div>
            <div className="rounded-2xl bg-navy p-6 text-white">
              <ShieldIcon className="h-6 w-6 text-teal-300" />
              <h3 className="mt-3 font-semibold">Business Associate Agreement</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">Are you a Covered Entity partnering with Enhancely for billing services? We provide full BAA documentation for all partnership clients.</p>
              <ButtonLink href="/audit" variant="white" className="mt-5 w-full">Request a BAA</ButtonLink>
            </div>
            <div className="rounded-2xl border border-line p-6">
              <p className="text-sm font-semibold text-ink">Security contact</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">To report a security concern or request compliance documentation, use the form on our <Link href="/audit" className="font-semibold text-brand-ink underline underline-offset-2">audit page</Link>.</p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
