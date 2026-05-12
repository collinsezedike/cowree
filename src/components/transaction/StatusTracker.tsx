import { useTransactionStatus } from "@/hooks/useTransactionStatus";
import { DEMO_STEPS } from "@/lib/demo/demoData";
import { TransactionStatus } from "@/types";
import { CheckCircle, Circle, Loader2, XCircle } from "lucide-react";

interface Props {
  txnId: string;
  isDemo?: boolean;
}

const STATUS_ORDER: TransactionStatus[] = [
  "initiated",
  "processing",
  "routing",
  "settling",
  "completed",
];

function getStepStatus(
  stepStatus: TransactionStatus,
  currentStatus: TransactionStatus
): "completed" | "active" | "pending" | "error" {
  if (currentStatus === "failed" || currentStatus === "cancelled") {
    const stepIdx = STATUS_ORDER.indexOf(stepStatus);
    const currentIdx = STATUS_ORDER.indexOf(currentStatus);
    if (stepIdx < currentIdx) return "completed";
    return "error";
  }

  const stepIdx = STATUS_ORDER.indexOf(stepStatus);
  const currentIdx = STATUS_ORDER.indexOf(currentStatus);

  if (stepIdx < currentIdx) return "completed";
  if (stepIdx === currentIdx) return "active";
  return "pending";
}

export function StatusTracker({ txnId, isDemo = false }: Props) {
  const { status, label, error } = useTransactionStatus(txnId, isDemo);

  const isFinal = status === "completed" || status === "failed" || status === "cancelled";

  return (
    <div className="card max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-xs text-forest-500 font-semibold uppercase tracking-wide mb-0.5">
            Transfer status
          </p>
          <p className="font-semibold text-forest-900">{label}</p>
        </div>
        {!isFinal && (
          <div className="flex items-center gap-1.5 text-xs text-forest-500">
            <Loader2 size={12} className="animate-spin text-gold-500" />
            <span>Updating...</span>
          </div>
        )}
        {status === "completed" && (
          <CheckCircle className="text-forest-800" size={20} />
        )}
        {(status === "failed" || status === "cancelled") && (
          <XCircle className="text-red-500" size={20} />
        )}
      </div>

      {/* Steps */}
      <div className="space-y-0">
        {DEMO_STEPS.map((step, idx) => {
          const stepState = getStepStatus(step.status, status);
          const isLast = idx === DEMO_STEPS.length - 1;

          return (
            <div key={step.status} className="flex gap-3">
              {/* Line + icon */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-500
                    ${stepState === "completed" ? "bg-forest-800" : ""}
                    ${stepState === "active" ? "bg-gold-500 ring-4 ring-gold-100" : ""}
                    ${stepState === "pending" ? "bg-forest-100" : ""}
                    ${stepState === "error" ? "bg-red-100" : ""}
                  `}
                >
                  {stepState === "completed" && <CheckCircle size={14} className="text-cream" />}
                  {stepState === "active" && <Loader2 size={14} className="text-forest-900 animate-spin" />}
                  {stepState === "pending" && <Circle size={14} className="text-forest-300" />}
                  {stepState === "error" && <XCircle size={14} className="text-red-500" />}
                </div>
                {!isLast && (
                  <div
                    className={`w-0.5 h-8 transition-all duration-500 ${stepState === "completed" ? "bg-forest-800" : "bg-forest-100"}`}
                  />
                )}
              </div>

              {/* Content */}
              <div className="pb-6">
                <p className={`text-sm font-semibold mb-0.5 ${stepState === "active" ? "text-gold-600" : stepState === "completed" ? "text-forest-900" : "text-forest-400"}`}>
                  {step.label}
                </p>
                <p className={`text-xs ${stepState === "active" ? "text-forest-600" : "text-forest-400"}`}>
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <div className="mt-2 p-2.5 rounded-lg bg-red-50 text-red-700 text-xs">
          {error}
        </div>
      )}

      {status === "completed" && (
        <div className="mt-2 p-3 rounded-xl bg-forest-50 border border-forest-200 text-center">
          <p className="text-sm font-semibold text-forest-900">Transfer complete</p>
          <p className="text-xs text-forest-500 mt-0.5">USDC delivered on Solana</p>
        </div>
      )}

      {isDemo && (
        <p className="text-center text-xs text-forest-400 mt-4">
          Demo simulation · Powered by Cowree
        </p>
      )}
    </div>
  );
}
