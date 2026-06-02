import { closing } from "@/content/menu";

export default function Closing() {
  return (
    <section className="rounded-card bg-gold-bright p-6 text-center text-ink shadow-card-lg">
      <p className="eyebrow text-ink/70">Tu turno</p>
      <h2 className="title-lg mt-2 text-balance text-ink">
        {closing.headline}
      </h2>
      <p className="mx-auto mt-3 max-w-xs text-sm font-medium text-ink/85">
        {closing.line}
      </p>
      <p className="mt-5 text-xs font-semibold text-ink/60">
        ↓ Usa los botones de abajo
      </p>
    </section>
  );
}
