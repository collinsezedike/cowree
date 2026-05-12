import { DemoWalkthrough } from "@/components/demo/DemoWalkthrough";
import { CowrieLogo } from "@/components/ui/CowrieLogo";

export function Demo() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-cream to-forest-50 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <CowrieLogo size={40} className="mx-auto mb-3" />
          <h1
            className="text-2xl font-bold text-forest-900"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Demo walkthrough
          </h1>
          <p className="text-forest-500 text-sm mt-1 max-w-sm mx-auto">
            Simulated ETH → Solana USDC transfer via Cowree. No testnet required.
          </p>
        </div>

        <DemoWalkthrough />
      </div>
    </div>
  );
}
