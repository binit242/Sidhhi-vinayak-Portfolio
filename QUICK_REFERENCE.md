# 📋 QUICK REFERENCE CARD

## 🚀 Deployment in 5 Steps

### Database Credentials (Railway) 🗄️
```
Host (Public):    railway.proxy.rlwy.net:53307
Host (Internal):  mysql.railway.internal:3306
User:             root
Password:         MzudaBfOQRsiASLdjVfAXaLOVP1GVbnI
Database:         railway
```

### Step 1: Initialize Database ⚙️
```bash
# Windows
setup-railway-db.bat

# Mac/Linux
./setup-railway-db.sh
```

### Step 2: Generate JWT Secret 🔐
```bash
openssl rand -base64 64
```
**Save this value!** You'll need it for Render.

### Step 3: Deploy Backend 🔧

**Render Settings:**
- Name: `kolkata-backend`
- Environment: Docker
- Region: Oregon
- Plan: Starter

**Environment Variables:**
```
MYSQL_HOST=mysql.railway.internal
MYSQL_PORT=3306
MYSQL_DATABASE=railway
MYSQL_USER=root
MYSQL_PASSWORD=MzudaBfOQRsiASLdjVfAXaLOVP1GVbnI
JWT_SECRET=[YOUR_GENERATED_SECRET]
CORS_ORIGINS=https://kolkata-frontend.onrender.com
APP_URL=https://kolkata-backend.onrender.com/api
SPRING_PROFILES_ACTIVE=prod
```

### Step 4: Deploy Frontend 🎨

**Render Settings:**
- Name: `kolkata-frontend`
- Environment: Docker
- Region: Oregon
- Plan: Starter

**Environment Variables:**
```
VITE_API_URL=https://kolkata-backend.onrender.com/api
NODE_ENV=production
```

### Step 5: Test ✅

```bash
# Health check
curl https://kolkata-backend.onrender.com/api/health

# Frontend
https://kolkata-frontend.onrender.com

# Login
admin / Admin@1234
```

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `QUICK_START_DEPLOYMENT.md` | Start here! 5-min guide |
| `DEPLOYMENT_GUIDE.md` | Complete instructions |
| `setup-railway-db.sh` | Initialize database (Mac/Linux) |
| `setup-railway-db.bat` | Initialize database (Windows) |
| `docker-compose.yml` | Local testing |
| `kolkata-backend/Dockerfile` | Backend container |
| `kolkata-frontend/Dockerfile` | Frontend container |

---

## 🌐 Your URLs (After Deployment)

```
Frontend:  https://kolkata-frontend.onrender.com
Backend:   https://kolkata-backend.onrender.com/api
Health:    https://kolkata-backend.onrender.com/api/health
```

---

## ⏱️ Time Estimate

```
Database init:    5 min
Backend deploy:  10 min
Frontend deploy: 10 min
Testing:          5 min
─────────────────────────
Total:           30 min
```

---

## 🔐 Security

| Item | Action |
|------|--------|
| Admin password | Change after first login |
| JWT secret | Already generated ✓ |
| Database backups | Enable in Railway |
| CORS | Already configured ✓ |
| SSL/TLS | Automatic on Render ✓ |

---

## ❌ Don't Forget!

- ⚠️ Change admin password immediately
- ⚠️ Verify CORS_ORIGINS is exact match
- ⚠️ Use internal database URL (mysql.railway.internal)
- ⚠️ Enable backups in Railway
- ⚠️ Monitor logs for errors

---

## 📞 Links

- 🎨 Render: https://render.com
- 🗄️ Railway: https://railway.app
- 📖 Docs: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- ✅ Checklist: [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)

---

## 🎯 Status

✅ Backend ready  
✅ Frontend ready  
✅ Database ready  
✅ Documentation complete  
✅ **READY TO DEPLOY** 🚀

---

**Print this or bookmark for quick reference!**
