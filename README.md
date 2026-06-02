# Shifu Menu

Menú digital para vender wontons congelados. One-pager mobile-first con tracking propio.

## Setup local

```bash
npm install
cp .env.local.example .env.local
# Edita .env.local con tu KV de Vercel (o deja vacío para correr sin tracking persistente)
npm run dev
```

Abre `http://localhost:3000`.

## Editar contenido

Toda la copy, precios, variedades y zonas viven en [`src/content/menu.ts`](src/content/menu.ts). Edita ese archivo para cambiar la web.

## Tracking

Eventos capturados:

- `view_content` — al cargar la página
- `scroll_depth` — al cruzar 25 / 50 / 75 / 100% de scroll
- `time_on_page` — a los 30s / 1min / 2min de tiempo activo
- `section_click` — click en hero, galería, paquete, relleno, delivery
- `contact_click` — click en WhatsApp o Instagram (la "conversión")

Eventos se guardan en Vercel KV. Dashboard en `/admin` (basic auth, contraseña en `ADMIN_PASSWORD`).

## Deploy en Coolify

1. En Coolify → New Resource → Public/Private Git → conectar este repo vía la GitHub App.
2. Build pack: **Nixpacks** (auto-detecta Next.js). Build command: `npm run build`. Start command: `npm start`.
3. Port: `3000`.
4. Environment Variables (Project Settings → Environment Variables):
   - `ADMIN_PASSWORD` — contraseña para entrar a `/admin`.
   - `KV_REST_API_URL` y `KV_REST_API_TOKEN` — opcionales, solo si quieres persistir tracking. Si no los seteas la web funciona pero los eventos del tracking se pierden (la API igual responde 200 al cliente).
5. Deploy.

## Deploy en Vercel (alternativa)

1. Conectar el repo a Vercel.
2. Crear un KV store en Vercel Dashboard → Storage → KV. Conectarlo al proyecto (Vercel inyecta las env vars automáticamente).
3. Agregar `ADMIN_PASSWORD` en Project Settings → Environment Variables.
4. Deploy.

## Reemplazar placeholders antes de salir a producción

- `src/content/menu.ts` → teléfono, IG, zonas reales, precios reales.
- `public/images/` → fotos reales del producto (mantener nombres `wontons-hero.jpeg` y `wontons-top.jpeg` o actualizar las referencias en `menu.ts`).
