import { NextRequest, NextResponse } from "next/server";
import { getCounters, getDays, getEvents, todayKey } from "@/lib/kv";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const day = req.nextUrl.searchParams.get("day") ?? todayKey();
  const [events, counters, days] = await Promise.all([
    getEvents(day, 200),
    getCounters(day),
    getDays(),
  ]);
  return NextResponse.json({ day, events, counters, days });
}
