import type { Metadata } from 'next';
import { Container, ButtonLink } from '@/components/ui';

export const metadata: Metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="py-24">
      <Container size="sm" className="text-center">
        <p className="font-mono text-sm font-semibold text-brand">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">We couldn’t find that page</h1>
        <p className="mt-3 text-ink-2">It may have moved. Try one of these instead:</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/icd10-intelligence">ICD-10 search</ButtonLink>
          <ButtonLink href="/call-note-builder" variant="secondary">Call note builder</ButtonLink>
          <ButtonLink href="/" variant="secondary">Home</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
