-- Supabase schema for NUESA LASU

-- Users are handled by Supabase Auth. Use the auth.users table for core auth data.
-- Additional profile information stored in public.profiles

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade,
  first_name text,
  last_name text,
  title text,
  role text default 'member',
  created_at timestamptz default now(),
  primary key (id)
);

create table if not exists public.events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  starts_at timestamptz,
  ends_at timestamptz,
  location text,
  created_by uuid references auth.users,
  created_at timestamptz default now()
);

create table if not exists public.articles (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  content text,
  excerpt text,
  status text default 'draft',
  published_at timestamptz,
  created_by uuid references auth.users,
  created_at timestamptz default now()
);

create table if not exists public.executives (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  post text,
  year int,
  photo_url text,
  bio text,
  created_at timestamptz default now()
);

-- Recommended indexes
create index if not exists idx_events_starts_at on public.events (starts_at);
create index if not exists idx_articles_status on public.articles (status);
create index if not exists idx_profiles_role on public.profiles (role);
