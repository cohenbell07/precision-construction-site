import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Tag } from "lucide-react";
import { COMPANY_NAME_SHORT } from "@/lib/utils";
import { BlogPageClient } from "./BlogPageClient";

export const metadata = {
  title: "Blog",
  description: `Construction tips, project showcases, and industry insights from ${COMPANY_NAME_SHORT}.`,
};

export default function BlogPage() {
  const posts = getBlogPosts();
  
  return <BlogPageClient posts={posts} />;
}

