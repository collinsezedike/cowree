import type { VercelRequest, VercelResponse } from "@vercel/node";

const KIRAPAY_API = "https://api.kira-pay.com/api/link/generate";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body;

    if (!body?.receiver || typeof body.receiver !== "string") {
      return res.status(400).json({ error: "receiver (Solana wallet address) is required" });
    }
    if (!body.price || isNaN(body.price) || body.price <= 0) {
      return res.status(400).json({ error: "price must be a positive number" });
    }

    const apiKey = process.env.KIRAPAY_API_KEY;
    if (!apiKey) {
      console.error("[/api/kirapay/create-link] KIRAPAY_API_KEY is not set");
      return res.status(500).json({ error: "Payment service is not configured" });
    }

    const upstream = await fetch(KIRAPAY_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(body),
    });

    const text = await upstream.text();
    if (!upstream.ok) {
      console.error("[/api/kirapay/create-link] upstream error", upstream.status, text);
      return res.status(upstream.status).json({ error: `Link generation failed: ${text}` });
    }

    return res.status(201).json(JSON.parse(text));
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("[/api/kirapay/create-link]", message);
    return res.status(500).json({ error: message });
  }
}
