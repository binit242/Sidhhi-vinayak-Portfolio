# Kolkata Real Estate Showcase - Full Stack Application

A complete real estate management platform built with **Spring Boot 3** backend and **React + TypeScript** frontend.

## 🏗️ Project Structure

```
kolkata-real-estate/
├── kolkata-backend/          # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/kolkata/realestate/
│   │   │   │   ├── config/           # Security, CORS, WebMVC
│   │   │   │   ├── controller/       # REST API endpoints
│   │   │   │   ├── dto/              # Request/Response DTOs
│   │   │   │   ├── entity/           # JPA Entities
│   │   │   │   ├── repository/       # Spring Data JPA
│   │   │   │   ├── security/         # JWT utilities
│   │   │   │   ├── service/          # Business logic
│   │   │   │   └── RealEstateApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── database/
│   │       └── schema.sql            # MySQL database schema
│   └── pom.xml
│
└── kolkata-frontend/         # React + Vite frontend
    ├── src/
    │   ├── api/
    │   │   └── client.ts             # Axios API client
    │   ├── contexts/
    │   │   └── AuthContext.tsx       # Authentication context
    │   ├── pages/
    │   │   ├── admin/                # Admin dashboard pages
    │   │   │   ├── AdminLogin.tsx
    │   │   │   ├── AdminLayout.tsx
    │   │   │   ├── AdminDashboard.tsx
    │   │   │   ├── AdminProjects.tsx
    │   │   │   ├── AdminProjectEdit.tsx
    │   │   │   ├── AdminStats.tsx
    │   │   │   ├── AdminTestimonials.tsx
    │   │   │   └── AdminEnquiriesAppointments.tsx
    │   │   ├── Index.tsx             # Your existing pages
    │   │   ├── Projects.tsx
    │   │   ├── ProjectDetail.tsx
    │   │   └── Contact.tsx
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── package.json
    └── vite.config.ts
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Java 17 or higher** - [Download](https://www.oracle.com/java/technologies/downloads/)
- **Maven 3.6+** - [Download](https://maven.apache.org/download.cgi)
- **MySQL 8.0+** - [Download](https://dev.mysql.com/downloads/mysql/)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm or yarn** - Comes with Node.js

## 🚀 Getting Started

### Step 1: Database Setup

1. **Install and start MySQL**

2. **Create the database and user:**
```sql
CREATE DATABASE kolkata_realestate CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'realestate_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON kolkata_realestate.* TO 'realestate_user'@'localhost';
FLUSH PRIVILEGES;
```

3. **Run the schema file:**
```bash
mysql -u realestate_user -p kolkata_realestate < kolkata-backend/database/schema.sql
```

### Step 2: Backend Setup

1. **Navigate to backend directory:**
```bash
cd kolkata-backend
```

2. **Configure database connection:**
   
   Open `src/main/resources/application.properties` and update:
   
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/kolkata_realestate?useSSL=false&serverTimezone=Asia/Kolkata
spring.datasource.username=realestate_user
spring.datasource.password=your_secure_password

# Generate a secure JWT secret (use: openssl rand -base64 64)
app.jwt.secret=YOUR_256_BIT_SECRET_KEY_HERE_MINIMUM_32_CHARACTERS
```

3. **Create admin user password hash:**
   
   Update the default admin password in `database/schema.sql` line ~35:
   
   Generate BCrypt hash using online tool or:
   ```bash
   # In MySQL:
   UPDATE admin_users SET password = '$2a$12$LYourBcryptHashHere' WHERE username = 'admin';
   ```
   
   Default credentials (change after first login):
   - Username: `admin`
   - Password: `Admin@1234`

4. **Build and run the backend:**
```bash
# Using Maven wrapper (recommended)
./mvnw clean install
./mvnw spring-boot:run

# OR using installed Maven
mvn clean install
mvn spring-boot:run
```

   Backend will start at: **http://localhost:8080**

### Step 3: Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd ../kolkata-frontend
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Start the development server:**
```bash
npm run dev
# or
yarn dev
```

   Frontend will start at: **http://localhost:5173**

## 🔐 Default Login Credentials

**Admin Dashboard:** http://localhost:5173/admin/login

- **Username:** `admin`
- **Password:** `Admin@1234`

⚠️ **IMPORTANT:** Change these credentials immediately after first login via the admin dashboard.

## 📱 Application Features

### Public Website
- **Home Page** - Statistics, featured projects, testimonials
- **Projects Listing** - Browse all available projects
- **Project Details** - Complete project information with photos, amenities, facilities
- **Contact Form** - Submit enquiries
- **Appointment Booking** - Schedule site visits

### Admin Dashboard
- **Dashboard Overview** - Key metrics and recent activity alerts
- **Projects Management** - Full CRUD operations for:
  - Basic project details
  - Photos gallery
  - Amenities
  - Facilities
  - Nearby places/local info
  - Floor plans & specifications
- **Site Statistics** - Manage homepage stats (customizable counters)
- **Testimonials** - Add/edit/delete client reviews
- **Enquiries** - View and manage contact form submissions
- **Appointments** - Manage booking requests with status tracking

## 🛠️ API Endpoints

### Public Endpoints (No Auth Required)
```
GET    /api/stats                    # Get site statistics
GET    /api/projects                 # List all visible projects
GET    /api/projects/featured        # Get featured projects
GET    /api/projects/{slug}          # Get project details
GET    /api/testimonials             # Get testimonials
POST   /api/contact                  # Submit enquiry
POST   /api/appointments             # Book appointment
```

### Admin Endpoints (Auth Required)
```
POST   /api/auth/login               # Admin login

# Projects
GET    /api/admin/projects           # List all projects
GET    /api/admin/projects/{id}      # Get project by ID
POST   /api/admin/projects           # Create project
PUT    /api/admin/projects/{id}      # Update project
DELETE /api/admin/projects/{id}      # Delete project
POST   /api/admin/projects/{id}/upload              # Upload image
POST   /api/admin/projects/{id}/photos              # Add photo
POST   /api/admin/projects/{id}/amenities           # Add amenity
POST   /api/admin/projects/{id}/facilities          # Add facility
POST   /api/admin/projects/{id}/local-info          # Add local info
POST   /api/admin/projects/{id}/specifications      # Add spec

# Stats, Testimonials, Enquiries, Appointments
GET    /api/admin/stats              # Manage site stats
GET    /api/admin/testimonials       # Manage testimonials
GET    /api/admin/enquiries          # View enquiries
GET    /api/admin/appointments       # View appointments
GET    /api/admin/dashboard/summary  # Dashboard summary
```

## 🗄️ Database Schema

The application uses MySQL with the following main tables:

- **admin_users** - Admin login credentials
- **projects** - Real estate projects
- **project_photos** - Project images
- **project_amenities** - Amenities list
- **project_facilities** - Facilities list
- **project_local_info** - Nearby places
- **project_specifications** - Floor plans
- **site_stats** - Homepage statistics
- **testimonials** - Client reviews
- **contact_enquiries** - Contact form submissions
- **appointment_requests** - Booking requests

## 📝 Development Workflow

### Making Changes to Backend

1. Modify Java files in `src/main/java/`
2. Spring Boot DevTools auto-reloads (if enabled)
3. Or manually restart: `./mvnw spring-boot:run`

### Making Changes to Frontend

1. Modify React files in `src/`
2. Vite hot-reloads automatically
3. Changes appear instantly in browser

### Adding New Features

1. **Backend:** Create entity → repository → service → controller → DTO
2. **Frontend:** Add API call in `client.ts` → create/update component
3. Test locally before deploying

## 🐛 Troubleshooting

### Backend Issues

**Problem:** Application won't start
- Check MySQL is running: `sudo systemctl status mysql`
- Verify database credentials in `application.properties`
- Check port 8080 is not in use: `lsof -i :8080`

**Problem:** Database connection failed
- Ensure database `kolkata_realestate` exists
- Verify user permissions
- Check MySQL is accepting connections on localhost:3306

**Problem:** JWT authentication fails
- Verify `app.jwt.secret` is set in application.properties
- Must be at least 32 characters long

### Frontend Issues

**Problem:** API calls fail
- Ensure backend is running on port 8080
- Check `.env` file has correct API URL
- Look for CORS errors in browser console

**Problem:** Dependencies won't install
```bash
rm -rf node_modules package-lock.json
npm install
```

**Problem:** Build fails
- Check Node.js version: `node --version` (should be 18+)
- Clear cache: `npm cache clean --force`

## 🏭 Production Deployment

### Backend (Spring Boot)

1. **Build JAR:**
```bash
./mvnw clean package -DskipTests
```

2. **Run JAR:**
```bash
java -jar target/realestate-backend-1.0.0.jar
```

3. **Environment Variables:**
```bash
export SPRING_DATASOURCE_URL=jdbc:mysql://your-db-host:3306/kolkata_realestate
export SPRING_DATASOURCE_USERNAME=your_user
export SPRING_DATASOURCE_PASSWORD=your_password
export APP_JWT_SECRET=your_production_secret
```

### Frontend (React)

1. **Build for production:**
```bash
npm run build
```

2. **Deploy `dist/` folder to:**
   - Vercel / Netlify (static hosting)
   - Nginx / Apache (traditional server)
   - AWS S3 + CloudFront (CDN)

3. **Update API URL:**
   Create `.env.production`:
```
VITE_API_URL=https://your-api-domain.com/api
```

## 📊 Database Management

### Backup Database
```bash
mysqldump -u realestate_user -p kolkata_realestate > backup.sql
```

### Restore Database
```bash
mysql -u realestate_user -p kolkata_realestate < backup.sql
```

### View Tables
```bash
mysql -u realestate_user -p
USE kolkata_realestate;
SHOW TABLES;
```

## 🔒 Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT secret (64+ characters)
- [ ] Enable HTTPS in production
- [ ] Set up database backups
- [ ] Configure firewall rules
- [ ] Use environment variables for secrets
- [ ] Enable MySQL SSL connections
- [ ] Set up rate limiting (API Gateway)
- [ ] Implement file upload size limits
- [ ] Sanitize user inputs

## 📞 Support & Contact

For issues or questions:
1. Check the troubleshooting section
2. Review application logs
3. Search existing GitHub issues (if applicable)
4. Create a new issue with:
   - Steps to reproduce
   - Error messages
   - Environment details

## 📄 License

This project is provided as-is for educational and commercial use.

## 🎉 Quick Start Summary

```bash
# 1. Setup Database
mysql -u root -p
CREATE DATABASE kolkata_realestate;
# Run schema.sql

# 2. Start Backend
cd kolkata-backend
./mvnw spring-boot:run

# 3. Start Frontend
cd kolkata-frontend
npm install
npm run dev

# 4. Access Application
Frontend: http://localhost:5173
Backend:  http://localhost:8080
Admin:    http://localhost:5173/admin/login
```

**You're all set! 🚀**
