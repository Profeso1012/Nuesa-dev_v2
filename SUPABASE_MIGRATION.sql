-- STEP 1: Create executives table
CREATE TABLE executives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) <= 50),
  position TEXT NOT NULL CHECK (char_length(position) <= 50),
  bio TEXT CHECK (char_length(bio) <= 50),
  image_url TEXT DEFAULT 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800',
  email TEXT,
  type TEXT NOT NULL CHECK (type IN ('current', 'past')),
  council TEXT CHECK (council IN ('SEC', 'SPC')),
  year TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Enable RLS on executives table
ALTER TABLE executives ENABLE ROW LEVEL SECURITY;

-- Public read access for executives
CREATE POLICY "executives_select_policy" ON executives
  FOR SELECT USING (true);

-- Authenticated write access for executives
CREATE POLICY "executives_admin_policy" ON executives
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Create index on executives for better query performance
CREATE INDEX executives_type_idx ON executives(type);
CREATE INDEX executives_council_idx ON executives(council);
CREATE INDEX executives_department_admin_idx ON executives(type, council);

-- STEP 2: Create department_admins table
CREATE TABLE department_admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) <= 50),
  department department_enum NOT NULL UNIQUE,
  bio TEXT CHECK (char_length(bio) <= 50),
  image_url TEXT DEFAULT 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Enable RLS on department_admins table
ALTER TABLE department_admins ENABLE ROW LEVEL SECURITY;

-- Public read access for department_admins
CREATE POLICY "department_admins_select_policy" ON department_admins
  FOR SELECT USING (true);

-- Authenticated write access for department_admins
CREATE POLICY "department_admins_admin_policy" ON department_admins
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Create index on department_admins
CREATE INDEX department_admins_department_idx ON department_admins(department);

-- STEP 3: Create admin_users table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT now()
);

-- Enable RLS on admin_users table
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can read admin_users
CREATE POLICY "admin_users_select_policy" ON admin_users
  FOR SELECT USING (auth.role() = 'authenticated');

-- Only authenticated users can insert/update admin_users
CREATE POLICY "admin_users_admin_policy" ON admin_users
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Create index on admin_users
CREATE INDEX admin_users_email_idx ON admin_users(email);

-- STEP 4: Update existing tables with 50-char constraints
-- Update lecturers table
ALTER TABLE lecturers
  ADD CONSTRAINT lecturers_name_len CHECK (char_length(name) <= 50);

ALTER TABLE lecturers
  ADD CONSTRAINT lecturers_specialization_len CHECK (char_length(specialization) <= 50);

-- Update courses table
ALTER TABLE courses
  ADD CONSTRAINT courses_code_len CHECK (char_length(code) <= 50);

ALTER TABLE courses
  ADD CONSTRAINT courses_title_len CHECK (char_length(title) <= 50);

-- Update events table
ALTER TABLE events
  ADD CONSTRAINT events_title_len CHECK (char_length(title) <= 50);

ALTER TABLE events
  ADD CONSTRAINT events_description_len CHECK (char_length(description) <= 50);

-- Update gallery_items table
ALTER TABLE gallery_items
  ADD CONSTRAINT gallery_items_title_len CHECK (char_length(title) <= 50);

ALTER TABLE gallery_items
  ADD CONSTRAINT gallery_items_description_len CHECK (char_length(description) <= 50);
