import { Link } from "react-router-dom";
import { useTransactionHistory } from "@/hooks/useTransactionHistory";
import { TransactionCard } from "@/components/transaction/TransactionCard";
import { RefreshCw, Send } from "lucide-react";
import { CowrieLogo } from "@/components/ui/CowrieLogo";

export function History() {
  const { transactions, refresh } = useTransactionHistory();

  const total = transactions.reduce((sum, t) => sum + t.recipientAmountUsdc, 0);
  const completed = transactions.filter((t) => t.status === "completed").length;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-cream to-forest-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="text-2xl font-bold text-forest-900"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Transaction history
            </h1>
            <p className="text-forest-500 text-sm mt-0.5">
              All your cross-chain transfers via KIRAPAY
            </p>
          </div>
          <button type="button" onClick={refresh} className="btn-ghost">
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="card text-center">
            <p className="text-2xl font-bold text-forest-900">{transactions.length}</p>
            <p className="text-xs text-forest-500 mt-0.5">Total transfers</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl font-bold text-forest-900">{completed}</p>
            <p className="text-xs text-forest-500 mt-0.5">Completed</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl font-bold text-gold-600">${total.toFixed(0)}</p>
            <p className="text-xs text-forest-500 mt-0.5">Total USDC sent</p>
          </div>
        </div>

        {transactions.length === 0 ? (
          <div className="card text-center py-16">
            <CowrieLogo size={48} className="mx-auto mb-4" />
            <p className="font-semibold text-forest-700 mb-2">No transfers yet</p>
            <p className="text-xs text-forest-400 mb-6">
              Send your first cross-chain transfer via KIRAPAY
            </p>
            <Link to="/send" className="btn-gold">
              <Send size={14} />
              Send money
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {transactions.map((txn) => (
              <TransactionCard key={txn.id} txn={txn} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
