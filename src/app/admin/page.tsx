import { getCounters, getDays, getEvents, todayKey } from "@/lib/kv";

export const dynamic = "force-dynamic";

const EVENT_LABELS: Record<string, string> = {
  view_content: "Visitas",
  scroll_depth: "Scroll depth",
  time_on_page: "Tiempo en página",
  section_click: "Clicks en secciones",
  contact_click: "Clicks de contacto",
};

function Bar({ value, max }: { value: number; max: number }) {
  const w = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-cream/10">
      <div
        className="h-full bg-gold"
        style={{ width: `${w}%` }}
      />
    </div>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { day?: string };
}) {
  const day = searchParams.day ?? todayKey();
  let events: Awaited<ReturnType<typeof getEvents>> = [];
  let counters: Record<string, number> = {};
  let days: string[] = [];
  let error: string | null = null;

  try {
    [events, counters, days] = await Promise.all([
      getEvents(day, 200),
      getCounters(day),
      getDays(),
    ]);
  } catch (err) {
    error = err instanceof Error ? err.message : "Error desconocido";
  }

  const maxCount = Math.max(1, ...Object.values(counters));
  const scrollEvents = events.filter((e) => e.name === "scroll_depth");
  const timeEvents = events.filter((e) => e.name === "time_on_page");
  const sectionClicks = events.filter((e) => e.name === "section_click");
  const contactClicks = events.filter((e) => e.name === "contact_click");

  const scrollBuckets = [25, 50, 75, 100].map((b) => ({
    bucket: b,
    count: scrollEvents.filter((e) => Number(e.depth) >= b).length,
  }));

  const timeBuckets = [30, 60, 120].map((b) => ({
    bucket: b,
    count: timeEvents.filter((e) => Number(e.seconds) >= b).length,
  }));

  const sectionAgg: Record<string, number> = {};
  for (const e of sectionClicks) {
    const key = String(e.section ?? "unknown");
    sectionAgg[key] = (sectionAgg[key] ?? 0) + 1;
  }

  const contactAgg: Record<string, number> = {};
  for (const e of contactClicks) {
    const key = String(e.channel ?? "unknown");
    contactAgg[key] = (contactAgg[key] ?? 0) + 1;
  }

  return (
    <div className="min-h-screen bg-wood px-5 py-10 pb-24">
      <header className="mx-auto max-w-4xl">
        <h1 className="font-display text-3xl text-paper">Shifu · Admin</h1>
        <p className="mt-1 text-sm text-paper/60">
          Eventos del menú digital
        </p>
        <form className="mt-4 flex items-center gap-2 text-sm">
          <label htmlFor="day" className="text-paper/70">
            Día:
          </label>
          <select
            id="day"
            name="day"
            defaultValue={day}
            className="rounded bg-wood-warm/40 px-2 py-1 text-paper"
          >
            {(days.length ? days : [todayKey()]).map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="rounded bg-gold px-3 py-1 text-paper"
          >
            Ver
          </button>
        </form>
        {error && (
          <p className="mt-4 rounded bg-gold/30 p-3 text-sm text-paper">
            Error leyendo KV: {error}. Verifica que las variables{" "}
            <code>KV_REST_API_URL</code> y <code>KV_REST_API_TOKEN</code> estén
            configuradas.
          </p>
        )}
      </header>

      <section className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-5">
        {Object.entries(EVENT_LABELS).map(([k, label]) => (
          <div
            key={k}
            className="rounded-md border border-cream/15 bg-wood-warm/30 p-4"
          >
            <p className="text-xs uppercase tracking-wider text-paper/60">
              {label}
            </p>
            <p className="mt-1 font-display text-3xl text-paper">
              {counters[k] ?? 0}
            </p>
            <Bar value={counters[k] ?? 0} max={maxCount} />
          </div>
        ))}
      </section>

      <section className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-md border border-cream/15 bg-wood-warm/20 p-5">
          <h2 className="font-display text-xl text-paper">Funnel de scroll</h2>
          <div className="mt-3 space-y-2">
            {scrollBuckets.map((b) => (
              <div key={b.bucket}>
                <div className="flex justify-between text-xs text-paper/70">
                  <span>{b.bucket}%</span>
                  <span>{b.count}</span>
                </div>
                <Bar value={b.count} max={scrollBuckets[0]?.count || 1} />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-md border border-cream/15 bg-wood-warm/20 p-5">
          <h2 className="font-display text-xl text-paper">Tiempo en página</h2>
          <div className="mt-3 space-y-2">
            {timeBuckets.map((b) => (
              <div key={b.bucket}>
                <div className="flex justify-between text-xs text-paper/70">
                  <span>{b.bucket >= 60 ? `${b.bucket / 60} min` : `${b.bucket}s`}</span>
                  <span>{b.count}</span>
                </div>
                <Bar value={b.count} max={timeBuckets[0]?.count || 1} />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-md border border-cream/15 bg-wood-warm/20 p-5">
          <h2 className="font-display text-xl text-paper">Secciones tocadas</h2>
          <div className="mt-3 space-y-2">
            {Object.entries(sectionAgg)
              .sort((a, b) => b[1] - a[1])
              .map(([k, v]) => (
                <div key={k}>
                  <div className="flex justify-between text-xs text-paper/70">
                    <span>{k}</span>
                    <span>{v}</span>
                  </div>
                  <Bar value={v} max={Math.max(...Object.values(sectionAgg), 1)} />
                </div>
              ))}
            {Object.keys(sectionAgg).length === 0 && (
              <p className="text-sm text-paper/50">Aún no hay clicks.</p>
            )}
          </div>
        </div>
        <div className="rounded-md border border-cream/15 bg-wood-warm/20 p-5">
          <h2 className="font-display text-xl text-paper">Clicks de contacto</h2>
          <div className="mt-3 space-y-2">
            {Object.entries(contactAgg)
              .sort((a, b) => b[1] - a[1])
              .map(([k, v]) => (
                <div key={k}>
                  <div className="flex justify-between text-xs text-paper/70">
                    <span>{k}</span>
                    <span>{v}</span>
                  </div>
                  <Bar value={v} max={Math.max(...Object.values(contactAgg), 1)} />
                </div>
              ))}
            {Object.keys(contactAgg).length === 0 && (
              <p className="text-sm text-paper/50">Aún no hay clicks.</p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-4xl">
        <h2 className="font-display text-xl text-paper">Eventos recientes</h2>
        <div className="mt-3 overflow-x-auto rounded-md border border-cream/15">
          <table className="w-full text-left text-xs text-paper">
            <thead className="bg-wood-warm/40">
              <tr>
                <th className="px-3 py-2">Hora</th>
                <th className="px-3 py-2">Evento</th>
                <th className="px-3 py-2">Sesión</th>
                <th className="px-3 py-2">Detalle</th>
              </tr>
            </thead>
            <tbody>
              {events.slice(0, 100).map((e, i) => {
                const { name, session_id, timestamp, ...rest } = e;
                delete (rest as Record<string, unknown>).ip_hash;
                delete (rest as Record<string, unknown>).user_agent;
                delete (rest as Record<string, unknown>).path;
                return (
                  <tr key={`${session_id}-${timestamp}-${i}`} className="border-t border-cream/10">
                    <td className="px-3 py-2 font-mono text-paper/70">
                      {new Date(timestamp).toLocaleTimeString()}
                    </td>
                    <td className="px-3 py-2">{name}</td>
                    <td className="px-3 py-2 font-mono text-paper/50">
                      {String(session_id).slice(0, 8)}
                    </td>
                    <td className="px-3 py-2 font-mono text-paper/70">
                      {JSON.stringify(rest)}
                    </td>
                  </tr>
                );
              })}
              {events.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-3 py-6 text-center text-paper/50">
                    No hay eventos en este día todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
