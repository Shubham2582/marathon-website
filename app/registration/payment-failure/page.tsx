"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { initiatePayment, initiateTeamPayment } from "@/lib/payu";
import { toast } from "sonner";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

const PaymentFailure = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const identificationNumber =
    searchParams?.get("identification_number") ?? null;

  const handleRetryPayment = async () => {
    const isTeam = identificationNumber?.includes("TEAM-");

    if (!identificationNumber) return;

    let amount = 0;

    if (isTeam) {
      const { data: teamData } = await supabase
        .schema("marathon")
        .from("registrations_2026")
        .select("city, wants_tshirt, phone, email, team_name")
        .eq("team_id", identificationNumber);

      if (!teamData) {
        return;
      }

      if (teamData[0].city !== "Narayanpur") {
        amount += 1196;
      }

      for (const person of teamData) {
        if (person.wants_tshirt) {
          amount += 200;
        }
      }

      const teamDetails = {
        email: teamData[0].email,
        phone: teamData[0].phone,
        team_name: teamData[0].team_name,
      };

      return initiateTeamPayment(amount, teamDetails, identificationNumber);
    }

    const { data: personData } = await supabase
      .schema("marathon")
      .from("registrations_2026")
      .select("first_name, last_name, city, wants_tshirt, mobile, email")
      .eq("identification_number", identificationNumber);

    if (!personData) return;

    if (personData[0].city !== "Narayanpur") {
      amount += 299;
    }

    if (personData[0].wants_tshirt) {
      amount += 200;
    }

    initiatePayment(
      amount,
      {
        firstName: personData[0].first_name,
        lastName: personData[0].last_name,
        phone: personData[0].mobile,
        email: personData[0].email,
      },
      identificationNumber,
    );
  };

  const handleOfflinePayment = async () => {
    if (!identificationNumber) return;

    try {
      const { error } = await supabase
        .schema("marathon")
        .from("registrations_2026")
        .update({ payment_status: "OFFLINE" })
        .eq("identification_number", identificationNumber);

      if (error) {
        throw new Error(error?.message);
      }

      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  if (!identificationNumber) return notFound();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 p-4">
      <Card className="max-w-md rounded-2xl w-full p-6">
        <CardHeader>
          <CardTitle className="text-center text-purple-600">
            Payment Failed
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 flex flex-col justify-center p-4 bg-purple-50 rounded-lg">
          <p className="text-2xl font-mono text-center font-bold text-primary tracking-wider">
            {identificationNumber}
          </p>
          <p className="text-center text-gray-600">
            No worries, we have your registration, so if you want, you can even
            pay offline at the counter.
          </p>
          <div className="flex space-x-2">
            {!identificationNumber?.includes("TEAM-") && (
              <Button
                className="w-full"
                variant="secondary"
                onClick={handleOfflinePayment}
              >
                Pay Offline
              </Button>
            )}
            <Button className="w-full" onClick={handleRetryPayment}>
              Retry Payment
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default function Wrapped() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex justify-center items-center">
          <Loader2 className="animate-spin text-primary" />
        </div>
      }
    >
      <PaymentFailure />
    </Suspense>
  );
}
