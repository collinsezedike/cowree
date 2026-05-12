import { SendFormData, SupportedChain, SupportedToken } from "@/types";
import { SUPPORTED_CHAINS } from "@/lib/demo/demoData";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

interface Props {
  form: SendFormData;
  onChange: (patch: Partial<SendFormData>) => void;
  onNext: () => void;
}

const TOKENS: SupportedToken[] = ["USDC", "USDT", "ETH"];

export function StepChain({ form, onChange, onNext }: Props) {
  const [amountError, setAmountError] = useState("");

  const selectedChain = SUPPORTED_CHAINS.find((c) => c.id === form.senderChain);

  const validateAndNext = () => {
    const amt = parseFloat(form.amount);
    if (!form.amount || isNaN(amt) || amt <= 0) {
      setAmountError("Please enter a valid amount");
      return;
    }
    if (amt < 1) {
      setAmountError("Minimum transfer is $1");
      return;
    }
    setAmountError("");
    onNext();
  };

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-forest-900 mb-1">
        Select chain & amount
      </h2>
      <p className="text-sm text-forest-500 mb-6">
        Choose where you&apos;re sending from and how much
      </p>

      {/* Source chain */}
      <div className="mb-5">
        <label className="label">Source chain</label>
        <div className="grid grid-cols-5 gap-2">
          {SUPPORTED_CHAINS.map((chain) => (
            <button
              key={chain.id}
              type="button"
              onClick={() => onChange({
                senderChain: chain.id as SupportedChain,
                senderToken: chain.tokens[0] as SupportedToken,
              })}
              className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 text-xs font-medium transition-all
                ${form.senderChain === chain.id
                  ? "border-forest-800 bg-forest-50"
                  : "border-forest-100 bg-white hover:border-forest-300"
                }`}
            >
              <img src={chain.logo} alt={chain.name} className="w-7 h-7 rounded-full" />
              <span className="text-forest-700 leading-none">{chain.name.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Token */}
      <div className="mb-5">
        <label className="label">Token to send</label>
        <div className="grid grid-cols-3 gap-2">
          {(selectedChain?.tokens ?? TOKENS).map((token) => (
            <button
              key={token}
              type="button"
              onClick={() => onChange({ senderToken: token as SupportedToken })}
              className={`py-2.5 rounded-xl border-2 text-sm font-semibold transition-all
                ${form.senderToken === token
                  ? "border-forest-800 bg-forest-800 text-cream"
                  : "border-forest-100 bg-white text-forest-700 hover:border-forest-300"
                }`}
            >
              {token}
            </button>
          ))}
        </div>
      </div>

      {/* Amount */}
      <div className="mb-6">
        <label className="label">Amount (USD equivalent)</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-400 font-semibold text-sm">
            $
          </span>
          <input
            type="number"
            min="1"
            step="0.01"
            placeholder="0.00"
            value={form.amount}
            onChange={(e) => {
              onChange({ amount: e.target.value });
              setAmountError("");
            }}
            className="input-field pl-8 text-lg font-semibold"
          />
        </div>
        {amountError && (
          <p className="text-red-500 text-xs mt-1.5">{amountError}</p>
        )}
        <p className="text-xs text-forest-400 mt-1.5">
          Recipient receives USDC on Solana · Transfer fee ~1.5%
        </p>
      </div>

      <button type="button" onClick={validateAndNext} className="btn-gold w-full">
        Continue
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
