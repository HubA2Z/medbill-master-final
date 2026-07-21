
import Link from 'next/link';

const blogPosts = [
  {
    slug: '/blog/icd-10-2026-updates',
    title: '2026 ICD-10-CM Highlights: Key Changes Every Medical Biller Must Know',
    excerpt: 'Over 250 new codes, major updates in diabetes, mental health, and Long COVID. Stay compliant and avoid denials with this comprehensive breakdown.',
    date: 'July 21, 2026',
    readTime: '12 min',
    category: 'Regulatory',
    color: 'indigo',
  },
  {
    slug: '/blog/reduce-claim-denials',
    title: 'How to Reduce Claim Denials by 40% — Proven Strategies for 2026',
    excerpt: 'Learn the exact systems top-performing billing teams use to cut denials dramatically and recover more revenue.',
    date: 'July 15, 2026',
    readTime: '11 min',
    category: 'Revenue Cycle',
    color: 'emerald',
  },
  {
    slug: '/blog/em-coding-2026',
    title: 'E/M Coding Changes in 2026: What Billers and Providers Need to Know',
    excerpt: 'New guidelines, time-based billing updates, and documentation requirements that will impact your reimbursement rates.',
    date: 'July 10, 2026',
    readTime: '9 min',
    category: 'Coding Tips',
    color: 'violet',
  },
  {
    slug: '/blog/ai-in-medical-billing',
    title: 'The Role of AI in Modern Medical Billing: Opportunities & Risks',
    excerpt: 'How artificial intelligence is transforming revenue cycle management and what human oversight is still essential.',
    date: 'July 5, 2026',
    readTime: '10 min',
    category: 'Industry Trends',
    color: 'amber',
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <div className="bg-slate-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
            Enhancely Insights
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Expert guidance on medical billing, coding updates, revenue cycle optimization, 
            and career growth for healthcare professionals.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <Link
              key={index}
              href={post.slug}
              className="group bg-white border border-slate-200 hover:border-slate-300 rounded-3xl overflow-hidden transition-all hover:shadow-xl"
            >
              {/* Visual Header */}
              <div className={`h-56 bg-gradient-to-br from-${post.color}-600 to-${post.color}-700 flex items-center justify-center relative`}>
                <div className="text-6xl opacity-20 group-hover:opacity-30 transition-all">
                  {post.category === 'Regulatory' && '📋'}
                  {post.category === 'Revenue Cycle' && '💰'}
                  {post.category === 'Coding Tips' && '🔍'}
                  {post.category === 'Industry Trends' && '🚀'}
                </div>
                <div className="absolute top-6 left-6">
                  <span className={`inline-block px-4 py-1 text-xs font-bold rounded-full bg-white/90 text-${post.color}-700`}>
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="text-xs text-slate-500 mb-3">
                  {post.date} • {post.readTime} read
                </div>

                <h2 className="text-2xl font-bold leading-tight mb-4 group-hover:text-indigo-600 transition-colors line-clamp-3">
                  {post.title}
                </h2>

                <p className="text-slate-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="mt-8 flex items-center text-indigo-600 font-medium text-sm group-hover:gap-2 transition-all">
                  Read Full Article
                  <span className="text-lg leading-none">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter / Stay Updated Section */}
        <div className="mt-20 bg-white border border-slate-200 rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Ahead in Medical Billing</h3>
          <p className="text-slate-600 max-w-md mx-auto mb-8">
            Get monthly insights, coding updates, and revenue optimization tips delivered straight to your inbox.
          </p>

          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Your work email"
              className="flex-1 px-6 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:border-indigo-300"
            />
            <button className="px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl transition">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-4">We respect your inbox. Unsubscribe anytime.</p>
        </div>
      </div>
    </div>
  );
}
