"use client";

import { useEffect, useRef } from "react";
import { TURNSTILE_SITE_KEY } from "@/lib/turnstile-client";

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

interface TurnstileAPI {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  remove: (id: string) => void;
  reset: (id?: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileAPI;
  }
}

export default function Turnstile({
  onVerify,
  theme = "light",
  className = "",
}: {
  onVerify: (token: string) => void;
  theme?: "light" | "dark" | "auto";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const cbRef = useRef(onVerify);
  cbRef.current = onVerify;

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    let cancelled = false;
    let poll: ReturnType<typeof setInterval> | null = null;

    function render() {
      if (cancelled || !ref.current || !window.turnstile || widgetId.current) return;
      widgetId.current = window.turnstile.render(ref.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme,
        callback: (token: string) => cbRef.current(token),
        "expired-callback": () => cbRef.current(""),
        "error-callback": () => cbRef.current(""),
      });
    }

    if (window.turnstile) {
      render();
    } else if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
      const s = document.createElement("script");
      s.src = SCRIPT_SRC;
      s.async = true;
      s.defer = true;
      s.onload = render;
      document.head.appendChild(s);
    } else {
      poll = setInterval(() => {
        if (window.turnstile) {
          if (poll) clearInterval(poll);
          render();
        }
      }, 200);
    }

    return () => {
      cancelled = true;
      if (poll) clearInterval(poll);
      if (widgetId.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetId.current);
        } catch {
          /* noop */
        }
        widgetId.current = null;
      }
    };
  }, [theme]);

  if (!TURNSTILE_SITE_KEY) return null;
  return <div ref={ref} className={className} />;
}
