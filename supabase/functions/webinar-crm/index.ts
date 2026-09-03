import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Content-Type": "application/json",
};
export default {
  async fetch(request: Request) {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
    const url = Deno.env.get("SUPABASE_URL")!;
    const service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const auth = request.headers.get("Authorization") ?? "";
    const userResponse = await fetch(`${url}/auth/v1/user`, {
      headers: { apikey: service, Authorization: auth },
    });
    if (!userResponse.ok)
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401, headers });
    const user = (await userResponse.json()) as { email?: string };
    if (user.email?.toLowerCase() !== Deno.env.get("CRM_ADMIN_EMAIL")?.toLowerCase())
      return new Response(JSON.stringify({ error: "forbidden" }), { status: 403, headers });
    const response = await fetch(
      `${url}/rest/v1/course_leads?select=id,first_name,last_name,email,phone,created_at,landing_page_url,utm_source,utm_medium,utm_campaign,webinar_email_events(sequence_key,status,scheduled_for,sent_at,error_message)&funnel_type=eq.webinar&order=created_at.desc`,
      { headers: { apikey: service, Authorization: `Bearer ${service}` } },
    );
    return new Response(JSON.stringify({ leads: await response.json() }), {
      status: response.status,
      headers,
    });
  },
};
