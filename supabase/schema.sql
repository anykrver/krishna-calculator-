-- Run this once in the Supabase SQL Editor for this project.

create table if not exists public.buyer_enquiries (
  id uuid primary key default gen_random_uuid(),
  owner_name text not null,
  vehicle_type text not null,
  brand text not null,
  budget text not null,
  city text not null,
  phone text not null,
  fuel text,
  documents jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.dealer_registrations (
  id uuid primary key default gen_random_uuid(),
  dealership_name text not null,
  dealership_type text not null,
  city text not null,
  phone text not null,
  segment text not null,
  documents jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.agent_registrations (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  phone text not null,
  city text not null,
  segment text not null,
  email text,
  languages text,
  referral_code text,
  experience text not null,
  documents jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.buyer_enquiries enable row level security;
alter table public.dealer_registrations enable row level security;
alter table public.agent_registrations enable row level security;

drop policy if exists "public can submit buyer enquiries" on public.buyer_enquiries;
drop policy if exists "public can submit dealer registrations" on public.dealer_registrations;
drop policy if exists "public can submit agent registrations" on public.agent_registrations;

create policy "public can submit buyer enquiries" on public.buyer_enquiries for insert to anon, authenticated with check (true);
create policy "public can submit dealer registrations" on public.dealer_registrations for insert to anon, authenticated with check (true);
create policy "public can submit agent registrations" on public.agent_registrations for insert to anon, authenticated with check (true);

insert into storage.buckets (id, name, public) values ('form-documents', 'form-documents', false)
on conflict (id) do nothing;

drop policy if exists "public can upload form documents" on storage.objects;

create policy "public can upload form documents" on storage.objects for insert to anon, authenticated
with check (bucket_id = 'form-documents');
