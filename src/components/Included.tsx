import { included } from "@/content/menu";

export default function Included() {
  return (
    <div className="mt-4 rounded-2xl bg-paper p-4">
      <p className="eyebrow text-ink-mute">Tu pedido incluye</p>
      <ul className="mt-3 space-y-2">
        {included.map((item) => (
          <li key={item.label} className="flex items-center gap-3 text-sm text-ink">
            <span className="text-lg" aria-hidden="true">
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
