import OpenAI from "openai";

export const runtime = "nodejs"; // ensure server runtime on Netlify
export const dynamic = "force-dynamic"; // avoid caching for POSTs

const SYSTEM_PROMPT =
  "You are a positivity assistant. Translate the user's thought into a single, pithy sentence that reframes it with a growth mindset. Keep it concise and kind.";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (typeof prompt !== "string" || !prompt.trim()) {
      return new Response(JSON.stringify({ error: "Missing prompt" }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    // Responses API call
    const resp = await client.responses.create({
      // choose a modern, Responses-compatible model
      model: "o4-mini",
      input: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
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
