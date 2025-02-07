"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/store/useLanguage";
import { supabase } from "@/lib/supabase";

export default function QRPaymentPage() {
  const t = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");

  const identificationNumber = searchParams?.get("identification_number") ?? "";
  const amount = searchParams?.get("amount") ?? "0";

  const handlePaymentComplete = async () => {
    if (!identificationNumber) {
      setError(t.qr_payment.error_no_id);
      return;
    }

    if (!transactionId.trim()) {
      setError(t.qr_payment.error_no_transaction);
      return;
    }

    try {
      const { error } = await supabase
        .from("registrations")
        .update({
          payment_status: "QR",
          transaction_id: transactionId,
        })
        .eq("identification_number", identificationNumber);

      if (error) {
        console.error("Failed to update transaction details:", error);
        setError(t.qr_payment.error_invalid_details);
        return;
      }

      router.push(`/registration/payment-success?identification_number=${identificationNumber}&transaction_id=${transactionId}`);
    } catch (err) {
      console.error("Error updating payment details:", err);
      setError(t.qr_payment.error_invalid_details);
    }
  };

  if (!identificationNumber || !amount) {
    return (
      <div className="container max-w-2xl mx-auto py-8">
        <Card>
          <CardContent>
            <p className="text-center text-red-500">Invalid payment details</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>{t.qr_payment.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="mb-4">
              {t.qr_payment.amount_to_pay}: ₹{amount}
            </p>
            <div className="flex justify-center">
              <Image src="/qr.png" alt={t.qr_payment.qr_code_alt} width={300} height={300} className="p-4" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="transactionId" className="text-sm font-medium">
                {t.qr_payment.transaction_id_label}
              </label>
              <Input
                id="transactionId"
                type="text"
                placeholder={t.qr_payment.transaction_id_placeholder}
                value={transactionId}
                onChange={(e) => {
                  setTransactionId(e.target.value);
                  setError("");
                }}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">{t.qr_payment.enter_transaction_id_note}</p>
              <Button onClick={handlePaymentComplete} disabled={!transactionId.trim()}>
                {t.qr_payment.confirm_payment_button}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
