"use client";

import Image from "next/image";
import { sendEvent } from "@/lib/tracking";
import { filling } from "@/content/menu";

export default function Fillings() {
  return (
    <section
      onClick={() => sendEvent("section_click", { section: "filling" })}
      className="relative overflow-visible rounded-[20px] bg-paper-light shadow-card"
    >
      <span
        aria-hidden="true"
        className="fu-stamp absolute -right-3 -top-3 z-10 h-14 w-14 rounded-full text-xl"
        style={{ transform: "rotate(14deg)" }}
      >
        福
      </span>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[20px]">
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
