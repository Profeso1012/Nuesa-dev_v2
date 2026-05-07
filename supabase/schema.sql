-- Create departments enum
CREATE TYPE department_enum AS ENUM (
  'mechanical',
  'aerospace',
  'chemical',
  'electronics-computer',
  'civil',
  'industrial'
);

-- Lecturers table
CREATE TABLE lecturers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  department department_enum NOT NULL,
  image_url TEXT DEFAULT 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Courses table
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lecturer_id UUID NOT NULL REFERENCES lecturers(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  title TEXT NOT NULL,
  level TEXT CHECK (level IN ('100', '200', '300', '400', '500')),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  department department_enum NOT NULL,
  image_url TEXT DEFAULT 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2F052b7a9a1fe54b3993466cb2f9f0526f?format=webp&width=800',
  event_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- News/Gallery items table
CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  department department_enum NOT NULL,
  image_url TEXT DEFAULT 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2F9850dea013df467ebadc347003ca09a9?format=webp&width=800',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create RLS policies (enable for security)
ALTER TABLE lecturers ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

-- Public read access for lecturers
CREATE POLICY "lecturers_select_policy" ON lecturers
  FOR SELECT USING (true);

-- Public read access for courses
CREATE POLICY "courses_select_policy" ON courses
  FOR SELECT USING (true);

-- Public read access for events
CREATE POLICY "events_select_policy" ON events
  FOR SELECT USING (true);

-- Public read access for gallery items
CREATE POLICY "gallery_items_select_policy" ON gallery_items
  FOR SELECT USING (true);

-- Admin write access (requires authentication check in app logic)
CREATE POLICY "lecturers_admin_policy" ON lecturers
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "courses_admin_policy" ON courses
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "events_admin_policy" ON events
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "gallery_items_admin_policy" ON gallery_items
  FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX lecturers_department_idx ON lecturers(department);
CREATE INDEX courses_lecturer_id_idx ON courses(lecturer_id);
CREATE INDEX events_department_idx ON events(department);
CREATE INDEX gallery_items_department_idx ON gallery_items(department);
