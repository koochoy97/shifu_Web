"use client";

import { sendEvent } from "@/lib/tracking";
import { pricing } from "@/content/menu";

export default function Pricing() {
  return (
    <section className="rounded-card bg-paper-light p-5 shadow-card">
      <p className="eyebrow text-ink-mute">Paquetes</p>
      <h2 className="title-md mt-2 text-ink">Elige tu cantidad</h2>
      <p className="mt-2 text-sm text-ink-soft">
        Llegan congelados, listos para hervir cuando quieras.
      </p>
      <ul className="mt-5 space-y-3">
        {pricing.map((p, i) => {
          const featured = !!p.badge;
          return (
            <li key={p.name}>
              <button
                type="button"
                onClick={() =>
                  sendEvent("section_click", { section: "pricing", pack: p.name })
                }
                className={[
                  "touch-target relative flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition active:scale-[0.99]",
                  featured
                    ? "bg-ink text-paper shadow-card"
                    : "bg-paper text-ink",
                ].join(" ")}
              >
                <div
                  className={[
                    "flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl",
                    featured ? "bg-gold text-ink" : "bg-ink text-paper",
                  ].join(" ")}
                >
                  <span className="text-xl font-extrabold leading-none">
                    {p.units}
                  </span>
                  <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider opacity-80">
                    und
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold">{p.name}</p>
                    {p.badge && (
                      <span className="rounded-pill bg-gold px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-ink">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <p
                    className={[
                      "mt-0.5 text-xs",
                      featured ? "text-cream/80" : "text-ink-mute",
                    ].join(" ")}
                  >
                    {p.description}
                  </p>
                </div>
                <span
                  className={[
                    "text-xl font-extrabold tracking-tight",
                    featured ? "text-paper" : "text-ink",
                  ].join(" ")}
                >
                  {p.price}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
