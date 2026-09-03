alter table public.course_leads add column if not exists last_name text;
alter table public.course_leads add column if not exists funnel_type text not null default 'webinar';
alter table public.course_leads add column if not exists webinar_title text not null default 'The 5 Biggest Mistakes People Make Starting a Security Company';

create table if not exists public.webinar_email_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.course_leads(id) on delete cascade,
  sequence_key text not null check (sequence_key in ('registration_confirmation','date_announcement','24_hour_reminder','1_hour_reminder','post_webinar_follow_up')),
  status text not null default 'pending' check (status in ('pending','sent','failed')),
  provider_message_id text,
  error_message text,
  scheduled_for timestamptz,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (lead_id, sequence_key)
);
alter table public.webinar_email_events enable row level security;

create index if not exists webinar_email_events_lead_id_idx on public.webinar_email_events(lead_id);
