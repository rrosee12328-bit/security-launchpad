create extension if not exists pg_cron with schema pg_catalog;
create extension if not exists pg_net with schema extensions;

update public.webinar_email_events as event
set scheduled_for = case
  when event.sequence_key = '24_hour_reminder' and lead.webinar_starts_at - interval '24 hours' > now()
    then lead.webinar_starts_at - interval '24 hours'
  when event.sequence_key = '1_hour_reminder' and lead.webinar_starts_at - interval '1 hour' > now()
    then lead.webinar_starts_at - interval '1 hour'
  else null
end,
updated_at = now()
from public.course_leads as lead
where event.lead_id = lead.id
  and lead.webinar_starts_at is not null
  and event.sequence_key in ('24_hour_reminder', '1_hour_reminder')
  and event.status = 'pending';

select cron.unschedule(jobid)
from cron.job
where jobname = 'send-webinar-reminders';

select cron.schedule(
  'send-webinar-reminders',
  '*/5 * * * *',
  $$
  select net.http_post(
    url := 'https://rmbmgpzmqrteefwxmhls.supabase.co/functions/v1/send-webinar-reminders',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtYm1ncHptcXJ0ZWVmd3htaGxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4NDM2MTMsImV4cCI6MjEwMjQxOTYxM30.Pmo1otfsa52cHOI_r1nD8taee8FsPfqb1J0o1biZHGo'
    ),
    body := '{}'::jsonb
  );
  $$
);
