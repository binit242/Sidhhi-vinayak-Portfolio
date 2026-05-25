# Project Architecture & File Structure

## Overview
This is a full-stack real estate management application with:
- **Backend**: Spring Boot 3.x + MySQL
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Authentication**: JWT-based auth for admin panel
- **API**: RESTful API with JSON responses

## Technology Stack

### Backend
- Java 17
- Spring Boot 3.2.4
- Spring Security with JWT
- Spring Data JPA
- MySQL 8.0+
- Maven

### Frontend
- React 18
- TypeScript
- Vite (build tool)
- Tailwind CSS
- React Router v6
- Axios (HTTP client)
- Lucide React (icons)

## Complete File Structure

```
kolkata-real-estate/
│
├── README.md                          # Main documentation
├── setup.sh                           # Unix/Mac setup script
├── setup.bat                          # Windows setup script
│
├── kolkata-backend/                   # Spring Boot Backend
│   ├── .gitignore
│   ├── pom.xml                        # Maven dependencies
│   │
│   ├── database/
│   │   └── schema.sql                 # Complete MySQL schema with sample data
│   │
│   └── src/
│       └── main/
│           ├── java/com/kolkata/realestate/
│           │   │
│           │   ├── RealEstateApplication.java      # Main Spring Boot class
│           │   │
│           │   ├── config/
│           │   │   ├── SecurityConfig.java         # Security & CORS config
│           │   │   └── WebConfig.java              # Static resource serving
│           │   │
│           │   ├── controller/
│           │   │   ├── AuthController.java         # Login & auth endpoints
│           │   │   ├── PublicProjectController.java # Public API
│           │   │   ├── AdminProjectController.java  # Admin project CRUD
│           │   │   ├── StatsController.java        # Site statistics
│           │   │   ├── TestimonialController.java  # Testimonials
│           │   │   ├── EnquiryController.java      # Contact & appointments
│           │   │   ├── DashboardController.java    # Dashboard summary
│           │   │   └── GlobalExceptionHandler.java # Error handling
│           │   │
│           │   ├── dto/
│           │   │   └── Dtos.java                   # All DTOs (Request/Response)
│           │   │
│           │   ├── entity/
│           │   │   ├── AdminUser.java              # Admin user entity
│           │   │   ├── Project.java                # Main project entity
│           │   │   └── Entities.java               # All other entities
│           │   │
│           │   ├── repository/
│           │   │   └── Repositories.java           # All JPA repositories
│           │   │
│           │   ├── security/
│           │   │   ├── JwtUtils.java               # JWT token generation/validation
│           │   │   └── JwtAuthFilter.java          # JWT authentication filter
│           │   │
│           │   └── service/
│           │       └── Services.java               # All business logic services
│           │
│           └── resources/
│               └── application.properties          # App configuration
│
└── kolkata-frontend/                  # React Frontend
    ├── .env                           # Environment variables
    ├── .gitignore
    ├── package.json                   # NPM dependencies
    ├── vite.config.ts                 # Vite configuration
    ├── tsconfig.json                  # TypeScript config
    ├── tsconfig.node.json             # TypeScript node config
    ├── tailwind.config.js             # Tailwind CSS config
    ├── postcss.config.js              # PostCSS config
    ├── index.html                     # HTML entry point
    │
    └── src/
        ├── main.tsx                   # React entry point
        ├── App.tsx                    # Main app component with routing
        ├── index.css                  # Global styles + Tailwind
        │
        ├── api/
        │   └── client.ts              # Axios API client & all API calls
        │
        ├── contexts/
        │   └── AuthContext.tsx        # Authentication context provider
        │
        └── pages/
            │
            ├── Index.tsx              # Home page (public)
            ├── Projects.tsx           # Projects listing (public)
            ├── ProjectDetail.tsx      # Project detail (public)
            ├── Contact.tsx            # Contact form (public)
            │
            └── admin/                 # Admin Dashboard
                ├── AdminLogin.tsx              # Login page
                ├── AdminLayout.tsx             # Dashboard layout with sidebar
                ├── AdminDashboard.tsx          # Dashboard home with stats
                ├── AdminProjects.tsx           # Projects list with CRUD
                ├── AdminProjectEdit.tsx        # Project editor (full CRUD)
                ├── AdminStats.tsx              # Site stats management
                ├── AdminTestimonials.tsx       # Testimonials management
                └── AdminEnquiriesAppointments.tsx # Enquiries & appointments
```

## Database Schema

### Tables:
1. **admin_users** - Admin authentication
2. **projects** - Real estate projects (main table)
3. **project_photos** - Project images
4. **project_amenities** - Project amenities
5. **project_facilities** - Project facilities
6. **project_local_info** - Nearby places
7. **project_specifications** - Floor plans
8. **site_stats** - Homepage statistics
9. **testimonials** - Client reviews
10. **contact_enquiries** - Contact form submissions
11. **appointment_requests** - Booking requests

### Relationships:
- One Project → Many Photos (OneToMany)
- One Project → Many Amenities (OneToMany)
- One Project → Many Facilities (OneToMany)
- One Project → Many LocalInfo (OneToMany)
- One Project → Many Specifications (OneToMany)
- One Project → Many Testimonials (OneToMany, optional)
- One Project → Many Enquiries (OneToMany, optional)
- One Project → Many Appointments (OneToMany, optional)

## API Endpoints

### Public (No Auth)
```
GET  /api/stats                    # Homepage statistics
GET  /api/projects                 # All visible projects
GET  /api/projects/featured        # Featured projects
GET  /api/projects/{slug}          # Project details
GET  /api/testimonials             # All visible testimonials
POST /api/contact                  # Submit contact form
POST /api/appointments             # Book appointment
```

### Admin (JWT Auth Required)
```
POST /api/auth/login               # Login

# Dashboard
GET  /api/admin/dashboard/summary  # Dashboard stats

# Projects
GET    /api/admin/projects         # All projects
GET    /api/admin/projects/{id}    # Get project
POST   /api/admin/projects         # Create project
PUT    /api/admin/projects/{id}    # Update project
DELETE /api/admin/projects/{id}    # Delete project

# Project sub-resources (photos, amenities, etc.)
POST   /api/admin/projects/{id}/upload
POST   /api/admin/projects/{id}/photos
PUT    /api/admin/projects/photos/{photoId}
DELETE /api/admin/projects/photos/{photoId}
# ... similar for amenities, facilities, local-info, specifications

# Stats
GET    /api/admin/stats            # All stats
POST   /api/admin/stats            # Create stat
PUT    /api/admin/stats/{id}       # Update stat
DELETE /api/admin/stats/{id}       # Delete stat

# Testimonials
GET    /api/admin/testimonials     # All testimonials
POST   /api/admin/testimonials     # Create testimonial
PUT    /api/admin/testimonials/{id} # Update testimonial
DELETE /api/admin/testimonials/{id} # Delete testimonial

# Enquiries & Appointments
GET    /api/admin/enquiries        # List enquiries (paginated)
PATCH  /api/admin/enquiries/{id}   # Update status/notes
DELETE /api/admin/enquiries/{id}   # Delete enquiry
GET    /api/admin/appointments     # List appointments (paginated)
PATCH  /api/admin/appointments/{id} # Update status/notes
DELETE /api/admin/appointments/{id} # Delete appointment
```

## Security

### Backend Security
- **JWT Authentication**: Token-based auth for admin endpoints
- **BCrypt Password Hashing**: All passwords hashed with BCrypt (strength 12)
- **CORS Configuration**: Configured for frontend origin
- **Role-Based Access**: ADMIN and SUPER_ADMIN roles
- **Request Validation**: Bean validation on all DTOs
- **SQL Injection Protection**: JPA prevents SQL injection

### Frontend Security
- **Token Storage**: JWT stored in localStorage
- **Auto-redirect**: Unauthenticated users redirected to login
- **Protected Routes**: Admin routes require authentication
- **API Interceptors**: Automatic token attachment to requests

## Data Flow

### Public User Flow
1. User visits frontend (React app)
2. Frontend fetches data from public API endpoints
3. Backend returns JSON data
4. React components render data

### Admin Flow
1. Admin logs in via /admin/login
2. Backend validates credentials, returns JWT
3. Frontend stores JWT in localStorage
4. All subsequent admin API calls include JWT in headers
5. Backend validates JWT on each request
6. Admin performs CRUD operations via dashboard

### Contact/Appointment Submission
1. User fills form on frontend
2. Frontend POSTs to /api/contact or /api/appointments
3. Backend saves to database with status 'NEW' or 'PENDING'
4. Admin sees alert in dashboard
5. Admin can update status and add notes

## Development Guidelines

### Adding a New Entity

**Backend:**
1. Create entity class in `entity/`
2. Create repository interface in `repository/`
3. Create DTOs in `dto/`
4. Create service in `service/`
5. Create controller in `controller/`
6. Add to database schema

**Frontend:**
1. Add TypeScript interface in `api/client.ts`
2. Add API functions in `api/client.ts`
3. Create management page in `pages/admin/`
4. Add route in `App.tsx`

### Best Practices

**Backend:**
- Use DTOs for API requests/responses (never expose entities directly)
- Keep controllers thin, business logic in services
- Use transactions for multi-table operations
- Validate all inputs with @Valid annotations
- Use proper HTTP status codes

**Frontend:**
- Use TypeScript for type safety
- Extract reusable components
- Handle loading and error states
- Show user feedback for actions
- Keep API calls in separate client file

## Environment Variables

### Backend (.env or application.properties)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/kolkata_realestate
spring.datasource.username=realestate_user
spring.datasource.password=YOUR_PASSWORD
app.jwt.secret=YOUR_JWT_SECRET
app.cors.allowed-origins=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8080/api
```

## Build & Deployment

### Backend
```bash
# Development
./mvnw spring-boot:run

# Production JAR
./mvnw clean package -DskipTests
java -jar target/realestate-backend-1.0.0.jar
```

### Frontend
```bash
# Development
npm run dev

# Production build
npm run build
# Deploy 'dist/' folder
```

## Common Operations

### Add Sample Data
```sql
-- Run in MySQL
USE kolkata_realestate;
SOURCE database/schema.sql;
```

### Reset Admin Password
```sql
-- Generate BCrypt hash for new password first
UPDATE admin_users 
SET password = '$2a$12$YOUR_NEW_BCRYPT_HASH' 
WHERE username = 'admin';
```

### View Logs
```bash
# Backend logs
tail -f logs/spring-boot-application.log

# Frontend (in browser)
F12 > Console
```

## Troubleshooting

See README.md for detailed troubleshooting guide.
