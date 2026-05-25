-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: kolkata_realestate
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('SUPER_ADMIN','ADMIN') COLLATE utf8mb4_unicode_ci DEFAULT 'ADMIN',
  `active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES (1,'admin','admin@kolkatarealestate.com','$2a$12$Nqj5SkT1n0Kj6jz6P5W9Ue6KJ2YQx5nVQ8mT0Jf3mWz8X2sW0uH8G','SUPER_ADMIN',1,'2026-05-14 14:16:52','2026-05-23 13:46:17');
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointment_requests`
--

DROP TABLE IF EXISTS `appointment_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment_requests` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `preferred_date` date DEFAULT NULL,
  `preferred_time` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `project_id` bigint DEFAULT NULL,
  `visit_type` enum('SITE_VISIT','VIRTUAL_TOUR','PHONE_CALL','OFFICE_VISIT') COLLATE utf8mb4_unicode_ci DEFAULT 'SITE_VISIT',
  `message` text COLLATE utf8mb4_unicode_ci,
  `status` enum('PENDING','CONFIRMED','CANCELLED','COMPLETED') COLLATE utf8mb4_unicode_ci DEFAULT 'PENDING',
  `admin_notes` text COLLATE utf8mb4_unicode_ci,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `idx_appointments_status` (`status`),
  CONSTRAINT `appointment_requests_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment_requests`
--

LOCK TABLES `appointment_requests` WRITE;
/*!40000 ALTER TABLE `appointment_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `appointment_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_enquiries`
--

DROP TABLE IF EXISTS `contact_enquiries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_enquiries` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci,
  `project_id` bigint DEFAULT NULL,
  `source_page` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('NEW','READ','REPLIED','ARCHIVED') COLLATE utf8mb4_unicode_ci DEFAULT 'NEW',
  `admin_notes` text COLLATE utf8mb4_unicode_ci,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `idx_enquiries_status` (`status`),
  CONSTRAINT `contact_enquiries_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_enquiries`
--

LOCK TABLES `contact_enquiries` WRITE;
/*!40000 ALTER TABLE `contact_enquiries` DISABLE KEYS */;
INSERT INTO `contact_enquiries` VALUES (1,'Binit Ghosh','www.binit108walla@gmail.com','7076494138',NULL,'i want an appointment\n',NULL,'/contact','NEW',NULL,'0:0:0:0:0:0:0:1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36 Edg/148.0.0.0','2026-05-24 16:00:15','2026-05-24 16:00:15');
/*!40000 ALTER TABLE `contact_enquiries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_amenities`
--

DROP TABLE IF EXISTS `project_amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_amenities` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `project_id` bigint NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_amenities_project` (`project_id`),
  CONSTRAINT `project_amenities_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_amenities`
--

LOCK TABLES `project_amenities` WRITE;
/*!40000 ALTER TABLE `project_amenities` DISABLE KEYS */;
INSERT INTO `project_amenities` VALUES (1,1,'Swimming Pool','waves','Sports',NULL,1),(2,1,'Gymnasium','dumbbell','Health',NULL,2),(3,1,'Clubhouse','building-2','Lifestyle',NULL,3),(4,1,'Tennis Court','circle-dot','Sports',NULL,4),(5,1,'Children\'s Play','smile','Lifestyle',NULL,5),(6,1,'Landscaped Garden','trees','Nature',NULL,6),(7,1,'Spa & Wellness','sparkles','Health',NULL,7),(8,1,'Indoor Games','gamepad-2','Lifestyle',NULL,8);
/*!40000 ALTER TABLE `project_amenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_facilities`
--

DROP TABLE IF EXISTS `project_facilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_facilities` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `project_id` bigint NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_facilities_project` (`project_id`),
  CONSTRAINT `project_facilities_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_facilities`
--

LOCK TABLES `project_facilities` WRITE;
/*!40000 ALTER TABLE `project_facilities` DISABLE KEYS */;
INSERT INTO `project_facilities` VALUES (1,1,'24x7 Security','shield','24x7',NULL,1),(2,1,'Power Backup','zap','100%',NULL,2),(3,1,'CCTV Surveillance','cctv','Yes',NULL,3),(4,1,'High Speed Elevator','arrow-up','4 Lifts',NULL,4),(5,1,'Visitor Parking','car','Available',NULL,5),(6,1,'Water Supply','droplets','24x7',NULL,6);
/*!40000 ALTER TABLE `project_facilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_local_info`
--

DROP TABLE IF EXISTS `project_local_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_local_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `project_id` bigint NOT NULL,
  `category` enum('SCHOOL','HOSPITAL','MALL','METRO','AIRPORT','RAILWAY','HIGHWAY','PARK','RESTAURANT','BANK','OTHER') COLLATE utf8mb4_unicode_ci DEFAULT 'OTHER',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `distance` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_local_info_project` (`project_id`),
  CONSTRAINT `project_local_info_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_local_info`
--

LOCK TABLES `project_local_info` WRITE;
/*!40000 ALTER TABLE `project_local_info` DISABLE KEYS */;
INSERT INTO `project_local_info` VALUES (1,1,'SCHOOL','DPS New Town','1.2 km',NULL,1),(2,1,'HOSPITAL','Fortis Hospital','3.5 km',NULL,2),(3,1,'MALL','City Centre 2','4.0 km',NULL,3),(4,1,'METRO','New Town Metro Station','0.8 km',NULL,4),(5,1,'AIRPORT','Netaji Subhas Airport','8.5 km',NULL,5),(6,1,'RAILWAY','Sealdah Station','12.0 km',NULL,6);
/*!40000 ALTER TABLE `project_local_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_photos`
--

DROP TABLE IF EXISTS `project_photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_photos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `project_id` bigint NOT NULL,
  `url` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `caption` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo_type` enum('HERO','GALLERY','FLOOR_PLAN','AMENITY','LOCATION_MAP','BROCHURE') COLLATE utf8mb4_unicode_ci DEFAULT 'GALLERY',
  `display_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_project_photos_project` (`project_id`),
  CONSTRAINT `project_photos_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_photos`
--

LOCK TABLES `project_photos` WRITE;
/*!40000 ALTER TABLE `project_photos` DISABLE KEYS */;
INSERT INTO `project_photos` VALUES (7,1,'http://localhost:8080/api/uploads/projects/1/f4a6bb6a-120e-4c6c-b313-16155cea0885.jpg','1','GALLERY',1,'2026-05-25 08:37:20'),(9,1,'http://localhost:8080/api/uploads/projects/1/d1a840e6-d392-4483-b4c0-5bc2bc571619.jpg','','GALLERY',0,'2026-05-25 08:37:39'),(10,1,'http://localhost:8080/api/uploads/projects/1/3cbf1534-1808-462a-9618-8ebe4d9ce3a7.jpg','','GALLERY',0,'2026-05-25 08:37:44'),(11,1,'http://localhost:8080/api/uploads/projects/1/b8209e2f-3b33-4167-839d-cd536127c037.jpeg','','GALLERY',0,'2026-05-25 08:37:49'),(12,4,'http://localhost:8080/api/uploads/projects/4/6c142995-9588-4c84-bbe2-88a33b20a448.jpg','','GALLERY',0,'2026-05-25 13:10:47');
/*!40000 ALTER TABLE `project_photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_specifications`
--

DROP TABLE IF EXISTS `project_specifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_specifications` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `project_id` bigint NOT NULL,
  `unit_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `carpet_area` decimal(10,2) DEFAULT NULL,
  `built_up_area` decimal(10,2) DEFAULT NULL,
  `super_area` decimal(10,2) DEFAULT NULL,
  `floor_count` int DEFAULT NULL,
  `bathrooms` int DEFAULT NULL,
  `balconies` int DEFAULT NULL,
  `parking` int DEFAULT NULL,
  `price` decimal(15,2) DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `display_order` int DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idx_specs_project` (`project_id`),
  CONSTRAINT `project_specifications_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_specifications`
--

LOCK TABLES `project_specifications` WRITE;
/*!40000 ALTER TABLE `project_specifications` DISABLE KEYS */;
INSERT INTO `project_specifications` VALUES (1,1,'3 BHK Villa',1850.00,NULL,2400.00,2,3,2,2,12500000.00,NULL,1),(2,1,'4 BHK Villa',2800.00,NULL,3600.00,3,4,3,3,18000000.00,NULL,2),(3,1,'5 BHK Duplex',4200.00,NULL,5000.00,3,5,4,4,24000000.00,NULL,3);
/*!40000 ALTER TABLE `project_specifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tagline` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pincode` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('UPCOMING','ONGOING','COMPLETED','SOLD_OUT') COLLATE utf8mb4_unicode_ci DEFAULT 'ONGOING',
  `property_type` enum('RESIDENTIAL','COMMERCIAL','MIXED','VILLA','APARTMENT','PLOT') COLLATE utf8mb4_unicode_ci DEFAULT 'RESIDENTIAL',
  `total_units` int DEFAULT NULL,
  `available_units` int DEFAULT NULL,
  `price_min` decimal(15,2) DEFAULT NULL,
  `price_max` decimal(15,2) DEFAULT NULL,
  `price_unit` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT 'sq ft',
  `area_min` decimal(10,2) DEFAULT NULL,
  `area_max` decimal(10,2) DEFAULT NULL,
  `possession_date` date DEFAULT NULL,
  `rera_number` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `developer_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `website_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `map_latitude` decimal(10,8) DEFAULT NULL,
  `map_longitude` decimal(11,8) DEFAULT NULL,
  `featured` tinyint(1) DEFAULT '0',
  `visible` tinyint(1) DEFAULT '1',
  `display_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_projects_status` (`status`),
  KEY `idx_projects_featured` (`featured`),
  KEY `idx_projects_visible` (`visible`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'Prestige Park Row','prestige-park-row','Luxury Villas in the Heart of Kolkata','Experience unparalleled luxury living at Prestige Park Row. Set amidst lush greenery with world-class amenities, these premium villas redefine the concept of upscale residential living in Kolkata.','New Town, Action Area II','Kolkata','West Bengal','700156','ONGOING','VILLA',120,45,8500000.00,25000000.00,'per unit',1800.00,4500.00,'2026-12-31',NULL,'Prestige Group',NULL,NULL,NULL,1,1,1,'2026-05-14 14:16:53','2026-05-14 14:16:53'),(3,'Ambuja Neotia Utalika','ambuja-neotia-utalika','A Community of Togetherness','Utalika Luxury County is a premium township offering an integrated lifestyle with residences, retail spaces, and recreational facilities spread across acres of thoughtfully planned landscape.','Utalika, Mukundapur','Kolkata','West Bengal','700099','COMPLETED','RESIDENTIAL',800,12,3200000.00,7500000.00,'per unit',650.00,1350.00,'2024-03-31',NULL,'Ambuja Neotia',NULL,NULL,NULL,0,1,3,'2026-05-14 14:16:53','2026-05-14 14:16:53'),(4,'durganir','durganir','','','','dumdum','','','ONGOING','RESIDENTIAL',NULL,NULL,NULL,NULL,'per unit',NULL,NULL,NULL,'','','',NULL,NULL,0,1,0,'2026-05-25 13:10:39','2026-05-25 13:11:19');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `site_stats`
--

DROP TABLE IF EXISTS `site_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `site_stats` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `stat_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stat_label` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stat_value` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_order` int DEFAULT '0',
  `visible` tinyint(1) DEFAULT '1',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `stat_key` (`stat_key`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `site_stats`
--

LOCK TABLES `site_stats` WRITE;
/*!40000 ALTER TABLE `site_stats` DISABLE KEYS */;
INSERT INTO `site_stats` VALUES (1,'projects_completed','Projects Completed','180+',1,1,'2026-05-24 15:18:17'),(2,'years_experience','Years of Experience','20+',2,1,'2026-05-14 14:16:52'),(3,'happy_clients','Happy Clients','2000+',3,1,'2026-05-14 14:16:52');
/*!40000 ALTER TABLE `site_stats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimonials` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `client_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `client_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar_url` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rating` int DEFAULT '5',
  `review` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `project_id` bigint DEFAULT NULL,
  `featured` tinyint(1) DEFAULT '0',
  `visible` tinyint(1) DEFAULT '1',
  `display_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`),
  KEY `idx_testimonials_visible` (`visible`),
  CONSTRAINT `testimonials_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE SET NULL,
  CONSTRAINT `testimonials_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
INSERT INTO `testimonials` VALUES (1,'Rajesh Kumar','IT Professional, TCS',NULL,5,'Best investment decision of my life. The quality of construction and the amenities are top notch. The team was professional throughout the buying process.',1,1,1,1,'2026-05-14 14:16:54','2026-05-14 14:16:54'),(2,'Priya Chatterjee','Business Owner',NULL,5,'Absolutely love my new apartment! The attention to detail in design and the prompt after-sales service makes Kolkata Real Estate stand apart.',NULL,1,1,2,'2026-05-14 14:16:54','2026-05-14 14:16:54'),(3,'Amit Banerjee','Professor, Jadavpur University',NULL,4,'Great location and excellent connectivity. The project was delivered on time which is rare in this industry. Highly recommend to everyone.',1,0,1,3,'2026-05-14 14:16:54','2026-05-14 14:16:54'),(4,'Sunita Dey','Doctor, Apollo Hospital',NULL,5,'The landscaping and green spaces are beautiful. My kids love the play area. A perfect home for families looking for a peaceful community.',NULL,1,1,4,'2026-05-14 14:16:54','2026-05-14 14:16:54'),(5,'binit','dev','',4,'asdasdasdasdasdsda',NULL,0,1,5,'2026-05-25 08:05:34','2026-05-25 08:05:34');
/*!40000 ALTER TABLE `testimonials` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-25 18:58:05
