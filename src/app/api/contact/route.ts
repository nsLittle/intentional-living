// src/app/api/contact/route.ts

import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_TO = process.env.CONTACT_TO!;
const CONTACT_FROM =
  process.env.CONTACT_FROM ?? "Contact Form <onboarding@resend.dev>";

type Payload = {
  name?: string;
  email?: string;
  message?: string;
  company?: string; // honeypot
};

function isEmail(s: unknown) {
  return typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function sanitize(s: unknown) {
  return typeof s === "string" ? s.trim().slice(0, 5000) : "";
}

export async function POST(req: Request) {
  try {
    const ct = req.headers.get("content-type") || "";
    let body: Payload;

    if (ct.includes("application/json")) {
      body = (await req.json()) as Payload;
    } else {
      const fd = await req.formData();
      body = {
        name: (fd.get("name") as string) ?? "",
        email: (fd.get("email") as string) ?? "",
        message: (fd.get("message") as string) ?? "",
        company: (fd.get("company") as string) ?? "", // honeypot
      };
    }

    // Honeypot: if filled, silently "succeed"
    if (sanitize(body.company)) {
      return Response.json({ ok: true });
    }

    const name = sanitize(body.name);
    const email = sanitize(body.email);
    const message = sanitize(body.message);

    if (!isEmail(email) || !message) {
      return Response.json(
        { ok: false, error: "Invalid email or empty message." },
        { status: 400 }
      );
    }

    const subject = `New contact from ${
      name || "Anonymous"
    } — Intentional Living`;

    const text = [
      `Name: ${name || "—"}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; line-height:1.6">
        <p><strong>Name:</strong> ${name || "—"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <hr/>
        <p style="white-space:pre-wrap">${message.replace(/</g, "&lt;")}</p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      subject,
      replyTo: email, // replies go to the sender
      text,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { ok: false, error: "Email send failed." },
        { status: 500 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Route error:", err);
    return Response.json(
      { ok: false, error: "Unexpected error." },
      { status: 500 }
    );
  }
}
