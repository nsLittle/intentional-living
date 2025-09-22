// src/app/api/subscribe/route.ts
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID!;

type Payload = {
  email?: string;
  name?: string;
  website?: string; // honeypot
};

function isEmail(s: unknown) {
  return typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function sanitize(s: unknown) {
  return typeof s === "string" ? s.trim().slice(0, 5000) : "";
}

export async function POST(req: Request) {
  try {
    if (!AUDIENCE_ID) {
      return Response.json(
        { ok: false, error: "Audience not configured." },
        { status: 500 }
      );
    }

    const ct = req.headers.get("content-type") || "";
    let body: Payload;

    if (ct.includes("application/json")) {
      body = (await req.json()) as Payload;
    } else {
      const fd = await req.formData();
      body = {
        email: (fd.get("email") as string) ?? "",
        name: (fd.get("name") as string) ?? "",
        website: (fd.get("website") as string) ?? "", // honeypot
      };
    }

    // Honeypot: if filled, silently "succeed"
    if (sanitize(body.website)) {
      return Response.json({ ok: true, status: "ignored" });
    }

    const email = sanitize(body.email);
    const name = sanitize(body.name);

    if (!isEmail(email)) {
      return Response.json(
        { ok: false, error: "Invalid email." },
        { status: 400 }
      );
    }

    // Split name, optional
    const [firstName, ...rest] = name.split(/\s+/).filter(Boolean);
    const lastName = rest.join(" ") || undefined;

    // Create (or try to create) the contact in the audience
    const { error } = await resend.contacts.create({
      audienceId: AUDIENCE_ID,
      email,
      firstName: firstName || undefined,
      lastName,
      unsubscribed: false,
    });

    if (error) {
      const msg = String(error?.message || error);
      // If already exists, treat as success from UX perspective
      if (/already exists|409|conflict/i.test(msg)) {
        return Response.json({ ok: true, status: "already-subscribed" });
      }
      console.error("Resend subscribe error:", error);
      return Response.json(
        { ok: false, error: "Subscribe failed." },
        { status: 500 }
      );
    }

    return Response.json({ ok: true, status: "subscribed" });
  } catch (err) {
    console.error("Subscribe route error:", err);
    return Response.json(
      { ok: false, error: "Unexpected error." },
      { status: 500 }
    );
  }
}
