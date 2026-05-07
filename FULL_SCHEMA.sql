-- ============================================================
-- NUESA LASU - FULL DATABASE SCHEMA
-- Run this in Supabase SQL Editor on a fresh project.
-- Safe to run incrementally (uses IF NOT EXISTS / IF EXISTS).
-- ============================================================

-- ── ENUMS ────────────────────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE department_enum AS ENUM (
    'mechanical','aerospace','chemical','electronics-computer','civil','industrial'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ── EXECUTIVES ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS executives (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL CHECK (char_length(name) <= 50),
  position     TEXT NOT NULL CHECK (char_length(position) <= 50),
  bio          TEXT CHECK (char_length(bio) <= 150),
  email        TEXT,
  linkedin_url TEXT,
  x_url        TEXT,
  type         TEXT NOT NULL CHECK (type IN ('current','past')),
  council      TEXT CHECK (council IN ('SEC','SPC','SPE','FACULTY')),
  year         TEXT,
  image_url    TEXT DEFAULT '/person.png',
  created_at   TIMESTAMP DEFAULT now(),
  updated_at   TIMESTAMP DEFAULT now()
);
ALTER TABLE executives ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "executives_select" ON executives;
DROP POLICY IF EXISTS "executives_admin"  ON executives;
CREATE POLICY "executives_select" ON executives FOR SELECT USING (true);
CREATE POLICY "executives_admin"  ON executives FOR ALL
  USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE INDEX IF NOT EXISTS executives_type_idx    ON executives(type);
CREATE INDEX IF NOT EXISTS executives_council_idx ON executives(council);
CREATE INDEX IF NOT EXISTS executives_year_idx    ON executives(year);

-- ── DEPARTMENT_ADMINS (HODs) ──────────────────────────────────
CREATE TABLE IF NOT EXISTS department_admins (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL CHECK (char_length(name) <= 50),
  department   TEXT NOT NULL,
  bio          TEXT CHECK (char_length(bio) <= 150),
  linkedin_url TEXT,
  x_url        TEXT,
  image_url    TEXT DEFAULT '/person.png',
  created_at   TIMESTAMP DEFAULT now(),
  updated_at   TIMESTAMP DEFAULT now(),
  UNIQUE (department)   -- one HOD per department at a time
);
ALTER TABLE department_admins ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "dept_admins_select" ON department_admins;
DROP POLICY IF EXISTS "dept_admins_admin"  ON department_admins;
CREATE POLICY "dept_admins_select" ON department_admins FOR SELECT USING (true);
CREATE POLICY "dept_admins_admin"  ON department_admins FOR ALL
  USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE INDEX IF NOT EXISTS dept_admins_dept_idx ON department_admins(department);

-- ── DEPARTMENT_EXECUTIVES ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS department_executives (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL CHECK (char_length(name) <= 50),
  position     TEXT NOT NULL CHECK (char_length(position) <= 50),
  department   TEXT NOT NULL,
  bio          TEXT CHECK (char_length(bio) <= 150),
  email        TEXT,
  linkedin_url TEXT,
  x_url        TEXT,
  type         TEXT NOT NULL DEFAULT 'current' CHECK (type IN ('current','past')),
  year         TEXT,
  image_url    TEXT DEFAULT '/person.png',
  created_at   TIMESTAMP DEFAULT now(),
  updated_at   TIMESTAMP DEFAULT now()
);
ALTER TABLE department_executives ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "dept_execs_select" ON department_executives;
DROP POLICY IF EXISTS "dept_execs_admin"  ON department_executives;
CREATE POLICY "dept_execs_select" ON department_executives FOR SELECT USING (true);
CREATE POLICY "dept_execs_admin"  ON department_executives FOR ALL
  USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE INDEX IF NOT EXISTS dept_execs_dept_idx ON department_executives(department);
CREATE INDEX IF NOT EXISTS dept_execs_type_idx ON department_executives(type);

-- ── LECTURERS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lecturers (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name           TEXT NOT NULL CHECK (char_length(name) <= 50),
  specialization TEXT NOT NULL CHECK (char_length(specialization) <= 50),
  department     TEXT NOT NULL,
  bio            TEXT CHECK (char_length(bio) <= 150),
  linkedin_url   TEXT,
  x_url          TEXT,
  image_url      TEXT DEFAULT '/person.png',
  created_at     TIMESTAMP DEFAULT now(),
  updated_at     TIMESTAMP DEFAULT now()
);
ALTER TABLE lecturers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "lecturers_select" ON lecturers;
DROP POLICY IF EXISTS "lecturers_admin"  ON lecturers;
CREATE POLICY "lecturers_select" ON lecturers FOR SELECT USING (true);
CREATE POLICY "lecturers_admin"  ON lecturers FOR ALL
  USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE INDEX IF NOT EXISTS lecturers_dept_idx ON lecturers(department);

-- ── COURSES ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS courses (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lecturer_id UUID NOT NULL REFERENCES lecturers(id) ON DELETE CASCADE,
  code        TEXT NOT NULL CHECK (char_length(code) <= 50),
  title       TEXT NOT NULL CHECK (char_length(title) <= 50),
  level       TEXT,
  created_at  TIMESTAMP DEFAULT now()
);
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "courses_select" ON courses;
DROP POLICY IF EXISTS "courses_admin"  ON courses;
CREATE POLICY "courses_select" ON courses FOR SELECT USING (true);
CREATE POLICY "courses_admin"  ON courses FOR ALL
  USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE INDEX IF NOT EXISTS courses_lecturer_idx ON courses(lecturer_id);

-- ── EVENTS ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL CHECK (char_length(title) <= 50),
  category    TEXT CHECK (char_length(category) <= 50),
  date        DATE NOT NULL,
  time        TEXT CHECK (char_length(time) <= 50),
  venue       TEXT CHECK (char_length(venue) <= 50),
  form_link   TEXT,
  description TEXT CHECK (char_length(description) <= 1000),
  image_url   TEXT DEFAULT '/image.png',
  created_at  TIMESTAMP DEFAULT now(),
  updated_at  TIMESTAMP DEFAULT now()
);
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "events_select" ON events;
DROP POLICY IF EXISTS "events_admin"  ON events;
CREATE POLICY "events_select" ON events FOR SELECT USING (true);
CREATE POLICY "events_admin"  ON events FOR ALL
  USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE INDEX IF NOT EXISTS events_date_idx ON events(date);

-- ── GALLERY_ITEMS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL CHECK (char_length(title) <= 50),
  description TEXT CHECK (char_length(description) <= 500),
  type        TEXT NOT NULL CHECK (type IN ('news_photo','event_photo')),
  date        DATE DEFAULT CURRENT_DATE,
  image_url   TEXT DEFAULT '/image.png',
  event_id    UUID REFERENCES events(id) ON DELETE SET NULL,
  created_at  TIMESTAMP DEFAULT now(),
  updated_at  TIMESTAMP DEFAULT now()
);
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "gallery_select" ON gallery_items;
DROP POLICY IF EXISTS "gallery_admin"  ON gallery_items;
CREATE POLICY "gallery_select" ON gallery_items FOR SELECT USING (true);
CREATE POLICY "gallery_admin"  ON gallery_items FOR ALL
  USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
CREATE INDEX IF NOT EXISTS gallery_type_idx ON gallery_items(type);
CREATE INDEX IF NOT EXISTS gallery_date_idx ON gallery_items(date);

-- ── PARTNERS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partners (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL CHECK (char_length(name) <= 50),
  logo_url   TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "partners_select" ON partners;
DROP POLICY IF EXISTS "partners_admin"  ON partners;
CREATE POLICY "partners_select" ON partners FOR SELECT USING (true);
CREATE POLICY "partners_admin"  ON partners FOR ALL
  USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- ── SUBSCRIBERS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscribers (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT now()
);
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "subscribers_insert" ON subscribers;
DROP POLICY IF EXISTS "subscribers_select" ON subscribers;
CREATE POLICY "subscribers_insert" ON subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "subscribers_select" ON subscribers FOR SELECT
  USING (auth.role() = 'authenticated');
CREATE INDEX IF NOT EXISTS subscribers_email_idx ON subscribers(email);

-- ── ADMIN_USERS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admin_users (
  id         UUID PRIMARY KEY,
  email      TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT now()
);
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "admin_users_select" ON admin_users;
DROP POLICY IF EXISTS "admin_users_admin"  ON admin_users;
CREATE POLICY "admin_users_select" ON admin_users FOR SELECT
  USING (auth.role() = 'authenticated');
CREATE POLICY "admin_users_admin"  ON admin_users FOR ALL
  USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- ── STORAGE BUCKET ────────────────────────────────────────────
-- Run this separately in Supabase Dashboard > Storage:
-- Create a public bucket named "pictures"
