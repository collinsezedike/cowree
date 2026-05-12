import { SendFormData } from "@/types";
import { SUPPORTED_CHAINS, SOLANA_LOGO } from "@/lib/demo/demoData";
import { SOLANA_USDC_MINT } from "@/lib/kirapay/constants";
import { KirapayButton } from "./KirapayButton";
import { ArrowLeft, ArrowDown, Info } from "lucide-react";

interface Props {
  form: SendFormData;
  onBack: () => void;
  onComplete?: () => void;
}

export function StepReview({ form, onBack }: Props) {
  const chain = SUPPORTED_CHAINS.find((c) => c.id === form.senderChain);
  const amount = parseFloat(form.amount);
  const kirapayFeeEstimate = amount * 0.015;
  const recipientGets = amount - kirapayFeeEstimate;

  const shortAddress = form.recipientAddress
    ? `${form.recipientAddress.slice(0, 6)}...${form.recipientAddress.slice(-4)}`
    : "";

  const appUrl = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <div>
      <h2 className="font-display text-xl font-bold text-forest-900 mb-1">
        Review &amp; pay
      </h2>
      <p className="text-sm text-forest-500 mb-6">
        Confirm the details, then complete your payment
      </p>

      {/* Transfer flow visual */}
      <div className="bg-forest-50 rounded-xl p-4 mb-5">
        <div className="flex items-center gap-3 p-3 bg-white rounded-lg mb-2">
          <img
            src={chain?.logo ?? "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png"}
            alt={chain?.name ?? "Ethereum"}
            className="w-8 h-8 rounded-full shrink-0"
          />
          <div>
            <p className="text-xs text-forest-500">{chain?.name ?? "Ethereum"} · You send</p>
            <p className="font-semibold text-forest-900">
              ${amount.toFixed(2)} {form.senderToken}
            </p>
          </div>
        </div>

        <div className="flex justify-center my-1">
          <div className="flex items-center gap-1.5 bg-gold-100 text-gold-700 text-xs font-semibold px-3 py-1 rounded-full">
            <ArrowDown size={10} />
            Cowree routes cross-chain
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
          <img src={SOLANA_LOGO} alt="Solana" className="w-8 h-8 rounded-full shrink-0" />
          <div>
            <p className="text-xs text-forest-500">
              {form.recipientName ? `${form.recipientName} · ` : ""}Solana · Recipient gets
            </p>
            <p className="font-semibold text-forest-900">
              ~${recipientGets.toFixed(2)} USDC
            </p>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-2.5 mb-5 text-sm">
        <div className="flex justify-between">
          <span className="text-forest-600">Recipient address</span>
          <span className="font-mono text-forest-900 text-xs">{shortAddress}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-forest-600">Transfer fee (est.)</span>
          <span className="text-forest-700">~${kirapayFeeEstimate.toFixed(2)}</span>
        </div>
        <div className="h-px bg-forest-100" />
        <div className="flex justify-between font-semibold">
          <span className="text-forest-900">Recipient gets</span>
          <span className="text-forest-900">~${recipientGets.toFixed(2)} USDC on Solana</span>
        </div>
      </div>

      {/* Info */}
      <div className="flex gap-2 p-3 rounded-xl bg-gold-50 border border-gold-200 mb-5">
        <Info size={13} className="text-gold-600 shrink-0 mt-0.5" />
        <p className="text-xs text-gold-800 leading-relaxed">
          Clicking the button below opens the checkout.
          Pay with any connected wallet — Cowree delivers USDC to the Solana address above.
        </p>
      </div>

      {/* KIRAPAY payment button */}
      <div className="mb-4">
        <KirapayButton
          config={{
            price: amount,
            name: `Cowree transfer${form.recipientName ? ` to ${form.recipientName}` : ""}`,
            receiver: form.recipientAddress,
            redirectUrl: `${appUrl}/status?from=kirapay`,
            type: "single_use",
            isViewAsCrypto: false,
            tokenOut: {
              chainId: "sol",
              address: SOLANA_USDC_MINT,
            },
          }}
        />
      </div>

      <button type="button" onClick={onBack} className="btn-ghost w-full justify-center">
        <ArrowLeft size={15} />
        Back
      </button>
    </div>
  );
}
