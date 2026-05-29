import { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { blogPosts } from "@/lib/blog";
import { locations } from "@/lib/locations";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pcnd.ca";

// One stable build timestamp reused across entries that don't have their own
// real lastModified — avoids every URL claiming a different "now" per route.
const BUILD_DATE = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/services`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.95 },
    { url: `${BASE_URL}/blog`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/areas-we-serve`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/contact`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/get-quote`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/book-consultation`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/price-beat`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.85 },
    /* Deal variants are now ?deal=… query params on /get-quote, not their
       own routes — no separate sitemap entries needed. */
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/services/${s.id}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const locationRoutes: MetadataRoute.Sitemap = locations.map((loc) => ({
    url: `${BASE_URL}/areas/${loc.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    // Use the post's real publish date when present so lastModified is honest.
    lastModified: post.isoDate ? new Date(post.isoDate) : BUILD_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...locationRoutes, ...blogRoutes];
}
