import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Calgary Renovation Blog | Tips & Guides | PCND",
  description:
    "Expert Calgary renovation tips, contractor advice & product guides. Trusted insights from a 3rd-generation family-owned Calgary construction company since 1968.",
  openGraph: {
    title: "Calgary Renovation Blog | Tips & Guides | PCND",
    description:
      "Expert Calgary renovation tips, contractor advice, and product guides for homeowners.",
  },
};

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-block text-[9px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full bg-white/[0.05] text-white/50 border border-white/[0.08]">
      {category}
    </span>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-black relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-5">
            Precision Construction &amp; Decora Blog
          </p>
          <h1 className="font-hero uppercase tracking-wide text-5xl sm:text-6xl lg:text-7xl leading-[0.95] mb-5 hero-heading-shimmer">
            Built to Last.<br />Built to Know.
          </h1>
          <p className="text-white/40 text-base sm:text-lg max-w-2xl leading-relaxed">
            Honest renovation guides, contractor advice, and product comparisons from Calgary&apos;s
            most trusted family-owned construction company.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* Featured post */}
          <Link href={`/blog/${featured.slug}`} className="group block">
            <article className="p-8 sm:p-10 rounded-2xl border border-white/[0.06] hover:border-sandstone/20 transition-all duration-300 bg-white/[0.02]">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <CategoryBadge category={featured.category} />
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-sandstone/40 bg-sandstone/[0.06] px-2.5 py-0.5 rounded-full">
                  Featured
                </span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white mb-3 group-hover:text-white/80 transition-colors duration-200 uppercase tracking-tight leading-snug">
                {featured.title}
              </h2>
              <p className="text-white/35 text-base leading-relaxed mb-6 max-w-3xl">
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4 text-white/30 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    {featured.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    {featured.readTime}
                  </span>
                </div>
                <span className="flex items-center gap-1.5 text-sandstone/60 group-hover:text-sandstone text-sm font-bold group-hover:gap-2.5 transition-all duration-200 uppercase tracking-wider">
                  Read Article <ArrowRight size={14} />
                </span>
              </div>
            </article>
          </Link>

          {/* Remaining posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article className="h-full p-6 rounded-2xl border border-white/[0.06] hover:border-sandstone/20 transition-all duration-300 bg-white/[0.02]">
                  <CategoryBadge category={post.category} />
                  <h2 className="font-heading font-black text-lg sm:text-xl text-white mt-4 mb-3 group-hover:text-white/80 transition-colors duration-200 uppercase tracking-tight leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-white/35 text-sm leading-relaxed mb-5 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto flex-wrap gap-2">
                    <div className="flex items-center gap-3 text-white/25 text-xs">
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {post.readTime}
                      </span>
                      <span>{post.date}</span>
                    </div>
                    <span className="text-sandstone/40 group-hover:text-sandstone/70 text-sm font-bold transition-colors flex items-center gap-1 uppercase tracking-wider">
                      Read <ArrowRight size={13} />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 sm:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(196, 181, 160, 0.05) 0%, transparent 70%)" }} />
        </div>
        <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/25 font-medium mb-5">Ready to Build?</p>
          <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-[0.9] mb-4">
            Stop Reading.<br />Start Building.
          </h2>
          <p className="text-white/30 mb-10 text-base leading-relaxed max-w-md mx-auto">
            Get a free consultation with Calgary&apos;s most trusted family-owned contractor.
            No pressure, no surprises.
          </p>
          <Link
            href="/get-quote"
            className="group inline-flex items-center gap-3 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-white/90 transition-colors"
          >
            Get a Free Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
