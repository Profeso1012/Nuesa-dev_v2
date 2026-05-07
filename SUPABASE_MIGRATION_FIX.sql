-- NUESA LASU Website - Database Schema Fix Migration
-- This script fixes the events and gallery_items tables, creates partners table, updates placeholders
-- Run this in Supabase SQL Editor after the initial schema is created

-- ==================== EVENTS TABLE FIX ====================

-- Drop the old department-based index
DROP INDEX IF EXISTS events_department_idx;

-- Drop department column from events table
ALTER TABLE events DROP COLUMN IF EXISTS department;

-- Add missing columns to events table
ALTER TABLE events 
  ADD COLUMN IF NOT EXISTS category TEXT CHECK (char_length(category) <= 50),
  ADD COLUMN IF NOT EXISTS date DATE,
  ADD COLUMN IF NOT EXISTS time TEXT CHECK (char_length(time) <= 50),
  ADD COLUMN IF NOT EXISTS venue TEXT CHECK (char_length(venue) <= 50),
  ADD COLUMN IF NOT EXISTS form_link TEXT;

-- Rename event_date to date if it still exists (handle both cases)
DO $$ 
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='events' AND column_name='event_date') THEN
    ALTER TABLE events RENAME COLUMN event_date TO date;
  END IF;
END $$;

-- Add/update character limit constraint on title
ALTER TABLE events DROP CONSTRAINT IF EXISTS events_title_len;
ALTER TABLE events ADD CONSTRAINT events_title_len CHECK (char_length(title) <= 50);

-- Add/update character limit constraint on description
ALTER TABLE events DROP CONSTRAINT IF EXISTS events_description_len;
ALTER TABLE events ADD CONSTRAINT events_description_len CHECK (char_length(description) <= 50);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS events_date_idx ON events(date);
CREATE INDEX IF NOT EXISTS events_category_idx ON events(category);

-- Update default image for events
ALTER TABLE events 
  ALTER COLUMN image_url SET DEFAULT 'https://cdn.builder.io/api/v1/image/assets%2F3227d0c4f5b6413da8096ea728e5d49e%2F646f6d86e51145e78d67e1096e25ab89?format=webp&width=800';

-- ==================== GALLERY_ITEMS TABLE FIX ====================

-- Drop the old department-based index
DROP INDEX IF EXISTS gallery_items_department_idx;

-- Drop department column from gallery_items table
ALTER TABLE gallery_items DROP COLUMN IF EXISTS department;

-- Add type and date columns to gallery_items
ALTER TABLE gallery_items 
  ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'news_photo' CHECK (type IN ('news_photo', 'event_photo')),
  ADD COLUMN IF NOT EXISTS date DATE DEFAULT CURRENT_DATE;

-- Add character limit constraints
ALTER TABLE gallery_items DROP CONSTRAINT IF EXISTS gallery_items_title_len;
ALTER TABLE gallery_items ADD CONSTRAINT gallery_items_title_len CHECK (char_length(title) <= 50);

ALTER TABLE gallery_items DROP CONSTRAINT IF EXISTS gallery_items_description_len;
ALTER TABLE gallery_items ADD CONSTRAINT gallery_items_description_len CHECK (char_length(description) <= 50);

-- Create new indexes
CREATE INDEX IF NOT EXISTS gallery_items_type_idx ON gallery_items(type);
CREATE INDEX IF NOT EXISTS gallery_items_date_idx ON gallery_items(date);

-- Update default image
ALTER TABLE gallery_items 
  ALTER COLUMN image_url SET DEFAULT 'https://cdn.builder.io/api/v1/image/assets%2F3227d0c4f5b6413da8096ea728e5d49e%2F02407d1fc1194fcf85b521a4c502d8d6?format=webp&width=800';

-- ==================== PARTNERS TABLE CREATION ====================

-- Create partners table if it doesn't exist
CREATE TABLE IF NOT EXISTS partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) <= 50),
  logo_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Enable Row Level Security for partners
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- Drop old policies if they exist
DROP POLICY IF EXISTS "partners_select_policy" ON partners;
DROP POLICY IF EXISTS "partners_admin_policy" ON partners;

-- Create RLS policies
CREATE POLICY "partners_select_policy" ON partners
  FOR SELECT USING (true);

CREATE POLICY "partners_insert_policy" ON partners
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "partners_update_policy" ON partners
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "partners_delete_policy" ON partners
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create indexes
CREATE INDEX IF NOT EXISTS partners_created_at_idx ON partners(created_at);

-- ==================== UPDATE DEFAULT IMAGES ====================

-- Update executives default image
ALTER TABLE executives 
  ALTER COLUMN image_url SET DEFAULT 'https://cdn.builder.io/api/v1/image/assets%2F3227d0c4f5b6413da8096ea728e5d49e%2Fa77b69baaa9f437199a086595c9d812d?format=webp&width=800';

-- Update department_admins default image
ALTER TABLE department_admins 
  ALTER COLUMN image_url SET DEFAULT 'https://cdn.builder.io/api/v1/image/assets%2F3227d0c4f5b6413da8096ea728e5d49e%2Fa77b69baaa9f437199a086595c9d812d?format=webp&width=800';

-- Update lecturers default image
ALTER TABLE lecturers 
  ALTER COLUMN image_url SET DEFAULT 'https://cdn.builder.io/api/v1/image/assets%2F3227d0c4f5b6413da8096ea728e5d49e%2Fa77b69baaa9f437199a086595c9d812d?format=webp&width=800';

-- ==================== SEED DATA FOR UPDATED TABLES ====================

-- Clear old events and insert new ones with correct structure
DELETE FROM events;

INSERT INTO events (title, category, date, time, venue, form_link, image_url) VALUES
  ('Engineering Week 2025', 'Flagship', '2025-06-15', '09:00 AM', 'Main Auditorium', 'https://forms.google.com/sample1', 'https://cdn.builder.io/api/v1/image/assets%2F3227d0c4f5b6413da8096ea728e5d49e%2F646f6d86e51145e78d67e1096e25ab89?format=webp&width=800'),
  ('Career Fair 2025', '2nd Edition', '2025-08-20', '10:00 AM', 'Engineering Complex', 'https://forms.google.com/sample2', 'https://cdn.builder.io/api/v1/image/assets%2F3227d0c4f5b6413da8096ea728e5d49e%2F646f6d86e51145e78d67e1096e25ab89?format=webp&width=800'),
  ('Tech Innovation Summit', 'Annual Summit', '2025-09-10', '08:00 AM', 'Conference Hall', 'https://forms.google.com/sample3', 'https://cdn.builder.io/api/v1/image/assets%2F3227d0c4f5b6413da8096ea728e5d49e%2F646f6d86e51145e78d67e1096e25ab89?format=webp&width=800'),
  ('Past Workshop 2024', 'Workshop', '2024-11-10', '02:00 PM', 'Lab Building', NULL, 'https://cdn.builder.io/api/v1/image/assets%2F3227d0c4f5b6413da8096ea728e5d49e%2F646f6d86e51145e78d67e1096e25ab89?format=webp&width=800');

-- Clear old gallery_items and insert new ones with type field
DELETE FROM gallery_items;

INSERT INTO gallery_items (title, description, type, date, image_url) VALUES
  ('Tech Expo 2024', 'Students showcase engineering projects', 'event_photo', '2024-11-01', 'https://cdn.builder.io/api/v1/image/assets%2F3227d0c4f5b6413da8096ea728e5d49e%2F02407d1fc1194fcf85b521a4c502d8d6?format=webp&width=800'),
  ('Industrial Visit', 'Visit to manufacturing facility', 'event_photo', '2024-10-15', 'https://cdn.builder.io/api/v1/image/assets%2F3227d0c4f5b6413da8096ea728e5d49e%2F02407d1fc1194fcf85b521a4c502d8d6?format=webp&width=800'),
  ('New Leadership Announced', 'NUESA LASU elects new executives', 'news_photo', '2024-11-05', 'https://cdn.builder.io/api/v1/image/assets%2F3227d0c4f5b6413da8096ea728e5d49e%2F02407d1fc1194fcf85b521a4c502d8d6?format=webp&width=800'),
  ('Award Ceremony', 'Students receive excellence awards', 'news_photo', '2024-10-20', 'https://cdn.builder.io/api/v1/image/assets%2F3227d0c4f5b6413da8096ea728e5d49e%2F02407d1fc1194fcf85b521a4c502d8d6?format=webp&width=800');

-- Seed partner data (the 3 existing partner logos)
DELETE FROM partners;

INSERT INTO partners (name, logo_url) VALUES
  ('Partner 1', 'https://api.builder.io/api/v1/image/assets/TEMP/8018abdf3cda3ae217a47536116433c51bd6d6eb?width=227'),
  ('Partner 2', 'https://api.builder.io/api/v1/image/assets/TEMP/d284db8c98d5ef2dd7ef1877b67afbf797c4ab3f?width=782'),
  ('Partner 3', 'https://api.builder.io/api/v1/image/assets/TEMP/4e9953c91b219726188361aa89b249728d63f55e?width=319');

-- ==================== VERIFICATION QUERIES ====================

-- Verify events table structure
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'events' ORDER BY ordinal_position;

-- Verify gallery_items table structure
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'gallery_items' ORDER BY ordinal_position;

-- Verify partners table exists
-- SELECT COUNT(*) as partner_count FROM partners;

-- Verify events have correct structure
-- SELECT title, category, date, time, venue FROM events LIMIT 5;

-- Verify gallery items have type field
-- SELECT title, type, date FROM gallery_items LIMIT 5;
