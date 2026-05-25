-- ============================================================
-- Kolkata Real Estate Showcase - MySQL Database Schema
-- Run this file in MySQL Workbench
-- ============================================================

CREATE DATABASE IF NOT EXISTS kolkata_realestate
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE kolkata_realestate;

-- ============================================================
-- ADMIN USERS
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_users (
  id         BIGINT AUTO_INCREMENT PRIMARY KEY,
  username   VARCHAR(50)  NOT NULL UNIQUE,
  email      VARCHAR(100) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,   -- BCrypt hash
  role       ENUM('SUPER_ADMIN','ADMIN') DEFAULT 'ADMIN',
  active     BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Default admin (password: Admin@1234)
INSERT INTO admin_users (username, email, password, role)
VALUES ('admin', 'admin@kolkatarealestate.com',
        '$2a$12$YourBcryptHashHereChangeThis', 'SUPER_ADMIN');

-- ============================================================
-- SITE STATISTICS (shown on Index/Home page)
-- ============================================================
CREATE TABLE IF NOT EXISTS site_stats (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  stat_key      VARCHAR(100) NOT NULL UNIQUE,   -- e.g. "projects_completed"
  stat_label    VARCHAR(200) NOT NULL,           -- e.g. "Projects Completed"
  stat_value    VARCHAR(100) NOT NULL,           -- e.g. "150+"
  display_order INT DEFAULT 0,
  visible       BOOLEAN DEFAULT TRUE,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO site_stats (stat_key, stat_label, stat_value, display_order) VALUES
  ('projects_completed', 'Projects Completed',    '150+',   1),
  ('years_experience',   'Years of Experience',   '20+',    2),
  ('happy_clients',      'Happy Clients',         '2000+',  3),
  ('cities_covered',     'Cities Covered',        '5',      4);

-- ============================================================
-- PROJECTS
-- ============================================================
CREATE TABLE IF NOT EXISTS projects (
  id               BIGINT AUTO_INCREMENT PRIMARY KEY,
  name             VARCHAR(255) NOT NULL,
  slug             VARCHAR(255) NOT NULL UNIQUE,
  tagline          VARCHAR(500),
  description      TEXT,
  location         VARCHAR(255),
  city             VARCHAR(100),
  state            VARCHAR(100),
  pincode          VARCHAR(10),
  status           ENUM('UPCOMING','ONGOING','COMPLETED','SOLD_OUT') DEFAULT 'ONGOING',
  property_type    ENUM('RESIDENTIAL','COMMERCIAL','MIXED','VILLA','APARTMENT','PLOT') DEFAULT 'RESIDENTIAL',
  total_units      INT,
  available_units  INT,
  price_min        DECIMAL(15,2),
  price_max        DECIMAL(15,2),
  price_unit       VARCHAR(50) DEFAULT 'sq ft',   -- per sq ft / per unit / per plot
  area_min         DECIMAL(10,2),                 -- sq ft
  area_max         DECIMAL(10,2),
  possession_date  DATE,
  rera_number      VARCHAR(100),
  developer_name   VARCHAR(255),
  website_url      VARCHAR(500),
  map_latitude     DECIMAL(10,8),
  map_longitude    DECIMAL(11,8),
  featured         BOOLEAN DEFAULT FALSE,
  visible          BOOLEAN DEFAULT TRUE,
  display_order    INT DEFAULT 0,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================================
-- PROJECT PHOTOS
-- ============================================================
CREATE TABLE IF NOT EXISTS project_photos (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  project_id    BIGINT NOT NULL,
  url           VARCHAR(1000) NOT NULL,
  caption       VARCHAR(500),
  photo_type    ENUM('HERO','GALLERY','FLOOR_PLAN','AMENITY','LOCATION_MAP','BROCHURE') DEFAULT 'GALLERY',
  display_order INT DEFAULT 0,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- ============================================================
-- PROJECT AMENITIES
-- ============================================================
CREATE TABLE IF NOT EXISTS project_amenities (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  project_id    BIGINT NOT NULL,
  name          VARCHAR(255) NOT NULL,
  icon          VARCHAR(100),                -- Lucide icon name e.g. "swimming-pool"
  category      VARCHAR(100),               -- e.g. "Sports", "Health", "Lifestyle"
  description   VARCHAR(500),
  display_order INT DEFAULT 0,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- ============================================================
-- PROJECT FACILITIES
-- ============================================================
CREATE TABLE IF NOT EXISTS project_facilities (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  project_id    BIGINT NOT NULL,
  name          VARCHAR(255) NOT NULL,
  icon          VARCHAR(100),
  value         VARCHAR(255),               -- e.g. "24x7", "Available", "Yes"
  description   VARCHAR(500),
  display_order INT DEFAULT 0,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- ============================================================
-- PROJECT LOCAL INFO (nearby landmarks, distances)
-- ============================================================
CREATE TABLE IF NOT EXISTS project_local_info (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  project_id    BIGINT NOT NULL,
  category      ENUM('SCHOOL','HOSPITAL','MALL','METRO','AIRPORT','RAILWAY','HIGHWAY','PARK','RESTAURANT','BANK','OTHER') DEFAULT 'OTHER',
  name          VARCHAR(255) NOT NULL,
  distance      VARCHAR(100),               -- e.g. "2.5 km", "10 min drive"
  description   VARCHAR(500),
  display_order INT DEFAULT 0,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- ============================================================
-- PROJECT SPECIFICATIONS / FLOOR PLANS
-- ============================================================
CREATE TABLE IF NOT EXISTS project_specifications (
  id              BIGINT AUTO_INCREMENT PRIMARY KEY,
  project_id      BIGINT NOT NULL,
  unit_type       VARCHAR(100),               -- e.g. "2 BHK", "3 BHK", "Studio"
  carpet_area     DECIMAL(10,2),
  built_up_area   DECIMAL(10,2),
  super_area      DECIMAL(10,2),
  floor_count     INT,
  bathrooms       INT,
  balconies       INT,
  parking         INT,
  price           DECIMAL(15,2),
  description     TEXT,
  display_order   INT DEFAULT 0,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- ============================================================
-- TESTIMONIALS
-- ============================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  client_name   VARCHAR(255) NOT NULL,
  client_title  VARCHAR(255),               -- e.g. "Software Engineer, Infosys"
  avatar_url    VARCHAR(1000),
  rating        TINYINT DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  review        TEXT NOT NULL,
  project_id    BIGINT,                     -- optional: linked project
  featured      BOOLEAN DEFAULT FALSE,
  visible       BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
);

-- ============================================================
-- CONTACT / ENQUIRY SUBMISSIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_enquiries (
  id              BIGINT AUTO_INCREMENT PRIMARY KEY,
  full_name       VARCHAR(255) NOT NULL,
  email           VARCHAR(255),
  phone           VARCHAR(20),
  subject         VARCHAR(500),
  message         TEXT,
  project_id      BIGINT,                   -- optional: related project
  source_page     VARCHAR(255),             -- which page submitted e.g. "/contact", "/project/xyz"
  status          ENUM('NEW','READ','REPLIED','ARCHIVED') DEFAULT 'NEW',
  admin_notes     TEXT,
  ip_address      VARCHAR(45),
  user_agent      TEXT,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
);

-- ============================================================
-- APPOINTMENT / BOOKING REQUESTS
-- ============================================================
CREATE TABLE IF NOT EXISTS appointment_requests (
  id                BIGINT AUTO_INCREMENT PRIMARY KEY,
  full_name         VARCHAR(255) NOT NULL,
  email             VARCHAR(255),
  phone             VARCHAR(20) NOT NULL,
  preferred_date    DATE,
  preferred_time    VARCHAR(50),
  project_id        BIGINT,
  visit_type        ENUM('SITE_VISIT','VIRTUAL_TOUR','PHONE_CALL','OFFICE_VISIT') DEFAULT 'SITE_VISIT',
  message           TEXT,
  status            ENUM('PENDING','CONFIRMED','CANCELLED','COMPLETED') DEFAULT 'PENDING',
  admin_notes       TEXT,
  ip_address        VARCHAR(45),
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_projects_status        ON projects(status);
CREATE INDEX idx_projects_featured      ON projects(featured);
CREATE INDEX idx_projects_visible       ON projects(visible);
CREATE INDEX idx_project_photos_project ON project_photos(project_id);
CREATE INDEX idx_amenities_project      ON project_amenities(project_id);
CREATE INDEX idx_facilities_project     ON project_facilities(project_id);
CREATE INDEX idx_local_info_project     ON project_local_info(project_id);
CREATE INDEX idx_specs_project          ON project_specifications(project_id);
CREATE INDEX idx_testimonials_visible   ON testimonials(visible);
CREATE INDEX idx_enquiries_status       ON contact_enquiries(status);
CREATE INDEX idx_appointments_status    ON appointment_requests(status);

-- ============================================================
-- SAMPLE PROJECT DATA
-- ============================================================
INSERT INTO projects
  (name, slug, tagline, description, location, city, state, pincode,
   status, property_type, total_units, available_units,
   price_min, price_max, price_unit, area_min, area_max,
   possession_date, developer_name, featured, visible, display_order)
VALUES
(
  'Prestige Park Row',
  'prestige-park-row',
  'Luxury Villas in the Heart of Kolkata',
  'Experience unparalleled luxury living at Prestige Park Row. Set amidst lush greenery with world-class amenities, these premium villas redefine the concept of upscale residential living in Kolkata.',
  'New Town, Action Area II',
  'Kolkata', 'West Bengal', '700156',
  'ONGOING', 'VILLA',
  120, 45,
  8500000.00, 25000000.00, 'per unit',
  1800, 4500,
  '2026-12-31', 'Prestige Group',
  TRUE, TRUE, 1
),
(
  'Merlin Iridium',
  'merlin-iridium',
  'Modern Living Redefined',
  'Merlin Iridium offers meticulously designed 2 and 3 BHK apartments with state-of-the-art facilities. Located in the prime area of EM Bypass, it offers excellent connectivity to all major landmarks.',
  'EM Bypass, Kasba',
  'Kolkata', 'West Bengal', '700107',
  'UPCOMING', 'APARTMENT',
  350, 350,
  4500000.00, 9500000.00, 'per unit',
  850, 1650,
  '2027-06-30', 'Merlin Group',
  TRUE, TRUE, 2
),
(
  'Ambuja Neotia Utalika',
  'ambuja-neotia-utalika',
  'A Community of Togetherness',
  'Utalika Luxury County is a premium township offering an integrated lifestyle with residences, retail spaces, and recreational facilities spread across acres of thoughtfully planned landscape.',
  'Utalika, Mukundapur',
  'Kolkata', 'West Bengal', '700099',
  'COMPLETED', 'RESIDENTIAL',
  800, 12,
  3200000.00, 7500000.00, 'per unit',
  650, 1350,
  '2024-03-31', 'Ambuja Neotia',
  FALSE, TRUE, 3
);

-- Sample amenities for project 1
INSERT INTO project_amenities (project_id, name, icon, category, display_order) VALUES
(1, 'Swimming Pool',     'waves',         'Sports',    1),
(1, 'Gymnasium',         'dumbbell',      'Health',    2),
(1, 'Clubhouse',         'building-2',    'Lifestyle', 3),
(1, 'Tennis Court',      'circle-dot',    'Sports',    4),
(1, 'Children''s Play',  'smile',         'Lifestyle', 5),
(1, 'Landscaped Garden', 'trees',         'Nature',    6),
(1, 'Spa & Wellness',    'sparkles',      'Health',    7),
(1, 'Indoor Games',      'gamepad-2',     'Lifestyle', 8);

-- Sample facilities for project 1
INSERT INTO project_facilities (project_id, name, icon, value, display_order) VALUES
(1, '24x7 Security',      'shield',        '24x7',     1),
(1, 'Power Backup',       'zap',           '100%',     2),
(1, 'CCTV Surveillance',  'cctv',          'Yes',      3),
(1, 'High Speed Elevator','arrow-up',      '4 Lifts',  4),
(1, 'Visitor Parking',    'car',           'Available',5),
(1, 'Water Supply',       'droplets',      '24x7',     6);

-- Sample local info for project 1
INSERT INTO project_local_info (project_id, category, name, distance, display_order) VALUES
(1, 'SCHOOL',   'DPS New Town',           '1.2 km',   1),
(1, 'HOSPITAL', 'Fortis Hospital',        '3.5 km',   2),
(1, 'MALL',     'City Centre 2',          '4.0 km',   3),
(1, 'METRO',    'New Town Metro Station', '0.8 km',   4),
(1, 'AIRPORT',  'Netaji Subhas Airport',  '8.5 km',   5),
(1, 'RAILWAY',  'Sealdah Station',        '12.0 km',  6);

-- Sample specifications for project 1
INSERT INTO project_specifications (project_id, unit_type, carpet_area, super_area, floor_count, bathrooms, balconies, parking, price, display_order) VALUES
(1, '3 BHK Villa',  1850, 2400, 2, 3, 2, 2, 12500000.00, 1),
(1, '4 BHK Villa',  2800, 3600, 3, 4, 3, 3, 18000000.00, 2),
(1, '5 BHK Duplex', 4200, 5000, 3, 5, 4, 4, 24000000.00, 3);

-- Sample testimonials
INSERT INTO testimonials (client_name, client_title, rating, review, project_id, featured, visible, display_order) VALUES
('Rajesh Kumar',    'IT Professional, TCS',              5, 'Best investment decision of my life. The quality of construction and the amenities are top notch. The team was professional throughout the buying process.', 1, TRUE,  TRUE, 1),
('Priya Chatterjee','Business Owner',                    5, 'Absolutely love my new apartment! The attention to detail in design and the prompt after-sales service makes Kolkata Real Estate stand apart.', 2, TRUE,  TRUE, 2),
('Amit Banerjee',   'Professor, Jadavpur University',    4, 'Great location and excellent connectivity. The project was delivered on time which is rare in this industry. Highly recommend to everyone.', 1, FALSE, TRUE, 3),
('Sunita Dey',      'Doctor, Apollo Hospital',           5, 'The landscaping and green spaces are beautiful. My kids love the play area. A perfect home for families looking for a peaceful community.', NULL, TRUE, TRUE, 4);
