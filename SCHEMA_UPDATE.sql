-- NUESA LASU Schema Update
-- Run this in Supabase SQL Editor

-- ==================== 1. EXPAND BIO LIMITS ====================

-- executives: raise bio to 150 chars, add social links
ALTER TABLE executives DROP CONSTRAINT IF EXISTS executives_bio_check;
ALTER TABLE executives ADD CONSTRAINT executives_bio_check CHECK (char_length(bio) <= 150);

ALTER TABLE executives ADD COLUMN IF NOT EXISTS linkedin_url TEXT;
ALTER TABLE executives ADD COLUMN IF NOT EXISTS x_url TEXT;

-- Allow SPE as a valid council value (in addition to SEC, SPC)
ALTER TABLE executives DROP CONSTRAINT IF EXISTS executives_council_check;
ALTER TABLE executives ADD CONSTRAINT executives_council_check
  CHECK (council IN ('SEC', 'SPC'));

-- department_admins: raise bio to 150 chars, add social links
ALTER TABLE department_admins DROP CONSTRAINT IF EXISTS department_admins_bio_check;
ALTER TABLE department_admins ADD CONSTRAINT department_admins_bio_check CHECK (char_length(bio) <= 150);

ALTER TABLE department_admins ADD COLUMN IF NOT EXISTS linkedin_url TEXT;
ALTER TABLE department_admins ADD COLUMN IF NOT EXISTS x_url TEXT;

-- Remove UNIQUE constraint on department so you can have multiple HODs over time
ALTER TABLE department_admins DROP CONSTRAINT IF EXISTS department_admins_department_key;

-- lecturers: add bio (150 chars) and social links
ALTER TABLE lecturers ADD COLUMN IF NOT EXISTS bio TEXT CHECK (char_length(bio) <= 150);
ALTER TABLE lecturers ADD COLUMN IF NOT EXISTS linkedin_url TEXT;
ALTER TABLE lecturers ADD COLUMN IF NOT EXISTS x_url TEXT;

-- ==================== 2. EVENTS: ADD LONG DESCRIPTION ====================

-- Drop the old 50-char description constraint
ALTER TABLE events DROP CONSTRAINT IF EXISTS events_description_len;

-- Add/update description column for past event writeups (1000 chars)
ALTER TABLE events ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE events ADD CONSTRAINT events_description_len CHECK (char_length(description) <= 1000);

-- ==================== 3. GALLERY: LINK TO EVENTS ====================

-- Add optional FK to events so gallery photos can be associated with a past event
ALTER TABLE gallery_items ADD COLUMN IF NOT EXISTS event_id UUID REFERENCES events(id) ON DELETE SET NULL;

-- Drop old 50-char description constraint and raise it
ALTER TABLE gallery_items DROP CONSTRAINT IF EXISTS gallery_items_description_len;
ALTER TABLE gallery_items ADD CONSTRAINT gallery_items_description_len CHECK (char_length(description) <= 500);

CREATE INDEX IF NOT EXISTS gallery_items_event_id_idx ON gallery_items(event_id);

-- ==================== 4. EXECUTIVES: YEAR TRANSITION SUPPORT ====================
-- The year column already exists. The workflow is:
-- Admin adds current executives (type='current', year='2025/2026')
-- When term ends, admin clicks "Move to Past" which sets type='past' and confirms the year
-- No data re-entry needed — same row, just type changes

-- Ensure year has no length constraint issues
ALTER TABLE executives DROP CONSTRAINT IF EXISTS executives_year_check;

-- ==================== 5. INDEXES ====================
CREATE INDEX IF NOT EXISTS executives_year_idx ON executives(year);
CREATE INDEX IF NOT EXISTS department_admins_dept_idx ON department_admins(department);

-- ==================== 6. SUBSCRIBERS TABLE ====================

CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe (insert)
CREATE POLICY "subscribers_insert_policy" ON subscribers
  FOR INSERT WITH CHECK (true);

-- Only authenticated admins can read
CREATE POLICY "subscribers_select_policy" ON subscribers
  FOR SELECT USING (auth.role() = 'authenticated');

-- Only authenticated admins can delete
CREATE POLICY "subscribers_delete_policy" ON subscribers
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS subscribers_email_idx ON subscribers(email);
CREATE INDEX IF NOT EXISTS subscribers_created_at_idx ON subscribers(created_at);

-- ==================== 6. DEPARTMENTAL EXECUTIVES TABLE ====================
-- Each of the 6 departments has 4 student executive posts

CREATE TABLE IF NOT EXISTS department_executives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) <= 50),
  position TEXT NOT NULL CHECK (char_length(position) <= 50),
  department TEXT NOT NULL,
  bio TEXT CHECK (char_length(bio) <= 150),
  email TEXT,
  linkedin_url TEXT,
  x_url TEXT,
  image_url TEXT DEFAULT '/person.png',
  type TEXT NOT NULL DEFAULT 'current' CHECK (type IN ('current', 'past')),
  year TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

ALTER TABLE department_executives ENABLE ROW LEVEL SECURITY;

CREATE POLICY "dept_executives_select" ON department_executives
  FOR SELECT USING (true);

CREATE POLICY "dept_executives_admin" ON department_executives
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS dept_executives_dept_idx ON department_executives(department);
CREATE INDEX IF NOT EXISTS dept_executives_type_idx ON department_executives(type);
CREATE INDEX IF NOT EXISTS dept_executives_year_idx ON department_executives(year);

-- ==================== 7. SUBSCRIBERS TABLE ====================
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe (insert)
CREATE POLICY "subscribers_insert" ON subscribers
  FOR INSERT WITH CHECK (true);

-- Only authenticated admins can read
CREATE POLICY "subscribers_select" ON subscribers
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS subscribers_email_idx ON subscribers(email);
CREATE INDEX IF NOT EXISTS subscribers_created_at_idx ON subscribers(created_at);

-- ==================== 8. ADD FACULTY COUNCIL FOR DEAN ====================
ALTER TABLE executives DROP CONSTRAINT IF EXISTS executives_council_check;
ALTER TABLE executives ADD CONSTRAINT executives_council_check
  CHECK (council IN ('SEC', 'SPC', 'SPE', 'FACULTY'));
