import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Brand palette - DO NOT CHANGE
        industrial: {
          black: "#101820", // Brand Black
          slate: "#1F1F1F", // Charcoal
          surface: "#2E2E2E",
          concrete: "#B0B0B0",
        },
        silver: {
          DEFAULT: "#E8E8E8", // Bright silver (top of gradient)
          light: "#F5F5F5",   // Near white
          medium: "#C0C0C0",  // Mid-tone silver
          dark: "#A0A0A0",    // Darker silver (bottom of gradient)
          muted: "#808080",   // Muted silver
          glow: "rgba(232, 232, 232, 0.4)",
        },
        charcoal: {
          DEFAULT: "#2F2F2F", // Dark charcoal gray (like favicon background)
          light: "#3A3A3A",
          dark: "#1F1F1F",
        },
        steel: {
          DEFAULT: "#4A4A4A",
          light: "#6A6A6A",
          dark: "#2A2A2A",
        },
        /* "Drawn in steel" redesign (2026-07): `sandstone` is a LEGACY NAME —
           it now maps to the cool steel-silver accent so all 360+ existing
           class usages re-skin without touching every file. Do not add warm
           values back here. */
        sandstone: {
          DEFAULT: "#A9B2BF", // steel silver — the one accent
          light: "#C9D0DA",
          dark: "#8A94A4",
          muted: "#6A7382",
          glow: "rgba(169, 178, 191, 0.3)",
        },
        /* `bone` (legacy name) = the light "gallery" pole — polished concrete,
           cool greys. Replaces the warm cream canvas. */
        bone: {
          DEFAULT: "#EEF0F2", // section background — gallery grey
          soft: "#E4E7EA",    // section break / nested surface
          paper: "#F8F9FA",   // elevated card surface
          hairline: "#D4D8DD",// 1px borders on gallery
        },
        ink: {
          DEFAULT: "#14161A", // body text on gallery
          muted: "#565C66",   // secondary text on gallery
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#F5F5F5", // Off-white
          muted: "#B0B0B0",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        /* "Drawn in steel" system — Archivo variable (width axis) everywhere,
           IBM Plex Mono as the drafting-annotation voice. Width per role is set
           via font-stretch rules in globals.css (.font-hero/.font-heading).
           NOTE: `serif` deliberately maps to the mono — the 50+ legacy
           `font-serif italic` editorial lines across the site now read as
           technical annotations, which is the redesign's voice. */
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        heading: ["var(--font-archivo)", "system-ui", "sans-serif"],
        hero: ["var(--font-archivo)", "system-ui", "sans-serif"],
        serif: ["var(--font-mono)", "ui-monospace", "monospace"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out",
        "fade-in-up": "fadeInUp 0.8s ease-out",
        "shimmer": "shimmer 3s linear infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite alternate",
        "gradient-shift": "gradientShift 8s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glowPulse: {
          "0%": { boxShadow: "0 0 10px rgba(18, 247, 214, 0.3), 0 0 20px rgba(18, 247, 214, 0.2)" },
          "100%": { boxShadow: "0 0 20px rgba(18, 247, 214, 0.6), 0 0 40px rgba(18, 247, 214, 0.4)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

