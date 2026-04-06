import { NextResponse } from "next/server";
import { rankTherapists } from "@/lib/matching";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const serviceType = searchParams.get("serviceType");
  const datetime = searchParams.get("datetime");
  const address = searchParams.get("address");
  const budget = searchParams.get("budget");

  if (!serviceType || !datetime || !address) {
    return NextResponse.json({ error: "serviceType, datetime, and address are required" }, { status: 400 });
  }

  const results = rankTherapists({
    serviceType,
    datetime,
    address,
    budget: budget ? Number(budget) : undefined
  });

  return NextResponse.json({ ok: true, results });
}
