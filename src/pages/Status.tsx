import { Link, useSearchParams } from "react-router-dom";
import { StatusTracker } from "@/components/transaction/StatusTracker";
import { ArrowLeft } from "lucide-react";

export function Status() {
  const [params] = useSearchParams();
  const txnId = params.get("txn");
  const isDemo = params.get("demo") === "true" || !txnId;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-cream to-forest-50 py-12 px-4">
      <div className="max-w-sm mx-auto">
        <div className="text-center mb-8">
          <h1
            className="text-2xl font-bold text-forest-900"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Transfer status
          </h1>
          <p className="text-forest-500 text-sm mt-1">
            {isDemo && !txnId
              ? "Watching a demo transfer via KIRAPAY"
              : `KIRAPAY ID: ${txnId}`}
          </p>
        </div>

        <StatusTracker txnId={txnId ?? "demo"} isDemo={isDemo} />

        <div className="mt-6 flex justify-center gap-4">
          <Link to="/send" className="btn-ghost text-sm">
            <ArrowLeft size={14} />
            New transfer
          </Link>
          <Link to="/history" className="btn-ghost text-sm">
            All history
          </Link>
        </div>
      </div>
    </div>
  );
}
