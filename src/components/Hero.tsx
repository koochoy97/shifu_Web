"use client";

import Image from "next/image";
import { sendEvent } from "@/lib/tracking";
import { brand, gallery } from "@/content/menu";

export default function Hero() {
  const hero = gallery[0];
  return (
    <section
      onClick={() => sendEvent("section_click", { section: "hero" })}
      className="relative overflow-hidden rounded-card bg-wood text-cream shadow-card-lg"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          priority
          sizes="(min-width: 768px) 576px, 100vw"
          className="object-cover animate-ken-burns"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,8,5,0.25) 0%, rgba(15,8,5,0.05) 35%, rgba(15,8,5,0.55) 80%, rgba(15,8,5,0.95) 100%)",
          }}
        />
        <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
          <Image
            src="/shifu-logo.png"
            alt="SHIFU"
            width={160}
            height={96}
            priority
            className="h-10 w-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]"
          />
          <span className="text-xl text-cream/80">福</span>
        </div>
        <div className="absolute inset-x-5 bottom-5">
          <h1 className="title-xl text-balance text-paper">
            {brand.heroTitle}
          </h1>
          <p className="mt-3 max-w-[28ch] text-sm text-cream/80 md:text-base">
            {brand.heroSub}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 divide-x divide-paper/10">
        {brand.heroBadges.map((b) => (
          <div
            key={b.label}
            className="flex flex-col items-center gap-1 px-2 py-4 text-center"
          >
            <span className="text-lg" aria-hidden="true">
              {b.icon}
            </span>
            <span className="text-[11px] font-semibold leading-tight text-cream/85">
              {b.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
