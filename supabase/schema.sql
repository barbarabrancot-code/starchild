-- Comments, behind one shared password.
--
-- The password is checked in the database, not in the browser. The anon key that
-- ships in the bundle can't read or write the table directly — RLS denies
-- everything — so the only way in is through the two functions below, and both
-- refuse to do anything without the password. Someone who reads the JS bundle
-- learns the Supabase URL and the anon key, and still can't see a comment.
--
-- Run this once in the Supabase SQL editor.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------- the comments

create table if not exists public.comments (
  id          uuid primary key default gen_random_uuid(),
  author      text not null check (length(trim(author)) between 1 and 60),
  body        text not null check (length(trim(body)) between 1 and 4000),
  -- which part of the site the comment is about; null while there's only one page
  topic       text,
  created_at  timestamptz not null default now()
);

create index if not exists comments_created_at_idx on public.comments (created_at desc);

-- Locked by default. No policies are added on purpose: with RLS on and no policy,
-- the anon role can do nothing at all. The functions below are the only door.
alter table public.comments enable row level security;

-- --------------------------------------------------------------- the password

create table if not exists public.access_password (
  id       int primary key default 1 check (id = 1),
  hash     text not null
);

alter table public.access_password enable row level security;

-- Set (or change) the password. Run this yourself, in the SQL editor, with the
-- password you want to hand out. It's stored as a bcrypt hash, never in plain text.
--
--   insert into public.access_password (id, hash) values (1, crypt('your-password', gen_salt('bf')))
--   on conflict (id) do update set hash = excluded.hash;

create or replace function public.password_ok(p_password text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.access_password
    where id = 1 and hash = crypt(p_password, hash)
  );
$$;

-- ---------------------------------------------------------------- the two doors

create or replace function public.list_comments(p_password text, p_topic text default null)
returns setof public.comments
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.password_ok(p_password) then
    raise exception 'wrong password' using errcode = '28000';
  end if;

  return query
    select * from public.comments
    where p_topic is null or topic = p_topic
    order by created_at desc
    limit 500;
end;
$$;

create or replace function public.add_comment(
  p_password text,
  p_author   text,
  p_body     text,
  p_topic    text default null
)
returns public.comments
language plpgsql
security definer
set search_path = public
as $$
declare
  fresh public.comments;
begin
  if not public.password_ok(p_password) then
    raise exception 'wrong password' using errcode = '28000';
  end if;

  insert into public.comments (author, body, topic)
  values (trim(p_author), trim(p_body), p_topic)
  returning * into fresh;

  return fresh;
end;
$$;

-- The anon key may call these and nothing else.
revoke all on function public.password_ok(text) from anon, authenticated;
grant execute on function public.list_comments(text, text) to anon;
grant execute on function public.add_comment(text, text, text, text) to anon;
