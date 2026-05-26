# Production Deployment Checklist

## Pre-Deployment

### Code Quality
- [ ] No hardcoded URLs or credentials
- [ ] Environment variables properly configured
- [ ] Error handling in place
- [ ] Logging configured for production
- [ ] Console logs removed from production code
- [ ] CORS properly restricted to production URLs

### Backend (Spring Boot)
- [ ] `application-prod.properties` configured
- [ ] JWT secret is strong (43+ characters, base64)
- [ ] Database connection pooling configured
- [ ] SSL/TLS enforcement enabled
- [ ] File upload path set to /tmp/uploads
- [ ] Health check endpoint working
- [ ] Actuator properly secured
- [ ] Build passes without errors
- [ ] JAR file builds successfully

### Frontend (React/Vite)
- [ ] `.env.production` configured
- [ ] API_URL points to production backend
- [ ] Build process tested locally
- [ ] No console warnings/errors in build
- [ ] Bundle size optimized
- [ ] Service worker configured (if applicable)
- [ ] Build script tested

### Database
- [ ] Schema initialized on Railway
- [ ] Migrations executed
- [ ] Indices created for performance
- [ ] Sample data loaded
- [ ] Backup created

### Security
- [ ] Passwords changed from defaults
- [ ] API keys rotated
- [ ] Secrets stored in environment, not code
- [ ] HTTPS/SSL enforced
- [ ] CORS headers properly set
- [ ] Rate limiting configured
- [ ] SQL injection prevention verified
- [ ] XSS protection enabled

---

## Deployment Steps

### 1. Railway Database

```bash
# Initialize schema
mysql -h railway.proxy.rlwy.net -P 53307 -u root -p'MzudaBfOQRsiASLdjVfAXaLOVP1GVbnI' railway < Kolkata-database/database.sql
```

### 2. Render Backend Deployment

- [ ] Repository pushed to GitHub
- [ ] Create new Web Service on Render
- [ ] Set environment variables
- [ ] Dockerfile in place
- [ ] Build completes without errors
- [ ] Health check passes
- [ ] Logs show successful startup

### 3. Render Frontend Deployment

- [ ] Create new Web Service on Render
- [ ] Set environment variables
- [ ] Dockerfile in place
- [ ] Build completes without errors
- [ ] Health check passes
- [ ] Frontend loads at HTTPS URL

---

## Post-Deployment Verification

### Health Checks
- [ ] Backend health endpoint responds
- [ ] Frontend loads without errors
- [ ] Network tab shows no CORS errors
- [ ] Console shows no errors

### Functional Tests
- [ ] Admin login works
- [ ] Projects load from database
- [ ] Create/Edit/Delete operations work
- [ ] File uploads work
- [ ] Contact form submissions work
- [ ] Appointments creation works

### Performance Tests
- [ ] Frontend loads in < 3 seconds
- [ ] API responses < 500ms
- [ ] No 500 errors in logs
- [ ] Memory usage stable

### Security Tests
- [ ] CORS blocks unauthorized origins
- [ ] API requires authentication
- [ ] JWT tokens work correctly
- [ ] File uploads validated
- [ ] SQL injection attempts fail

---

## Monitoring Setup

### Render
- [ ] Enable email alerts
- [ ] Monitor resource usage
- [ ] Check deployment logs regularly
- [ ] Set up error notifications

### Railway
- [ ] Monitor database connections
- [ ] Check disk usage
- [ ] Enable backups
- [ ] Monitor query performance

---

## Maintenance

### Weekly
- [ ] Check logs for errors
- [ ] Monitor resource usage
- [ ] Verify backups

### Monthly
- [ ] Update dependencies
- [ ] Review security logs
- [ ] Performance optimization
- [ ] Database maintenance

### Quarterly
- [ ] Security audit
- [ ] Backup restoration test
- [ ] Disaster recovery drill

---

## Rollback Plan

If deployment fails:

1. Keep previous deployment URL
2. Identify failure in logs
3. Fix and re-deploy
4. Use previous commit if needed

Render allows redeployment of any commit from deployment history.

---

## Documentation

- [ ] Deployment guide completed
- [ ] Environment variables documented
- [ ] Database schema documented
- [ ] API endpoints documented
- [ ] Troubleshooting guide created
- [ ] Team informed of deployment

---

## Sign Off

- **Deployed By**: _______________
- **Date**: _______________
- **Environment**: Production
- **Status**: [ ] Ready [ ] Deployed [ ] Verified
