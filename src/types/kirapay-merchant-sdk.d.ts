/**
 * Augments the incomplete official types for kirapay-merchant-sdk.
 * The published index.d.ts only declares price + apiKey, but the SDK
 * accepts the full set of fields documented in the README and implemented
 * in the ESM source.
 */
declare module "kirapay-merchant-sdk" {
  export interface TokenOut {
    chainId: string;
    address: string;
  }

  export interface ButtonDynamicPriceConfig {
    price: number;
    apiKey: string;
    customOrderId?: string;
    name?: string;
    receiver?: string;
    redirectUrl?: string;
    type?: string;
    isViewAsCrypto?: boolean;
    cryptoCurrency?: string;
    tokenOut?: TokenOut;
    title?: string;
    className?: string;
    style?: Record<string, string | number>;
    loading?: boolean;
  }

  export class ButtonDynamicPrice {
    constructor(config: ButtonDynamicPriceConfig);
    render(): HTMLElement;
    destroy(): void;
    setLoading(loading: boolean): void;
    updatePrice(price: number): void;
  }

  const KiraPay: {
    ButtonDynamicPrice: typeof ButtonDynamicPrice;
  };

  export default KiraPay;
}

declare global {
  interface Window {
    kirapay: {
      ButtonDynamicPrice: typeof import("kirapay-merchant-sdk").ButtonDynamicPrice;
    };
  }
}
