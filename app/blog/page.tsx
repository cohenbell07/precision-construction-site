import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { blogPosts } from "@/lib/blog";
import { Section } from "@/components/Section";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

export const metadata: Metadata = {
  title: "Calgary Renovation Blog | Tips & Guides | PCND",
  description:
    "Expert Calgary renovation tips, contractor advice & product guides. Trusted insights from a 3rd-generation family-owned Calgary construction company since 1968.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blog`,
    title: "Calgary Renovation Blog | Tips & Guides | PCND",
    description:
      "Expert Calgary renovation tips, contractor advice, and product guides for homeowners.",
    images: [{ url: `${SITE_URL}/servicehero.webp`, width: 1536, height: 838, alt: "PCND Calgary renovation blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calgary Renovation Blog | Tips & Guides | PCND",
    description: "Expert Calgary renovation tips, contractor advice, and product guides.",
    images: [`${SITE_URL}/servicehero.webp`],
  },
};

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-block text-[9px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full bg-bone-soft text-sandstone-muted border border-bone-hairline">
      {category}
    </span>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      {/* ━━━ HERO — DARK ━━━ */}
      <section className="pt-32 pb-16 bg-black relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] sm:text-xs font-mono tracking-[0.22em] uppercase text-white/55 font-medium mb-5">
            Precision Construction &amp; Decora Blog
          </p>
          <h1 className="font-hero uppercase tracking-wide text-5xl sm:text-6xl lg:text-7xl leading-[0.95] mb-5 hero-heading-shimmer">
            Built to Last.<br />Built to Know.
          </h1>
          <p className="text-white/60 text-base sm:text-lg max-w-2xl leading-relaxed">
            Honest renovation guides, contractor advice, and product comparisons from Calgary&apos;s
            most trusted family-owned construction company.
          </p>
        </div>
      </section>

      {/* ━━━ POSTS — CREAM ━━━ */}
      <Section variant="cream" containerClassName="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">

          {/* Featured post */}
          <Link href={`/blog/${featured.slug}`} className="group block">
            <article className="paper-card rounded-md p-8 sm:p-10 hover:border-sandstone-dark transition-all duration-300">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <CategoryBadge category={featured.category} />
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-sandstone-dark bg-bone-soft px-2.5 py-0.5 rounded-full border border-sandstone-dark/40">
                  Featured
                </span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-ink mb-3 group-hover:text-sandstone-dark transition-colors duration-200 uppercase tracking-tight leading-snug">
                {featured.title}
              </h2>
              <p className="font-serif italic text-ink text-lg sm:text-xl leading-snug mb-3 max-w-3xl">
                {featured.excerpt.split(".")[0]}.
              </p>
              <p className="text-ink-muted text-base leading-relaxed mb-6 max-w-3xl">
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4 text-sandstone-muted text-sm">
                  <span className="flex items-center gap-1.5">
                    <Calendar aria-hidden="true" size={13} />
                    {featured.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock aria-hidden="true" size={13} />
                    {featured.readTime}
                  </span>
                </div>
                <span className="flex items-center gap-1.5 text-ink group-hover:text-sandstone-dark text-sm font-bold group-hover:gap-2.5 transition-all duration-200 uppercase tracking-wider">
                  Read Article <ArrowRight aria-hidden="true" size={14} />
                </span>
              </div>
            </article>
          </Link>

          {/* Remaining posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article className="paper-card rounded-md h-full p-6 hover:border-sandstone-dark transition-all duration-300">
                  <CategoryBadge category={post.category} />
                  <h2 className="font-heading font-black text-lg sm:text-xl text-ink mt-4 mb-3 group-hover:text-sandstone-dark transition-colors duration-200 uppercase tracking-tight leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-ink-muted text-sm leading-relaxed mb-5 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto flex-wrap gap-2">
                    <div className="flex items-center gap-3 text-sandstone-muted text-xs">
                      <span className="flex items-center gap-1">
                        <Clock aria-hidden="true" size={11} />
                        {post.readTime}
                      </span>
                      <span>{post.date}</span>
                    </div>
                    <span className="text-ink group-hover:text-sandstone-dark text-sm font-bold transition-colors flex items-center gap-1 uppercase tracking-wider">
                      Read <ArrowRight aria-hidden="true" size={13} />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* ━━━ BOTTOM CTA — DARK ━━━ */}
      <section className="py-24 sm:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(169, 178, 191, 0.05) 0%, transparent 70%)" }} />
        </div>
        <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
          <p className="text-[10px] sm:text-xs font-mono tracking-[0.22em] uppercase text-white/55 font-medium mb-5">Ready to Build?</p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-[0.9] mb-4">
            Stop Reading.<br />Start Building.
          </h2>
          <p className="text-white/55 mb-10 text-base leading-relaxed max-w-md mx-auto">
            Get a free consultation with Calgary&apos;s most trusted family-owned contractor.
            No pressure, no surprises.
          </p>
          <Link href="/get-quote" className="group inline-flex items-center gap-3 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-white/90 transition-colors">
            Get a Free Quote <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
