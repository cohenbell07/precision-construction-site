"use client";

/**
 * ServiceQuestions — renders the active question set from
 * lib/quote-questions.ts for the currently-selected service. Lives at the
 * top of the /get-quote details step.
 *
 * Visual language matches the existing form: cream paper card backgrounds,
 * bone-soft selected state for buttons, sandstone-dark accents. select /
 * multi questions render as button grids (same tap-target rhythm as the
 * service-selection step); text + textarea use the shared Input/Textarea.
 */

import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Question } from "@/lib/quote-questions";

export type AnswersState = Record<string, string | string[] | undefined>;

interface Props {
  questions: Question[];
  answers: AnswersState;
  errors: Record<string, string>;
  onChange: (next: AnswersState) => void;
  /** Optional eyebrow + heading shown above the questions. */
  eyebrow?: string;
  heading?: string;
}

export function ServiceQuestions({
  questions,
  answers,
  errors,
  onChange,
  eyebrow = "Step 02",
  heading = "About Your Project",
}: Props) {
  const setAnswer = (id: string, value: string | string[]) => {
    onChange({ ...answers, [id]: value });
  };

  const toggleMulti = (id: string, option: string) => {
    const current = (answers[id] as string[] | undefined) ?? [];
    const next = current.includes(option)
      ? current.filter((o) => o !== option)
      : [...current, option];
    setAnswer(id, next);
  };

  return (
    <div className="space-y-6 sm:space-y-7">
      {(eyebrow || heading) && (
        <div className="mb-6 sm:mb-7">
          {eyebrow && (
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 cream-rule" />
              <p className="cream-eyebrow text-[10px] font-mono tracking-[0.22em] uppercase font-medium">
                {eyebrow}
              </p>
            </div>
          )}
          {heading && (
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-ink uppercase tracking-tight">
              {heading}
            </h2>
          )}
          <p className="font-serif italic text-ink-muted mt-3 text-base">
            A few quick details so we can put together a real number, not a guess.
          </p>
        </div>
      )}

      {questions.map((q) => {
        const error = errors[q.id];

        if (q.type === "select") {
          const value = (answers[q.id] as string) ?? "";
          return (
            <fieldset key={q.id}>
              <legend className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">
                {q.label}
                {q.required && <span aria-hidden="true" className="text-ink ml-1">*</span>}
              </legend>
              {q.helper && <p className="text-[11px] text-ink-muted mb-3">{q.helper}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options?.map((opt) => {
                  const isSelected = value === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setAnswer(q.id, opt)}
                      aria-pressed={isSelected}
                      className={`group flex items-center justify-between text-left p-3.5 sm:p-4 rounded-md border-2 transition-all ${
                        isSelected
                          ? "border-sandstone-dark bg-bone-soft text-ink"
                          : "border-bone-hairline bg-bone-paper text-ink-muted hover:border-sandstone-dark/50 hover:text-ink"
                      }`}
                    >
                      <span className="font-semibold text-sm leading-snug">{opt}</span>
                      {isSelected && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sandstone-dark text-bone shrink-0 ml-2">
                          <Check aria-hidden="true" className="h-3 w-3" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              {error && <p role="alert" className="mt-2 text-xs text-red-700">{error}</p>}
            </fieldset>
          );
        }

        if (q.type === "multi") {
          const value = (answers[q.id] as string[] | undefined) ?? [];
          return (
            <fieldset key={q.id}>
              <legend className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]">
                {q.label}
                {q.required && <span aria-hidden="true" className="text-ink ml-1">*</span>}
              </legend>
              {q.helper && <p className="text-[11px] text-ink-muted mb-3">{q.helper}</p>}
              <div className="grid grid-cols-2 gap-2.5">
                {q.options?.map((opt) => {
                  const isSelected = value.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleMulti(q.id, opt)}
                      aria-pressed={isSelected}
                      className={`flex items-center justify-between text-left p-3 sm:p-3.5 rounded-md border-2 transition-all ${
                        isSelected
                          ? "border-sandstone-dark bg-bone-soft text-ink"
                          : "border-bone-hairline bg-bone-paper text-ink-muted hover:border-sandstone-dark/50 hover:text-ink"
                      }`}
                    >
                      <span className="font-semibold text-sm leading-snug">{opt}</span>
                      {isSelected && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sandstone-dark text-bone shrink-0 ml-2">
                          <Check aria-hidden="true" className="h-2.5 w-2.5" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              {error && <p role="alert" className="mt-2 text-xs text-red-700">{error}</p>}
            </fieldset>
          );
        }

        if (q.type === "textarea") {
          const value = (answers[q.id] as string) ?? "";
          return (
            <div key={q.id}>
              <label
                htmlFor={`q-${q.id}`}
                className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]"
              >
                {q.label}
                {q.required && <span aria-hidden="true" className="text-ink ml-1">*</span>}
              </label>
              {q.helper && <p className="text-[11px] text-ink-muted mb-2">{q.helper}</p>}
              <Textarea
                id={`q-${q.id}`}
                value={value}
                onChange={(e) => setAnswer(q.id, e.target.value)}
                placeholder={q.placeholder}
                rows={3}
                aria-invalid={!!error}
                aria-describedby={error ? `q-${q.id}-error` : undefined}
                required={q.required}
                aria-required={q.required ? "true" : undefined}
              />
              {error && <p id={`q-${q.id}-error`} role="alert" className="mt-1.5 text-xs text-red-700">{error}</p>}
            </div>
          );
        }

        if (q.type === "text" || q.type === "number") {
          const value = (answers[q.id] as string) ?? "";
          return (
            <div key={q.id}>
              <label
                htmlFor={`q-${q.id}`}
                className="block text-[10px] font-bold mb-2 text-sandstone-muted uppercase tracking-[0.2em]"
              >
                {q.label}
                {q.required && <span aria-hidden="true" className="text-ink ml-1">*</span>}
              </label>
              {q.helper && <p className="text-[11px] text-ink-muted mb-2">{q.helper}</p>}
              <Input
                id={`q-${q.id}`}
                type={q.type === "number" ? "number" : "text"}
                inputMode={q.type === "number" ? "numeric" : undefined}
                value={value}
                onChange={(e) => setAnswer(q.id, e.target.value)}
                placeholder={q.placeholder}
                aria-invalid={!!error}
                aria-describedby={error ? `q-${q.id}-error` : undefined}
                required={q.required}
                aria-required={q.required ? "true" : undefined}
              />
              {error && <p id={`q-${q.id}-error`} role="alert" className="mt-1.5 text-xs text-red-700">{error}</p>}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
