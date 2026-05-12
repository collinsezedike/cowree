import { Link } from "react-router-dom";
import { ArrowRight, Zap, Globe, Shield, Clock } from "lucide-react";
import { CowrieLogo } from "@/components/ui/CowrieLogo";

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Connect your wallet",
    body: "Connect any EVM wallet (MetaMask, Rainbow, Coinbase) on Ethereum, Polygon, Arbitrum, and more.",
  },
  {
    step: "02",
    title: "Enter recipient details",
    body: "Paste the recipient's Solana wallet address. They just need a Phantom or Backpack wallet.",
  },
  {
    step: "03",
    title: "KIRAPAY routes the transfer",
    body: "KIRAPAY handles all cross-chain settlement invisibly — no bridges, no friction.",
  },
  {
    step: "04",
    title: "USDC lands on Solana",
    body: "Your recipient receives USDC on Solana, usually within minutes.",
  },
];

const FEATURES = [
  {
    icon: <Zap className="text-gold-500" size={24} />,
    title: "One transaction",
    body: "No manual bridging. No DEX hunting. Just send — KIRAPAY handles the rest.",
  },
  {
    icon: <Globe className="text-gold-500" size={24} />,
    title: "Any chain to Solana",
    body: "Send from Ethereum, Polygon, Arbitrum, Optimism, or Base. Settle in USDC on Solana.",
  },
  {
    icon: <Shield className="text-gold-500" size={24} />,
    title: "Secure & non-custodial",
    body: "Your keys, your funds. KIRAPAY facilitates; you always stay in control.",
  },
  {
    icon: <Clock className="text-gold-500" size={24} />,
    title: "Real-time status",
    body: "Watch your transfer progress live: Initiated → Routing → Settled on Solana.",
  },
];

const COWRIE_FACTS = [
  { value: "5,000+", label: "years of history" },
  { value: "40+", label: "African nations used it" },
  { value: "3 routes", label: "Sea, land & river trade" },
  { value: "1 token", label: "One universal value store" },
];

export function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center">
        <div
          aria-hidden
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #1B4332 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, #D4A017 0%, transparent 50%)`,
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-100 text-forest-800 text-xs font-semibold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                Powered by KIRAPAY
              </div>

              <h1
                className="text-5xl md:text-6xl font-bold text-forest-900 leading-tight mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Money moves
                <br />
                <span className="text-gold-500">like cowrie shells</span>
                <br />
                once did.
              </h1>

              <p className="text-xl text-forest-600 leading-relaxed mb-8">
                Send from any chain. Receive USDC on Solana. KIRAPAY handles all
                cross-chain settlement — seamlessly, in one transaction.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/send" className="btn-gold text-base px-8 py-4">
                  Send Money
                  <ArrowRight size={18} />
                </Link>
                <Link to="/receive" className="btn-outline text-base px-8 py-4">
                  Receive on Solana
                </Link>
              </div>

              <p className="mt-4 text-xs text-forest-500">
                No account needed · Non-custodial · Settles in minutes
              </p>
            </div>

            <div className="hidden md:flex justify-center items-center">
              <div
                className="relative"
                style={{ animation: "float 8s ease-in-out infinite" }}
              >
                <CowrieLogo size={240} />
                <div className="absolute -inset-8 rounded-full bg-gold-500/10 blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-forest-900 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {COWRIE_FACTS.map(({ value, label }) => (
            <div key={label}>
              <div className="text-3xl font-bold text-gold-400 mb-1">{value}</div>
              <div className="text-sm text-cream/60">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold text-forest-900 mb-3"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            How Cowree works
          </h2>
          <p className="text-forest-600 text-lg max-w-xl mx-auto">
            Four steps. One transaction. Powered entirely by KIRAPAY.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_IT_WORKS.map(({ step, title, body }) => (
            <div
              key={step}
              className="card relative overflow-hidden hover:shadow-card-hover transition-all"
            >
              <div className="text-6xl font-bold text-forest-50 absolute top-3 right-4 select-none">
                {step}
              </div>
              <div className="relative">
                <div className="w-8 h-0.5 bg-gold-400 mb-4" />
                <h3 className="font-semibold text-forest-900 mb-2 text-base">{title}</h3>
                <p className="text-sm text-forest-600 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Cowrie Story */}
      <section className="bg-gradient-to-br from-forest-800 to-forest-900 py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex gap-3 mb-6">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      animationDelay: `${i * 0.4}s`,
                      animation: "float 5s ease-in-out infinite",
                    }}
                  >
                    <CowrieLogo size={26} />
                  </div>
                ))}
              </div>
              <h2
                className="text-4xl font-bold text-cream mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Africa&apos;s original global currency
              </h2>
              <p className="text-cream/70 leading-relaxed mb-4">
                For thousands of years, cowrie shells crossed oceans and deserts,
                enabling trade between communities that shared no language, no
                border, no bank. They were trusted because they were scarce,
                portable, and universally recognised.
              </p>
              <p className="text-cream/70 leading-relaxed">
                Cowree carries that spirit into the age of blockchain: universal,
                borderless, and built for people — not institutions.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {FEATURES.map(({ icon, title, body }) => (
                <div
                  key={title}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10"
                >
                  <div className="mb-3">{icon}</div>
                  <h4 className="text-cream font-semibold mb-1.5 text-sm">{title}</h4>
                  <p className="text-cream/60 text-xs leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center max-w-2xl mx-auto px-4">
        <CowrieLogo size={56} className="mx-auto mb-6" />
        <h2
          className="text-3xl md:text-4xl font-bold text-forest-900 mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Ready to send?
        </h2>
        <p className="text-forest-600 text-lg mb-8">
          Connect your wallet, paste a Solana address, and let KIRAPAY do the rest.
        </p>
        <Link to="/send" className="btn-gold text-base px-10 py-4">
          Start a transfer
          <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
