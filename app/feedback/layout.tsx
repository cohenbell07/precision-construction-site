import type { Metadata } from "next";

// Per-customer feedback links are private (tokenized) — never index them.
// Pairs with the robots.txt disallow for /feedback/.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function FeedbackLayout({ children }: { children: React.ReactNode }) {
  return children;
}
