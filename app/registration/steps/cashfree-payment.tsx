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
import { useRegistrationStore } from '@/store/useRegistration';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const CashFreePayment = () => {
  const [cashfree, setCashfree] = useState<CashfreeInstance | null>(null);
  const { form } = useRegistrationStore();
  const { nextStep, previousStep } = useStep();
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const registrationFee = form.isFromNarayanpur ? 0 : 299;

  useEffect(() => {
    // Initialize SDK when component mounts
    const initializeSDK = async () => {
      const config: CashfreeConfig = {
        mode: "PRODUCTION",
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
        mode: "PRODUCTION",
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert("Please accept the terms and conditions");
      return;
    }
    doPayment();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Registration Fee Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span>Registration Fee</span>
            <span>₹{registrationFee}</span>
          </div>
          {form.isFromNarayanpur && (
            <p className="text-sm text-green-600">
              * No registration fee for participants from Narayanpur
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Terms and Conditions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-48 overflow-y-auto p-4 bg-gray-50 rounded-md text-sm space-y-2">
            <p>1. Participant Agreement:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>I confirm that I am medically fit to participate in the marathon.</li>
              <li>I understand that participating in this event involves risks.</li>
              <li>I agree to follow all race rules and organizer instructions.</li>
            </ul>
            
            <p>2. Liability Waiver:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>I waive all claims against the organizers for any injuries or losses.</li>
              <li>I am responsible for my personal belongings during the event.</li>
            </ul>
            
            <p>3. Media Rights:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>I grant permission to use my photographs taken during the event.</li>
              <li>These may be used for promotional purposes.</li>
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <Input 
              type="checkbox" 
              id="terms" 
              className="w-4 h-4"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <label htmlFor="terms" className="text-sm">
              I have read and agree to the terms and conditions
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button onClick={previousStep} variant="secondary">
          Back
        </Button>
        <Button 
          type="submit" 
          variant="primary"
          disabled={!acceptedTerms}
        >
          {registrationFee === 0 ? "Continue" : "Proceed to Payment"}
        </Button>
      </div>
    </form>
  );
};
