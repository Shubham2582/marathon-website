import { NextResponse } from "next/server";
import { generateBibNumber } from "@/lib/bibGenerator";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const url = new URL(req.url);

  const identificationNumber = url.searchParams.get("identification_number");
  const success = url.searchParams.get("success");
  const team = Boolean(url.searchParams.get("team"));
  const offline = Boolean(url.searchParams.get("offline"));

  try {
    if (!identificationNumber) {
      console.error("[Payment Callback] No identification number provided");
      return new NextResponse(null, {
        status: 302,
        headers: {
          Location: "/codingwizardsmarathon/payment-failure",
        },
      });
    }
    let redirectUrl: string;

    if (success === "true") {
      // Generate BIB number
      try {
        console.log("[Payment Callback] Generating BIB number...");
        if (!team) {
          await generateBibNumber(identificationNumber, team);

          await supabase
            .schema("marathon")
            .from("registrations_2026")
            .update({ payment_status: offline ? "OFFLINE" : "DONE" })
            .eq("identification_number", identificationNumber);

          console.log("[Payment Callback] BIB generated successfully:");
        } else {
          await supabase
            .schema("marathon")
            .from("registrations_2026_teams")
            .update({ payment_status: offline ? "OFFLINE" : "DONE" })
            .eq("team_id", identificationNumber);
        }
      } catch (error) {
        console.error("[Payment Callback] Error generating BIB number:", error);
      }

      redirectUrl = `/registration/${team ? "team-" : ""}payment-success?identification_number=${identificationNumber}`;
    } else {
      redirectUrl = `/registration/payment-failure?identification_number=${identificationNumber}`;
    }

    console.log("[Payment Callback] Redirecting to:", redirectUrl);

    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: redirectUrl,
      },
    });
  } catch (error) {
    console.error("Payment callback error:", error);
    return new NextResponse(null, {
      status: 302,
      headers: {
        Location: `/registration/payment-failure?identification_number=${identificationNumber}`,
      },
    });
  }
}
