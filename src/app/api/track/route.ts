import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { pushEvent, type StoredEvent } from "@/lib/kv";

export const runtime = "nodejs";

const ALLOWED_EVENTS = new Set([
  "view_content",
  "scroll_depth",
  "time_on_page",
  "section_click",
  "contact_click",
]);

function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

export async function POST(req: NextRequest) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const name = typeof data.name === "string" ? data.name : "";
  if (!ALLOWED_EVENTS.has(name)) {
    return NextResponse.json({ ok: false, error: "bad_event" }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "0.0.0.0";

  const event: StoredEvent = {
    name,
    session_id: typeof data.session_id === "string" ? data.session_id : "",
    timestamp: typeof data.timestamp === "number" ? data.timestamp : Date.now(),
    path: typeof data.path === "string" ? data.path : "/",
    ip_hash: hashIp(ip),
    user_agent: req.headers.get("user-agent") ?? "",
    ...Object.fromEntries(
      Object.entries(data).filter(
        ([k]) => !["name", "session_id", "timestamp", "path"].includes(k)
      )
    ),
  };

  try {
    await pushEvent(event);
  } catch (err) {
    // Don't fail the client; log and continue.
    console.error("[track] kv error", err);
  }

  return NextResponse.json({ ok: true });
}
