import { faq } from "@/content/menu";

export default function Faq() {
  return (
    <section className="rounded-card bg-paper-light p-5 shadow-card">
      <p className="eyebrow text-ink-mute">Preguntas frecuentes</p>
      <h2 className="title-md mt-2 text-ink">Resolvemos dudas</h2>
      <div className="mt-5 divide-y divide-ink/10 rounded-2xl bg-paper">
        {faq.map((item) => (
          <details key={item.q} className="group px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold text-ink">
              <span>{item.q}</span>
              <span
                aria-hidden="true"
                className="text-lg text-ink-mute transition group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-2 pr-6 text-sm leading-relaxed text-ink-soft">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
