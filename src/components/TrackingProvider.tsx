"use client";

import { useEffect, useRef } from "react";
import { sendEvent, getUtmParams } from "@/lib/tracking";

const SCROLL_BUCKETS = [25, 50, 75, 100] as const;
const TIME_BUCKETS = [30, 60, 120] as const;

export default function TrackingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const firedScroll = useRef<Set<number>>(new Set());
  const firedTime = useRef<Set<number>>(new Set());
  const activeSecondsRef = useRef(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    sendEvent("view_content", {
      referrer: document.referrer || "",
      ...getUtmParams(),
    });

    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled =
        (doc.scrollTop + window.innerHeight) / Math.max(doc.scrollHeight, 1);
      const pct = Math.min(100, Math.floor(scrolled * 100));
      for (const bucket of SCROLL_BUCKETS) {
        if (pct >= bucket && !firedScroll.current.has(bucket)) {
          firedScroll.current.add(bucket);
          sendEvent("scroll_depth", { depth: bucket });
        }
      }
    };

    const onVisibility = () => {
      visibleRef.current = document.visibilityState === "visible";
    };

    const tick = window.setInterval(() => {
      if (!visibleRef.current) return;
      activeSecondsRef.current += 1;
      for (const bucket of TIME_BUCKETS) {
        if (
          activeSecondsRef.current >= bucket &&
          !firedTime.current.has(bucket)
        ) {
          firedTime.current.add(bucket);
          sendEvent("time_on_page", { seconds: bucket });
        }
      }
    }, 1000);

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    onScroll(); // capture if already past a bucket on load

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearInterval(tick);
    };
  }, []);

  return <>{children}</>;
}
