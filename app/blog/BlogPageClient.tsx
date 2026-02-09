"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Tag } from "lucide-react";
import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/blog";
import Image from "next/image";

interface BlogPageClientProps {
  posts: BlogPost[];
}

export function BlogPageClient({ posts }: BlogPageClientProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-7xl bg-industrial-black texture-concrete min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 sm:mb-12 md:mb-16"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-black mb-4 sm:mb-5 md:mb-6 text-text-primary uppercase tracking-tight px-2">Our Blog</h1>
        <div className="inline-block mb-4 sm:mb-5 md:mb-6">
          <div className="h-1 w-20 sm:w-24 bg-silver mx-auto mb-3 sm:mb-4"></div>
        </div>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed px-2">
          Construction tips, project showcases, and industry insights to help you plan your next
          project.
        </p>
      </motion.div>

      {posts.length === 0 ? (
        <div className="text-center py-12 sm:py-16">
          <Card className="card-premium card-beveled border-silver/30 max-w-2xl mx-auto rounded-xl sm:rounded-2xl">
            <CardContent className="p-6 sm:p-8 md:p-10 lg:p-12">
              <p className="text-base sm:text-lg text-text-secondary mb-3 sm:mb-4">No blog posts yet.</p>
              <p className="text-sm sm:text-base text-text-secondary">
                Check back soon for construction tips and project showcases!
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.35 }}
              layout={false}
            >
              <Card className="card-premium card-beveled border-silver/20 h-full overflow-hidden group cursor-pointer rounded-xl sm:rounded-2xl hover:scale-[1.02] transition-transform duration-300">
                {/* Thumbnail Image */}
                <div className="relative h-40 sm:h-44 md:h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-silver/20 via-industrial-slate to-industrial-black">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Tag className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 text-silver/30" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-silver/0 group-hover:bg-silver/5 transition-colors duration-300"></div>
                  {/* Category Tag Overlay */}
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
                    <span className="bg-industrial-black text-silver px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg sm:rounded-xl text-xs font-bold uppercase tracking-wide border border-silver/30 shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
                  <CardTitle className="text-xl sm:text-2xl font-display font-black text-silver mb-2 sm:mb-3 uppercase tracking-tight group-hover:text-silver-light transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-text-secondary leading-relaxed text-sm sm:text-base">{post.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 px-4 sm:px-6 pb-4 sm:pb-6">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary mb-4 sm:mb-5 md:mb-6">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-silver" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <Button asChild className="w-full btn-premium btn-glow rounded-xl sm:rounded-2xl text-xs sm:text-sm md:text-base py-2 sm:py-2.5 md:py-3">
                    <Link href={`/blog/${post.slug}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
