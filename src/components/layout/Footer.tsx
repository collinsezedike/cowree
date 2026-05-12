import { Link } from "react-router-dom";
import { CowrieLogo, CowreeWordmark } from "@/components/ui/CowrieLogo";

export function Footer() {
  return (
    <footer className="bg-forest-900 text-cream/80 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <CowrieLogo size={32} />
              <CowreeWordmark className="text-xl text-cream" />
            </div>
            <p className="text-sm text-cream/60 leading-relaxed">
              Cross-chain remittances powered by KIRAPAY. Named after the cowrie shell —
              West Africa&apos;s original cross-border currency.
            </p>
          </div>

          <div>
            <h4 className="text-cream font-semibold mb-3 text-sm uppercase tracking-wide">Product</h4>
            <ul className="space-y-2 text-sm text-cream/60">
              <li><Link to="/send" className="hover:text-gold-400 transition-colors">Send Money</Link></li>
              <li><Link to="/receive" className="hover:text-gold-400 transition-colors">Receive</Link></li>
              <li><Link to="/history" className="hover:text-gold-400 transition-colors">History</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-cream font-semibold mb-3 text-sm uppercase tracking-wide">Powered by</h4>
            <p className="text-sm text-cream/60 mb-2">
              Settlement infrastructure by{" "}
              <a href="https://www.kira-pay.com" target="_blank" rel="noopener noreferrer"
                className="text-gold-400 hover:text-gold-300 font-medium">
                KIRAPAY
              </a>
            </p>
            <p className="text-xs text-cream/40 mt-4">
              © {new Date().getFullYear()} Cowree. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
