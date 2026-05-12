import { TransactionStatus } from "@/types";
import { CheckCircle, Clock, Loader2, XCircle, ArrowRightLeft } from "lucide-react";

const CONFIG: Record<TransactionStatus, { label: string; className: string; icon: React.ReactNode }> = {
  initiated: {
    label: "Initiated",
    className: "badge-gold",
    icon: <Clock size={10} />,
  },
  processing: {
    label: "Processing",
    className: "badge-pending",
    icon: <Loader2 size={10} className="animate-spin" />,
  },
  routing: {
    label: "Routing",
    className: "badge-pending",
    icon: <ArrowRightLeft size={10} />,
  },
  settling: {
    label: "Settling",
    className: "badge-pending",
    icon: <Loader2 size={10} className="animate-spin" />,
  },
  completed: {
    label: "Completed",
    className: "badge-green",
    icon: <CheckCircle size={10} />,
  },
  failed: {
    label: "Failed",
    className: "badge-error",
    icon: <XCircle size={10} />,
  },
  cancelled: {
    label: "Cancelled",
    className: "badge-error",
    icon: <XCircle size={10} />,
  },
};

export function StatusBadge({ status }: { status: TransactionStatus }) {
  const cfg = CONFIG[status];
  return (
    <span className={cfg.className}>
      {cfg.icon}
      {cfg.label}
    </span>
  );
}
