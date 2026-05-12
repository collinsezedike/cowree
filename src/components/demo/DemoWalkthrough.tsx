import { useState } from "react";
import { StatusTracker } from "@/components/transaction/StatusTracker";
import { DEMO_TRANSACTION } from "@/lib/demo/demoData";
import { ArrowRight, Play, RotateCcw } from "lucide-react";

export function DemoWalkthrough() {
  const [started, setStarted] = useState(false);
  const [key, setKey] = useState(0);

  const restart = () => {
    setStarted(false);
    setKey((k) => k + 1);
    setTimeout(() => setStarted(true), 100);
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="card mb-6 bg-gradient-to-br from-forest-800 to-forest-900 text-cream border-0">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center shrink-0">
            <Play className="text-gold-400" size={20} />
          </div>
          <div>
            <p className="font-semibold text-lg mb-1">Demo: ETH → Solana USDC</p>
            <p className="text-cream/70 text-sm leading-relaxed">
              Watch a simulated cross-chain transfer from Ethereum to Solana USDC
              via KIRAPAY. This is what a real transfer looks like.
            </p>
          </div>
        </div>

        {/* Simulated transfer details */}
        <div className="mt-4 p-3 rounded-xl bg-white/10 backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-cream/50 text-xs mb-0.5">From</p>
              <p className="font-semibold">0.05 ETH</p>
              <p className="text-xs text-cream/60">Ethereum Mainnet</p>
            </div>
            <div>
              <p className="text-cream/50 text-xs mb-0.5">To</p>
              <p className="font-semibold">$92.45 USDC</p>
              <p className="text-xs text-cream/60">Amara Osei · Solana</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transfer flow illustration */}
      <div className="card mb-6">
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-forest-50 border border-forest-100">
            <span className="text-base">⟠</span>
            <span className="font-medium text-forest-900">0.05 ETH</span>
          </div>
          <ArrowRight size={14} className="text-forest-400 shrink-0" />
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gold-50 border border-gold-200">
            <div className="w-4 h-4 rounded-full bg-gold-500 text-white flex items-center justify-center text-xs font-bold">K</div>
            <span className="text-xs font-semibold text-gold-800">KIRAPAY</span>
          </div>
          <ArrowRight size={14} className="text-forest-400 shrink-0" />
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-50 border border-purple-200">
            <span className="text-base">◎</span>
            <span className="font-medium text-forest-900">$92.45 USDC</span>
          </div>
        </div>
        <p className="text-xs text-forest-400 mt-3">
          KIRAPAY routes the transfer cross-chain, handling all settlement invisibly.
          The recipient&apos;s Solana wallet receives native USDC.
        </p>
      </div>

      {/* Status tracker demo */}
      {!started ? (
        <div className="text-center">
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="btn-gold text-base px-8 py-3.5"
          >
            <Play size={16} />
            Start demo transfer
          </button>
          <p className="text-xs text-forest-400 mt-2">Simulated — no real funds</p>
        </div>
      ) : (
        <div>
          <StatusTracker key={key} txnId={DEMO_TRANSACTION.kirapayTxnId} isDemo />
          <div className="mt-4 flex justify-center">
            <button type="button" onClick={restart} className="btn-ghost text-sm">
              <RotateCcw size={13} />
              Replay demo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
