import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      message: "AI chatbot integration is intentionally deferred. Use the structured booking form flow for MVP."
    },
    { status: 501 }
  );
}
