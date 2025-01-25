"use client";

import { useState, useEffect } from 'react';
import {
  load,
  CashfreeInstance,
  CashfreeConfig,
  CashfreeCheckoutConfig,
} from "@cashfreepayments/cashfree-js";
import { Button } from '@/components/ui/button';
import { useStep } from '@/store/useStep';

export const CashFreePayment = () => {
  const [cashfree, setCashfree] = useState<CashfreeInstance | null>(null);
  const {previousStep} = useStep()

  useEffect(() => {
    // Initialize SDK when component mounts
    const initializeSDK = async () => {
      const config: CashfreeConfig = {
        mode: "TEST",
        redirectTarget: "_modal",
        paymentSessionId: "" // This can be empty during initialization
      };
      const cashfreeInstance = await load(config);
      setCashfree(cashfreeInstance);
    };

    initializeSDK();
  }, []);

  const createPaymentSession = async () => {
    try {
      const response = await fetch('your-backend-api/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: '100',
          currency: 'INR',
          customerDetails: {
            customerId: 'customer123',
            customerEmail: 'customer@example.com',
            customerPhone: '9999999999'
          }
        })
      });

      const data = await response.json();
      return data.paymentSessionId;
    } catch (error) {
      console.error('Error creating payment session:', error);
      throw error;
    }
  };

  const doPayment = async (): Promise<void> => {
    try {
      if (!cashfree) {
        throw new Error('Cashfree SDK not initialized');
      }

      // Call your API route
      const response = await fetch('/api/create-order', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const orderDetails = await response.json();

      if (!orderDetails.payment_session_id) {
        throw new Error('Payment session ID not found');
      }
      
      const checkoutOptions: CashfreeCheckoutConfig = {
        mode: "TEST",
        redirectTarget: "_self",
        paymentSessionId: orderDetails.payment_session_id,
        onSuccess: (data) => {
          console.log("Payment success", data);
        },
        onFailure: (data) => {
          console.log("Payment failed", data);
        },
        onError: (error) => {
          console.log("Error", error);
        }

      };

      cashfree.checkout(checkoutOptions);
    } catch (error) {
      console.error('Payment initiation failed:', error);
    }
  };

  return (
    <form onSubmit={doPayment} className="row">
      <p>Click below to open the checkout page in current tab</p>
      <button 
        type="submit" 
        className="btn btn-primary" 
        id="renderBtn" 
        onClick={doPayment}
        disabled={!cashfree}
      >
        Pay Now
      </button>
      <div className="flex justify-between">
        <Button onClick={()=> previousStep()} variant="secondary" className="mt-5">
          Back
        </Button>
        <Button disabled={!cashfree} type="submit" variant="primary" className="mt-5">
          Pay Now
        </Button>
      </div>
    </form>
  );
}
