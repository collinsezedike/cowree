import { Transaction } from "@/types";
import { SUPPORTED_CHAINS } from "@/lib/demo/demoData";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  txn: Transaction;
}

export function TransactionCard({ txn }: Props) {
  const chain = SUPPORTED_CHAINS.find((c) => c.id === txn.senderChain);
  const shortAddr = `${txn.recipientAddress.slice(0, 6)}...${txn.recipientAddress.slice(-4)}`;
  const date = new Date(txn.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="card hover:shadow-card-hover transition-all">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Chain icon */}
          <div className="w-9 h-9 rounded-full bg-forest-100 flex items-center justify-center text-base shrink-0">
            {chain?.icon ?? "⟠"}
          </div>
          <div>
            <p className="font-semibold text-forest-900 text-sm">
              {txn.recipientName
                ? `To ${txn.recipientName}`
                : `To ${shortAddr}`}
            </p>
            <p className="text-xs text-forest-500 capitalize">
              {txn.senderChain} → Solana · {date}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="font-semibold text-forest-900 text-sm">
            ${txn.recipientAmountUsdc.toFixed(2)} USDC
          </p>
          <p className="text-xs text-forest-500">sent ${txn.amount.toFixed(2)} {txn.senderToken}</p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-forest-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StatusBadge status={txn.status} />
          <span className="text-xs text-forest-400 font-mono">{txn.kirapayTxnId}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {txn.status !== "completed" && (
            <Link
              to={`/status?txn=${txn.kirapayTxnId}`}
              className="text-xs text-forest-600 hover:text-forest-900 flex items-center gap-1"
            >
              Track
              <ArrowRight size={11} />
            </Link>
          )}
          {txn.paymentLinkUrl && txn.paymentLinkUrl !== "#demo" && (
            <a
              href={txn.paymentLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-forest-400 hover:text-forest-700"
            >
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
