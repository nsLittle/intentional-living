import OpenAI from "openai";

export const runtime = "nodejs"; // ensure server runtime on Netlify
export const dynamic = "force-dynamic"; // avoid caching for POSTs

const SYSTEM_PROMPT = `
You are an intention cultivation guide for Simple Intentions.

Your role is to help the user turn reflection into a clear, grounded intention.

Do not over-explain.
Do not diagnose.
Do not flatter.
Do not write a paragraph.

Return exactly four short sections:

Who I'm Building:
[Rewrite the user's becoming statement as one short identity statement.]

Why It Matters:
[Summarize the user's why in one short sentence.]

Pattern To Notice:
[Name the pattern in one short sentence.]

Today's Practice:
[Rewrite the practice as one specific, observable action.]
`;

export async function POST(req: Request) {
  try {
    const { becoming, why, pattern, practice } = await req.json();

    if (
      typeof becoming !== "string" ||
      typeof why !== "string" ||
      typeof pattern !== "string" ||
      typeof practice !== "string" ||
      !becoming.trim() ||
      !why.trim() ||
      !pattern.trim() ||
      !practice.trim()
    ) {
      return new Response(
        JSON.stringify({ error: "Missing reflection fields" }),
        {
          status: 400,
          headers: { "content-type": "application/json" },
        }
      );
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Responses API call
    const resp = await client.responses.create({
      // choose a modern, Responses-compatible model
      model: "o4-mini",
      input: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `
          Becoming:
          ${becoming}
          
          Why this matters:
          ${why}
          
          Pattern:
          ${pattern}
          
          Practice:
          ${practice}
          `,
        },
      ],
    });

    // Prefer output_text helper; fall back to first text item
    const text =
      (resp as { output_text?: string }).output_text ??
      (
        resp as {
          output?: Array<{ content?: Array<{ text?: string }> }>;
        }
      ).output?.[0]?.content?.[0]?.text ??
      "I couldn't generate a reframing just now.";

    return new Response(JSON.stringify({ completion: text }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(
      JSON.stringify({
        error: "Failed to create reframing.",
        detail: message,
      }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
