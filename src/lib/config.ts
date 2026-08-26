/**
 * 7 Figure Security — centralized funnel configuration.
 * Edit values here; every component reads from this file.
 */

export const BRAND_NAME = "7 Figure Security";
export const BRAND_TAGLINE = "Training. Resources. Community. Real-world strategy.";

/** Membership pricing — change the price in ONE place. */
export const MEMBERSHIP_PRICE = "$97";
export type BillingFrequency = "per month" | "one-time" | "per year";
export const BILLING_FREQUENCY: BillingFrequency = "per month";

/** Paid Skool enrollment page. Members complete checkout here. */
export const SKOOL_URL = "https://www.skool.com/7-figure-security";

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

/** Delay before auto-redirecting a new lead to Skool. */
export const SKOOL_REDIRECT_DELAY_MS = 1600;

export interface UtmParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
}

/** Append UTM parameters to the Skool URL so attribution survives the redirect. */
export function buildSkoolUrl(utm: UtmParams): string {
  try {
    const url = new URL(SKOOL_URL);
    for (const [key, value] of Object.entries(utm)) {
      if (value) url.searchParams.set(key, value);
    }
    return url.toString();
  } catch {
    return SKOOL_URL;
  }
}
