import "jsr:@supabase/functions-js/edge-runtime.d.ts";

type EmailEvent = {
  id: string;
  sequence_key: "24_hour_reminder" | "1_hour_reminder";
  course_leads: {
    first_name: string;
    email: string;
    webinar_starts_at: string;
  };
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}

function dateLabel(startsAt: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(startsAt));
}

function emailFor(event: EmailEvent, zoomJoinUrl: string) {
  const firstName = escapeHtml(event.course_leads.first_name);
  const date = dateLabel(event.course_leads.webinar_starts_at);
  const joinButton = `<p><a href="${zoomJoinUrl}" style="display:inline-block;padding:12px 20px;background:#c9a227;color:#08111f;text-decoration:none;font-weight:700;border-radius:6px">Join the Webinar on Zoom</a></p>`;

  if (event.sequence_key === "24_hour_reminder") {
    return {
      subject: "We go live tomorrow: The 5 Biggest Mistakes",
      html: `<p>Hey ${firstName},</p><p>We go live tomorrow for <strong>The 5 Biggest Mistakes People Make When Starting a Security Company.</strong></p><p>One thing I want you thinking about before we meet:</p><p>A lot of people who want to start a security company assume the biggest challenge is getting the LLC, getting licensed, buying uniforms, or getting everything set up.</p><p>Those things matter.</p><p>But simply setting up a company doesn’t mean you’ve built a business capable of winning contracts, hiring officers, servicing clients, and growing.</p><p>That difference is where a lot of people get stuck.</p><p>Tomorrow, I’m going to show you several mistakes I see people make when they’re trying to make the transition from working in security to actually owning a security company.</p><p>📅 ${date}<br>⏰ 7:00 PM CT</p><p>Join here:</p>${joinButton}<p>See you tomorrow,<br>Steve</p>`,
    };
  }

  return {
    subject: "We’re going live tonight",
    html: `<p>Hey ${firstName},</p><p>We’re going live tonight.</p><p>If you’ve spent years working in security, law enforcement, military, corrections, or another related field, you probably already have experience that could help you build something of your own.</p><p>But experience alone doesn’t automatically prepare someone to build the business side.</p><p>That’s what we’re talking about tonight.</p><p>I’m going to break down <strong>5 of the biggest mistakes people make when starting a security company</strong> and help you understand what actually matters if you want to build this the right way.</p><p>📅 Tonight<br>⏰ 7:00 PM CT</p><p>Your link:</p>${joinButton}<p>Try to join a few minutes early.</p><p>Steve</p>`,
  };
}

export default {
  async fetch(request: Request) {
    if (request.method !== "POST")
      return Response.json({ error: "method_not_allowed" }, { status: 405 });

    const url = Deno.env.get("SUPABASE_URL");
    const service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const from = Deno.env.get("RESEND_FROM_EMAIL");
    const zoomJoinUrl = Deno.env.get("ZOOM_JOIN_URL");
    if (!url || !service || !resendKey || !from || !zoomJoinUrl)
      return Response.json({ error: "configuration_error" }, { status: 500 });

    const now = new Date().toISOString();
    const dueResponse = await fetch(
      `${url}/rest/v1/webinar_email_events?select=id,sequence_key,course_leads!inner(first_name,email,webinar_starts_at)&status=eq.pending&scheduled_for=not.is.null&scheduled_for=lte.${encodeURIComponent(now)}&sequence_key=in.(24_hour_reminder,1_hour_reminder)&order=scheduled_for.asc&limit=100`,
      { headers: { apikey: service, Authorization: `Bearer ${service}` } },
    );
    if (!dueResponse.ok) return Response.json({ error: "database_error" }, { status: 500 });

    const events = (await dueResponse.json()) as EmailEvent[];
    let sent = 0;
    for (const event of events) {
      const email = emailFor(event, zoomJoinUrl);
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: `7 Figure Security <${from}>`,
          to: [event.course_leads.email],
          ...email,
        }),
      });
      const result = (await response.json()) as { id?: string; message?: string };
      await fetch(`${url}/rest/v1/webinar_email_events?id=eq.${event.id}&status=eq.pending`, {
        method: "PATCH",
        headers: {
          apikey: service,
          Authorization: `Bearer ${service}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          response.ok
            ? {
                status: "sent",
                provider_message_id: result.id ?? null,
                sent_at: new Date().toISOString(),
                error_message: null,
              }
            : { status: "failed", error_message: result.message ?? "Resend request failed" },
        ),
      });
      if (response.ok) sent += 1;
    }

    return Response.json({ success: true, processed: events.length, sent });
  },
};
