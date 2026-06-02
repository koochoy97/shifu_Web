import { howToCook } from "@/content/menu";

export default function HowToCook() {
  return (
    <section className="rounded-card bg-ink p-5 text-paper shadow-card">
      <p className="eyebrow text-paper/60">{howToCook.eyebrow}</p>
      <h2 className="title-md mt-2 text-paper">{howToCook.heading}</h2>
      <p className="mt-2 text-sm text-paper/70">{howToCook.subtitle}</p>
      <ol className="mt-5 space-y-3">
        {howToCook.steps.map((s) => (
          <li
            key={s.step}
            className="flex items-start gap-4 rounded-2xl bg-paper/5 p-4"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold text-base font-extrabold text-ink">
              {s.step}
            </span>
            <div>
              <p className="font-bold text-paper">{s.title}</p>
              <p className="mt-0.5 text-sm text-paper/70">{s.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
