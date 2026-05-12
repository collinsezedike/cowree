import { useState } from "react";
import { Info, X } from "lucide-react";
import { Link } from "react-router-dom";

export function DemoModeBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const isDemo = import.meta.env.MODE === "development" && !import.meta.env.VITE_IS_LIVE;
  if (!isDemo) return null;

  return (
    <div className="mb-6 p-3 rounded-xl bg-amber-50 border border-amber-200 flex gap-2.5">
      <Info size={14} className="text-amber-600 shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-xs text-amber-800 font-semibold mb-0.5">Demo mode</p>
        <p className="text-xs text-amber-700 leading-relaxed">
          Running without a live API key — payments won&apos;t process.{" "}
          <Link to="/demo" className="underline font-medium">
            Watch a demo simulation instead →
          </Link>
        </p>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="text-amber-400 hover:text-amber-600 transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}
