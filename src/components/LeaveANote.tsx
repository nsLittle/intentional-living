// app/components/LeaveANote.tsx

"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

type SharePreference = "private" | "share_name" | "share_anonymous";

export default function LeaveANote() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");

  const [sharePreference, setSharePreference] =
    useState<SharePreference>("private");

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          company,
          sharePreference,
        }),
      });

      const body: unknown = await res.json();

      // Narrow the unknown JSON safely (no `any`)
      let ok = false;
      let apiError: string | undefined;
      if (typeof body === "object" && body !== null) {
        const maybe = body as { ok?: unknown; error?: unknown };
        ok = maybe.ok === true;
        apiError = typeof maybe.error === "string" ? maybe.error : undefined;
      }

      if (!res.ok || !ok) {
        throw new Error(apiError || "Something went wrong.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setCompany("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unexpected error.";
      setStatus("error");
      setError(message);
    } finally {
      setTimeout(() => {
        setStatus((s) => (s === "submitting" ? "idle" : s));
      }, 150);
    }
  }

  const statusLabel: Record<Status, string> = {
    idle: "Send message",
    submitting: "Sending your message",
    success: "Message sent",
    error: "There was an error",
  };

  const ariaLiveLabel: Record<Status, string> = {
    idle: "",
    submitting: "Sending your message",
    success: "Message sent",
    error: "There was an error",
  };

  return (
    <section className="w-full max-w-2xl mx-auto px-6 lg:px-24 py-10">
      <h1 className="text-3xl font-semibold tracking-tight mb-2">
        Leave A Note
      </h1>
      <p className="text-sm text-neutral-600 mt-6 mb-2">
        Have a small gesture to share? Something that brought you warmth,
        steadiness, or a quiet sense of care?
      </p>
      <p className="text-sm text-neutral-600 mb-8">
        Leave it here. I read every note.
      </p>

      {status === "success" ? (
        <div
          role="status"
          aria-live="polite"
          className="rounded-2xl border border-green-300 bg-green-50 p-4 text-green-900">
          <p className="font-medium">Thanks! Your message was sent.</p>
          <p>I’ll reply to you at the email you provided.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5" noValidate>
          {/* Honeypot (hidden) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              tabIndex={-1}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-neutral-800">
              Name <span aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-800">
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              placeholder="you@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-neutral-800">
              Message <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-neutral-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              placeholder="Your note..."
            />
          </div>

          <fieldset className="mt-2">
            <legend className="block text-sm font-medium text-neutral-800">
              May I share this note on Simple Intentions?
            </legend>

            <div className="mt-2 space-y-2 text-sm text-neutral-700">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sharePreference"
                  value="private"
                  className="accent-green-700"
                  checked={sharePreference === "private"}
                  onChange={() => setSharePreference("private")}
                />
                No — this is just for you
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sharePreference"
                  value="share_name"
                  className="accent-green-700"
                  checked={sharePreference === "share_name"}
                  onChange={() => setSharePreference("share_name")}
                />
                Yes — you may share it (first name only)
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sharePreference"
                  value="share_anonymous"
                  className="accent-green-700"
                  checked={sharePreference === "share_anonymous"}
                  onChange={() => setSharePreference("share_anonymous")}
                />
                Yes — you may share it anonymously
              </label>
            </div>

            <p className="mt-2 text-xs text-neutral-500">
              I’ll never share your email address.
            </p>
          </fieldset>

          {status === "error" && (
            <div
              role="alert"
              className="rounded-2xl border border-red-300 bg-red-50 p-3 text-red-900">
              {error || "There was an error sending your message."}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center justify-center rounded-2xl border border-neutral-900 px-4 py-2 text-sm font-medium tracking-wide shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50">
            {statusLabel[status]}
          </button>

          <p className="sr-only" aria-live="polite">
            {ariaLiveLabel[status]}
          </p>
        </form>
      )}
    </section>
  );
}
