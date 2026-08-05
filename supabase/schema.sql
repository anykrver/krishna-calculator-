-- Run this once in the Supabase SQL Editor for this project.

create table if not exists public.cars (
  id uuid primary key default gen_random_uuid(),
  brand text not null,
  model_name text not null,
  image_url text,
  variants jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.cars enable row level security;
drop policy if exists "public can view cars" on public.cars;
create policy "public can view cars" on public.cars for select to anon, authenticated using (true);

create table if not exists public.buyer_enquiries (
  id uuid primary key default gen_random_uuid(),
  owner_name text not null,
  vehicle_type text not null,
  brand text not null,
  budget text not null,
  city text not null,
  phone text not null,
  fuel text,
  transmission text,
  documents jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

-- Ensure fuel and transmission columns exist if table was previously created
alter table public.buyer_enquiries add column if not exists fuel text;
alter table public.buyer_enquiries add column if not exists transmission text;



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

drop policy if exists "public can view buyer enquiries" on public.buyer_enquiries;
drop policy if exists "public can view dealer registrations" on public.dealer_registrations;
drop policy if exists "public can view agent registrations" on public.agent_registrations;

create policy "public can submit buyer enquiries" on public.buyer_enquiries for insert to anon, authenticated with check (true);
create policy "public can submit dealer registrations" on public.dealer_registrations for insert to anon, authenticated with check (true);
create policy "public can submit agent registrations" on public.agent_registrations for insert to anon, authenticated with check (true);

create policy "public can view buyer enquiries" on public.buyer_enquiries for select to anon, authenticated using (true);
create policy "public can view dealer registrations" on public.dealer_registrations for select to anon, authenticated using (true);
create policy "public can view agent registrations" on public.agent_registrations for select to anon, authenticated using (true);

-- Drop any existing overloaded signatures to avoid RPC function resolution conflicts
drop function if exists public.submit_buyer_enquiry(text, text, text, text, text, text, text, text, jsonb);
drop function if exists public.submit_buyer_enquiry(text, text, text, text, text, text, text, jsonb, text);

create or replace function public.submit_buyer_enquiry(
  p_owner_name text,
  p_vehicle_type text,
  p_brand text,
  p_budget text,
  p_city text,
  p_phone text,
  p_fuel text default null,
  p_transmission text default null,
  p_documents jsonb default '[]'::jsonb
)
returns public.buyer_enquiries
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted_row public.buyer_enquiries;
begin
  insert into public.buyer_enquiries (
    owner_name,
    vehicle_type,
    brand,
    budget,
    city,
    phone,
    fuel,
    transmission,
    documents
  ) values (
    p_owner_name,
    p_vehicle_type,
    p_brand,
    p_budget,
    p_city,
    p_phone,
    p_fuel,
    p_transmission,
    p_documents
  ) returning * into inserted_row;

  return inserted_row;
end;
$$;

grant execute on function public.submit_buyer_enquiry(text, text, text, text, text, text, text, text, jsonb) to anon;
grant execute on function public.submit_buyer_enquiry(text, text, text, text, text, text, text, text, jsonb) to authenticated;

insert into storage.buckets (id, name, public) values ('form-documents', 'form-documents', false)
on conflict (id) do nothing;

drop policy if exists "public can upload form documents" on storage.objects;

create policy "public can upload form documents" on storage.objects for insert to anon, authenticated
with check (bucket_id = 'form-documents');
