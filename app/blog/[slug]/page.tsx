import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { blogPosts, getBlogPost } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";
const DEFAULT_OG_IMAGE = `${SITE_URL}/servicehero.webp`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${slug}`;
  return {
    title: `${post.title} | Precision Construction & Decora`,
    description: post.excerpt,
    keywords: [
      post.category,
      "Calgary construction blog",
      "Calgary renovation tips",
      "PCND blog",
      "Precision Construction & Decora",
    ],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.date,
      authors: ["Precision Construction & Decora"],
      tags: [post.category],
      images: [{ url: DEFAULT_OG_IMAGE, width: 1536, height: 838, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pcnd.ca/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.pcnd.ca/blog" },
          { "@type": "ListItem", position: 3, name: post.title, item: `https://www.pcnd.ca/blog/${slug}` },
        ],
      },
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        image: [DEFAULT_OG_IMAGE],
        articleSection: post.category,
        author: { "@type": "Organization", name: "Precision Construction & Decora", url: "https://www.pcnd.ca" },
        publisher: {
          "@type": "Organization",
          name: "Precision Construction & Decora",
          url: "https://www.pcnd.ca",
          logo: { "@type": "ImageObject", url: "https://www.pcnd.ca/android-chrome-512x512.png" },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.pcnd.ca/blog/${slug}` },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Post header */}
      <section className="pt-32 pb-12 bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/35 hover:text-white text-xs font-bold uppercase tracking-[0.18em] transition-colors mb-8 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Blog
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-block text-[9px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full bg-white/[0.05] text-white/50 border border-white/[0.08]">
              {post.category}
            </span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight leading-[0.95] mb-6">
            {post.title}
          </h1>

          <p className="text-white/40 text-base sm:text-lg leading-relaxed mb-8">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-5 text-white/30 text-sm pb-8 border-b border-white/[0.06]">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {post.readTime}
            </span>
            <span className="font-semibold text-white/40">Precision Construction &amp; Decora</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="py-12 bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 mx-4 sm:mx-6 lg:mx-auto mb-16 max-w-3xl">
        <div className="px-8 sm:px-12 py-10 text-center rounded-2xl bg-white/[0.02] border border-white/[0.06]">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-white/25 font-medium mb-4">Ready to act on this?</p>
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight mb-3">
            Get a Free Consultation
          </h2>
          <p className="text-white/35 mb-6 max-w-md mx-auto text-sm leading-relaxed">
            Talk to Calgary&apos;s most trusted family-owned contractor. Honest assessment, fixed-scope quote — no pressure.
          </p>
          <Link
            href="/get-quote"
            className="group inline-flex items-center gap-3 bg-white text-black px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-white/90 transition-colors"
          >
            Request a Free Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* More posts */}
      {otherPosts.length > 0 && (
        <section className="pb-24 bg-black">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="font-heading font-black text-xl uppercase tracking-tight text-white/60 mb-6">
              More from the Blog
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {otherPosts.map((other) => (
                <Link
                  key={other.slug}
                  href={`/blog/${other.slug}`}
                  className="group block p-5 rounded-xl border border-white/[0.06] hover:border-sandstone/20 transition-all duration-300 bg-white/[0.02]"
                >
                  <span className="inline-block text-[9px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full mb-3 bg-white/[0.05] text-white/50 border border-white/[0.08]">
                    {other.category}
                  </span>
                  <p className="font-heading font-black text-base uppercase tracking-tight text-white group-hover:text-white/70 transition-colors leading-snug mb-2">
                    {other.title}
                  </p>
                  <span className="text-sandstone/40 group-hover:text-sandstone/70 text-xs font-bold flex items-center gap-1 transition-colors uppercase tracking-wider">
                    Read <ArrowRight size={11} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
