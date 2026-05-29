import type { Metadata } from "next";

// Defense-in-depth alongside the robots.txt disallow: keep all internal admin
// tooling out of the index even if a URL leaks.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
