# Cowree — Cross-Chain Remittances, Powered by KIRAPAY

> *Named after the cowrie shell — West Africa's original cross-border currency.*

[![Built with KIRAPAY](https://img.shields.io/badge/Powered%20by-KIRAPAY-1B4332?style=flat-square)](https://www.kira-pay.com)
[![Next.js 14](https://img.shields.io/badge/Next.js-14-black?style=flat-square)](https://nextjs.org)
[![Solana](https://img.shields.io/badge/Settles%20on-Solana-9945FF?style=flat-square)](https://solana.com)

---

## What is Cowree?

Cowree is a consumer-friendly cross-chain remittance app. A sender on **any EVM chain** (Ethereum, Polygon, Arbitrum, Optimism, Base) initiates a transfer — and the recipient receives **USDC on Solana**. KIRAPAY handles all cross-chain settlement invisibly, in one transaction.

The name Cowree is inspired by the **cowrie shell** — the small, speckled mollusc that served as West Africa's universal currency for over 5,000 years. Cowrie shells crossed oceans and deserts, enabling trade between communities that shared no language, no border, no bank. That spirit lives on.

---

## Why it matters

Global remittances are a $850B/year industry. Most of that value is destroyed by:

- 5–10% fees on traditional rails (Western Union, bank wires)
- Fragmentation: senders and recipients use different chains
- Complexity: recipients must navigate bridges, DEXes, and wallets

Cowree collapses this to a single flow: **connect, enter address, KIRAPAY routes it, USDC arrives**.

---

## How KIRAPAY is integrated

KIRAPAY is the **core settlement infrastructure** — not an optional add-on. Every transfer goes through these KIRAPAY API calls:

| Step | API Call | What it does |
| ---- | -------- | ------------ |
| 1 | `POST /auth` | Obtains a JWT bearer token using client credentials |
| 2 | `POST /v1/recipients` | Registers the recipient's Solana USDC wallet with KIRAPAY |
| 3 | `POST /v1/quotations` | Fetches a live exchange rate + fee estimate |
| 4 | `POST /v1/payment-link` | Creates a KIRAPAY-hosted payment page for the sender |
| 5 | `GET /v1/payment-link/{id}` | Polls KIRAPAY for real-time settlement status |

All KIRAPAY credentials stay server-side — never exposed to the browser. The `/api/kirapay/*` routes act as a secure proxy.

---

## Features

- **Send flow** — Select source chain/token, enter recipient Solana address, get a KIRAPAY payment link
- **Receive dashboard** — Connect Phantom/Backpack, see incoming USDC transfers
- **Live status tracker** — Real-time progress: Initiated → Processing → Routing → Settling → Completed
- **Transaction history** — All past sends/receives with amounts, chains, KIRAPAY IDs
- **Demo mode** — Full walkthrough of a simulated ETH → Solana USDC transfer at `/demo`

---

## Tech stack

| Layer | Technology |
| ----- | ---------- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Settlement | KIRAPAY API (`api.balampay.com`) |
| EVM wallets | RainbowKit + wagmi + viem |
| Solana wallets | `@solana/wallet-adapter-react` (Phantom, Backpack) |
| Data fetching | TanStack React Query |
| Animations | Framer Motion |
| Deployment | Vercel |

---

## Running locally

```bash
# 1. Clone and install
git clone <repo>
cd cowree
pnpm install

# 2. Configure environment
cp .env.example .env.local
# Fill in your KIRAPAY credentials (see .env.example)

# 3. Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

To run the demo without KIRAPAY credentials, visit [http://localhost:3000/demo](http://localhost:3000/demo).

---

## Environment variables

See [.env.example](.env.example) for all required variables.

The key KIRAPAY credentials are:

- `KIRAPAY_CLIENT_ID` — your client UUID from the KIRAPAY dashboard
- `KIRAPAY_PASSWORD` — your integration password
- `KIRAPAY_API_KEY` — sent as `x-api-key` on every request
- `KIRAPAY_API_URL` — use `https://api.balampay.com/sandbox` for testing

---

## Deploying

```bash
# Deploy to Vercel (uses vercel.json config)
vercel deploy

# Set env vars in Vercel dashboard or via CLI:
vercel env add KIRAPAY_CLIENT_ID
vercel env add KIRAPAY_PASSWORD
vercel env add KIRAPAY_API_KEY
```

---

## The cowrie shell

For over 5,000 years, cowrie shells (*Cypraea moneta*) were used as currency across West and Central Africa, South Asia, and East Asia. They were:

- **Portable** — small enough to carry across continents
- **Scarce** — not easily faked or inflated
- **Universal** — recognised across language and cultural barriers

The cowrie was the original cross-border payment rail. Cowree is the modern version: same philosophy, blockchain-native infrastructure.
