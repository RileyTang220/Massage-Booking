import { NextResponse } from "next/server";
import { z } from "zod";
import { getBookingById } from "@/lib/booking";

const patchSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"])
});

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const booking = getBookingById(id);

  if (!booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, booking });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const result = patchSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: "Invalid status payload" }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    bookingId: id,
    status: result.data.status,
    message: "MVP placeholder. Persist status changes and trigger Twilio/Resend notifications in production."
  });
}
