"use client";

import { useState } from "react";

import { useStep } from "@/store/useStep";
import { useRouter } from "next/navigation";
import { initiatePayment } from "@/lib/payu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/store/useLanguage";
import { useRegistrationStore } from "@/store/useRegistration";
import { getUniqueIdentificationNumber, supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

export const PayUPayment = () => {
  const { form } = useRegistrationStore();
  const { previousStep } = useStep();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [includeTshirt, setIncludeTshirt] = useState(true);
  const router = useRouter();
  const t = useTranslation();

  const registrationFee = form.isFromNarayanpur ? 0 : 299;
  const tshirtFee = 200;
  const totalFee = registrationFee + (includeTshirt ? tshirtFee : 0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert("Please accept the terms and conditions");
      return;
    }

    // If from Narayanpur and wants a t-shirt, go to payment gateway
    if (form.isFromNarayanpur && includeTshirt) {
      handleOnlinePayment();
      return;
    }

    // If from Narayanpur and does not want a t-shirt, do offline payment
    if (form.isFromNarayanpur && !includeTshirt) {
      handleOfflinePayment();
      return;
    }

    // For non-Narayanpur residents, always go to payment gateway
    handleOnlinePayment();
  };

  const handleOnlinePayment = async () => {
    const identificationNumber = await getUniqueIdentificationNumber();

    const registrationData = {
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      mobile: form.mobile,
      gender: form.gender,
      date_of_birth: form.dateOfBirth,
      country: form.country || "India",
      state: form.isInternational ? "International" : form.state,
      city: form.isInternational ? "International" : form.city,
      occupation: form.occupation,
      race_category: form.raceCategory,
      t_shirt_size: form.tShirtSize,
      emergency_contact_name: form.emergencyContactName || null,
      emergency_contact_number: form.emergencyContactNumber || null,
      blood_group: form.bloodGroup || null,
      is_from_narayanpur: form.isFromNarayanpur,
      is_international: form.isInternational || false,
      needs_accommodation: form.needsAccommodation,
      identification_number: identificationNumber,
      govt_id: form.govtId || "N/A",
      payment_status: "PENDING",
      previous_marathon_name: form.previousMarathonName || null,
      previous_marathon_rank: form.previousMarathonRank || null,
      wants_tshirt: includeTshirt,
    };

    try {
      const { error } = await supabase
        .schema("marathon")
        .from("registrations_2026")
        .insert([registrationData])
        .select("id");

      if (error) {
        console.error("Supabase insertion error:", error);
        throw error;
      }

      await initiatePayment(totalFee, form, identificationNumber);
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred during payment initiation. Please try again.");
    }
  };

  const handleOfflinePayment = async () => {
    try {
      const identificationNumber = await getUniqueIdentificationNumber();

      const registrationData = {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        mobile: form.mobile,
        gender: form.gender,
        date_of_birth: form.dateOfBirth,
        country: form.country || "India",
        state: form.isInternational ? "International" : form.state,
        city: form.isInternational ? "International" : form.city,
        occupation: form.occupation,
        race_category: form.raceCategory,
        t_shirt_size: form.tShirtSize,
        emergency_contact_name: form.emergencyContactName || null,
        emergency_contact_number: form.emergencyContactNumber || null,
        blood_group: form.bloodGroup || null,
        is_from_narayanpur: form.isFromNarayanpur,
        is_international: form.isInternational || false,
        needs_accommodation: form.needsAccommodation,
        identification_number: identificationNumber,
        govt_id: form.govtId || "N/A",
        payment_status: "OFFLINE",
        previous_marathon_name: form.previousMarathonName || null,
        previous_marathon_rank: form.previousMarathonRank || null,
        wants_tshirt: includeTshirt,
      };

      const { error } = await supabase
        .schema("marathon")
        .from("registrations_2026")
        .insert([registrationData]);

      if (error) throw error;

      const paymentForm = document.createElement("form");
      paymentForm.method = "POST";
      paymentForm.action = `/api/payment-callback?identification_number=${identificationNumber}&offline=true&success=true`;

      // Append form to body and submit
      document.body.appendChild(paymentForm);
      paymentForm.submit();
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="bg-white/30">
        <CardHeader>
          <CardTitle>{t.payment.fee_details}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span>{t.payment.registration_fee}</span>
            <span>₹{registrationFee}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <div className="flex items-center gap-2">
              <Input
                type="checkbox"
                id="tshirt"
                className="w-4 h-4"
                checked={includeTshirt}
                onChange={(e) => setIncludeTshirt(e.target.checked)}
              />
              <label htmlFor="tshirt" className="text-sm">
                T-shirt
              </label>
            </div>
            <div className="flex items-center gap-4">
              <span>₹{tshirtFee}</span>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    See T-shirt
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>T-shirt Design</DialogTitle>
                  </DialogHeader>
                  <div className="flex justify-center">
                    <Image
                      src="/images/tshirt-placeholder.png"
                      alt="T-shirt"
                      width={400}
                      height={400}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="flex justify-between items-center py-2 font-bold">
            <span>Total</span>
            <span>₹{totalFee}</span>
          </div>
          {form.isFromNarayanpur && (
            <p className="text-sm text-green-600">
              * {t.payment.narayanpur_note}
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="bg-white/30">
        <CardHeader>
          <CardTitle>{t.payment.terms_conditions}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-48 overflow-y-auto p-4 bg-white/40 rounded-md text-sm space-y-2">
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
            <Input
              type="checkbox"
              id="terms"
              className="w-4 h-4"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
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
        <div className="flex gap-2">
          <Button type="submit" disabled={!acceptedTerms}>
            {t.payment.proceed_button}
          </Button>
        </div>
      </div>
    </form>
  );
};
