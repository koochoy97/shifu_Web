"use client";

import { sendEvent } from "@/lib/tracking";
import { delivery } from "@/content/menu";

export default function Delivery() {
  return (
    <section
      onClick={() => sendEvent("section_click", { section: "delivery" })}
      className="rounded-2xl bg-paper-light p-5 shadow-card"
    >
      <p className="eyebrow text-ink-mute">{delivery.heading}</p>
      <h2 className="title-md mt-2 text-ink">{delivery.title}</h2>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
        {delivery.body}
      </p>
    </section>
  );
}
