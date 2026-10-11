import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { Container, PageHero } from '@/components/ui';
import { pageMeta, SITE } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Contact Us',
  description: 'Contact Enhancely with questions about our free medical billing tools, corrections to an article, billing services, or privacy requests.',
  path: '/contact',
});

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: 'Contact', href: '/contact' }]} eyebrow="Get in touch" title="Contact us" subtitle="Questions about a tool, a correction to an article, or help with your billing? Send us a message." />
      <section className="py-14">
        <Container className="grid gap-10 lg:grid-cols-[1fr_340px]">
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
            <ContactForm />
          </div>
          <aside className="space-y-5">
            <div className="rounded-2xl border border-line bg-bg-soft p-6">
              <h2 className="font-semibold text-ink">Who you’re contacting</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">Enhancely is run by {SITE.author.name}, a US medical billing and revenue cycle specialist. Messages go straight to {SITE.author.name}’s inbox.</p>
              <Link href="/about#author" className="mt-3 inline-block text-sm font-semibold text-brand-ink hover:underline">About the author →</Link>
            </div>
            <div className="rounded-2xl border border-line p-6">
              <h2 className="font-semibold text-ink">Please don’t send patient information</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">Never include patient names, dates of birth, member IDs, or medical records in a message. We can answer billing questions without them.</p>
            </div>
            <div className="rounded-2xl border border-line p-6">
              <h2 className="font-semibold text-ink">Want a revenue audit?</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">Use the <Link href="/audit" className="font-semibold text-brand-ink hover:underline">free audit form</Link> and tell us about your practice.</p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
