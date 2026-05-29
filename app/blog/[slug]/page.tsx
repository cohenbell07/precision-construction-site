import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { blogPosts, getBlogPost } from "@/lib/blog";
import { Section } from "@/components/Section";

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
    keywords: [post.category, "Calgary construction blog", "Calgary renovation tips", "PCND blog", "Precision Construction & Decora"],
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

  // Prefer the ISO date for schema; fall back to the display string.
  const publishDate = post.isoDate || post.date;

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
        datePublished: publishDate,
        dateModified: publishDate,
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
      // FAQPage schema for posts with a Q&A block → eligible for FAQ rich results.
      ...(post.faqs && post.faqs.length > 0
        ? [{
            "@type": "FAQPage",
            mainEntity: post.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          }]
        : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ━━━ POST HEADER — DARK ━━━ */}
      <section className="pt-32 pb-12 bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-xs font-bold uppercase tracking-[0.18em] transition-colors mb-8 group">
            <ArrowLeft aria-hidden="true" size={14} className="group-hover:-translate-x-0.5 transition-transform" />
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

          <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-5 text-white/55 text-sm pb-8 border-b border-white/[0.06]">
            <span className="flex items-center gap-1.5">
              <Calendar aria-hidden="true" size={13} />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock aria-hidden="true" size={13} />
              {post.readTime}
            </span>
            <span className="font-semibold text-white/60">Precision Construction &amp; Decora</span>
          </div>
        </div>
      </section>

      {/* ━━━ ARTICLE BODY — CREAM ━━━ */}
      <Section variant="cream" padding="md" containerClassName="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.content }} />
      </Section>

      {/* ━━━ FAQ — CREAM (also emitted as FAQPage schema above) ━━━ */}
      {post.faqs && post.faqs.length > 0 && (
        <Section variant="cream" padding="md" topRule={false} containerClassName="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 cream-rule" />
            <p className="cream-eyebrow text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Frequently Asked</p>
          </div>
          <div className="space-y-3">
            {post.faqs.map((faq) => (
              <details key={faq.question} className="group paper-card rounded-md px-5 py-4">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-ink text-sm font-semibold">
                  {faq.question}
                  <span aria-hidden="true" className="text-sandstone-dark text-lg leading-none transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-ink-muted text-sm leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </Section>
      )}

      {/* ━━━ CTA — CREAM ━━━ */}
      <Section variant="cream" padding="md" topRule={false} containerClassName="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="paper-card rounded-md px-8 sm:px-12 py-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 cream-rule" />
            <p className="cream-eyebrow text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Ready to Act on This?</p>
            <div className="h-px w-8 cream-rule-rtl" />
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight mb-3 text-ink">
            Get a Free Consultation
          </h2>
          <p className="text-ink-muted mb-6 max-w-md mx-auto text-sm leading-relaxed">
            Talk to Calgary&apos;s most trusted family-owned contractor. Honest assessment, fixed-scope quote — no pressure.
          </p>
          <Link href="/get-quote" className="btn-ink px-7 py-3.5">
            Request a Free Quote <ArrowRight aria-hidden="true" className="w-4 h-4" />
          </Link>
        </div>
      </Section>

      {/* ━━━ MORE POSTS — CREAM ━━━ */}
      {otherPosts.length > 0 && (
        <Section variant="cream" padding="md" topRule={false} containerClassName="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-10 cream-rule" />
            <p className="cream-eyebrow text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">More from the Blog</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {otherPosts.map((other) => (
              <Link key={other.slug} href={`/blog/${other.slug}`} className="group block paper-card rounded-md p-5 hover:border-sandstone-dark transition-all duration-300">
                <span className="inline-block text-[9px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full mb-3 bg-bone-soft text-sandstone-muted border border-bone-hairline">
                  {other.category}
                </span>
                <p className="font-heading font-black text-base uppercase tracking-tight text-ink group-hover:text-sandstone-dark transition-colors leading-snug mb-2">
                  {other.title}
                </p>
                <span className="text-sandstone-muted group-hover:text-sandstone-dark text-xs font-bold flex items-center gap-1 transition-colors uppercase tracking-wider">
                  Read <ArrowRight aria-hidden="true" size={11} />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
