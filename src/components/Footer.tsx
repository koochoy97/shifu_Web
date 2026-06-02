import Image from "next/image";
import { brand, contact } from "@/content/menu";

export default function Footer() {
  return (
    <footer className="rounded-card bg-paper-light p-6 text-center">
      <Image
        src="/shifu-logo-green.png"
        alt="SHIFU"
        width={160}
        height={96}
        className="mx-auto h-10 w-auto"
      />
      <p className="mt-3 text-xs text-ink-mute">
        {brand.tagline} · {contact.hours}
      </p>
      <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-ink-mute">
        © {new Date().getFullYear()} · Shifu
      </p>
    </footer>
  );
}
