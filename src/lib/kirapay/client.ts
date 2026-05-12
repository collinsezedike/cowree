import { KirapayLinkConfig, KirapayLinkResponse } from "./types";

const KIRAPAY_API = "https://api.kira-pay.com/api/link/generate";

/**
 * Server-side helper — proxies link generation to keep the API key out of
 * client bundles. Called only from the /api/kirapay/create-link route.
 */
export async function generateKirapayLink(
  config: KirapayLinkConfig
): Promise<KirapayLinkResponse> {
  const apiKey = process.env.KIRAPAY_API_KEY;
  if (!apiKey) {
    throw new Error("KIRAPAY_API_KEY is not set");
  }

  const res = await fetch(KIRAPAY_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify(config),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new KirapayError(`Link generation failed: ${text}`, res.status);
  }

  return res.json();
}

export class KirapayError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = "KirapayError";
  }
}
