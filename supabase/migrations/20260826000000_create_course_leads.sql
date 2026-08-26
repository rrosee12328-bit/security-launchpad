create table if not exists public.course_leads (
  id uuid primary key default gen_random_uuid(),
  first_name text not null check (char_length(first_name) between 2 and 100),
  email text not null unique check (email = lower(email) and char_length(email) <= 320),
  phone text not null check (char_length(phone) between 10 and 40),
  course text not null default '7-figure-security' check (course = '7-figure-security'),
  submitted_at timestamptz not null default now(),
  landing_page_url text not null default '',
  referral_url text not null default '',
  utm_source text not null default '',
  utm_medium text not null default '',
  utm_campaign text not null default '',
  utm_content text not null default '',
  utm_term text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.course_leads enable row level security;

create or replace function public.set_course_leads_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_course_leads_updated_at on public.course_leads;
create trigger set_course_leads_updated_at
before update on public.course_leads
for each row execute function public.set_course_leads_updated_at();
