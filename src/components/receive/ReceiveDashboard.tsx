import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Copy, CheckCircle, ExternalLink, RefreshCw, Wallet } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useTransactionHistory } from "@/hooks/useTransactionHistory";
import { CowrieLogo } from "@/components/ui/CowrieLogo";

export function ReceiveDashboard() {
  const { connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  const [copied, setCopied] = useState(false);
  const { transactions, refresh } = useTransactionHistory();

  const address = publicKey?.toBase58() ?? "";
  const incomingTxns = transactions.filter(
    (t) => t.recipientAddress === address
  );

  const copyAddress = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    toast.success("Address copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (!connected) {
    return (
      <div className="text-center py-16">
        <CowrieLogo size={48} className="mx-auto mb-4" />
        <h2
          className="text-2xl font-bold text-forest-900 mb-2"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Receive USDC on Solana
        </h2>
        <p className="text-forest-500 text-sm mb-6 max-w-xs mx-auto">
          Connect your Solana wallet to see incoming transfers from any chain,
          routed by Cowree.
        </p>
        <div className="flex justify-center">
          <button type="button" onClick={() => setVisible(true)} className="btn-gold">
            <Wallet size={16} />
            Connect wallet
          </button>
        </div>
        <p className="mt-4 text-xs text-forest-400">
          No sign-up required
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Address card */}
      <div className="card mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="label">Your Solana address</p>
            <p className="font-mono text-sm text-forest-900 break-all">{address}</p>
          </div>
          <button
            type="button"
            onClick={copyAddress}
            className="btn-ghost shrink-0 ml-4"
          >
            {copied ? <CheckCircle size={16} className="text-forest-800" /> : <Copy size={16} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="p-3 rounded-xl bg-forest-50 border border-forest-100">
          <p className="text-xs text-forest-600">
            Share this address with anyone sending you money via Cowree. They&apos;ll
            send from any chain — Cowree delivers USDC directly here.
          </p>
        </div>
      </div>

      {/* Incoming transfers */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-forest-900">Incoming transfers</h3>
        <button type="button" onClick={refresh} className="btn-ghost py-1.5">
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {incomingTxns.length === 0 ? (
        <div className="card text-center py-12">
          <div className="w-12 h-12 rounded-full bg-forest-50 flex items-center justify-center mx-auto mb-3">
            <CowrieLogo size={28} />
          </div>
          <p className="font-medium text-forest-700 mb-1">No incoming transfers yet</p>
          <p className="text-xs text-forest-400">
            Share your address to start receiving USDC
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {incomingTxns.map((txn) => (
            <div key={txn.id} className="card">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold text-forest-900">
                    ${txn.recipientAmountUsdc.toFixed(2)} USDC
                  </p>
                  <p className="text-xs text-forest-500 capitalize">
                    from {txn.senderChain} · {new Date(txn.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <StatusBadge status={txn.status} />
              </div>
              {txn.kirapayTxnId && (
                <div className="flex items-center gap-1 text-xs text-forest-400">
                  <span>Transfer ID: {txn.kirapayTxnId}</span>
                  {txn.paymentLinkUrl && txn.paymentLinkUrl !== "#demo" && (
                    <a
                      href={txn.paymentLinkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-forest-600 hover:text-forest-900"
                    >
                      <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
