"use client";

/**
 * Customer feedback page (`/feedback/[token]`) — Showroom + Studio canvas.
 * Single cream paper-card centered on the page. Feedback is a friction-reducer
 * studio moment, not a sales pitch.
 */

import { useState } from "react";
import { BRAND_CONFIG } from "@/lib/utils";

type Phase = "loading" | "rate" | "happy" | "unhappy" | "done" | "error";

export default function FeedbackPage({ params }: { params: { token: string } }) {
  const { token } = params;
  const [phase, setPhase] = useState<Phase>("rate");
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [comment, setComment] = useState("");
  const [detailedFeedback, setDetailedFeedback] = useState("");
  const [contactPreference, setContactPreference] = useState("none");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const googleReviewUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL || "";

  const handleRatingSubmit = async () => {
    if (rating === 0) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/feedback/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, rating, comment: comment.trim() || undefined }),
      });
      const data = await res.json();
      if (!res.ok) { setErrorMessage(data.error || "Something went wrong"); setPhase("error"); return; }
      setPhase(data.path === "happy" ? "happy" : "unhappy");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setPhase("error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNegativeFeedbackSubmit = async () => {
    if (!detailedFeedback.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/feedback/submit-negative", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, detailedFeedback: detailedFeedback.trim(), contactPreference }),
      });
      if (res.ok) { setPhase("done"); } else { const data = await res.json(); setErrorMessage(data.error || "Something went wrong"); setPhase("error"); }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setPhase("error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleReviewClick = () => {
    fetch("/api/feedback/track-google-click", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token }) }).catch(() => {});
  };

  const PageWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen cream-canvas flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-heading font-black text-ink uppercase tracking-tight">{BRAND_CONFIG.shortName}</h1>
          <p className="font-serif italic text-base text-ink-muted mt-2">{BRAND_CONFIG.motto}</p>
        </div>
        <div className="paper-card rounded-md p-6 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );

  const inputClass = "w-full bg-bone-paper border border-bone-hairline rounded-md px-4 py-3 text-ink placeholder:text-ink-muted/60 focus:outline-none focus:border-sandstone-dark resize-none text-base sm:text-sm transition-colors";

  if (phase === "error") {
    return (
      <PageWrapper>
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold text-ink mb-3">{errorMessage || "This link has expired or already been used"}</h2>
          <p className="text-ink-muted">
            If you need help, contact us at{" "}
            <a href={`tel:${BRAND_CONFIG.contact.phone}`} className="text-sandstone-dark hover:underline font-semibold">{BRAND_CONFIG.contact.phoneFormatted}</a>
          </p>
        </div>
      </PageWrapper>
    );
  }

  if (phase === "rate") {
    return (
      <PageWrapper>
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 cream-rule" />
            <p className="cream-eyebrow text-[10px] font-mono tracking-[0.22em] uppercase font-medium">Your Project</p>
            <div className="h-px w-8 cream-rule-rtl" />
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-black text-ink uppercase tracking-tight mb-2">How Was Your Experience?</h2>
          <p className="font-serif italic text-ink-muted mb-8 text-base">We&apos;d love to hear how your project went.</p>

          <div className="flex justify-center gap-2 sm:gap-3 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => setRating(star)} onMouseEnter={() => setHoveredStar(star)} onMouseLeave={() => setHoveredStar(0)} className="transition-transform hover:scale-110 active:scale-95 focus:outline-none">
                <svg width="48" height="48" viewBox="0 0 24 24" fill={star <= (hoveredStar || rating) ? "#8A94A4" : "none"} stroke={star <= (hoveredStar || rating) ? "#8A94A4" : "#D4D8DD"} strokeWidth="1.5" className="sm:w-14 sm:h-14">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </button>
            ))}
          </div>

          {rating > 0 && (
            <p className="text-ink font-serif italic text-lg mb-6">
              {rating === 5 && "Amazing!"}
              {rating === 4 && "Great!"}
              {rating === 3 && "It was okay."}
              {rating === 2 && "Not great."}
              {rating === 1 && "Poor experience."}
            </p>
          )}

          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Anything you'd like to share? (optional)" rows={3} className={`${inputClass} mb-6`} />

          <button onClick={handleRatingSubmit} disabled={rating === 0 || submitting} className="btn-ink w-full py-3.5 disabled:opacity-40 disabled:cursor-not-allowed">
            {submitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>
      </PageWrapper>
    );
  }

  if (phase === "happy") {
    return (
      <PageWrapper>
        <div className="text-center py-4">
          <h2 className="text-2xl font-heading font-black uppercase tracking-tight text-ink mb-3">Thank You!</h2>
          <p className="font-serif italic text-ink text-lg mb-2">We&apos;re thrilled you had a great experience.</p>
          <p className="text-ink-muted mb-8">Would you mind sharing your experience on Google? It really helps our family business grow.</p>

          {googleReviewUrl && (
            <a href={googleReviewUrl} target="_blank" rel="noopener noreferrer" onClick={handleGoogleReviewClick} className="btn-ink w-full py-3.5 mb-4">
              Leave a Google Review
            </a>
          )}
          <button onClick={() => setPhase("done")} className="text-ink-muted hover:text-ink text-sm transition-colors">
            No thanks, I&apos;m done
          </button>
        </div>
      </PageWrapper>
    );
  }

  if (phase === "unhappy") {
    return (
      <PageWrapper>
        <div className="py-2">
          <h2 className="text-xl font-heading font-black uppercase tracking-tight text-ink mb-2 text-center">We&apos;re Sorry to Hear That</h2>
          <p className="font-serif italic text-ink-muted mb-6 text-center">We take this seriously and would love to make it right.</p>

          <textarea value={detailedFeedback} onChange={(e) => setDetailedFeedback(e.target.value)} placeholder="Please share what we could have done better..." rows={5} className={`${inputClass} mb-6`} />

          <p className="text-sm text-sandstone-muted font-bold uppercase tracking-[0.18em] mb-3">Would You Like Us to Follow Up?</p>
          <div className="space-y-2 mb-6">
            {[
              { value: "email", label: "Yes, email me back" },
              { value: "phone", label: "Yes, call me" },
              { value: "none", label: "No thanks" },
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-3 p-3 rounded-md bg-bone-paper border border-bone-hairline cursor-pointer hover:border-sandstone-dark transition-colors">
                <input type="radio" name="contactPreference" value={option.value} checked={contactPreference === option.value} onChange={(e) => setContactPreference(e.target.value)} className="accent-sandstone-dark w-4 h-4" />
                <span className="text-ink text-sm">{option.label}</span>
              </label>
            ))}
          </div>

          <button onClick={handleNegativeFeedbackSubmit} disabled={!detailedFeedback.trim() || submitting} className="btn-ink w-full py-3.5 disabled:opacity-40 disabled:cursor-not-allowed">
            {submitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>
      </PageWrapper>
    );
  }

  if (phase === "done") {
    return (
      <PageWrapper>
        <div className="text-center py-8">
          <h2 className="text-xl font-heading font-black uppercase tracking-tight text-ink mb-3">Thank You for Your Feedback</h2>
          <p className="font-serif italic text-ink-muted">Your feedback helps us improve.</p>
        </div>
      </PageWrapper>
    );
  }

  return null;
}
