/** Destination token/chain for the payment */
export interface KirapayTokenOut {
  /** e.g. "sol", "eth", "polygon" */
  chainId: string;
  /** Token contract/mint address. Empty string for native tokens. */
  address: string;
}

/** Config passed to ButtonDynamicPrice / link-generate */
export interface KirapayLinkConfig {
  /** Amount in USD (or crypto if isViewAsCrypto = true) */
  price: number;
  /** Optional idempotency / order reference */
  customOrderId?: string;
  /** Human-readable name shown in the checkout */
  name?: string;
  /** Recipient wallet address (Solana address for SOL settlement) */
  receiver: string;
  /** URL to redirect to after the user completes or cancels payment */
  redirectUrl?: string;
  /** "single_use" (default) or "multi_use" */
  type?: string;
  /** If true, price is displayed as crypto rather than USD */
  isViewAsCrypto?: boolean;
  /** Crypto currency symbol for display (e.g. "ETH") */
  cryptoCurrency?: string;
  /** Output token configuration */
  tokenOut?: KirapayTokenOut;
}

/** Response from POST /api/link/generate */
export interface KirapayLinkResponse {
  data: {
    url: string;
  };
}

