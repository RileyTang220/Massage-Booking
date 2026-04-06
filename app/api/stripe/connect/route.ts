import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    ok: true,
    message:
      "Create Stripe Connect Express account here, then return onboarding link and persist stripeAccountId to therapist record."
  });
}
