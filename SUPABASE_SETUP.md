Supabase integration instructions (manual)

1) Environment variables

Open your project settings (local .env or hosting provider) and set:

NEXT_PUBLIC_SUPABASE_URL=https://mjyghrhqabqzrsgpntbw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your anon public key>
SUPABASE_SERVICE_ROLE_KEY=<service_role key - keep secret and only use server-side>

2) Enable Email Auth

- In Supabase Console > Authentication > Settings > Enable email signups.
- Configure a site URL and email templates if you want confirmation flows.

3) Create DB tables

- Open Supabase SQL Editor and run the SQL in supabase/schema.sql (copied into this repo).
- For the partners feature, also run supabase/partners-schema.sql to create the partners table.

4) Realtime and Storage (optional)

- If you need image uploads for executives, enable Storage and create a bucket, then
  use the client SDK to upload and store public URLs in the executives.photo_url field.

5) Admin service role usage

- Use SUPABASE_SERVICE_ROLE_KEY only on server-side (API routes). Never expose it in client code.

6) Signing in / Signup from this app

- Client pages use the NEXT_PUBLIC_* env variables and the Supabase JS client.
- After signup, profile data can be inserted into public.profiles via a server API (recommended)
  or via a SQL trigger.

7) Partners Management

- The /partnerships page displays partner logos in a carousel
- Admins can manage partners at /admin/dashboard after logging in at /login
- Maximum of 4 partners can be added at a time
- When more than 4 partners exist, the logos scroll continuously

8) Optional SQL trigger example (create in SQL editor)

-- insert profile on auth.user_created
create function public.handle_new_user() returns trigger language plpgsql
as $$
begin
  insert into public.profiles (id, created_at) values (new.id, now());
  return new;
end
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

9) Run locally

- Install dependencies: npm install
- Create a local .env with the NEXT_PUBLIC variables above
- Start dev server: npm run dev

10) When deploying (Netlify/Vercel)

- Add the NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY as environment variables in your hosting provider.
- For server-only service role operations, use serverless functions or API routes and set SUPABASE_SERVICE_ROLE_KEY in server envs.
