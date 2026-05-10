"use client";

/**
 * Contact page — Showroom + Studio canvas.
 * Hero stays dark (image-led drama). Form + info cards flip to cream — this
 * is a friction-reducer zone where bone paper reads as "let's have a
 * conversation," not "fill out my dark sales form."
 */

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { BRAND_CONFIG } from "@/lib/utils";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Image from "next/image";
import { Section } from "@/components/Section";

const FIELD_CLASS = "bg-bone-paper border-bone-hairline focus:border-sandstone-dark focus:ring-1 focus:ring-sandstone-dark/20 text-ink placeholder:text-ink-muted/60 rounded-md h-11 transition-colors";
const TEXTAREA_CLASS = "bg-bone-paper border-bone-hairline focus:border-sandstone-dark focus:ring-1 focus:ring-sandstone-dark/20 text-ink placeholder:text-ink-muted/60 rounded-md transition-colors resize-none";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectType: formData.projectType,
          message: formData.message,
          source: "contact_page",
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({ name: "", email: "", phone: "", projectType: "", message: "" });
      } else {
        toast({
          title: "Something went wrong",
          description: data.error || "Please try again or contact us directly.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">

      {/* ━━━ HERO — DARK ━━━ */}
      <section className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] min-h-[420px] max-h-[680px] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Image src="/6d86ce69-0210-48e9-ab64-8f0745d631d4.webp" alt="Contact Precision Construction & Decora" fill priority className="object-cover" quality={85} sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/95" />
          <div className="absolute inset-0 pointer-events-none opacity-55" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(196,181,160,0.15) 0%, rgba(0,0,0,0) 55%)" }} />
          <span className="pointer-events-none absolute top-6 left-6 w-5 h-5 border-t border-l border-sandstone/50" />
          <span className="pointer-events-none absolute top-6 right-6 w-5 h-5 border-t border-r border-sandstone/50" />
          <span className="pointer-events-none absolute bottom-6 left-6 w-5 h-5 border-b border-l border-sandstone/50" />
          <span className="pointer-events-none absolute bottom-6 right-6 w-5 h-5 border-b border-r border-sandstone/50" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="text-center">
            <div className="flex justify-center mb-5">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sandstone/30 bg-sandstone/10 text-sandstone text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-sandstone animate-pulse inline-block" />
                Calgary&apos;s Family Builder · Since 1968
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-hero mb-5 text-white uppercase tracking-wide leading-[0.9]">Let&apos;s Talk</h1>
            <div className="h-[1.5px] w-16 bg-gradient-to-r from-sandstone via-sandstone/60 to-transparent mx-auto mb-5" />
            <p className="text-base sm:text-lg text-white/75 max-w-xl mx-auto leading-relaxed mb-7 px-2">
              Tell us about your project. We&apos;ll reply within 24 hours with honest answers — not a sales pitch.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a href={`tel:${BRAND_CONFIG.contact.phone}`} className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold text-sm tracking-wide hover:bg-sandstone transition-colors">
                <Phone className="w-3.5 h-3.5" /> {BRAND_CONFIG.contact.phoneFormatted}
              </a>
              <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="inline-flex items-center gap-2 text-white/80 hover:text-white px-5 py-3 text-sm tracking-wide transition-colors border border-white/20 rounded-full hover:border-sandstone/60 backdrop-blur-sm">
                <Mail className="w-3.5 h-3.5" /> Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ FORM + INFO — CREAM ━━━ */}
      <Section variant="cream" padding="lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">

          {/* Form */}
          <div className="paper-card rounded-md">
            <div className="p-6 sm:p-8 md:p-10">
              <div className="mb-7 sm:mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-8 cream-rule" />
                  <p className="cream-eyebrow text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">Get in Touch</p>
                </div>
                <h2 className="text-2xl sm:text-3xl font-heading font-black text-ink uppercase tracking-tight">Send a Message</h2>
                <p className="font-serif italic text-ink-muted text-base sm:text-lg mt-3 leading-snug">
                  Tell us what you&apos;re thinking — we&apos;ll take it from there.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">
                      Name <span className="text-ink">*</span>
                    </label>
                    <Input id="name" required autoComplete="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" className={FIELD_CLASS} />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">
                      Email <span className="text-ink">*</span>
                    </label>
                    <Input id="email" type="email" inputMode="email" autoComplete="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" className={FIELD_CLASS} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">Phone</label>
                    <Input id="phone" type="tel" inputMode="tel" autoComplete="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="Your phone number" className={FIELD_CLASS} />
                  </div>
                  <div>
                    <label htmlFor="projectType" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">Project Type</label>
                    <Input id="projectType" value={formData.projectType} onChange={(e) => setFormData({ ...formData, projectType: e.target.value })} placeholder="e.g., Flooring, Cabinets…" className={FIELD_CLASS} />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">
                    Message <span className="text-ink">*</span>
                  </label>
                  <Textarea id="message" required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about your project — scope, timeline, budget, anything relevant…" rows={6} className={TEXTAREA_CLASS} />
                </div>
                <button type="submit" disabled={loading} className="btn-ink w-full py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? "Sending…" : (<><Send className="h-4 w-4" /> Send Message</>)}
                </button>
                <p className="text-center text-xs text-ink-muted">We respond within 24 hours — usually much sooner.</p>
              </form>
            </div>
          </div>

          {/* Info + Service Areas */}
          <div className="space-y-6">

            <div className="paper-card rounded-md">
              <div className="p-6 sm:p-8">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-px w-8 cream-rule" />
                    <p className="cream-eyebrow text-[10px] tracking-[0.3em] uppercase font-medium">Reach Us</p>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-heading font-black text-ink uppercase tracking-tight">Contact Information</h2>
                </div>
                <div className="space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-md bg-bone-soft border border-bone-hairline flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-sandstone-dark" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-sandstone-muted uppercase tracking-[0.2em] mb-0.5">Address</p>
                      <p className="text-ink text-sm font-medium">{BRAND_CONFIG.contact.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-md bg-bone-soft border border-bone-hairline flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-sandstone-dark" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-sandstone-muted uppercase tracking-[0.2em] mb-0.5">Phone</p>
                      <a href={`tel:${BRAND_CONFIG.contact.phone}`} className="text-ink font-black text-base hover:text-sandstone-dark transition-colors">
                        {BRAND_CONFIG.contact.phoneFormatted}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-md bg-bone-soft border border-bone-hairline flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-sandstone-dark" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-sandstone-muted uppercase tracking-[0.2em] mb-0.5">Email</p>
                      <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="text-ink-muted hover:text-ink transition-colors text-sm font-medium break-all">
                        {BRAND_CONFIG.contact.email}
                      </a>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-bone-hairline">
                    <p className="text-xs text-ink-muted leading-relaxed">
                      <span className="text-ink font-bold">Owner:</span> {BRAND_CONFIG.owner} · {BRAND_CONFIG.contact.cta}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="paper-card rounded-md">
              <div className="p-6 sm:p-8">
                <div className="mb-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-px w-8 cream-rule" />
                    <p className="cream-eyebrow text-[10px] tracking-[0.3em] uppercase font-medium">Where We Work</p>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-heading font-black text-ink uppercase tracking-tight">Service Areas</h2>
                </div>
                <p className="text-ink-muted text-sm mb-5 leading-relaxed">
                  We proudly serve Calgary and surrounding communities:
                </p>
                <ul className="grid grid-cols-2 gap-2">
                  {["Calgary (All Quadrants)", "Airdrie", "Cochrane", "Okotoks", "Chestermere", "And more!"].map((area) => (
                    <li key={area} className="flex items-center gap-2.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-bone-soft border border-bone-hairline flex items-center justify-center shrink-0">
                        <span className="w-1 h-1 rounded-full bg-sandstone-dark block" />
                      </span>
                      <span className="text-ink text-sm">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

    </div>
  );
}
