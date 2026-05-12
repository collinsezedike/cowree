import { useState, useEffect, useRef } from "react";
import { TransactionStatus } from "@/types";
import { DEMO_STEPS } from "@/lib/demo/demoData";
import { updateTransaction } from "@/lib/store/transactions";

interface StatusState {
  status: TransactionStatus;
  label: string;
  description: string;
  completedSteps: TransactionStatus[];
  error: string | null;
  isPolling: boolean;
}

export function useTransactionStatus(
  txnId: string | null,
  isDemo = false
): StatusState {
  const [state, setState] = useState<StatusState>({
    status: "initiated",
    label: "Initiated",
    description: "Transfer initiated",
    completedSteps: [],
    error: null,
    isPolling: false,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!txnId) return;

    if (isDemo) {
      // Simulate the demo flow
      let idx = 0;
      const advance = () => {
        const step = DEMO_STEPS[idx];
        if (!step) return;
        setState((prev) => ({
          ...prev,
          status: step.status,
          label: step.label,
          description: step.description,
          completedSteps: DEMO_STEPS.slice(0, idx).map((s) => s.status),
        }));
        idx++;
        if (idx < DEMO_STEPS.length) {
          const next = DEMO_STEPS[idx];
          intervalRef.current = setTimeout(advance, next.delay - step.delay);
        }
      };
      advance();
      return () => {
        if (intervalRef.current) clearTimeout(intervalRef.current);
      };
    }

    // Real polling against KIRAPAY
    setState((prev) => ({ ...prev, isPolling: true }));

    const poll = async () => {
      try {
        const res = await fetch(`/api/kirapay/status/${txnId}`);
        if (!res.ok) throw new Error("Status fetch failed");
        const data = await res.json();

        const statusMap: Record<string, TransactionStatus> = {
          pending: "processing",
          processing: "routing",
          completed: "completed",
          failed: "failed",
          cancelled: "cancelled",
        };

        const mapped = statusMap[data.status] ?? "processing";
        setState((prev) => ({
          ...prev,
          status: mapped,
          label: mapped.charAt(0).toUpperCase() + mapped.slice(1),
          description: `Transaction ${data.status}`,
          isPolling: mapped !== "completed" && mapped !== "failed",
        }));

        updateTransaction(txnId, { status: mapped });

        if (mapped === "completed" || mapped === "failed") {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      } catch {
        setState((prev) => ({ ...prev, error: "Could not fetch status" }));
      }
    };

    poll();
    intervalRef.current = setInterval(poll, 8000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [txnId, isDemo]);

  return state;
}
