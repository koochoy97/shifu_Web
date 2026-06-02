// Cliente de tracking. Mantén ligero — corre en el navegador.

const SESSION_KEY = "shifu_sid";
const ENDPOINT = "/api/track";

export type EventName =
  | "view_content"
  | "scroll_depth"
  | "time_on_page"
  | "section_click"
  | "contact_click";

export type EventPayload = Record<string, string | number | boolean | null>;

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  let sid = window.sessionStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid = crypto.randomUUID();
    window.sessionStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
}

export function sendEvent(name: EventName, payload: EventPayload = {}): void {
  if (typeof window === "undefined") return;
  const body = JSON.stringify({
    name,
    session_id: getOrCreateSessionId(),
    timestamp: Date.now(),
    path: window.location.pathname + window.location.search,
    ...payload,
  });

  // sendBeacon survives page unloads; fall back to fetch+keepalive
  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    if (navigator.sendBeacon(ENDPOINT, blob)) return;
  }
  fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

export function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utms: Record<string, string> = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach(
    (k) => {
      const v = params.get(k);
      if (v) utms[k] = v;
    }
  );
  return utms;
}
