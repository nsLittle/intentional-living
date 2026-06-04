"use client";

import { useState } from "react";

const btnClass =
  "mx-auto block px-8 py-5 rounded-full font-semibold text-white bg-[#6ea38d] shadow-md hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f5d50] disabled:opacity-60";

export default function ReAlignment() {
  const [step, setStep] = useState(1);
  const [notice, setNotice] = useState("");
  const [pattern, setPattern] = useState("");
  const [cultivate, setCultivate] = useState("");
  const [practice, setPractice] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stepContent = {
    1: {
      label: "What feels off right now?",
      value: notice,
      setValue: setNotice,
      placeholder:
        "For example: I feel like I let others take advantage of my kindness.",
    },
    2: {
      label: "What pattern do you notice?",
      value: pattern,
      setValue: setPattern,
      placeholder:
        "For example: I often say yes before checking whether I have capacity.",
    },
    3: {
      label: "What do you want to cultivate instead?",
      value: cultivate,
      setValue: setCultivate,
      placeholder: "For example: kindness with boundaries.",
    },
    4: {
      label: "What is one small practice you can try?",
      value: practice,
      setValue: setPractice,
      placeholder:
        "For example: pause before answering and ask myself if I truly have capacity.",
    },
  }[step];

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (step === 1) {
      if (!notice.trim()) {
        setError("Please name what feels off.");
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!pattern.trim()) {
        setError("Please name the pattern you notice.");
        return;
      }
      setStep(3);
      return;
    }

    if (step === 3) {
      if (!cultivate.trim()) {
        setError("Please name what you want to cultivate instead.");
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
            notice: notice.trim(),
            pattern: pattern.trim(),
            cultivate: cultivate.trim(),
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
  function reset() {
    setStep(1);
    setNotice("");
    setPattern("");
    setCultivate("");
    setPractice("");
    setResult(null);
    setError(null);
  }

  return (
    <div className="max-w-3xl mx-auto px-6 pb-16">
      {/* show form only when no result */}
      {!result && (
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <p className="mb-3 font-serif text-xl text-[#5c5045]">
              {stepContent.label}
            </p>

            <textarea
              value={stepContent.value}
              onChange={(e) => stepContent.setValue(e.target.value)}
              rows={6}
              className="w-full rounded-md border border-gray-300 bg-white p-3 outline-none focus:ring-2 focus:ring-gray-300"
              placeholder={stepContent.placeholder}
            />
          </label>

          <button type="submit" disabled={loading} className={btnClass}>
            {loading ? "Aligning…" : "Align"}
          </button>
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
          <div className="mt-6 rounded-md border border-gray-200 bg-gray-50 p-4">
            <div className="text-sm opacity-70 mb-2">Aligned Intentions</div>
            <p className="text-lg">{result}</p>
          </div>

          {/* button outside the card, like the main page */}
          <button type="button" onClick={reset} className={`mt-8 ${btnClass}`}>
            Align another
          </button>
        </>
      )}
    </div>
  );
}
