import { NextResponse } from "next/server";
import { z } from "zod";
import { calculatePlatformFee } from "@/lib/booking";
import { getServiceById, getTherapistById } from "@/lib/demo-data";

const bookingSchema = z.object({
  customerName: z.string().min(2),
  customerPhone: z.string().min(8),
  customerEmail: z.string().email().optional(),
  therapistId: z.string().min(1),
  serviceId: z.string().min(1),
  datetime: z.string().min(10),
  address: z.string().min(5)
});

export async function POST(request: Request) {
  const body = await request.json();
  const result = bookingSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid booking payload", issues: result.error.flatten() },
      { status: 400 }
    );
  }

  const therapist = getTherapistById(result.data.therapistId);
  const service = getServiceById(result.data.serviceId);

  if (!therapist || !service) {
    return NextResponse.json({ error: "Therapist or service not found" }, { status: 404 });
  }

  const platformFee = calculatePlatformFee(service.price);
  const booking = {
    id: `booking-${crypto.randomUUID().slice(0, 8)}`,
    status: "PENDING",
    totalAmount: service.price,
    platformFee,
    stripePaymentId: "stripe_checkout_placeholder",
    therapist,
    service,
    ...result.data
  };

  return NextResponse.json({
    ok: true,
    message: "MVP booking created. Production flow should create Stripe Checkout or PaymentIntent before final confirmation.",
    booking
  });
}
