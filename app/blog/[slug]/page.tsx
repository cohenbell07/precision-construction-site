import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import { Calendar, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function generateStaticParams() {
  try {
    const posts = getBlogPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const post = getBlogPost(params.slug);
    if (!post) {
      return {
        title: "Post Not Found",
      };
    }
    return {
      title: post.title,
      description: post.description,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Post Not Found",
    };
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-industrial-black texture-concrete">
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        <Button asChild variant="ghost" className="mb-10 hover:text-gold text-text-secondary">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <article>
          <Card className="card-premium card-beveled border-gold/30 mb-12 p-8">
            <div className="mb-8">
              <div className="flex items-center gap-4 text-sm mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-industrial-slate border border-gold/30 rounded-sm">
                  <Tag className="h-3 w-3 text-gold" />
                  <span className="font-bold text-gold uppercase tracking-wide text-xs">
                    {post.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <Calendar className="h-4 w-4 text-gold" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black mb-6 text-text-primary uppercase tracking-tight leading-tight">
                {post.title}
              </h1>
              {post.description && (
                <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                  {post.description}
                </p>
              )}
            </div>

            <div className="prose prose-lg max-w-none prose-headings:text-text-primary prose-headings:font-display prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-p:text-text-secondary prose-p:leading-relaxed prose-a:text-gold prose-a:font-semibold prose-strong:text-text-primary prose-ul:text-text-secondary prose-li:text-text-secondary">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </Card>

          <div className="mt-16 pt-8 border-t border-gold/20">
            <Button asChild className="btn-premium btn-glow">
              <Link href="/get-quote">Get a Quote for Your Project</Link>
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
}
