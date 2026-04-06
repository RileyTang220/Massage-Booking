import { NextResponse } from "next/server";
import { therapists } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json({
    ok: true,
    users: therapists.map((therapist) => ({
      id: therapist.id,
      name: therapist.name,
      role: "THERAPIST",
      status: therapist.isVerified ? "ACTIVE" : "PENDING"
    }))
  });
}

export async function PATCH() {
  return NextResponse.json({
    ok: true,
    message: "MVP placeholder. Persist admin user moderation actions to PostgreSQL in production."
  });
}
