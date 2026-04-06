import { NextResponse } from "next/server";
import { z } from "zod";

const verifySchema = z.object({
  therapistId: z.string().min(1),
  action: z.enum(["APPROVE", "REJECT"])
});

export async function POST(request: Request) {
  const body = await request.json();
  const result = verifySchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: "Invalid verification payload" }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    therapistId: result.data.therapistId,
    action: result.data.action,
    message: "MVP placeholder. Persist verification state and audit log in production."
  });
}
