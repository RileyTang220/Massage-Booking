import { NextResponse } from "next/server";
import { z } from "zod";
import { rankTherapists } from "@/lib/matching";

const matchSchema = z.object({
  serviceType: z.string().min(2),
  datetime: z.string().min(10),
  address: z.string().min(5),
  budget: z.number().optional()
});

export async function POST(request: Request) {
  const body = await request.json();
  const result = matchSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid matching payload", issues: result.error.flatten() },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    matches: rankTherapists(result.data),
    message: "This is the stable matching boundary that future AI chat intake should call."
  });
}
