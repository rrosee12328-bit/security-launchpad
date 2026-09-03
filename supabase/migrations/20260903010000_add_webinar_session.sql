alter table public.course_leads
  add column if not exists webinar_starts_at timestamptz;

create index if not exists course_leads_webinar_starts_at_idx
  on public.course_leads(webinar_starts_at);
