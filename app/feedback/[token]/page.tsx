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

      if (!res.ok) {
        setErrorMessage(data.error || "Something went wrong");
        setPhase("error");
        return;
      }

      if (data.path === "happy") {
        setPhase("happy");
      } else {
        setPhase("unhappy");
      }
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
        body: JSON.stringify({
          token,
          detailedFeedback: detailedFeedback.trim(),
          contactPreference,
        }),
      });

      if (res.ok) {
        setPhase("done");
      } else {
        const data = await res.json();
        setErrorMessage(data.error || "Something went wrong");
        setPhase("error");
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setPhase("error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleReviewClick = () => {
    // Fire-and-forget tracking
    fetch("/api/feedback/track-google-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    }).catch(() => {}); // silently ignore errors
  };

  // Shared wrapper
  const PageWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-[#101820] flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gold">{BRAND_CONFIG.shortName}</h1>
          <p className="text-sm text-gray-400 mt-1">{BRAND_CONFIG.motto}</p>
        </div>
        {/* Content card */}
        <div className="bg-[#1F1F1F] rounded-2xl border border-[#2E2E2E] p-6 sm:p-8 shadow-xl">
          {children}
        </div>
      </div>
    </div>
  );

  // ─── Error / Expired ───
  if (phase === "error") {
    return (
      <PageWrapper>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">😔</div>
          <h2 className="text-xl font-semibold text-white mb-3">
            {errorMessage || "This link has expired or already been used"}
          </h2>
          <p className="text-gray-400">
            If you need help, contact us at{" "}
            <a href={`tel:${BRAND_CONFIG.contact.phone}`} className="text-gold hover:underline">
              {BRAND_CONFIG.contact.phoneFormatted}
            </a>
          </p>
        </div>
      </PageWrapper>
    );
  }

  // ─── Rating Phase ───
  if (phase === "rate") {
    return (
      <PageWrapper>
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">
            How was your experience?
          </h2>
          <p className="text-gray-400 mb-8">
            We&apos;d love to hear how your project went
          </p>

          {/* Star Rating */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="transition-transform hover:scale-110 active:scale-95 focus:outline-none"
                aria-label={`${star} star${star !== 1 ? "s" : ""}`}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill={star <= (hoveredStar || rating) ? "#D4AF37" : "none"}
                  stroke={star <= (hoveredStar || rating) ? "#D4AF37" : "#4A4A4A"}
                  strokeWidth="1.5"
                  className="sm:w-14 sm:h-14"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </button>
            ))}
          </div>

          {/* Rating label */}
          {rating > 0 && (
            <p className="text-gold font-medium mb-6">
              {rating === 5 && "Amazing!"}
              {rating === 4 && "Great!"}
              {rating === 3 && "It was okay"}
              {rating === 2 && "Not great"}
              {rating === 1 && "Poor experience"}
            </p>
          )}

          {/* Optional comment */}
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Anything you'd like to share? (optional)"
            rows={3}
            className="w-full bg-[#2E2E2E] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold resize-none mb-6"
          />

          {/* Submit */}
          <button
            onClick={handleRatingSubmit}
            disabled={rating === 0 || submitting}
            className="w-full bg-gradient-to-r from-gold to-gold-dark text-[#101820] font-bold py-4 px-6 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity text-lg"
          >
            {submitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>
      </PageWrapper>
    );
  }

  // ─── Happy Path (4-5 stars) ───
  if (phase === "happy") {
    return (
      <PageWrapper>
        <div className="text-center py-4">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-white mb-3">
            Thank you so much!
          </h2>
          <p className="text-gray-300 mb-2">
            We&apos;re thrilled you had a great experience.
          </p>
          <p className="text-gray-400 mb-8">
            Would you mind sharing your experience on Google? It really helps our family business grow.
          </p>

          {googleReviewUrl && (
            <a
              href={googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleGoogleReviewClick}
              className="inline-block w-full bg-gradient-to-r from-gold to-gold-dark text-[#101820] font-bold py-4 px-6 rounded-lg hover:opacity-90 transition-opacity text-lg mb-4"
            >
              Leave a Google Review ⭐
            </a>
          )}

          <button
            onClick={() => setPhase("done")}
            className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
          >
            No thanks, I&apos;m done
          </button>
        </div>
      </PageWrapper>
    );
  }

  // ─── Unhappy Path (1-3 stars) ───
  if (phase === "unhappy") {
    return (
      <PageWrapper>
        <div className="py-2">
          <h2 className="text-xl font-semibold text-white mb-2 text-center">
            We&apos;re sorry to hear that
          </h2>
          <p className="text-gray-400 mb-6 text-center">
            We take this seriously and would love to make it right. Could you tell us more about what we could improve?
          </p>

          <textarea
            value={detailedFeedback}
            onChange={(e) => setDetailedFeedback(e.target.value)}
            placeholder="Please share what we could have done better..."
            rows={5}
            className="w-full bg-[#2E2E2E] border border-[#3A3A3A] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold resize-none mb-6"
          />

          {/* Contact preference */}
          <p className="text-sm text-gray-400 mb-3">Would you like us to follow up?</p>
          <div className="space-y-2 mb-6">
            {[
              { value: "email", label: "Yes, email me back" },
              { value: "phone", label: "Yes, call me" },
              { value: "none", label: "No thanks" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 p-3 rounded-lg bg-[#2E2E2E] border border-[#3A3A3A] cursor-pointer hover:border-[#4A4A4A] transition-colors"
              >
                <input
                  type="radio"
                  name="contactPreference"
                  value={option.value}
                  checked={contactPreference === option.value}
                  onChange={(e) => setContactPreference(e.target.value)}
                  className="accent-gold w-4 h-4"
                />
                <span className="text-gray-300 text-sm">{option.label}</span>
              </label>
            ))}
          </div>

          <button
            onClick={handleNegativeFeedbackSubmit}
            disabled={!detailedFeedback.trim() || submitting}
            className="w-full bg-gradient-to-r from-gold to-gold-dark text-[#101820] font-bold py-4 px-6 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {submitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>
      </PageWrapper>
    );
  }

  // ─── Done ───
  if (phase === "done") {
    return (
      <PageWrapper>
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🙏</div>
          <h2 className="text-xl font-semibold text-white mb-3">
            Thank you for your feedback
          </h2>
          <p className="text-gray-400">
            We truly appreciate you taking the time. Your feedback helps us improve.
          </p>
        </div>
      </PageWrapper>
    );
  }

  return null;
}
