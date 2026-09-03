import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type, x-client-info",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type LeadPayload = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  phone?: unknown;
  webinarStartsAt?: unknown;
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
  const lastName = clean(payload.lastName, 100);
  const email = clean(payload.email, 320).toLowerCase();
  const phone = clean(payload.phone, 40);
  const phoneDigits = phone.replace(/\D/g, "");

  if (
    firstName.length < 2 ||
    lastName.length < 2 ||
    !emailPattern.test(email) ||
    phoneDigits.length < 10
  ) {
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
  const webinarStartsAt = clean(payload.webinarStartsAt, 40);
  const parsedWebinarStartsAt =
    webinarStartsAt && !Number.isNaN(Date.parse(webinarStartsAt))
      ? new Date(webinarStartsAt).toISOString()
      : null;

  const row = {
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    course: "7-figure-security",
    funnel_type: "webinar",
    webinar_title: "The 5 Biggest Mistakes People Make Starting a Security Company",
    webinar_starts_at: parsedWebinarStartsAt,
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
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify(row),
    });

    if (!response.ok) {
      console.error("Lead upsert failed", response.status, await response.text());
      return json(500, { success: false, code: "database_error", message: "Unable to save lead." });
    }

    const leads = (await response.json()) as Array<{ id: string }>;
    const leadId = leads[0]?.id;
    if (leadId) {
      const sequenceKeys = [
        "registration_confirmation",
        "date_announcement",
        "24_hour_reminder",
        "1_hour_reminder",
        "post_webinar_follow_up",
      ];
      await fetch(`${supabaseUrl}/rest/v1/webinar_email_events?on_conflict=lead_id,sequence_key`, {
        method: "POST",
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          "Content-Type": "application/json",
          Prefer: "resolution=ignore-duplicates,return=minimal",
        },
        body: JSON.stringify(
          sequenceKeys.map((sequence_key) => ({ lead_id: leadId, sequence_key })),
        ),
      });

      const resendKey = Deno.env.get("RESEND_API_KEY");
      const from = Deno.env.get("RESEND_FROM_EMAIL");
      const zoomJoinUrl = Deno.env.get("ZOOM_JOIN_URL");
      if (resendKey && from) {
        const webinarDate = parsedWebinarStartsAt
          ? new Intl.DateTimeFormat("en-US", {
              timeZone: "America/Chicago",
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
              timeZoneName: "short",
            }).format(new Date(parsedWebinarStartsAt))
          : "the next Thursday at 7:00 PM Central";
        const mail = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: `7 Figure Security <${from}>`,
            to: [email],
            subject: "You’re registered: The 5 Biggest Mistakes",
            html: `<h1>You’re registered, ${firstName}.</h1><p>Your seat is reserved for <strong>The 5 Biggest Mistakes People Make Starting a Security Company</strong>.</p><p><strong>${webinarDate}</strong></p>${
              zoomJoinUrl
                ? `<p><a href="${zoomJoinUrl}" style="display:inline-block;padding:12px 20px;background:#c9a227;color:#08111f;text-decoration:none;font-weight:700;border-radius:6px">Join on Zoom</a></p><p>Keep this email—this is your private meeting link.</p>`
                : `<p>We’ll send the attendance link directly to this email.</p>`
            }<p>We’ll also send reminders before the session begins.</p>`,
          }),
        });
        const result = (await mail.json()) as { id?: string; message?: string };
        await fetch(
          `${supabaseUrl}/rest/v1/webinar_email_events?lead_id=eq.${leadId}&sequence_key=eq.registration_confirmation`,
          {
            method: "PATCH",
            headers: {
              apikey: serviceRoleKey,
              Authorization: `Bearer ${serviceRoleKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              mail.ok
                ? {
                    status: "sent",
                    provider_message_id: result.id ?? null,
                    sent_at: new Date().toISOString(),
                    error_message: null,
                  }
                : { status: "failed", error_message: result.message ?? "Resend request failed" },
            ),
          },
        );
      }
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
