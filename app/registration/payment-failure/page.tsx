"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PaymentFailure = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center text-red-600">Payment Failed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-gray-600">
            We're sorry, but your payment could not be processed. Please try again.
          </p>
          <div className="flex justify-center">
            <Link href="/registration/steps/payu-payment">
              <Button variant="default">
                Try Again
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default PaymentFailure;
