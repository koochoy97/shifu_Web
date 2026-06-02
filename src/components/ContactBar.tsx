"use client";

import { sendEvent } from "@/lib/tracking";
import { contact } from "@/content/menu";

export default function ContactBar() {
  const waUrl = `https://wa.me/${contact.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(contact.whatsappMessage)}`;
  const igUrl = contact.instagramUrl;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 pt-3"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 1rem)" }}
    >
      <div className="mx-auto flex max-w-md items-stretch gap-2 rounded-pill bg-ink p-1.5 shadow-card-lg md:max-w-xl">
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => sendEvent("contact_click", { channel: "whatsapp" })}
          className="touch-target flex flex-1 items-center justify-center gap-2 rounded-pill bg-gold-bright px-4 py-3 text-sm font-extrabold text-ink transition active:scale-[0.98]"
          aria-label="Escribir por WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.09.61 4.06 1.76 5.78L2 22l4.42-1.86c1.65.9 3.52 1.41 5.62 1.41h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2zm-3.27 6.44c.16 0 .3 0 .46.01.14.01.34-.05.54.41.2.48.68 1.66.74 1.78.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.13.12-.25.25-.11.49.14.24.62 1.02 1.34 1.66.92.82 1.7 1.08 1.94 1.2.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.14 1.14-.21.56-1.19 1.1-1.63 1.14-.44.04-.85.22-2.87-.66-2.43-1.05-4.01-3.49-4.13-3.65-.13-.16-1-1.32-1-2.52 0-1.2.63-1.78.85-2.03.22-.25.48-.31.64-.31z" />
          </svg>
          <span>WhatsApp</span>
        </a>
        <a
          href={igUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => sendEvent("contact_click", { channel: "instagram" })}
          className="touch-target flex flex-1 items-center justify-center gap-2 rounded-pill bg-paper px-4 py-3 text-sm font-bold text-ink transition active:scale-[0.98]"
          aria-label="Abrir Instagram"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.48a6.36 6.36 0 1 0 0 12.72 6.36 6.36 0 0 0 0-12.72zm0 2.16a4.2 4.2 0 1 1 0 8.4 4.2 4.2 0 0 1 0-8.4zm6.6-2.4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
          </svg>
          <span>@{contact.instagram}</span>
        </a>
      </div>
    </div>
  );
}
