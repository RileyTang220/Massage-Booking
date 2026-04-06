import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    message:
      "Webhook placeholder. Handle checkout.session.completed, payment_intent.succeeded, invoice.paid, and customer.subscription.deleted here."
  });
}
