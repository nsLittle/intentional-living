"use client";

import { useState } from "react";

export default function Reframer() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    const trimmed = prompt.trim();
    if (!trimmed) {
      setError("Please enter a thought to reframe.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/reframer", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ prompt: trimmed }),
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

  return (
    <div className="max-w-3xl mx-auto px-6 pb-16">
      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          {/* <span className="block text-sm font-medium mb-2">Your thought</span> */}
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={6}
            className="w-full rounded-md border border-gray-300 bg-white p-3 outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="e.g., I always mess this up; I’ll never be good at this."
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="mx-auto block px-8 py-5 rounded-full font-semibold text-white bg-[#6ea38d] shadow-md hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f5d50] disabled:opacity-60">
          {loading ? "Reframing…" : "Realign"}
        </button>
      </form>

      {error && (
        <div className="mt-6 rounded-md border border-red-300 bg-red-50 p-3 text-red-700">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-8 rounded-md border border-gray-200 bg-gray-50 p-4">
          <div className="text-sm opacity-70 mb-1">Reframed intention</div>
          <p className="text-lg">{result}</p>
        </div>
      )}
    </div>
  );
}
