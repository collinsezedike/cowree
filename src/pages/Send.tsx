import { SendFlow } from "@/components/send/SendFlow";
import { CowrieLogo } from "@/components/ui/CowrieLogo";
import { DemoModeBanner } from "@/components/demo/DemoModeBanner";

export function Send() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-cream to-forest-50 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <CowrieLogo size={40} className="mx-auto mb-3" />
          <h1
            className="text-2xl font-bold text-forest-900"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Send money cross-chain
          </h1>
          <p className="text-forest-500 text-sm mt-1">
            From any chain · USDC on Solana · via KIRAPAY
          </p>
        </div>

        <DemoModeBanner />

        <SendFlow />
      </div>
    </div>
  );
}
