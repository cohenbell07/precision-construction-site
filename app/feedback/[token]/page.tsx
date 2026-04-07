"use client";

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
  const [customerName, setCustomerName] = useState("");

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
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-display font-black text-white uppercase tracking-tight">{BRAND_CONFIG.shortName}</h1>
          <p className="text-sm text-white/30 mt-1">{BRAND_CONFIG.motto}</p>
        </div>
        <div className="bg-[#0A0A0A] rounded-2xl border border-white/[0.06] p-6 sm:p-8 shadow-[0_4px_32px_rgba(0,0,0,0.5)]">
          {children}
        </div>
      </div>
    </div>
  );

  const inputClass = "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-white/25 focus:outline-none focus:border-white/20 resize-none text-sm transition-colors";

  if (phase === "error") {
    return (
      <PageWrapper>
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold text-white mb-3">{errorMessage || "This link has expired or already been used"}</h2>
          <p className="text-white/40">
            If you need help, contact us at{" "}
            <a href={`tel:${BRAND_CONFIG.contact.phone}`} className="text-white hover:underline">{BRAND_CONFIG.contact.phoneFormatted}</a>
          </p>
        </div>
      </PageWrapper>
    );
  }

  if (phase === "rate") {
    return (
      <PageWrapper>
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">How was your experience?</h2>
          <p className="text-white/35 mb-8">We&apos;d love to hear how your project went</p>

          <div className="flex justify-center gap-2 sm:gap-3 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="transition-transform hover:scale-110 active:scale-95 focus:outline-none"
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill={star <= (hoveredStar || rating) ? "#fff" : "none"} stroke={star <= (hoveredStar || rating) ? "#fff" : "#333"} strokeWidth="1.5" className="sm:w-14 sm:h-14">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </button>
            ))}
          </div>

          {rating > 0 && (
            <p className="text-white font-medium mb-6">
              {rating === 5 && "Amazing!"}
              {rating === 4 && "Great!"}
              {rating === 3 && "It was okay"}
              {rating === 2 && "Not great"}
              {rating === 1 && "Poor experience"}
            </p>
          )}

          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Anything you'd like to share? (optional)" rows={3} className={`${inputClass} mb-6`} />

          <button onClick={handleRatingSubmit} disabled={rating === 0 || submitting} className="w-full bg-white text-black font-bold py-3.5 px-6 rounded-full disabled:opacity-40 hover:bg-white/90 transition-colors text-sm">
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
          <h2 className="text-2xl font-bold text-white mb-3">Thank you so much!</h2>
          <p className="text-white/50 mb-2">We&apos;re thrilled you had a great experience.</p>
          <p className="text-white/35 mb-8">Would you mind sharing your experience on Google? It really helps our family business grow.</p>

          {googleReviewUrl && (
            <a href={googleReviewUrl} target="_blank" rel="noopener noreferrer" onClick={handleGoogleReviewClick} className="inline-block w-full bg-white text-black font-bold py-3.5 px-6 rounded-full hover:bg-white/90 transition-colors text-sm mb-4">
              Leave a Google Review
            </a>
          )}
          <button onClick={() => setPhase("done")} className="text-white/30 hover:text-white/60 text-sm transition-colors">
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
          <h2 className="text-xl font-semibold text-white mb-2 text-center">We&apos;re sorry to hear that</h2>
          <p className="text-white/35 mb-6 text-center">We take this seriously and would love to make it right. Could you tell us more?</p>

          <textarea value={detailedFeedback} onChange={(e) => setDetailedFeedback(e.target.value)} placeholder="Please share what we could have done better..." rows={5} className={`${inputClass} mb-6`} />

          <p className="text-sm text-white/35 mb-3">Would you like us to follow up?</p>
          <div className="space-y-2 mb-6">
            {[
              { value: "email", label: "Yes, email me back" },
              { value: "phone", label: "Yes, call me" },
              { value: "none", label: "No thanks" },
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] cursor-pointer hover:border-white/[0.12] transition-colors">
                <input type="radio" name="contactPreference" value={option.value} checked={contactPreference === option.value} onChange={(e) => setContactPreference(e.target.value)} className="accent-white w-4 h-4" />
                <span className="text-white/60 text-sm">{option.label}</span>
              </label>
            ))}
          </div>

          <button onClick={handleNegativeFeedbackSubmit} disabled={!detailedFeedback.trim() || submitting} className="w-full bg-white text-black font-bold py-3.5 px-6 rounded-full disabled:opacity-40 hover:bg-white/90 transition-colors text-sm">
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
          <h2 className="text-xl font-semibold text-white mb-3">Thank you for your feedback</h2>
          <p className="text-white/35">We truly appreciate you taking the time. Your feedback helps us improve.</p>
        </div>
      </PageWrapper>
    );
  }

  return null;
}
