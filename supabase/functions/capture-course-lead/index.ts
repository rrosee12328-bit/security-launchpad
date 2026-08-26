import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type LeadPayload = {
  firstName?: unknown;
  email?: unknown;
  phone?: unknown;
  submittedAt?: unknown;
  landingPageUrl?: unknown;
  referralUrl?: unknown;
  utm_source?: unknown;
  utm_medium?: unknown;
  utm_campaign?: unknown;
  utm_content?: unknown;
  utm_term?: unknown;
};

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

async function handleRequest(request: Request) {
  if (request.method === "OPTIONS")
    return new Response(null, { status: 204, headers: corsHeaders });
  if (request.method !== "POST") return json(405, { success: false, code: "method_not_allowed" });

  let payload: LeadPayload;
  try {
    payload = await request.json();
  } catch {
    return json(400, { success: false, code: "invalid_json", message: "Invalid request." });
  }

  const firstName = clean(payload.firstName, 100);
  const email = clean(payload.email, 320).toLowerCase();
  const phone = clean(payload.phone, 40);
  const phoneDigits = phone.replace(/\D/g, "");

  if (firstName.length < 2 || !emailPattern.test(email) || phoneDigits.length < 10) {
    return json(400, {
      success: false,
      code: "validation_error",
      message: "Please provide a valid name, email address, and phone number.",
    });
  }

  const submittedAt = clean(payload.submittedAt, 40);
  const parsedSubmittedAt =
    submittedAt && !Number.isNaN(Date.parse(submittedAt))
      ? new Date(submittedAt).toISOString()
      : new Date().toISOString();

  const row = {
    first_name: firstName,
    email,
    phone,
    course: "7-figure-security",
    submitted_at: parsedSubmittedAt,
    landing_page_url: clean(payload.landingPageUrl, 2048),
    referral_url: clean(payload.referralUrl, 2048),
    utm_source: clean(payload.utm_source, 255),
    utm_medium: clean(payload.utm_medium, 255),
    utm_campaign: clean(payload.utm_campaign, 255),
    utm_content: clean(payload.utm_content, 255),
    utm_term: clean(payload.utm_term, 255),
  };

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing Supabase runtime configuration");
    return json(500, {
      success: false,
      code: "configuration_error",
      message: "Unable to save lead.",
    });
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/course_leads?on_conflict=email`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify(row),
    });

    if (!response.ok) {
      console.error("Lead upsert failed", response.status, await response.text());
      return json(500, { success: false, code: "database_error", message: "Unable to save lead." });
    }
  } catch (error) {
    console.error("Lead capture request failed", error);
    return json(500, {
      success: false,
      code: "database_unavailable",
      message: "Unable to save lead.",
    });
  }

  return json(200, { success: true });
}

export default { fetch: handleRequest };
