import GuideNav, { NextChapter } from '@/components/GuideNav';
import ChecklistDownload from '@/components/ChecklistDownload';
import { Container, PageHero, CheckItem, ButtonLink, CtaBand } from '@/components/ui';
import { pageMeta } from '@/lib/site';

const PATH = '/billing-specialist-guide/resume-tips';

export const metadata = pageMeta({
  title: 'Medical Billing Resume Tips & 2026 Skills',
  description:
    'The 2026 medical billing skill stack and resume power-phrases that get interviews — denial analytics, eligibility logic, compliance — plus a free revenue leak checklist.',
  path: PATH,
});

const SKILLS = [
  { t: 'Advanced denial analytics', d: 'Don’t just fix denials — prevent them. Highlight root-cause analysis that identifies payer patterns and NCCI unbundling errors.' },
  { t: 'Eligibility & pre-auth logic', d: 'Showcase real-time eligibility verification experience that reduces “member not eligible” rejections — one of the biggest revenue killers in 2026.' },
  { t: 'Compliance & ethics', d: 'Put HIPAA, False Claims Act, and OIG guidelines front and center. Precision coding is a legal requirement, not a suggestion.' },
];

const PHRASES = [
  'Maintained a 98.5% first-pass clean claim rate across 500+ weekly submissions.',
  'Reduced Days in A/R from 45 to 31 through strategic payer follow-up.',
  'Managed complex appeals for surgical modifiers 51, 59, and XS, recovering $45k in lost revenue.',
];

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{ name: 'Career Guide', href: '/billing-specialist-guide' }, { name: 'Resume & skills', href: PATH }]}
        eyebrow="Career guide · Resume & skills"
        title={<>The 2026 <span className="text-brand">biller’s edge</span>: skills & professional strategy</>}
        subtitle="Whether you’re crafting a standout resume or a provider looking for better RCM results, precision is the metric that matters."
      />
      <GuideNav current={PATH} />

      <section className="py-14">
        <Container className="grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <h2 className="flex items-center gap-3 text-2xl font-bold tracking-tight text-ink"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm text-white">01</span> The 2026 skill stack</h2>
            <p className="mt-4 border-l-4 border-brand-soft pl-4 italic text-ink-2">“In 2026, a resume that only mentions ‘data entry’ will be ignored. Modern RCM requires technical mastery.”</p>
            <div className="mt-6 space-y-4">
              {SKILLS.map((s) => (
                <div key={s.t} className="rounded-2xl border border-line p-5">
                  <h3 className="font-semibold text-ink">{s.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{s.d}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-14 flex items-center gap-3 text-2xl font-bold tracking-tight text-ink"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-sm text-white">02</span> Resume power-phrases</h2>
            <div className="mt-6 rounded-2xl bg-navy p-6 font-mono text-sm leading-relaxed text-slate-200">
              <p className="mb-3 text-xs uppercase tracking-wider text-teal-300">// Performance metrics</p>
              <ul className="space-y-3">
                {PHRASES.map((p) => <li key={p}>• “{p}”</li>)}
              </ul>
            </div>

            <NextChapter current={PATH} />
          </div>

          <aside className="space-y-5 lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-2xl border-2 border-brand p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">For providers</p>
              <h3 className="mt-2 text-xl font-semibold text-ink">Are you a provider?</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">Stop settling for “good enough” billing. Our proven billing experts treat your revenue as their own.</p>
              <ul className="mt-4 space-y-2 text-sm text-ink-2">
                <CheckItem>98% first-pass clean claims</CheckItem>
                <CheckItem>Dedicated denial recovery team</CheckItem>
                <CheckItem>Full HIPAA & security compliance</CheckItem>
              </ul>
              <ButtonLink href="/audit" className="mt-5 w-full">Request free practice audit</ButtonLink>
            </div>

            <div className="rounded-2xl bg-navy p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-300">Free resource</p>
              <h3 className="mt-2 text-lg font-semibold">2026 Revenue Leak Checklist</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">Is your current process losing money? Audit your practice in 10 minutes.</p>
              <ol className="my-5 space-y-2 text-sm text-slate-200">
                <li className="flex items-center gap-3"><span className="flex h-5 w-5 items-center justify-center rounded bg-white/10 text-xs font-bold">1</span> Check Days in A/R trends</li>
                <li className="flex items-center gap-3"><span className="flex h-5 w-5 items-center justify-center rounded bg-white/10 text-xs font-bold">2</span> Identify unworked denials</li>
              </ol>
              <ChecklistDownload />
            </div>
          </aside>
        </Container>
      </section>

      <CtaBand title="Precision is profit." body="Whether you’re advancing your career or optimizing your clinic’s collections, Enhancely provides the tools and expertise to make it happen." primary={{ label: 'Try coding tools', href: '/tools' }} secondary={{ label: 'Consult our team', href: '/audit' }} />
    </>
  );
}
