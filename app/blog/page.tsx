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

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "Renovation Tips": {
    bg: "rgba(255,255,255,0.05)",
    text: "#E8E8E8",
    border: "rgba(255,255,255,0.1)",
  },
  "Contractor Advice": {
    bg: "rgba(192,192,192,0.08)",
    text: "#E8E8E8",
    border: "rgba(192,192,192,0.2)",
  },
  "Product Guides": {
    bg: "rgba(34,197,94,0.08)",
    text: "#86efac",
    border: "rgba(34,197,94,0.2)",
  },
};

function CategoryBadge({ category }: { category: string }) {
  const colors = categoryColors[category] ?? {
    bg: "rgba(255,255,255,0.06)",
    text: "#B0B0B0",
    border: "rgba(255,255,255,0.1)",
  };
  return (
    <span
      className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
      style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
    >
      {category}
    </span>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      {/* Hero */}
      <section
        className="pt-32 pb-16 relative"
        style={{
          background:
            "linear-gradient(180deg, rgba(16,24,32,0.98) 0%, rgba(0,0,0,1) 100%)",
        }}
      >
        <div className="divider-warm absolute top-0 inset-x-0" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-white/40 text-xs font-semibold uppercase tracking-wider mb-5 block w-fit">
            Precision Construction &amp; Decora Blog
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-none mb-5">
            Built to Last.
            <br />
            <span style={{ color: "#E8E8E8", WebkitTextFillColor: "#E8E8E8" }}>
              Built to Know.
            </span>
          </h1>
          <p className="text-white/40 text-lg sm:text-xl max-w-2xl leading-relaxed">
            Honest renovation guides, contractor advice, and product comparisons from Calgary&apos;s
            most trusted family-owned construction company.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* Featured post */}
          <Link href={`/blog/${featured.slug}`} className="group block">
            <article
              className="p-8 sm:p-10 rounded-2xl border border-white/10 hover:border-primary/35 transition-all duration-300 shadow-[0_4px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(255,255,255,0.04)]"
              style={{
                background: "linear-gradient(135deg, rgba(31,31,31,0.9) 0%, rgba(16,16,16,0.9) 100%)",
              }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <CategoryBadge category={featured.category} />
                <span className="text-white/30 text-xs font-semibold uppercase tracking-wider">
                  Featured
                </span>
              </div>
              <p className="font-display font-black text-2xl sm:text-3xl text-white mb-3 group-hover:text-primary transition-colors duration-200 uppercase tracking-tight leading-snug">
                {featured.title}
              </p>
              <p className="text-white/40 text-base leading-relaxed mb-6 max-w-3xl">
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4 text-white/40 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    {featured.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    {featured.readTime}
                  </span>
                </div>
                <span className="flex items-center gap-1.5 text-primary text-sm font-bold group-hover:gap-2.5 transition-all duration-200 uppercase tracking-wider">
                  Read Article <ArrowRight size={14} />
                </span>
              </div>
            </article>
          </Link>

          {/* Remaining posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article
                  className="h-full p-6 rounded-2xl border border-white/[0.07] hover:border-primary/25 transition-all duration-300 shadow-[0_2px_16px_rgba(0,0,0,0.3)]"
                  style={{ background: "rgba(255,255,255,0.025)" }}
                >
                  <CategoryBadge category={post.category} />
                  <p className="font-display font-black text-lg sm:text-xl text-white mt-4 mb-3 group-hover:text-primary transition-colors duration-200 uppercase tracking-tight leading-snug">
                    {post.title}
                  </p>
                  <p className="text-white/40 text-sm leading-relaxed mb-5 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto flex-wrap gap-2">
                    <div className="flex items-center gap-3 text-white/35 text-xs">
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {post.readTime}
                      </span>
                      <span>{post.date}</span>
                    </div>
                    <span className="text-primary/60 group-hover:text-primary text-sm font-bold transition-colors flex items-center gap-1 uppercase tracking-wider">
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
      <section className="py-20 border-t border-white/5 bg-black">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-white/40 text-xs font-semibold uppercase tracking-wider mb-5 mx-auto block w-fit">Ready to build?</span>
          <p className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight mb-4">
            Stop Reading.{" "}
            <span
              style={{ color: "#E8E8E8", WebkitTextFillColor: "#E8E8E8" }}
            >
              Start Building.
            </span>
          </p>
          <p className="text-white/40 mb-8 text-base leading-relaxed">
            Get a free consultation with Calgary&apos;s most trusted family-owned contractor.
            We&apos;ll give you an honest assessment and a fixed-scope quote — no pressure,
            no surprises.
          </p>
          <Link
            href="/get-quote"
            className="bg-white text-black font-bold hover:bg-white/90 transition-colors rounded-full inline-flex items-center gap-2 px-8 py-4 text-sm rounded-xl"
          >
            Get a Free Quote
            <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </section>
    </>
  );
}
