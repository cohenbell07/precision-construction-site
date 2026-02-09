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
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-4xl">
        <Button asChild variant="ghost" className="mb-6 sm:mb-8 md:mb-10 hover:text-silver text-text-secondary text-sm sm:text-base">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Back to Blog
          </Link>
        </Button>

        <article>
          <Card className="card-premium card-beveled border-silver/30 mb-8 sm:mb-10 md:mb-12 p-4 sm:p-6 md:p-8">
            <div className="mb-6 sm:mb-7 md:mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 text-xs sm:text-sm mb-4 sm:mb-5 md:mb-6">
                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-0.5 sm:py-1 bg-industrial-slate border border-silver/30 rounded-sm">
                  <Tag className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-silver" />
                  <span className="font-bold text-silver uppercase tracking-wide text-xs">
                    {post.category}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-text-secondary">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-silver" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-black mb-4 sm:mb-5 md:mb-6 text-text-primary uppercase tracking-tight leading-tight">
                {post.title}
              </h1>
              {post.description && (
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-text-secondary mb-6 sm:mb-7 md:mb-8 leading-relaxed">
                  {post.description}
                </p>
              )}
            </div>

            <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none prose-headings:text-text-primary prose-headings:font-display prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-p:text-text-secondary prose-p:leading-relaxed prose-a:text-silver prose-a:font-semibold prose-strong:text-text-primary prose-ul:text-text-secondary prose-li:text-text-secondary">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </Card>

          <div className="mt-8 sm:mt-12 md:mt-16 pt-6 sm:pt-7 md:pt-8 border-t border-silver/20">
            <Button asChild className="btn-premium btn-glow w-full sm:w-auto text-sm sm:text-base px-4 py-2.5 sm:px-6 sm:py-3">
              <Link href="/get-quote">Get a Quote for Your Project</Link>
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
}
