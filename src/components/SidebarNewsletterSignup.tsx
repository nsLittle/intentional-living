"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "exists" | "error";

export default function SidebarNewsletterSignup() {
  const [email, setEmail] = useState("");
  // Honeypot: bots tend to fill every input; humans never see this.
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });

      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Subscribe failed.");
      }

      setEmail("");
      setWebsite("");
      setStatus(data.status === "already-subscribed" ? "exists" : "success");
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Unexpected error.");
    }
  }

  return (
    <div className="bg-[#3b6c5a] text-white p-6 rounded-xl shadow-md mt-8">
      <h3 className="text-2xl font-semibold mb-2">Newsletter</h3>
      <p className="mb-4 text-sm">
        Get recipes, tips, and first access to new posts.
      </p>

      <form className="flex flex-col gap-3" onSubmit={onSubmit} noValidate>
        {/* Hidden honeypot */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <input
          type="email"
          name="email"
          id="nl-email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md p-2 text-[#c5a880] placeholder:text-[#c5a880] bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#c5a880]"
        />

        <button
          type="submit"
          disabled={status === "submitting"}
          className="bg-[#6fa58e] text-white py-2 px-4 rounded-md shadow hover:bg-[#5e8f7a] transition disabled:opacity-60">
          {status === "submitting" ? "Joining…" : "Subscribe"}
        </button>

        <p className="text-sm min-h-5" aria-live="polite">
          {status === "success" && "Thanks! You’re subscribed."}
          {status === "exists" && "You’re already on the list."}
          {status === "error" && (error || "There was a problem.")}
        </p>
      </form>
    </div>
  );
}
