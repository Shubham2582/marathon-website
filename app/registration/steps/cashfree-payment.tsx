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
import { useTranslation } from "@/store/useLanguage";

export const CashFreePayment = () => {
  const [cashfree, setCashfree] = useState<CashfreeInstance | null>(null);
  const { form } = useRegistrationStore();
  const { previousStep } = useStep();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const router = useRouter();

  const t = useTranslation();

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
      previous_marathon_name: form.previousMarathonName || null,
      previous_marathon_rank: form.previousMarathonRank || null,
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
          <CardTitle>{t.payment.fee_details}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span>{t.payment.registration_fee}</span>
            <span>₹{registrationFee}</span>
          </div>
          {form.isFromNarayanpur && <p className="text-sm text-green-600">* {t.payment.narayanpur_note}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t.payment.terms_conditions}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-48 overflow-y-auto p-4 bg-gray-50 rounded-md text-sm space-y-2">
            <p>{t.payment.participant_agreement.title}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t.payment.participant_agreement.medical_fit}</li>
              <li>{t.payment.participant_agreement.risks}</li>
              <li>{t.payment.participant_agreement.rules}</li>
            </ul>

            <p>{t.payment.liability_waiver.title}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t.payment.liability_waiver.claims}</li>
              <li>{t.payment.liability_waiver.belongings}</li>
            </ul>

            <p>{t.payment.media_rights.title}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t.payment.media_rights.photos}</li>
              <li>{t.payment.media_rights.promotional}</li>
            </ul>

            <p>{t.payment.prize_distribution.title}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t.payment.prize_distribution.id_proof}</li>
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <Input type="checkbox" id="terms" className="w-4 h-4" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} />
            <label htmlFor="terms" className="text-sm">
              {t.payment.accept_terms}
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button onClick={previousStep} variant="secondary">
          {t.payment.back_button}
        </Button>
        <Button type="submit" variant="primary" disabled={!acceptedTerms}>
          {registrationFee === 0 ? t.payment.continue_button : t.payment.proceed_button}
        </Button>
      </div>
    </form>
  );
};
