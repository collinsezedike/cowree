import { SendFormData } from "@/types";
import { CheckCircle, ArrowRight, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { SUPPORTED_CHAINS } from "@/lib/demo/demoData";

interface Props {
  form: SendFormData;
  onNewTransfer: () => void;
}

export function StepComplete({ form, onNewTransfer }: Props) {
  const chain = SUPPORTED_CHAINS.find((c) => c.id === form.senderChain);
  const amount = parseFloat(form.amount);

  return (
    <div className="text-center py-4">
      <div className="w-14 h-14 rounded-full bg-forest-100 flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="text-forest-800" size={28} />
      </div>

      <h2 className="font-display text-xl font-bold text-forest-900 mb-2">
        Transfer initiated!
      </h2>
      <p className="text-sm text-forest-500 mb-6 max-w-xs mx-auto">
        KIRAPAY is routing your payment cross-chain. The recipient&apos;s Solana
        wallet will receive USDC shortly.
      </p>

      {/* Summary */}
      <div className="bg-forest-50 rounded-xl p-4 text-left mb-6">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-forest-600">From</span>
            <span className="font-semibold text-forest-900">
              {chain?.icon} ${amount.toFixed(2)} {form.senderToken} on {chain?.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-forest-600">To</span>
            <span className="font-semibold text-forest-900 font-mono text-xs">
              {form.recipientAddress.slice(0, 8)}...{form.recipientAddress.slice(-4)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-forest-600">Settles as</span>
            <span className="font-semibold text-forest-900">USDC on Solana</span>
          </div>
          <div className="flex justify-between">
            <span className="text-forest-600">Via</span>
            <span className="font-semibold text-gold-600">KIRAPAY</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Link to="/history" className="btn-gold w-full justify-center">
          View history
          <ArrowRight size={14} />
        </Link>
        <button
          type="button"
          onClick={onNewTransfer}
          className="btn-ghost w-full justify-center"
        >
          <RotateCcw size={14} />
          New transfer
        </button>
      </div>
    </div>
  );
}
