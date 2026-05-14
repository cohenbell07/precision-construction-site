"use client";

/**
 * PriceBeatForm — the upload form for the /price-beat page.
 *
 * Posts multipart/form-data to /api/products/price-beat (inquiryType:
 * "service"). The competitor quote file rides along with the submit as an
 * attachment — it is NOT pre-uploaded to storage like the quote-form photos;
 * the API emails it straight to the team and records the lead.
 *
 * The quote file is required — a price beat needs something to beat. Allowed:
 * PDF / JPG / PNG / DOC / DOCX, max 10 MB (Resend attachment ceiling).
 */

import { useRef, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { services } from "@/lib/services";
import { BRAND_CONFIG } from "@/lib/utils";
import { CheckCircle, Loader2, Upload, FileText, X, Phone, ArrowRight } from "lucide-react";

const FIELD_CLASS =
  "bg-bone-paper border-bone-hairline focus:border-sandstone-dark focus:ring-1 focus:ring-sandstone-dark/20 text-ink placeholder:text-ink-muted/60 rounded-md h-11 transition-colors";
const SELECT_CLASS =
  "w-full px-3 h-11 rounded-md border bg-bone-paper border-bone-hairline focus:border-sandstone-dark focus:outline-none text-ink text-base sm:text-sm transition-colors appearance-none";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB — matches the API ceiling
const ALLOWED_EXT = ["pdf", "jpg", "jpeg", "png", "doc", "docx"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = Partial<Record<"name" | "email" | "file", string>>;

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function PriceBeatForm() {
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    note: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const setField = (k: keyof typeof form, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k as keyof FieldErrors]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const acceptFile = (f: File | undefined | null) => {
    if (!f) return;
    const ext = (f.name.split(".").pop() ?? "").toLowerCase();
    if (!ALLOWED_EXT.includes(ext)) {
      setErrors((e) => ({ ...e, file: "Use a PDF, JPG, PNG, DOC, or DOCX file." }));
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      setErrors((e) => ({ ...e, file: "That file is over 10 MB — try a smaller export or a photo." }));
      return;
    }
    setFile(f);
    setErrors((e) => ({ ...e, file: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: FieldErrors = {};
    if (!form.name.trim()) errs.name = "Please enter your name.";
    const email = form.email.trim();
    if (!email) errs.email = "Please enter your email.";
    else if (!EMAIL_RE.test(email)) errs.email = "That email doesn't look right.";
    if (!file) errs.file = "Attach the competitor quote you'd like us to beat.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(first === "file" ? "price-beat-file" : first)?.focus();
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name.trim());
      fd.append("email", email);
      fd.append("phone", form.phone.trim());
      fd.append("note", form.note.trim());
      fd.append("inquiryType", "service");
      fd.append("productType", form.serviceType || "General");
      if (file) fd.append("quoteFile", file);

      const res = await fetch("/api/products/price-beat", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        toast({
          title: "Something went wrong",
          description: data.error || "Please try again or call us directly.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Price beat submit error:", err);
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="paper-card rounded-md p-8 sm:p-10 md:p-12 text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-sandstone/15 border border-sandstone-dark/30 flex items-center justify-center mb-6">
          <CheckCircle aria-hidden="true" className="w-7 h-7 text-sandstone-dark" />
        </div>
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-px w-8 bg-sandstone-dark/40" aria-hidden="true" />
          <p className="cream-eyebrow text-[10px] tracking-[0.3em] uppercase font-medium">Quote Received</p>
          <span className="h-px w-8 bg-sandstone-dark/40" aria-hidden="true" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-ink mb-4 leading-tight">
          {form.name.split(" ")[0]}, we&apos;re on it.
        </h2>
        <p className="font-serif italic text-ink text-lg sm:text-xl leading-snug max-w-md mx-auto mb-3">
          We&apos;ll review your quote and come back within 24 hours.
        </p>
        <p className="text-ink-muted text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-8">
          If it meets the terms below, our price comes in at least 5% under it — in writing. A confirmation is on its way to <strong>{form.email}</strong>.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
          <a
            href={`tel:${BRAND_CONFIG.contact.phone}`}
            className="inline-flex items-center justify-center gap-2 bg-ink text-bone px-7 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-ink/90 transition-colors"
          >
            <Phone aria-hidden="true" className="w-4 h-4" /> Call {BRAND_CONFIG.contact.phoneFormatted}
          </a>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 text-ink-muted hover:text-ink px-5 py-3.5 text-sm tracking-wide transition-colors border border-bone-hairline rounded-full hover:border-sandstone-dark"
          >
            Back to home →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="paper-card rounded-md">
      <div className="p-6 sm:p-8 md:p-10">
        <div className="mb-7 sm:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 cream-rule" />
            <p className="cream-eyebrow text-[10px] tracking-[0.3em] uppercase font-medium">Send Us the Quote</p>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-black text-ink uppercase tracking-tight">
            Submit Your Competitor Quote
          </h2>
          <p className="font-serif italic text-ink-muted mt-3 text-base">
            Upload it below — we&apos;ll review and come back within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">
                Name <span aria-hidden="true" className="text-ink">*</span>
              </label>
              <Input
                id="name"
                required
                aria-required="true"
                autoComplete="name"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="Your name"
                className={FIELD_CLASS}
              />
              {errors.name && <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-700">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">
                Email <span aria-hidden="true" className="text-ink">*</span>
              </label>
              <Input
                id="email"
                type="email"
                inputMode="email"
                required
                aria-required="true"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                placeholder="your@email.com"
                className={FIELD_CLASS}
              />
              {errors.email && <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-700">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="phone" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">Phone</label>
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => setField("phone", e.target.value)}
                placeholder="Your phone number"
                className={FIELD_CLASS}
              />
            </div>
            <div>
              <label htmlFor="serviceType" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">
                Service
              </label>
              <select
                id="serviceType"
                value={form.serviceType}
                onChange={(e) => setField("serviceType", e.target.value)}
                className={SELECT_CLASS}
              >
                <option value="">Select a service (optional)</option>
                {services.map((s) => (
                  <option key={s.id} value={s.title}>{s.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Competitor quote file — required. */}
          <div>
            <label htmlFor="price-beat-file" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">
              Competitor Quote <span aria-hidden="true" className="text-ink">*</span>
            </label>
            {file ? (
              <div className="flex items-center justify-between gap-3 rounded-md border border-sandstone-dark bg-bone-soft p-3.5">
                <span className="flex items-center gap-2.5 min-w-0">
                  <FileText aria-hidden="true" className="w-4 h-4 text-sandstone-dark shrink-0" />
                  <span className="text-sm text-ink font-medium truncate">{file.name}</span>
                  <span className="text-[11px] text-ink-muted shrink-0">{formatBytes(file.size)}</span>
                </span>
                <button
                  type="button"
                  onClick={() => { setFile(null); if (fileRef.current) fileRef.current.value = ""; }}
                  aria-label="Remove file"
                  className="w-7 h-7 rounded-full bg-ink/10 hover:bg-ink/20 text-ink flex items-center justify-center transition-colors shrink-0"
                >
                  <X aria-hidden="true" className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  acceptFile(e.dataTransfer.files?.[0]);
                }}
                aria-describedby={errors.file ? "file-error" : "file-help"}
                className={`w-full flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed py-7 px-4 transition-colors ${
                  dragging
                    ? "border-sandstone-dark bg-bone-soft text-ink"
                    : "border-bone-hairline hover:border-sandstone-dark hover:bg-bone-soft text-ink-muted hover:text-ink"
                }`}
              >
                <Upload aria-hidden="true" className="w-5 h-5" />
                <span className="text-sm font-semibold">Drop your quote here, or tap to browse</span>
                <span id="file-help" className="text-[11px] text-ink-muted">PDF, JPG, PNG, DOC or DOCX — up to 10 MB</span>
              </button>
            )}
            <input
              ref={fileRef}
              id="price-beat-file"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              className="hidden"
              onChange={(e) => acceptFile(e.target.files?.[0])}
            />
            {errors.file && <p id="file-error" role="alert" className="mt-1.5 text-xs text-red-700">{errors.file}</p>}
          </div>

          <div>
            <label htmlFor="note" className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">
              Anything we should know? <span className="text-ink-muted/70 font-normal normal-case tracking-normal text-[11px]">(optional)</span>
            </label>
            <Textarea
              id="note"
              value={form.note}
              onChange={(e) => setField("note", e.target.value)}
              placeholder="Scope, timeline, or anything about the quote you'd like us to know."
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-ink w-full py-4 uppercase tracking-widest text-sm disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                <span className="sr-only">Submitting</span>
                Sending…
              </>
            ) : (
              <>
                Beat My Quote
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </>
            )}
          </button>
          <p className="text-center text-[11px] text-ink-muted/80">
            Prefer to talk it through?{" "}
            <a href={`tel:${BRAND_CONFIG.contact.phone}`} className="font-semibold text-ink underline underline-offset-2 hover:text-sandstone-dark">
              {BRAND_CONFIG.contact.phoneFormatted}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
