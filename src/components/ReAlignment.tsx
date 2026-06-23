"use client";

import { useState } from "react";
import Link from "next/link";

const btnClass =
  "inline-block px-8 py-5 rounded-full font-semibold text-white bg-[#6ea38d] shadow-md hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f5d50]";

type Step = 1 | 2 | 3 | 4;

type ReAlignmentProps = {
  onStart?: () => void;
};

export default function ReAlignment({ onStart }: ReAlignmentProps) {
  const [started, setStarted] = useState(false);

  const [step, setStep] = useState<Step>(1);
  const [becoming, setBecoming] = useState("");
  const [why, setWhy] = useState("");
  const [pattern, setPattern] = useState("");
  const [practice, setPractice] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stepContent = {
    1: {
      label: "What Season are you creating?",
      value: becoming,
      setValue: setBecoming,
      placeholder:
        "Example: A Protein + Ab Work Season focused on eating more protein and strengthening my core.",
    },
    2: {
      label: "Why does this matter to you?",
      value: why,
      setValue: setWhy,
      placeholder:
        "Example: I want to feel stronger, support my body, and age with more care.",
    },
    3: {
      label: "What tends to help or get in the way?",
      value: pattern,
      setValue: setPattern,
      placeholder:
        "Example: I follow through better when protein is ready early and planks happen before my shower.",
    },
    4: {
      label: "What will you practice this season?",
      value: practice,
      setValue: setPractice,
      placeholder:
        "Example: Eat a protein-rich breakfast and do one plank each day.",
    },
  }[step];

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (step === 1) {
      if (!becoming.trim()) {
        setError("Please name the Season you are creating.");
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!why.trim()) {
        setError("Please name why this matters to you.");
        return;
      }
      setStep(3);
      return;
    }

    if (step === 3) {
      if (!pattern.trim()) {
        setError("Please name what tends to help or get in the way.");
        return;
      }
      setStep(4);
      return;
    }

    if (step === 4) {
      if (!practice.trim()) {
        setError("Please choose one small practice.");
        return;
      }

      setLoading(true);

      try {
        const res = await fetch("/api/realignment", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            becoming: becoming.trim(),
            why: why.trim(),
            pattern: pattern.trim(),
            practice: practice.trim(),
          }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(
            data?.detail || data?.error || `Request failed (${res.status})`
          );
        }

        const data = await res.json();
        setResult(data.completion ?? "No response generated.");
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 pb-8">
      {!started && !result && (
        <div className="mx-auto max-w-xl text-center space-y-6">
          <button
            type="button"
            onClick={() => {
              setStarted(true);
              onStart?.();
            }}
            className={btnClass}>
            Start cultivating
          </button>
        </div>
      )}
      {/* show form only when no result */}
      {started && !result && (
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <p className="mb-3 text-center font-serif text-xl text-[#5c5045]">
              {stepContent.label}
            </p>

            <textarea
              value={stepContent.value}
              onChange={(e) => stepContent.setValue(e.target.value)}
              rows={3}
              className="
              w-full
              rounded-md
              border
              border-gray-300
              bg-white
              p-3
              outline-none
              focus:ring-2
              focus:ring-gray-300
              placeholder:text-gray-400
              placeholder:italic
            "
              placeholder={stepContent.placeholder}
            />
          </label>

          <div className="mt-8 text-center">
            <button type="submit" disabled={loading} className={btnClass}>
              {loading ? "Cultivating…" : step === 4 ? "Cultivate" : "Next"}
            </button>
          </div>
        </form>
      )}

      {error && (
        <div className="mt-6 rounded-md border border-red-300 bg-red-50 p-3 text-red-700">
          {error}
        </div>
      )}

      {/* result replaces the form */}
      {result && (
        <>
          <div className="mt-12 text-center space-y-10">
            <h2 className="mb-6 text-center font-serif text-2xl text-[#5c5045]">
              Here&apos;s Your Aligned Season
            </h2>

            <p className="whitespace-pre-line text-lg leading-relaxed">
              {result}
            </p>
          </div>

          {/* button outside the card, like the main page */}
          <div className="mt-12 text-center">
            <Link href="/alignment/evidence" className={btnClass}>
              Begin cultivating →
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
