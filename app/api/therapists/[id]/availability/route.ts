import { NextResponse } from "next/server";
import { getAvailabilityForTherapist, getTherapistById } from "@/lib/demo-data";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const therapist = getTherapistById(id);

  if (!therapist) {
    return NextResponse.json({ error: "Therapist not found" }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    therapist: { id: therapist.id, name: therapist.name },
    slots: getAvailabilityForTherapist(id)
  });
}
