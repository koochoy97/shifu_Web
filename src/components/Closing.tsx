import { closing } from "@/content/menu";

export default function Closing() {
  return (
    <section
      className="relative overflow-hidden rounded-card bg-gold-bright p-6 text-center text-ink shadow-card-lg"
      style={{ transform: "rotate(-0.4deg)" }}
    >
      <span
        aria-hidden="true"
        className="fu-watermark absolute -right-8 -top-12"
        style={{
          fontSize: "260px",
          transform: "rotate(8deg)",
          color: "rgba(26,20,16,0.06)",
        }}
      >
        福
      </span>
      <p className="eyebrow relative text-ink/70">Tu turno</p>
      <h2 className="title-lg relative mt-2 text-balance text-ink">
        Ya sabes todo.{" "}
        <span className="italic-accent font-semibold">Ahora</span>{" "}
        escríbenos.
      </h2>
      <p className="relative mx-auto mt-3 max-w-xs text-sm font-medium text-ink/85">
        {closing.line}
      </p>
      <p className="relative mt-5 text-xs font-semibold text-ink/60">
        ↓ Usa los botones de abajo
      </p>
    </section>
  );
}
