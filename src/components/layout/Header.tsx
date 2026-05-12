import { Link, useLocation } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CowrieLogo, CowreeWordmark } from "@/components/ui/CowrieLogo";
import { ArrowUpRight, History, Inbox, Play, Send } from "lucide-react";

const NAV_LINKS = [
  { href: "/send", label: "Send", icon: <Send size={15} /> },
  { href: "/receive", label: "Receive", icon: <Inbox size={15} /> },
  { href: "/history", label: "History", icon: <History size={15} /> },
  { href: "/demo", label: "Demo", icon: <Play size={15} /> },
];

export function Header() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-cream/80 backdrop-blur-md border-b border-forest-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <CowrieLogo size={34} />
          <CowreeWordmark className="text-xl" />
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label, icon }) => (
            <Link
              key={href}
              to={href}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${pathname === href
                  ? "bg-forest-800 text-cream"
                  : "text-forest-700 hover:bg-forest-100 hover:text-forest-900"
                }`}
            >
              {icon}
              {label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ConnectButton.Custom>
            {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
              const connected = mounted && account && chain;
              return (
                <div {...(!mounted && { "aria-hidden": true, style: { opacity: 0, pointerEvents: "none", userSelect: "none" } })}>
                  {!connected ? (
                    <button
                      onClick={openConnectModal}
                      type="button"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-forest-700 hover:bg-forest-100 hover:text-forest-900"
                    >
                      Connect Wallet
                    </button>
                  ) : chain.unsupported ? (
                    <button
                      onClick={openChainModal}
                      type="button"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-red-600 hover:bg-red-50"
                    >
                      Wrong network
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={openChainModal}
                        type="button"
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-forest-700 hover:bg-forest-100"
                      >
                        {chain.hasIcon && chain.iconUrl && (
                          <img src={chain.iconUrl} alt={chain.name} className="w-4 h-4 rounded-full" />
                        )}
                      </button>
                      <button
                        onClick={openAccountModal}
                        type="button"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-forest-700 hover:bg-forest-100 hover:text-forest-900"
                      >
                        {account.displayName}
                      </button>
                    </div>
                  )}
                </div>
              );
            }}
          </ConnectButton.Custom>
          <Link
            to="/send"
            className="hidden sm:flex btn-gold py-2 px-4 text-xs"
          >
            Send Money
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </header>
  );
}
