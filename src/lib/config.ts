/**
 * 7 Figure Security — centralized funnel configuration.
 * Edit values here; every component reads from this file.
 *
 * Funnel: Ad → Webinar Registration Page → Webinar → 7 Figure Security Offer
 */

export const BRAND_NAME = "7 Figure Security";
export const BRAND_TAGLINE = "Live training. Real experience. No fluff.";

/** Webinar event details. */
export const WEBINAR_BADGE = "Free Webinar";
export const WEBINAR_TITLE = "The 5 Biggest Mistakes People Make Starting a Security Company";
export const WEBINAR_CTA = "Reserve My Spot";
export const WEBINAR_HOST = "Stephen Taylor";
export const WEBINAR_DATE_LABEL = "Date and time to be announced";

/**
 * Optional destination after a successful registration (thank-you page,
 * webinar room, or replay). Leave empty to show the on-page confirmation.
 */
export const WEBINAR_CONFIRMATION_URL = "/confirmation";
/** Delay before auto-redirecting a registrant when a URL is configured. */
export const WEBINAR_REDIRECT_DELAY_MS = 1600;

/** Paid Skool enrollment page — presented AFTER the webinar, not on this page. */
export const SKOOL_URL = "https://www.skool.com/7-figure-security-5885/about";

/** Public Supabase client configuration used to call the lead-capture Edge Function. */
export const SUPABASE_URL = "https://rmbmgpzmqrteefwxmhls.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtYm1ncHptcXJ0ZWVmd3htaGxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4NDM2MTMsImV4cCI6MjEwMjQxOTYxM30.Pmo1otfsa52cHOI_r1nD8taee8FsPfqb1J0o1biZHGo";
export const LEAD_SUBMISSION_ENDPOINT = `${SUPABASE_URL}/functions/v1/capture-course-lead`;

export const SUPPORT_EMAIL = "support@7figuresecurity.com";

export const SOCIAL_URLS = {
  youtube: "#",
  instagram: "#",
  linkedin: "#",
} as const;

export interface UtmParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
}

/** Append UTM parameters to a destination URL so attribution survives the redirect. */
export function buildUrlWithUtm(base: string, utm: UtmParams): string {
  try {
    const url = new URL(base);
    for (const [key, value] of Object.entries(utm)) {
      if (value) url.searchParams.set(key, value);
    }
    return url.toString();
  } catch {
    return base;
  }
}
