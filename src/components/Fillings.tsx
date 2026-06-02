"use client";

import Image from "next/image";
import { sendEvent } from "@/lib/tracking";
import { filling } from "@/content/menu";

export default function Fillings() {
  return (
    <section
      onClick={() => sendEvent("section_click", { section: "filling" })}
      className="overflow-hidden rounded-card bg-paper-light shadow-card"
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={filling.image}
          alt={filling.imageAlt}
          fill
          sizes="(min-width: 768px) 576px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <h2 className="title-md text-balance text-ink">{filling.title}</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          {filling.body}
        </p>
      </div>
    </section>
  );
}
