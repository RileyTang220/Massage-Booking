import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    ok: true,
    onboardingUrl: "https://connect.stripe.com/setup/s/demo-placeholder",
    message: "MVP placeholder for Stripe Connect Express onboarding."
  });
}
