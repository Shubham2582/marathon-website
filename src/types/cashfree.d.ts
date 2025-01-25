declare module "@cashfreepayments/cashfree-js" {
  export interface CashfreeConfig {
    mode: "production" | "test";
    redirectTarget: "_self" | "_blank" | "_top" | "_modal";
    paymentSessionId: string;
    orderToken?: string;
  }

  export interface CashfreeCheckoutConfig extends CashfreeConfig {
    onSuccess: (data: PaymentSuccessResponse) => void;
    onFailure?: (data: PaymentFailureResponse) => void;
    onError?: (error: ErrorResponse) => void;
  }

  export interface PaymentSuccessResponse {
    order: {
      orderId: string;
      orderAmount: number;
      orderCurrency: string;
      orderStatus: string;
    };
    transaction: {
      txStatus: string;
      txTime: string;
      txMsg: string;
      referenceId: string;
      paymentMode: string;
      txAmount: string;
    };
  }

  export interface PaymentFailureResponse {
    order: {
      orderId: string;
      orderAmount: number;
      orderCurrency: string;
      orderStatus: string;
    };
    transaction: {
      txStatus: string;
      txTime: string;
      txMsg: string;
      referenceId: string;
      paymentMode: string;
      txAmount: string;
    };
  }

  export interface ErrorResponse {
    message: string;
    code: string;
  }

  export interface CashfreeInstance {
    checkout: (config: CashfreeCheckoutConfig) => void;
  }

  export function load(config: CashfreeConfig): Promise<CashfreeInstance>;
} 