import type { ReactNode } from 'react';
import { Container, PageHero } from './ui';

export default function LegalPage({
  title,
  path,
  updated,
  intro,
  notice,
  sections,
}: {
  title: string;
  path: string;
  updated: string;
  intro?: ReactNode;
  notice?: ReactNode;
  sections: { id: string; title: string; body: ReactNode }[];
}) {
  return (
    <>
      <PageHero crumbs={[{ name: title, href: path }]} eyebrow="Legal" title={title} subtitle={`Last updated: ${updated}`} />
      <section className="py-14">
        <Container size="sm">
          {notice && <div className="mb-10 rounded-2xl border border-brand/30 bg-bg-tint p-5 text-sm leading-relaxed text-brand-ink">{notice}</div>}
          {intro && <p className="mb-10 text-lg leading-relaxed text-ink-2">{intro}</p>}
          <nav aria-label="On this page" className="mb-10 rounded-2xl border border-line bg-bg-soft p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-3">On this page</p>
            <ol className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
              {sections.map((s) => (
                <li key={s.id}><a href={`#${s.id}`} className="text-ink-2 hover:text-brand-ink">{s.title}</a></li>
              ))}
            </ol>
          </nav>
          <div className="space-y-10">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-xl font-semibold text-ink">{s.title}</h2>
                <div className="mt-3 leading-relaxed text-ink-2">{s.body}</div>
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
