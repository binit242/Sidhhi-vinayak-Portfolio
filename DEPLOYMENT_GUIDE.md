# Deployment Guide - Kolkata Real Estate Portfolio

## Overview
This guide covers deploying the full-stack application to:
- **Frontend**: Render.com
- **Backend**: Render.com
- **Database**: Railway.com (MySQL)

---

## Pre-Deployment Setup

### 1. Railway Database Setup (Already Done)
Your Railway MySQL database is already configured:
- **Database**: railway
- **User**: root
- **Password**: MzudaBfOQRsiASLdjVfAXaLOVP1GVbnI
- **Host (Internal)**: mysql.railway.internal:3306
- **Host (Public)**: railway.proxy.rlwy.net:53307

### 2. Environment Variables

#### Frontend (.env.production)
```env
VITE_API_URL=https://kolkata-backend.onrender.com/api
VITE_APP_NAME=Kolkata Real Estate
NODE_ENV=production
```

#### Backend (Render Environment Variables)
```
MYSQL_HOST=mysql.railway.internal
MYSQL_PORT=3306
MYSQL_DATABASE=railway
MYSQL_USER=root
MYSQL_PASSWORD=MzudaBfOQRsiASLdjVfAXaLOVP1GVbnI
JWT_SECRET=[Generate a strong secret: openssl rand -base64 64]
CORS_ORIGINS=https://kolkata-frontend.onrender.com
APP_URL=https://kolkata-backend.onrender.com/api
SPRING_PROFILES_ACTIVE=prod
```

---

## Step 1: Prepare Railway Database

### 1.1 Initialize Database Schema
1. Connect to Railway MySQL using public URL:
   ```
   Host: railway.proxy.rlwy.net
   Port: 53307
   User: root
   Password: MzudaBfOQRsiASLdjVfAXaLOVP1GVbnI
   Database: railway
   ```

2. Import your database schema:
   ```bash
   mysql -h railway.proxy.rlwy.net -P 53307 -u root -p'MzudaBfOQRsiASLdjVfAXaLOVP1GVbnI' railway < Kolkata-database/database.sql
   ```

### 1.2 Verify Connection
Test the connection in your backend configuration.

---

## Step 2: Deploy Backend to Render

### 2.1 Create Render Web Service
1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub/GitLab repository
4. Configure:
   - **Name**: kolkata-backend
   - **Environment**: Docker
   - **Region**: Oregon (or your preferred region)
   - **Plan**: Starter
   - **Docker Build**: Use provided Dockerfile
   - **Docker Build Context**: kolkata-backend/

### 2.2 Set Environment Variables
In Render dashboard, go to Environment:

```
MYSQL_HOST=mysql.railway.internal
MYSQL_PORT=3306
MYSQL_DATABASE=railway
MYSQL_USER=root
MYSQL_PASSWORD=MzudaBfOQRsiASLdjVfAXaLOVP1GVbnI
JWT_SECRET=[Generate strong secret]
CORS_ORIGINS=https://kolkata-frontend.onrender.com
APP_URL=https://kolkata-backend.onrender.com/api
SPRING_PROFILES_ACTIVE=prod
PORT=8080
```

### 2.3 Deploy
- Click "Deploy"
- Monitor build logs
- Verify health check passes at `/api/health`

---

## Step 3: Deploy Frontend to Render

### 3.1 Create Render Web Service
1. Click "New +" → "Web Service"
2. Connect your repository
3. Configure:
   - **Name**: kolkata-frontend
   - **Environment**: Docker
   - **Region**: Oregon (same as backend)
   - **Plan**: Starter
   - **Docker Build**: Use provided Dockerfile
   - **Docker Build Context**: kolkata-frontend/

### 3.2 Set Environment Variables
```
VITE_API_URL=https://kolkata-backend.onrender.com/api
NODE_ENV=production
```

### 3.3 Deploy
- Click "Deploy"
- Wait for build to complete
- Test frontend URL

---

## Step 4: Verify Deployment

### 4.1 Backend Health Check
```bash
curl https://kolkata-backend.onrender.com/api/health
```

### 4.2 Frontend Access
Open browser: https://kolkata-frontend.onrender.com

### 4.3 Test API Connection
1. Log in to admin panel
2. Verify database queries work
3. Test file uploads
4. Check console for errors

---

## Step 5: Connect Services

### 5.1 Configure CORS
The backend is configured to accept requests from:
- Frontend URL: https://kolkata-frontend.onrender.com
- Update `CORS_ORIGINS` if needed

### 5.2 Update Frontend API Client
The frontend uses environment variable `VITE_API_URL`
Already configured in:
- [src/api/client.ts](kolkata-frontend/src/api/client.ts)

---

## Troubleshooting

### Backend Won't Start
1. Check build logs in Render
2. Verify environment variables are set
3. Ensure JWT_SECRET is provided
4. Check database connectivity

### Frontend Shows 404
1. Verify Dockerfile uses correct build command
2. Check that dist/ folder is created
3. Ensure serve port is 3000

### API Connection Fails
1. Verify backend is running
2. Check CORS_ORIGINS in backend
3. Verify VITE_API_URL in frontend env
4. Check network tab for actual request URLs

### Database Connection Error
1. Verify MYSQL_HOST is `mysql.railway.internal` (not public URL)
2. Confirm credentials are correct
3. Ensure database schema is initialized
4. Check Railway service status

---

## Important Notes

1. **SSL Certificates**: Render provides free SSL certificates
2. **Persistent Storage**: File uploads stored in `/tmp/uploads` (temporary for starter plan)
3. **Database Backups**: Set up backups in Railway dashboard
4. **Environment Secrets**: Never commit `.env` files to git
5. **JWT Secret**: Generate a strong random secret before deploying

---

## Database Initial Setup Script

If tables don't exist, create them:

```sql
-- Create database (if not exists)
-- CREATE DATABASE railway;

-- Users table (for admin authentication)
CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'USER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  price_min DECIMAL(15,2),
  price_max DECIMAL(15,2),
  location VARCHAR(255),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## Monitoring & Logs

### View Logs in Render
- Dashboard → Service → Logs tab
- Real-time monitoring available

### View Database Logs in Railway
- Railway Dashboard → MySQL service → Logs tab

---

## Rollback & Updates

1. Keep previous deployment URL for quick rollback
2. Test changes locally before pushing to main branch
3. Use staging environment for testing

---

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [Spring Boot Production Guide](https://spring.io/guides/gs/spring-boot-docker/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
