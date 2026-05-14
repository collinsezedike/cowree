import type { VercelRequest, VercelResponse } from "@vercel/node";
import { generateKirapayLink, KirapayError } from "../../src/lib/kirapay/client";
import type { KirapayLinkConfig } from "../../src/lib/kirapay/types";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body: KirapayLinkConfig = req.body;

    if (!body.receiver || typeof body.receiver !== "string") {
      return res.status(400).json({ error: "receiver (Solana wallet address) is required" });
    }
    if (!body.price || isNaN(body.price) || body.price <= 0) {
      return res.status(400).json({ error: "price must be a positive number" });
    }

    const result = await generateKirapayLink(body);
    return res.status(201).json(result);
  } catch (err) {
    if (err instanceof KirapayError) {
      return res.status(err.status).json({ error: err.message });
    }
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("[/api/kirapay/create-link]", message);
    return res.status(500).json({ error: message });
  }
}
