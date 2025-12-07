"use client";

import { useState } from "react";

import { useStep } from "@/store/useStep";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/store/useLanguage";
import { getUniqueIdentificationNumber, supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTeamRegistrationStore } from "@/store/useTeamRegistration";
import { initiateTeamPayment } from "@/lib/payu";

export const TeamPayUPayment = () => {
  const { teamDetails } = useTeamRegistrationStore();
  const { previousStep } = useStep();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const t = useTranslation();

  const baseFee = 1196;
  const tshirtFee = 200;
  const totalTshirtFee = teamDetails.wants_tshirt ? 4 * tshirtFee : 0;
  const totalFee = baseFee + totalTshirtFee;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!acceptedTerms) {
      alert("Please accept the terms and conditions");
      return;
    }
    handleOnlinePayment();
  };

  const handleOnlinePayment = async () => {
    if (!teamDetails.team_name || !teamDetails.email) {
      alert("Please go back and fill out all team details.");
      return;
    }

    const team_id = `TEAM-${await getUniqueIdentificationNumber()}`;

    try {
      const { error: teamError } = await supabase
        .schema("marathon")
        .from("registrations_2026_teams")
        .insert({
          team_id,
          team_name: teamDetails.team_name,
          mobile: teamDetails.mobile,
          email: teamDetails.email,
          wants_tshirt: teamDetails.wants_tshirt,
          payment_status: "PENDING",
        });

      if (teamError) {
        console.error("insertion error:", teamError);
        throw teamError;
      }

      await initiateTeamPayment(
        totalFee,
        {
          team_name: teamDetails.team_name,
          email: teamDetails.email,
          phone: teamDetails.mobile,
        },
        team_id,
      );
    } catch (error) {
      console.error("Payment error:", error);
      alert(`An error occurred during payment initiation. Please try again.

${error}`);
    } finally {
      console.log("Payment initiation process finished.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="bg-white/30">
        <CardHeader>
          <CardTitle>{t.payment.fee_details}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center py-2">
            <span>{t.payment.base_fee}</span>
            <span>₹{baseFee}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-t">
            <span>
              {t.payment.tshirts} ({4} x ₹{tshirtFee})
            </span>
            <span>₹{totalTshirtFee}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-t font-bold text-lg">
            <span>{t.payment.total}</span>
            <span>₹{totalFee}</span>
          </div>
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
        <Button onClick={() => previousStep()} variant="secondary">
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
