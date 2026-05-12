import { useState } from "react";
import { Loader2, X } from "lucide-react";
import { KirapayLinkConfig } from "@/lib/kirapay/types";

interface Props {
  config: Omit<KirapayLinkConfig, "apiKey">;
  className?: string;
}

export function KirapayButton({ config, className }: Props) {
  const [loading, setLoading] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
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
      setCheckoutUrl(json.data.url);
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
          "Pay with KIRAPAY"
        )}
      </button>

      {error && (
        <p className="mt-2 text-xs text-red-600 text-center">{error}</p>
      )}

      {checkoutUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setCheckoutUrl(null)}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white text-forest-700 shadow"
              aria-label="Close checkout"
            >
              <X size={16} />
            </button>
            <iframe
              src={checkoutUrl}
              title="KIRAPAY Checkout"
              className="w-full h-[600px] border-0"
              allow="payment"
            />
          </div>
        </div>
      )}
    </>
  );
}
