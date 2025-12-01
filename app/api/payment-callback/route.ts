import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);

    // Get identification number from multiple possible sources
    const identificationNumber = url.searchParams.get("identification_number");
    const success = url.searchParams.get("success");

    // TODO: generate BIB number
    const bibNumber = "1000";

    const redirectUrl = success
      ? `/registration/payment-success?identification_number=${identificationNumber}&bibNumber=${bibNumber}`
      : `/registration/payment-failure?identification_number=${identificationNumber}`;

    // Redirect to the success page with parameters using 302 Found status
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
