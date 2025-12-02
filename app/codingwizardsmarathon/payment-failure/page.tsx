"use client";

export const runtime = "edge";
export const dynamic = "force-dynamic";
export const preferredRegion = "auto";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const PaymentFailure = () => {
  const searchParams = useSearchParams();

  const identificationNumber =
    searchParams?.get("identification_number") ?? null;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 p-4">
      <Card className="max-w-md rounded-2xl w-full p-6">
        <CardHeader>
          <CardTitle className="text-center text-purple-600">
            Payment Failed
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 p-4 bg-purple-50 rounded-lg">
          <p className="text-2xl font-mono text-center font-bold text-primary tracking-wider">
            {identificationNumber}
          </p>
          <p className="text-center text-gray-600">
            We're sorry, but your payment could not be processed. Please try
            again.
          </p>
        </CardContent>
      </Card>
    </main>
  );
};

export default PaymentFailure;
