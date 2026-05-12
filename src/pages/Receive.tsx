import { ReceiveDashboard } from "@/components/receive/ReceiveDashboard";

export function Receive() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-cream to-forest-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1
            className="text-2xl font-bold text-forest-900"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Receive on Solana
          </h1>
          <p className="text-forest-500 text-sm mt-1">
            Accept USDC from any chain · No setup required
          </p>
        </div>

        <ReceiveDashboard />
      </div>
    </div>
  );
}
