export type SupportedChain =
  | "ethereum"
  | "polygon"
  | "arbitrum"
  | "optimism"
  | "base"
  | "solana";

export type SupportedToken = "ETH" | "USDC" | "USDT" | "MATIC" | "ARB";

export type TransactionStatus =
  | "initiated"
  | "processing"
  | "routing"
  | "settling"
  | "completed"
  | "failed"
  | "cancelled";

export interface ChainConfig {
  id: SupportedChain;
  name: string;
  icon: string;
  isEVM: boolean;
  tokens: SupportedToken[];
  chainId?: number;
}

export interface SendFormData {
  senderChain: SupportedChain;
  senderToken: SupportedToken;
  amount: string;
  recipientAddress: string;
  recipientName?: string;
  note?: string;
}

export interface QuoteResult {
  quoteId: string;
  baseAmount: number;
  baseCurrency: string;
  quoteAmount: number;
  quoteCurrency: string;
  rate: number;
  fees: { totalFees: number };
  expiresAt: string;
}

export interface Transaction {
  id: string;
  kirapayTxnId: string;
  paymentLinkUrl?: string;
  senderChain: SupportedChain;
  senderToken: SupportedToken;
  amount: number;
  recipientAddress: string;
  recipientName?: string;
  recipientAmountUsdc: number;
  status: TransactionStatus;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface KirapayRecipient {
  id: string;
  userId: string;
  type: "individual";
  firstName: string;
  lastName: string;
  account: {
    type: "WALLET";
    token: "USDC";
    network: "solana";
    walletAddress: string;
  };
}

export interface KirapayPaymentLink {
  id: string;
  url: string;
  status: string;
  amount: number;
  currency: string;
  recipientId: string;
  createdAt: string;
}

export interface StatusStep {
  id: TransactionStatus;
  label: string;
  description: string;
  completedAt?: string;
}
