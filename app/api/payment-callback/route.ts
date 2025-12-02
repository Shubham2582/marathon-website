import { NextResponse } from "next/server";
import { generateBibNumber } from "@/lib/bibGenerator";

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);

    const identificationNumber = url.searchParams.get("identification_number");
    const success = url.searchParams.get("success");

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
      let bibNumber: string;
      try {
        console.log("[Payment Callback] Generating BIB number...");
        const generatedBib = await generateBibNumber(identificationNumber);
        bibNumber = generatedBib.toString();
        console.log(
          "[Payment Callback] BIB generated successfully:",
          bibNumber,
        );
      } catch (error) {
        console.error("[Payment Callback] Error generating BIB number:", error);
        bibNumber = "PENDING";
      }

      redirectUrl = `/codingwizardsmarathon/payment-success?identification_number=${identificationNumber}&bibNumber=${bibNumber}`;
    } else {
      redirectUrl = `/codingwizardsmarathon/payment-failure?identification_number=${identificationNumber}`;
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
        Location: "/registration/payment-failure",
      },
    });
  }
}
