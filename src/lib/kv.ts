import { kv } from "@vercel/kv";

export type StoredEvent = {
  name: string;
  session_id: string;
  timestamp: number;
  path: string;
  ip_hash?: string;
  user_agent?: string;
  [key: string]: unknown;
};

function dateKey(d: Date = new Date()): string {
  // YYYY-MM-DD in UTC; for daily aggregation it's fine
  return d.toISOString().slice(0, 10);
}

export async function pushEvent(event: StoredEvent): Promise<void> {
  const day = dateKey(new Date(event.timestamp));
  await Promise.all([
    kv.lpush(`events:${day}`, JSON.stringify(event)),
    kv.hincrby(`counters:${day}`, event.name, 1),
    kv.sadd("event-days", day),
  ]);
  // Trim to last 5000 events per day to bound storage
  await kv.ltrim(`events:${day}`, 0, 4999);
}

export async function getEvents(day: string, limit = 200): Promise<StoredEvent[]> {
  const raw = await kv.lrange<string>(`events:${day}`, 0, limit - 1);
  return raw
    .map((r) => {
      try {
        return typeof r === "string" ? (JSON.parse(r) as StoredEvent) : (r as StoredEvent);
      } catch {
        return null;
      }
    })
    .filter((e): e is StoredEvent => e !== null);
}

export async function getDays(): Promise<string[]> {
  const days = await kv.smembers<string[]>("event-days");
  return [...days].sort().reverse();
}

export async function getCounters(day: string): Promise<Record<string, number>> {
  const raw = (await kv.hgetall<Record<string, string | number>>(`counters:${day}`)) ?? {};
  const out: Record<string, number> = {};
  for (const [k, v] of Object.entries(raw)) {
    out[k] = typeof v === "number" ? v : parseInt(String(v), 10) || 0;
  }
  return out;
}

export function todayKey(): string {
  return dateKey();
}
