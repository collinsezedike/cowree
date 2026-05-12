import { Transaction, TransactionStatus } from "@/types";

export const DEMO_STEPS: Array<{
  status: TransactionStatus;
  label: string;
  description: string;
  delay: number;
}> = [
  {
    status: "initiated",
    label: "Initiated",
    description: "Your ETH transfer has been received",
    delay: 0,
  },
  {
    status: "processing",
    label: "Processing",
    description: "Verifying funds and preparing cross-chain route",
    delay: 2000,
  },
  {
    status: "routing",
    label: "Cross-chain routing",
    description: "KIRAPAY is bridging ETH → USDC across chains",
    delay: 5000,
  },
  {
    status: "settling",
    label: "Settling on Solana",
    description: "USDC arriving in recipient's Solana wallet",
    delay: 9000,
  },
  {
    status: "completed",
    label: "Completed",
    description: "Transfer complete — USDC delivered on Solana",
    delay: 12000,
  },
];

export const DEMO_TRANSACTION: Transaction = {
  id: "demo-txn-001",
  kirapayTxnId: "kp_demo_4a8b2c9d",
  paymentLinkUrl: "#demo",
  senderChain: "ethereum",
  senderToken: "ETH",
  amount: 0.05,
  recipientAddress: "7nYabs9dUhvxYwdTnrWVBL9MYViKYaRpgrLCv8Vn3fY",
  recipientName: "Amara Osei",
  recipientAmountUsdc: 92.45,
  status: "completed",
  createdAt: new Date(Date.now() - 86400000).toISOString(),
  updatedAt: new Date(Date.now() - 86300000).toISOString(),
  completedAt: new Date(Date.now() - 86280000).toISOString(),
};

export const DEMO_HISTORY: Transaction[] = [
  DEMO_TRANSACTION,
  {
    id: "demo-txn-002",
    kirapayTxnId: "kp_demo_7e3f1a2b",
    senderChain: "polygon",
    senderToken: "USDC",
    amount: 50,
    recipientAddress: "DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX9C1pqUqFdkPv",
    recipientName: "Kofi Mensah",
    recipientAmountUsdc: 49.25,
    status: "completed",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172700000).toISOString(),
    completedAt: new Date(Date.now() - 172680000).toISOString(),
  },
  {
    id: "demo-txn-003",
    kirapayTxnId: "kp_demo_9c5d8e1f",
    senderChain: "ethereum",
    senderToken: "USDC",
    amount: 200,
    recipientAddress: "EkFut3dZkbXkL9oTmMkAUHMa6HsFGKFu5Mk3cP4jxDNR",
    recipientName: "Zara Diallo",
    recipientAmountUsdc: 197.8,
    status: "completed",
    createdAt: new Date(Date.now() - 604800000).toISOString(),
    updatedAt: new Date(Date.now() - 604600000).toISOString(),
    completedAt: new Date(Date.now() - 604580000).toISOString(),
  },
];

export const SUPPORTED_CHAINS = [
  { id: "ethereum", name: "Ethereum", icon: "⟠", isEVM: true, tokens: ["ETH", "USDC", "USDT"], chainId: 1 },
  { id: "polygon", name: "Polygon", icon: "⬡", isEVM: true, tokens: ["USDC", "USDT", "MATIC"], chainId: 137 },
  { id: "arbitrum", name: "Arbitrum", icon: "◈", isEVM: true, tokens: ["ETH", "USDC"], chainId: 42161 },
  { id: "optimism", name: "Optimism", icon: "◎", isEVM: true, tokens: ["ETH", "USDC"], chainId: 10 },
  { id: "base", name: "Base", icon: "⬤", isEVM: true, tokens: ["ETH", "USDC"], chainId: 8453 },
] as const;
