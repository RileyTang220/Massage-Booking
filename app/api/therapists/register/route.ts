import { NextResponse } from "next/server";
import { z } from "zod";

const therapistRegistrationSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  suburbs: z.array(z.string()).min(1),
  skills: z.array(z.string()).min(1),
  yearsExperience: z.number().min(0),
  acceptsHomeVisits: z.boolean()
});

export async function POST(request: Request) {
  const body = await request.json();
  const result = therapistRegistrationSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid therapist registration payload", issues: result.error.flatten() },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Registration accepted. Next step is creating Stripe customer, Stripe Connect account, and subscription.",
    data: result.data
  });
}
