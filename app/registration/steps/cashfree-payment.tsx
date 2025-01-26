"use client";

import { useState, useEffect } from "react";
import { load, CashfreeInstance, CashfreeConfig, CashfreeCheckoutConfig } from "@cashfreepayments/cashfree-js";
import { Button } from "@/components/ui/button";
import { useStep } from "@/store/useStep";
import { useRegistrationStore } from "@/store/useRegistration";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { doPayment, initializeSDK } from "@/lib/cashfree";
import { useRouter } from "next/navigation";
import { getUniqueIdentificationNumber, supabase } from "@/lib/supabase";

export const CashFreePayment = () => {
  const [cashfree, setCashfree] = useState<CashfreeInstance | null>(null);
  const { form } = useRegistrationStore();
  const { previousStep } = useStep();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const router = useRouter();

  const registrationFee = form.isFromNarayanpur ? 0 : 299;

  useEffect(() => {
    initializeSDK().then(setCashfree);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert("Please accept the terms and conditions");
      return;
    }

    const identificationNumber = await getUniqueIdentificationNumber();

    const registrationData = {
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      mobile: form.mobile,
      gender: form.gender,
      date_of_birth: form.dateOfBirth,
      country: form.country,
      state: form.state,
      city: form.city,
      occupation: form.occupation,
      race_category: form.raceCategory,
      t_shirt_size: form.tShirtSize,
      emergency_contact_name: form.emergencyContactName || null,
      emergency_contact_number: form.emergencyContactNumber || null,
      blood_group: form.bloodGroup || null,
      is_from_narayanpur: form.isFromNarayanpur,
      needs_accommodation: form.needsAccommodation,
      identification_number: identificationNumber,
      govt_id: form.govtId,
      payment_status: "PENDING",
    };

    const { error } = await supabase.from("registrations").insert([registrationData]).select("id");

    if (error) {
      console.error("Supabase insertion error:", error);
      throw error;
    }

    if (form.isFromNarayanpur) {
      router.push(`/registration/payment-success?identification_number=${identificationNumber}`);
      return;
    }

    cashfree && doPayment(cashfree, registrationFee, form, identificationNumber);
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
          {form.isFromNarayanpur && <p className="text-sm text-green-600">* No registration fee for participants from Narayanpur</p>}
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

            <p>4. Prize Distribution Requirements:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Participants must bring the same ID proof submitted during registration to claim prizes during the prize distribution.</li>
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <Input type="checkbox" id="terms" className="w-4 h-4" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} />
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
        <Button type="submit" variant="primary" disabled={!acceptedTerms}>
          {registrationFee === 0 ? "Continue" : "Proceed to Payment"}
        </Button>
      </div>
    </form>
  );
};
