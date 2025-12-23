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
    <div className="container mx-auto px-4 py-20 max-w-7xl bg-industrial-black texture-concrete min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-black mb-6 text-text-primary uppercase tracking-tight">Our Blog</h1>
        <div className="inline-block mb-6">
          <div className="h-1 w-24 bg-gold mx-auto mb-4"></div>
        </div>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
          Construction tips, project showcases, and industry insights to help you plan your next
          project.
        </p>
      </motion.div>

      {posts.length === 0 ? (
        <div className="text-center py-16">
          <Card className="card-premium card-beveled border-gold/30 max-w-2xl mx-auto rounded-2xl">
            <CardContent className="p-12">
              <p className="text-lg text-text-secondary mb-4">No blog posts yet.</p>
              <p className="text-text-secondary">
                Check back soon for construction tips and project showcases!
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className="card-premium card-beveled border-gold/20 h-full overflow-hidden group cursor-pointer rounded-2xl hover:scale-[1.02] transition-transform duration-300">
                {/* Thumbnail Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-industrial-slate to-industrial-black">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Tag className="h-16 w-16 text-gold/30" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-300"></div>
                  {/* Category Tag Overlay */}
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-industrial-black text-gold px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wide border border-gold/30 shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-display font-black text-gold mb-3 uppercase tracking-tight group-hover:text-gold-light transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-text-secondary leading-relaxed text-base">{post.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-2 text-sm text-text-secondary mb-6">
                    <Calendar className="h-4 w-4 text-gold" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <Button asChild className="w-full btn-premium btn-glow rounded-2xl">
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
