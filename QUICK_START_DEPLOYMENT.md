# 🚀 QUICK START - Deploy to Render & Railway

This guide walks you through deploying your full-stack Kolkata Real Estate application to production using Render (frontend & backend) and Railway (database).

---

## ⚡ 5-Minute Overview

```
Your App Architecture:
┌─────────────────────────────────────────────────────────┐
│                   RENDER.COM                             │
├─────────────────────────────────────────────────────────┤
│  Frontend (React/Vite)   │    Backend (Spring Boot)      │
│  https://kolkata-       │   https://kolkata-             │
│  frontend.onrender.com  │   backend.onrender.com         │
│          ▲              │              ▲                 │
│          │              │              │                 │
│          └──────────────┴──────────────┘                 │
│                      │                                   │
│                      ▼                                   │
│              ┌───────────────┐                          │
│              │  RAILWAY.COM  │                          │
│              │  MySQL DB     │                          │
│              │  railway      │                          │
│              └───────────────┘                          │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 What You Need

✅ GitHub account with your repository  
✅ Render account (free at render.com)  
✅ Railway account (free at railway.app)  
✅ MySQL client installed  
✅ 15 minutes of your time  

---

## 🔧 STEP 1: Initialize Railway Database (5 min)

Your Railway database is already created with these credentials:
```
Host: YOUR_RAILWAY_PUBLIC_HOST
Port: YOUR_RAILWAY_PUBLIC_PORT
User: root
Password: YOUR_RAILWAY_MYSQL_PASSWORD
Database: railway
```

### Option A: Windows
```bash
cd e:\STUDY & WORK\KOLKATA_FLATS_PORTFOLIO
setup-railway-db.bat
```

### Option B: Mac/Linux
```bash
cd /your/project/path
chmod +x setup-railway-db.sh
./setup-railway-db.sh
```

### Option C: Manual MySQL
```bash
mysql -h YOUR_RAILWAY_PUBLIC_HOST -P YOUR_RAILWAY_PUBLIC_PORT -u root -p'YOUR_RAILWAY_MYSQL_PASSWORD' railway < Kolkata-database/database.sql
```

✅ **You should see**: "Database setup completed successfully!"

**Default Login:**
- Username: `admin`
- Password: `Admin@1234`
- ⚠️ Change this after first login!

---

## 🌐 STEP 2: Deploy Backend to Render (3 min)

### 2.1 Go to render.com
1. Sign in to your Render account
2. Click **"New +"** → **"Web Service"**

### 2.2 Connect GitHub
1. Click **"Connect a repository"**
2. Select your GitHub repository
3. Fill in details:
   - **Name**: `kolkata-backend`
   - **Environment**: `Docker`
   - **Region**: `Oregon` (default)
   - **Branch**: `main`
   - **Plan**: `Starter` (free to start)

### 2.3 Set Environment Variables
Click **"Advanced"** and add these variables:

```
MYSQL_HOST                = mysql.railway.internal
MYSQL_PORT                = 3306
MYSQL_DATABASE            = railway
MYSQL_USER                = root
MYSQL_PASSWORD            = YOUR_RAILWAY_MYSQL_PASSWORD
JWT_SECRET                = [GENERATE BELOW]
CORS_ORIGINS              = https://kolkata-frontend.onrender.com
APP_URL                   = https://kolkata-backend.onrender.com/api
SPRING_PROFILES_ACTIVE    = prod
```

### 2.4 Generate JWT Secret
In your terminal:
```bash
# Mac/Linux
openssl rand -base64 64

# Windows (use Git Bash or WSL)
# Or just use an online generator:
# https://www.base64encode.org/
# Generate something like: 
# aB2jK9vX1mZ5pQ8wR4tY7uI0eH3fG6nL9oP2sD5vC8xB1aF4kM7jN0qW3rE6tY9u
```

Copy the output and paste into JWT_SECRET field.

### 2.5 Deploy
Click **"Create Web Service"**

Wait for deployment (about 5-10 minutes)...

✅ You'll see: **"Your service is live!"**

**Your backend URL**: `https://kolkata-backend.onrender.com`

---

## 🎨 STEP 3: Deploy Frontend to Render (3 min)

### 3.1 Create Another Web Service
1. Back on Render dashboard
2. Click **"New +"** → **"Web Service"**
3. **Select same GitHub repository**

### 3.2 Configure Frontend
- **Name**: `kolkata-frontend`
- **Environment**: `Docker`
- **Region**: `Oregon` (same as backend)
- **Branch**: `main`
- **Plan**: `Starter`

### 3.3 Set Environment Variables
```
VITE_API_URL   = https://kolkata-backend.onrender.com/api
NODE_ENV       = production
```

### 3.4 Deploy
Click **"Create Web Service"**

Wait for deployment (5-10 minutes)...

✅ **Your frontend URL**: `https://kolkata-frontend.onrender.com`

---

## ✅ STEP 4: Test Your Deployment (2 min)

### 4.1 Test Backend Health
```bash
# Should return status: UP
curl https://kolkata-backend.onrender.com/api/health
```

### 4.2 Open Frontend
```
https://kolkata-frontend.onrender.com
```

### 4.3 Test Admin Login
1. Click admin login button
2. Use: `admin` / `Admin@1234`
3. Should see dashboard

### 4.4 Test Features
- [ ] View projects
- [ ] Create new project
- [ ] Upload project image
- [ ] Edit project
- [ ] Delete project
- [ ] View admin dashboard
- [ ] Check contact form submissions

---

## 🐛 Troubleshooting

### Backend won't start?
1. **Check Render logs**: Service → Logs
2. **Common issues**:
   - Missing JWT_SECRET → Add it
   - Wrong database credentials → Verify with Railway
   - Port already in use → Restart service

### Frontend shows 404?
1. Check that build completed
2. In Render Logs → look for "Build successful"
3. Clear browser cache (Ctrl+Shift+Delete)

### Can't login?
1. Verify database initialized (run setup script)
2. Check browser console for errors (F12)
3. Verify backend is running (health check)

### CORS errors in browser console?
1. Check CORS_ORIGINS matches your frontend URL exactly
2. Must be https:// (not http://)
3. No trailing slash
4. Restart backend service

### Database connection timeout?
1. Verify credentials are correct
2. Use internal URL: `mysql.railway.internal` (not public URL)
3. Check Railway service is running
4. Try from MySQL client first

---

## 📊 Monitor Your Apps

### Render Dashboard
- **View logs**: Click service → Logs tab
- **Monitor usage**: Click service → Metrics tab
- **Restart**: Service → Settings → Restart
- **View URL**: Service → URL

### Railway Dashboard
- **Database status**: Click MySQL service
- **Check connections**: Monitoring tab
- **View size**: Metrics tab

---

## 💰 Understanding Costs

### Render Starter Plan
- Free tier: $0 (goes to sleep)
- Starter tier: $7/month (always running)

### Railway
- Free tier: $5/month credit (includes MySQL)
- MySQL cost: ~$3/month typically

**Total**: ~$14/month for both frontend + backend + database

---

## 🔒 Important Security Notes

1. **Change admin password** immediately after first login
2. **Never commit .env** files to GitHub
3. **Rotate JWT_SECRET** monthly in production
4. **Use HTTPS** (automatic on Render)
5. **Backup database** weekly via Railway dashboard

---

## 📈 Next Steps

### After Deployment
1. ✅ Test all features thoroughly
2. ✅ Change admin password
3. ✅ Set up database backups
4. ✅ Enable error monitoring
5. ✅ Plan for scaling

### Optional Upgrades
- Upgrade to Render Pro ($12/month) for always-on backend
- Add monitoring/alerts
- Set up custom domain
- Add SSL certificate

---

## 📚 Full Documentation

For detailed information, see:
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Complete setup guide
- [DEPLOYMENT_SCRIPTS.md](DEPLOYMENT_SCRIPTS.md) - Advanced options
- [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Pre-flight checklist

---

## 🆘 Need Help?

**Render Support**: https://render.com/docs/  
**Railway Support**: https://docs.railway.app/  
**Spring Boot Docs**: https://spring.io/projects/spring-boot  
**Vite Docs**: https://vitejs.dev/  

---

## 🎉 Congratulations!

Your app is now live on the internet! 🚀

**Your URLs:**
- Frontend: https://kolkata-frontend.onrender.com
- Backend: https://kolkata-backend.onrender.com/api
- Database: Railway.com (internal network)

Share your app with others and enjoy! 🌟
