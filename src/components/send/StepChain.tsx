import { SendFormData, SupportedChain, SupportedToken } from "@/types";
import { SUPPORTED_CHAINS } from "@/lib/demo/demoData";
import { ArrowRight, ChevronDown } from "lucide-react";
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
        <div className="relative">
          <select
            value={form.senderChain}
            onChange={(e) => {
              const chain = SUPPORTED_CHAINS.find((c) => c.id === e.target.value);
              onChange({
                senderChain: e.target.value as SupportedChain,
                senderToken: chain?.tokens[0] as SupportedToken ?? "USDC",
              });
            }}
            className="input-field appearance-none pr-10"
          >
            {SUPPORTED_CHAINS.map((chain) => (
              <option key={chain.id} value={chain.id}>
                {chain.icon} {chain.name}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-400 pointer-events-none"
          />
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
          Recipient receives USDC on Solana · KIRAPAY fee ~1.5%
        </p>
      </div>

      {/* Destination info */}
      <div className="p-3 rounded-xl bg-forest-50 border border-forest-100 mb-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-forest-800 flex items-center justify-center text-xs font-bold text-cream shrink-0">
          SOL
        </div>
        <div>
          <p className="text-xs font-semibold text-forest-900">Destination: Solana USDC</p>
          <p className="text-xs text-forest-500">Settled by KIRAPAY cross-chain routing</p>
        </div>
      </div>

      <button type="button" onClick={validateAndNext} className="btn-gold w-full">
        Continue
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
