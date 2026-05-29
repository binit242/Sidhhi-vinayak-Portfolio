# Deployment Scripts - Render & Railway Setup

## Quick Start - Deploy to Render

### Prerequisites
1. GitHub account with repository pushed
2. Render account (render.com)
3. Railway account (railway.app)

### Step 1: Database Setup on Railway

```bash
# Connect to Railway MySQL and initialize schema
mysql -h YOUR_RAILWAY_PUBLIC_HOST -P YOUR_RAILWAY_PUBLIC_PORT -u root -p'YOUR_RAILWAY_MYSQL_PASSWORD' railway < Kolkata-database/database.sql

# Verify connection
mysql -h YOUR_RAILWAY_PUBLIC_HOST -P YOUR_RAILWAY_PUBLIC_PORT -u root -p'YOUR_RAILWAY_MYSQL_PASSWORD' railway -e "SELECT VERSION();"
```

### Step 2: Deploy Backend to Render

1. Go to render.com → Dashboard
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Fill in:
   - Name: kolkata-backend
   - Environment: Docker
   - Build Command: (leave empty, uses Dockerfile)
   - Start Command: (leave empty, uses Dockerfile)
   - Region: Oregon (default)
   - Plan: Starter ($7/month)

5. Click "Advanced" and add environment variables:
```
MYSQL_HOST=mysql.railway.internal
MYSQL_PORT=3306
MYSQL_DATABASE=railway
MYSQL_USER=root
MYSQL_PASSWORD=YOUR_RAILWAY_MYSQL_PASSWORD
JWT_SECRET=[Generate: openssl rand -base64 64]
CORS_ORIGINS=https://kolkata-frontend.onrender.com
APP_URL=https://kolkata-backend.onrender.com/api
SPRING_PROFILES_ACTIVE=prod
```

6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)

### Step 3: Deploy Frontend to Render

1. Click "New +" → "Web Service"
2. Select same repository
3. Fill in:
   - Name: kolkata-frontend
   - Environment: Docker
   - Region: Oregon
   - Plan: Starter

4. Add environment variables:
```
VITE_API_URL=https://kolkata-backend.onrender.com/api
NODE_ENV=production
```

5. Click "Create Web Service"
6. Wait for deployment

### Step 4: Verification

```bash
# Test backend health
curl https://kolkata-backend.onrender.com/api/health

# Check frontend
curl https://kolkata-frontend.onrender.com

# Test login endpoint
curl -X POST https://kolkata-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin@1234"}'
```

---

## Local Testing with Docker Compose

### Prerequisites
- Docker installed
- Docker Compose installed

### Run Locally

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Access Services
- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- MySQL: localhost:3306

### Test API
```bash
# Health check
curl http://localhost:8080/api/health

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin@1234"}'
```

---

## Troubleshooting

### Backend fails to start
1. Check Railway database credentials
2. Verify MYSQL_HOST is `mysql.railway.internal` (not public URL for Render)
3. Ensure JWT_SECRET is set
4. Check logs: Render Dashboard → Service → Logs

### Frontend shows blank page
1. Check VITE_API_URL in environment
2. Verify build completed successfully
3. Check browser console for errors
4. Clear browser cache

### CORS errors
1. Verify CORS_ORIGINS matches frontend URL exactly
2. Use full URL including https://
3. For multiple origins: separate by comma (no spaces)

### Database connection timeout
1. Ensure Railway service is running
2. Test connection manually with MySQL client
3. Check network policies in Railway dashboard
4. Verify IP whitelist if applicable

---

## Database Management

### Backup Database
```bash
# From Render, via Railway dashboard
# Or manually:
mysqldump -h YOUR_RAILWAY_PUBLIC_HOST -P YOUR_RAILWAY_PUBLIC_PORT -u root -p'YOUR_RAILWAY_MYSQL_PASSWORD' railway > backup.sql
```

### Restore Database
```bash
mysql -h YOUR_RAILWAY_PUBLIC_HOST -P YOUR_RAILWAY_PUBLIC_PORT -u root -p'YOUR_RAILWAY_MYSQL_PASSWORD' railway < backup.sql
```

---

## Performance Tips

1. **Render Starter Plan Limitations:**
   - Stops after 15 min of inactivity (free tier)
   - Paid plans run continuously
   - Cold start may take 10-30 seconds

2. **Upgrade to Pro:**
   - Go to Service Settings → Instance Type
   - Select "Pro" ($12/month each service)
   - Continuou uptime, better performance

3. **Database Optimization:**
   - Add indexes to frequently queried columns
   - Use connection pooling (already configured)
   - Monitor query performance

4. **Frontend Optimization:**
   - Vite build is automatically optimized
   - Enable gzip compression on Render
   - Use CDN for static assets

---

## Security Checklist

- [ ] JWT_SECRET is strong (43+ characters)
- [ ] Credentials removed from code (use .env)
- [ ] CORS_ORIGINS doesn't include localhost
- [ ] SSL/TLS enabled (automatic on Render)
- [ ] Database password is strong
- [ ] Admin password changed from default
- [ ] File uploads validated server-side
- [ ] No sensitive data in logs

---

## Monitoring

### Render Dashboard
- View logs in real-time
- Monitor resource usage
- Check deployment history
- Set up email alerts

### Railway Dashboard
- Monitor database connections
- Check disk usage
- View query metrics
- Backup management

---

## Rollback Strategy

1. Keep previous deployment URL
2. Test changes in staging environment
3. Use GitHub branches for version control
4. Deploy main branch only
5. Can redeploy previous commit if needed

---

## Support

- Render Docs: https://render.com/docs
- Railway Docs: https://docs.railway.app/
- Spring Boot: https://spring.io/guides
- React/Vite: https://vitejs.dev/
