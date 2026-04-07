import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { blogPosts, getBlogPost } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Precision Construction & Decora`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
    },
  };
}

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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const colors = categoryColors[post.category] ?? {
    bg: "rgba(255,255,255,0.06)",
    text: "#B0B0B0",
    border: "rgba(255,255,255,0.1)",
  };
  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.pcnd.ca/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: "https://www.pcnd.ca/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `https://www.pcnd.ca/blog/${slug}`,
          },
        ],
      },
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        author: {
          "@type": "Organization",
          name: "Precision Construction & Decora",
        },
        publisher: {
          "@type": "Organization",
          name: "Precision Construction & Decora",
          url: "https://www.pcnd.ca",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://www.pcnd.ca/blog/${slug}`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Post header */}
      <section
        className="pt-32 pb-12 relative"
        style={{
          background:
            "linear-gradient(180deg, rgba(16,24,32,0.98) 0%, rgba(0,0,0,1) 100%)",
        }}
      >
        <div className="divider-warm absolute top-0 inset-x-0" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/45 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors mb-8 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Blog
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
              style={{
                background: colors.bg,
                color: colors.text,
                border: `1px solid ${colors.border}`,
              }}
            >
              {post.category}
            </span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight leading-none mb-6">
            {post.title}
          </h1>

          <p className="text-white/40 text-lg leading-relaxed mb-8">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-5 text-white/40 text-sm pb-8 border-b border-white/8">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {post.readTime}
            </span>
            <span className="font-semibold">Precision Construction &amp; Decora</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="py-12 bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 mx-4 sm:mx-6 lg:mx-auto mb-16 rounded-2xl max-w-3xl">
        <div
          className="px-8 sm:px-12 py-10 text-center rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-white/40 text-xs font-semibold uppercase tracking-wider mb-4 mx-auto block w-fit">Ready to act on this?</span>
          <p className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight mb-3">
            Get a Free Consultation
          </p>
          <p className="text-white/40 mb-6 max-w-md mx-auto text-sm leading-relaxed">
            Talk to Calgary&apos;s most trusted family-owned contractor. We&apos;ll give you an
            honest assessment of your project and a fixed-scope quote — no pressure.
          </p>
          <Link
            href="/get-quote"
            className="bg-white text-black font-bold hover:bg-white/90 transition-colors rounded-full inline-flex items-center gap-2 px-7 py-3.5 text-sm rounded-xl"
          >
            Request a Free Quote
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      {/* More posts */}
      {otherPosts.length > 0 && (
        <section className="pb-24 bg-black">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="font-display font-black text-xl uppercase tracking-tight text-white/80 mb-6">
              More from the Blog
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {otherPosts.map((other) => {
                const c = categoryColors[other.category] ?? {
                  bg: "rgba(255,255,255,0.06)",
                  text: "#B0B0B0",
                  border: "rgba(255,255,255,0.1)",
                };
                return (
                  <Link
                    key={other.slug}
                    href={`/blog/${other.slug}`}
                    className="group block p-5 rounded-xl border border-white/[0.07] hover:border-primary/25 transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.025)" }}
                  >
                    <span
                      className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3"
                      style={{
                        background: c.bg,
                        color: c.text,
                        border: `1px solid ${c.border}`,
                      }}
                    >
                      {other.category}
                    </span>
                    <p className="font-display font-black text-base uppercase tracking-tight text-white group-hover:text-primary transition-colors leading-snug mb-2">
                      {other.title}
                    </p>
                    <span className="text-primary/60 group-hover:text-primary text-xs font-bold flex items-center gap-1 transition-colors uppercase tracking-wider">
                      Read <ArrowRight size={11} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
