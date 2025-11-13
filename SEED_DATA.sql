-- Seed Data for NUESA LASU Website
-- This script populates the database with sample executives and department administrators
-- Run this in Supabase SQL Editor after running SUPABASE_MIGRATION.sql

-- ===== SAMPLE EXECUTIVES (CURRENT) =====

INSERT INTO executives (name, position, bio, email, type, council, year, image_url) VALUES
  ('Oluwaseyi Johnson', 'Post 1', 'President - Leading NUESA LASU', 'oluwaseyi@lasu.edu.ng', 'current', 'SEC', '2024/2025', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800'),
  ('Chioma Adeyemi', 'Post 2', 'Vice President - Strategic Planning', 'chioma@lasu.edu.ng', 'current', 'SEC', '2024/2025', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800'),
  ('Tunde Okafor', 'Post 3', 'General Secretary - Communications', 'tunde@lasu.edu.ng', 'current', 'SEC', '2024/2025', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800'),
  ('Amara Emeka', 'Post 4', 'Treasurer - Financial Management', 'amara@lasu.edu.ng', 'current', 'SEC', '2024/2025', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800'),
  ('Ibrahim Adeleke', 'Post 5', 'Public Relations - Media Relations', 'ibrahim@lasu.edu.ng', 'current', 'SEC', '2024/2025', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800'),
  ('Zainab Hussain', 'Post 6', 'Events Coordinator', 'zainab@lasu.edu.ng', 'current', 'SEC', '2024/2025', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800'),
  ('Kunle Olayinka', 'Post 7', 'Membership Secretary', 'kunle@lasu.edu.ng', 'current', 'SEC', '2024/2025', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800'),
  ('Blessing Okoro', 'Post 8', 'Auditor - Financial Oversight', 'blessing@lasu.edu.ng', 'current', 'SEC', '2024/2025', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800'),
  ('Adekunle Oladele', 'Post 9', 'Welfare Officer', 'adekunle@lasu.edu.ng', 'current', 'SEC', '2024/2025', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800'),
  ('Ngozi Nkwo', 'Chairman', 'SPC Chairman', 'ngozi@lasu.edu.ng', 'current', 'SPC', '2024/2025', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800');

-- ===== SAMPLE EXECUTIVES (PAST) =====

INSERT INTO executives (name, position, bio, email, type, council, year, image_url) VALUES
  ('Chinedu Okoro', 'Post 1', 'Former President', 'chinedu@lasu.edu.ng', 'past', 'SEC', '2023/2024', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800'),
  ('Fatima Abubakar', 'Post 2', 'Former Vice President', 'fatima@lasu.edu.ng', 'past', 'SEC', '2023/2024', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800'),
  ('David Enugwu', 'Post 3', 'Former Secretary', 'david@lasu.edu.ng', 'past', 'SEC', '2023/2024', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800'),
  ('Miriam Okonkwo', 'Post 4', 'Former Treasurer', 'miriam@lasu.edu.ng', 'past', 'SEC', '2023/2024', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800'),
  ('Samuel Ajiboye', 'Post 5', 'Former PRO', 'samuel@lasu.edu.ng', 'past', 'SEC', '2023/2024', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800');

-- ===== SAMPLE DEPARTMENT ADMINISTRATORS =====

INSERT INTO department_admins (name, department, bio, image_url) VALUES
  ('Dr. Ahmed Yakubu', 'mechanical', 'HOD - Mechanical Engineering', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800'),
  ('Prof. Ola Raji', 'aerospace', 'HOD - Aerospace Engineering', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800'),
  ('Dr. Folake Adeyemi', 'chemical', 'HOD - Chemical Engineering', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800'),
  ('Prof. Kunle Johnson', 'electronics-computer', 'HOD - Electronics & Computer', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800'),
  ('Dr. Uche Okonkwo', 'civil', 'HOD - Civil Engineering', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800'),
  ('Prof. Adejoke Odusami', 'industrial', 'HOD - Industrial Engineering', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800');

-- ===== SAMPLE LECTURERS =====

INSERT INTO lecturers (name, specialization, department, image_url) VALUES
  ('Prof. Bayo Adewale', 'Thermodynamics & Heat Transfer', 'mechanical', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800'),
  ('Dr. Amira Hassan', 'Fluid Mechanics', 'mechanical', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800'),
  ('Prof. Tunde Lawal', 'Aerodynamics & Flight', 'aerospace', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800'),
  ('Dr. Zara Malik', 'Process Design & Control', 'chemical', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800'),
  ('Prof. Chukwu Obi', 'Electrical Circuits & Power', 'electronics-computer', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800'),
  ('Dr. Maryam Adebayo', 'Structural Analysis', 'civil', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800'),
  ('Prof. Emeka Nwankwo', 'Operations Research', 'industrial', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2Fcdd139978eae4454a840b2529f738d38?format=webp&width=800');

-- ===== SAMPLE COURSES =====

INSERT INTO courses (lecturer_id, code, title, level) 
SELECT id, 'MEE 301', 'Thermodynamics I', '300' FROM lecturers WHERE name = 'Prof. Bayo Adewale' LIMIT 1;

INSERT INTO courses (lecturer_id, code, title, level) 
SELECT id, 'MEE 302', 'Fluid Mechanics', '300' FROM lecturers WHERE name = 'Dr. Amira Hassan' LIMIT 1;

INSERT INTO courses (lecturer_id, code, title, level) 
SELECT id, 'AEE 401', 'Aerodynamics', '400' FROM lecturers WHERE name = 'Prof. Tunde Lawal' LIMIT 1;

INSERT INTO courses (lecturer_id, code, title, level) 
SELECT id, 'CEE 301', 'Structural Design', '300' FROM lecturers WHERE name = 'Dr. Maryam Adebayo' LIMIT 1;

-- ===== SAMPLE EVENTS =====

INSERT INTO events (title, description, department, event_date, image_url) VALUES
  ('Engineering Week 2025', 'Annual celebration of engineering', 'mechanical', '2025-06-15', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2F052b7a9a1fe54b3993466cb2f9f0526f?format=webp&width=800'),
  ('Career Fair', 'Meet with industry professionals', 'aerospace', '2025-08-20', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2F052b7a9a1fe54b3993466cb2f9f0526f?format=webp&width=800'),
  ('Tech Innovation Summit', 'Latest in engineering tech', 'civil', '2025-09-10', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2F052b7a9a1fe54b3993466cb2f9f0526f?format=webp&width=800');

-- ===== SAMPLE GALLERY ITEMS =====

INSERT INTO gallery_items (title, description, department, image_url) VALUES
  ('Tech Expo 2024', 'Students showcase projects', 'mechanical', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2F9850dea013df467ebadc347003ca09a9?format=webp&width=800'),
  ('Industrial Visit', 'Visit to manufacturing plant', 'chemical', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2F9850dea013df467ebadc347003ca09a9?format=webp&width=800'),
  ('Workshop Session', 'Hands-on training for students', 'aerospace', 'https://cdn.builder.io/api/v1/image/assets%2F00f3c2731bef40b8b4a8d1dddbc4395b%2F9850dea013df467ebadc347003ca09a9?format=webp&width=800');
