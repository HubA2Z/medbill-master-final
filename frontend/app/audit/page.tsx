import AuditForm from '@/components/AuditForm';
import { Container, Eyebrow, CheckItem } from '@/components/ui';
import { CheckIcon } from '@/components/icons';
import { ToolPageGuard } from '@/components/AdsterraExtras';
import { pageMeta } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Free 48-Hour Medical Billing Revenue Audit',
  description:
    'Find coding leaks, unbundling errors, and under-coded E/M levels. Certified billing specialists deliver a full revenue audit report within 48 hours — free, no credit card.',
  path: '/audit',
});

const REASONS = [
  { t: 'Incorrect modifiers', d: 'Misusing -25 or -59 modifiers is the #1 trigger for RAC audits and automatic denials.' },
  { t: 'Under-coding E/M levels', d: 'Fear of audits leads providers to code Level 3 when documentation clearly supports Level 4 or 5.' },
  { t: 'Unbundling errors', d: 'Separate billing of services included in a global package triggers payer flags and recoupment.' },
];

const PROCESS = [
  { t: 'Tell us about your practice', d: 'Share your practice name, email, and monthly claim volume. No patient data.' },
  { t: 'We review your revenue cycle', d: 'A certified specialist looks for denial patterns, coding gaps, and A/R leaks.' },
  { t: 'Get your report in 48 hours', d: 'A clear, prioritized list of what to fix — and what it is worth.' },
];

export default function Page() {
  return (
    <>
      <ToolPageGuard />
      <section className="relative overflow-hidden border-b border-line bg-bg-soft">
        <div aria-hidden className="bg-grid absolute inset-0" />
        <Container className="relative grid gap-12 py-12 sm:py-16 lg:grid-cols-[1fr_440px] lg:items-start">
          <div>
            <Eyebrow className="mb-3">48-hour turnaround · Free</Eyebrow>
            <h1 className="text-3xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-ink text-balance">
              Stop leaving revenue on the table.
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-2">
              Our billing experts identify coding leaks, unbundling errors, and under-coded E/M levels — and deliver a full report within 48 hours.
            </p>
            <ul className="mt-6 grid gap-2.5 text-ink-2 sm:grid-cols-2">
              {['No credit card required', '48-hour report delivery', 'Certified billing specialists', 'Zero patient data needed'].map((x) => (
                <CheckItem key={x}>{x}</CheckItem>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-line bg-white p-6">
              <p className="text-sm font-semibold text-ink">Why clinics lose revenue</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">
                <strong className="text-ink">Up to 30% of medical claims are denied</strong> on first submission — a “silent leak” that can cost a mid-sized practice over $150,000 a year.
              </p>
              <ol className="mt-5 space-y-4">
                {REASONS.map((r, i) => (
                  <li key={r.t} className="flex gap-3">
                    <span className="mt-0.5 font-mono text-sm font-bold text-brand">0{i + 1}</span>
                    <div>
                      <p className="font-semibold text-ink">{r.t}</p>
                      <p className="text-sm leading-relaxed text-ink-2">{r.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div id="audit-form" className="scroll-mt-24 rounded-2xl border border-line bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
            <h2 className="text-xl font-semibold text-ink">Request your free audit</h2>
            <p className="mt-1 mb-6 text-sm text-ink-3">We’ll reach out within one business day.</p>
            <AuditForm source="Revenue Audit Page" compact />
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {PROCESS.map((p, i) => (
              <div key={p.t} className="rounded-2xl border border-line p-6">
                <span className="text-sm font-semibold text-brand">Step {i + 1}</span>
                <h3 className="mt-2 font-semibold text-ink">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{p.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-start gap-3 rounded-2xl bg-bg-tint p-5 text-brand-ink">
            <CheckIcon className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-sm font-medium leading-relaxed">
              On average, clinics that complete a revenue audit recover <strong>12–18%</strong> in previously uncollected claims within 90 days.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
