import type { Metadata } from "next";
import { Inter, Inter_Tight, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { BRAND_CONFIG } from "@/lib/utils";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND_CONFIG.name} | Premium Construction Services in Calgary`,
    template: `%s | ${BRAND_CONFIG.shortName}`,
  },
  description:
    `${BRAND_CONFIG.motto} - Family-owned Calgary construction company since 1968. Serving Calgary since 1997 with premium residential and commercial construction services. We treat every client like family.`,
  keywords: [
    "construction",
    "renovation",
    "Calgary",
    "flooring",
    "custom showers",
    "cabinets",
    "countertops",
    "carpentry",
    "basement development",
  ],
  authors: [{ name: BRAND_CONFIG.name }],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://precisionconstruction.com",
    siteName: BRAND_CONFIG.shortName,
    title: `${BRAND_CONFIG.name} | ${BRAND_CONFIG.motto}`,
    description: `${BRAND_CONFIG.tagline} - Family-owned and operated. We treat every client like family and deliver only the best.`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Global chunk loading error handler
              (function() {
                if (typeof window === "undefined") return;
                
                // Listen for unhandled chunk loading errors
                window.addEventListener("error", function(event) {
                  var target = event.target;
                  if (target && target.tagName === "SCRIPT" && 
                      (event.message && (event.message.includes("Loading chunk") || 
                       event.message.includes("Failed to fetch dynamically imported module")) ||
                       target.src && target.src.includes("_next/static/chunks"))) {
                    console.warn("Chunk loading error detected, will retry...");
                    setTimeout(function() {
                      if (target.src) {
                        var script = document.createElement("script");
                        script.src = target.src;
                        script.async = true;
                        script.onerror = function() {
                          console.warn("Chunk retry failed, reloading page...");
                          window.location.reload();
                        };
                        document.head.appendChild(script);
                      } else {
                        window.location.reload();
                      }
                    }, 1000);
                  }
                }, true);

                // Handle unhandled promise rejections
                window.addEventListener("unhandledrejection", function(event) {
                  var error = event.reason;
                  if (error && error.message && 
                      (error.message.includes("Loading chunk") || 
                       error.message.includes("ChunkLoadError") || 
                       error.message.includes("Failed to fetch dynamically imported module"))) {
                    console.warn("Chunk loading promise rejection detected, will retry...");
                    event.preventDefault();
                    setTimeout(function() {
                      window.location.reload();
                    }, 1500);
                  }
                });
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${interTight.variable} ${dmSerif.variable} font-sans antialiased bg-black`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}

