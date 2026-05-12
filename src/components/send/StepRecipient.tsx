import { SendFormData } from "@/types";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { useState } from "react";

interface Props {
  form: SendFormData;
  onChange: (patch: Partial<SendFormData>) => void;
  onBack: () => void;
  onNext: () => void;
}

function isValidSolanaAddress(addr: string): boolean {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(addr.trim());
}

export function StepRecipient({ form, onChange, onBack, onNext }: Props) {
  const [errors, setErrors] = useState<{ address?: string }>({});

  const validateAndNext = () => {
    const errs: { address?: string } = {};

    if (!form.recipientAddress.trim()) {
      errs.address = "Solana wallet address is required";
    } else if (!isValidSolanaAddress(form.recipientAddress)) {
      errs.address = "Invalid Solana address — must be 32–44 base58 characters";
    }

    setErrors(errs);
    if (Object.keys(errs).length === 0) onNext();
  };

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-forest-900 mb-1">
        Recipient details
      </h2>
      <p className="text-sm text-forest-500 mb-6">
        Enter the recipient&apos;s Solana wallet address
      </p>

      {/* Solana address */}
      <div className="mb-5">
        <label className="label">Solana wallet address</label>
        <input
          type="text"
          placeholder="e.g. 7nYabs9dUhvxYwdTnrWVBL9MYViKYaRpgrLCv8Vn3fY"
          value={form.recipientAddress}
          onChange={(e) => {
            onChange({ recipientAddress: e.target.value });
            setErrors({});
          }}
          className={`input-field font-mono text-xs ${errors.address ? "border-red-400 focus:border-red-500" : ""}`}
        />
        {errors.address ? (
          <p className="text-red-500 text-xs mt-1.5">{errors.address}</p>
        ) : (
          <p className="text-xs text-forest-400 mt-1.5">
            Phantom, Backpack, or any Solana wallet address
          </p>
        )}
      </div>

      {/* Optional name */}
      <div className="mb-5">
        <label className="label">Recipient name (optional)</label>
        <input
          type="text"
          placeholder="e.g. Amara Osei"
          value={form.recipientName ?? ""}
          onChange={(e) => onChange({ recipientName: e.target.value })}
          className="input-field"
        />
      </div>

      {/* Optional note */}
      <div className="mb-6">
        <label className="label">Note (optional)</label>
        <input
          type="text"
          placeholder="e.g. Monthly support, Invoice #42"
          value={form.note ?? ""}
          onChange={(e) => onChange({ note: e.target.value })}
          className="input-field"
        />
      </div>

      {/* Info box */}
      <div className="p-3 rounded-xl bg-gold-50 border border-gold-200 flex gap-2.5 mb-6">
        <Info size={14} className="text-gold-600 shrink-0 mt-0.5" />
        <p className="text-xs text-gold-800 leading-relaxed">
          The recipient only needs a Solana wallet. No app or account setup required —
          Cowree delivers USDC directly to their address.
        </p>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="btn-ghost px-4">
          <ArrowLeft size={16} />
          Back
        </button>
        <button type="button" onClick={validateAndNext} className="btn-gold flex-1">
          Review transfer
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
