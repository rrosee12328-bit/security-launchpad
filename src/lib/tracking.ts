/**
 * Analytics + attribution layer.
 *
 * Events are pushed to every installed tag manager (GTM dataLayer,
 * Meta Pixel fbq, GA4 gtag) when present — drop your pixel/tag snippets
 * in the root route and these events start flowing automatically.
 *
 * Funnel events: PageView, CTA_Click, Lead_Form_Open, Lead.
 */

import type { UtmParams } from "./config";

export type FunnelEvent = "PageView" | "CTA_Click" | "Lead_Form_Open" | "Lead";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const UTM_STORAGE_KEY = "7fs_utm";

/** Read UTM params from the URL once, then persist them for the session. */
export function getUtmParams(): UtmParams {
  const empty: UtmParams = {
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
  };
  if (typeof window === "undefined") return empty;

  try {
    const params = new URLSearchParams(window.location.search);
    const fromUrl: UtmParams = { ...empty };
    let found = false;
    for (const key of Object.keys(empty) as (keyof UtmParams)[]) {
      const value = params.get(key);
      if (value) {
        fromUrl[key] = value;
        found = true;
      }
    }
    if (found) {
      window.sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    const stored = window.sessionStorage.getItem(UTM_STORAGE_KEY);
    if (stored) return { ...empty, ...(JSON.parse(stored) as Partial<UtmParams>) };
  } catch {
    /* storage unavailable — return empty */
  }
  return empty;
}

export function trackEvent(event: FunnelEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  const payload = { ...params, ...getUtmParams() };

  try {
    // Google Tag Manager
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event, ...payload });

    // Meta Pixel — "Lead" is a standard event, the rest are custom
    if (typeof window.fbq === "function") {
      if (event === "Lead") window.fbq("track", "Lead", payload);
      else if (event === "PageView") window.fbq("track", "PageView");
      else window.fbq("trackCustom", event, payload);
    }

    // GA4 (gtag.js)
    if (typeof window.gtag === "function") {
      window.gtag("event", event, payload);
    }
  } catch {
    /* analytics must never break the funnel */
  }

  if (import.meta.env.DEV) console.debug("[7fs:track]", event, payload);
}
