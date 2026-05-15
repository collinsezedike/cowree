import { useState } from "react";
import { Loader2, ExternalLink } from "lucide-react";
import { KirapayLinkConfig } from "@/lib/kirapay/types";

interface Props {
  config: Omit<KirapayLinkConfig, "apiKey">;
  className?: string;
}

export function CheckoutButton({ config, className }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function openCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/kirapay/create-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to create payment link");
      window.open(json.data.url, "_blank", "noopener,noreferrer");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openCheckout}
        disabled={loading}
        className={`w-full py-3.5 rounded-xl bg-forest-800 text-cream flex items-center justify-center gap-2 text-sm font-semibold hover:bg-forest-700 active:bg-forest-900 transition-all disabled:opacity-60 disabled:cursor-not-allowed ${className ?? ""}`}
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Creating payment link…
          </>
        ) : (
          <>
            Complete payment
            <ExternalLink size={14} />
          </>
        )}
      </button>

      {error && (
        <p className="mt-2 text-xs text-red-600 text-center">{error}</p>
      )}
    </>
  );
}
