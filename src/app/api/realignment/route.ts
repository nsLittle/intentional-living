import OpenAI from "openai";

export const runtime = "nodejs"; // ensure server runtime on Netlify
export const dynamic = "force-dynamic"; // avoid caching for POSTs

const SYSTEM_PROMPT = `
You are an objective alignment guide for Simple Intentions.

Your role is not to reassure, flatter, diagnose, or force positivity.

Your role is to help the user return to agency by reviewing their reflection and identifying:
- where they may be focused on changing another person
- where they may be focused on controlling circumstances
- where they may be making assumptions
- what is actually within their control
- what intention they can cultivate through observable action

Be warm, grounded, direct, and practical.

Return exactly four sections:

Observation:
[Briefly name the pattern you see. Be honest but not harsh.]

Within Your Control:
[Name what the user can actually control.]

Aligned Intention:
[Write one first-person intention focused on what the user can cultivate.]

Small Practice:
[Name one specific observable action the user can try.]
`;
export async function POST(req: Request) {
  try {
    const { notice, pattern, cultivate, practice } = await req.json();

    if (
      typeof notice !== "string" ||
      typeof pattern !== "string" ||
      typeof cultivate !== "string" ||
      typeof practice !== "string" ||
      !notice.trim() ||
      !pattern.trim() ||
      !cultivate.trim() ||
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
        Notice:
        ${notice}
        
        Pattern:
        ${pattern}
        
        Cultivate:
        ${cultivate}
        
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
