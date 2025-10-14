# 🚀 Deployment Guide

Complete guide to deploy your Appointment Scheduling System online.

---

## 📋 Overview

We'll deploy:
- **Backend** → Render (Free tier)
- **Frontend** → Vercel (Free tier)
- **Database** → MongoDB Atlas (Already set up)

**Total Cost:** FREE ✅

---

## 🔧 Pre-Deployment Checklist

### 1. **MongoDB Atlas** (Already Done ✅)
- Your MongoDB connection is already configured
- Ensure your IP whitelist is set to `0.0.0.0/0` (Allow from anywhere) for production

### 2. **GitHub Repository** (Required)
- Create a GitHub account if you don't have one
- Push your code to GitHub

---

## 📦 Part 1: Deploy Backend to Render

### Step 1: Prepare Backend for Deployment

Your backend is almost ready! We just need to ensure environment variables are set.

### Step 2: Create Account on Render
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"

### Step 3: Connect Repository
1. Connect your GitHub repository
2. Select your repository
3. Configure settings:
   - **Name:** `appointment-system-backend` (or any name)
   - **Region:** Choose closest to you
   - **Branch:** `main` (or your default branch)
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

### Step 4: Add Environment Variables
In Render dashboard, add these environment variables:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_change_in_production
```

**Important:** Use a strong JWT_SECRET (generate one or use a random string)

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait 2-5 minutes for deployment
3. Copy your backend URL (e.g., `https://appointment-system-backend.onrender.com`)

---

## 🎨 Part 2: Deploy Frontend to Vercel

### Step 1: Update Frontend API URL

Update `frontend/src/utils/api.js`:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

### Step 2: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New" → "Project"

### Step 3: Import Repository
1. Select your repository
2. Configure settings:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### Step 4: Add Environment Variable
In Vercel project settings → Environment Variables:

```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

Replace with your actual Render backend URL from Part 1.

### Step 5: Deploy
1. Click "Deploy"
2. Wait 1-2 minutes
3. Your app will be live! (e.g., `https://your-app.vercel.app`)

---

## 🔄 Alternative: Deploy Both to Render

If you prefer to use Render for both:

### Backend (Same as above)

### Frontend on Render:
1. Create new "Static Site" on Render
2. Connect repository
3. Settings:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. Add environment variable: `VITE_API_URL`

---

## 🔐 Update CORS Settings

Update `backend/server.js` to allow your frontend domain:

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-app.vercel.app', // Your Vercel URL
  // Add any other domains
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

---

## 📝 Environment Variables Summary

### Backend (.env):
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
```

### Frontend (.env):
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas IP whitelist set to `0.0.0.0/0`
- [ ] Code pushed to GitHub
- [ ] Backend deployed to Render
- [ ] Backend environment variables configured
- [ ] Backend URL copied
- [ ] Frontend environment variable updated with backend URL
- [ ] Frontend deployed to Vercel
- [ ] CORS settings updated with frontend URL
- [ ] Test registration and login
- [ ] Test appointment creation

---

## 🧪 Testing Your Deployment

1. **Visit your frontend URL** (Vercel)
2. **Register a new account**
3. **Login successfully**
4. **Create an appointment**
5. **Check if data persists** (refresh page)

---

## 🐛 Troubleshooting

### Error: "Network Error" or "CORS Error"
- Check CORS settings in backend
- Ensure frontend API_URL is correct
- Check browser console for exact error

### Error: "MongoDB Connection Failed"
- Verify MONGODB_URI in Render environment variables
- Check MongoDB Atlas IP whitelist (use `0.0.0.0/0`)
- Ensure MongoDB credentials are correct

### Backend Won't Start
- Check Render logs
- Verify all environment variables are set
- Ensure Node version compatibility

### Frontend Build Fails
- Check Vercel logs
- Ensure VITE_API_URL is set correctly
- Verify all dependencies are in package.json

---

## 🔄 Updating Your App

### Update Backend:
1. Push changes to GitHub
2. Render auto-deploys (if auto-deploy enabled)
3. Or manually deploy from Render dashboard

### Update Frontend:
1. Push changes to GitHub
2. Vercel auto-deploys automatically
3. Or manually deploy from Vercel dashboard

---

## 💰 Pricing (Free Tier Limits)

### Render (Free):
- ✅ Backend hosting
- ✅ Auto-sleep after 15 min inactivity
- ✅ Spins up when accessed (may take 30s)

### Vercel (Free):
- ✅ Unlimited websites
- ✅ 100GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Custom domains

### MongoDB Atlas (Free):
- ✅ 512MB storage
- ✅ Shared cluster
- ✅ Perfect for small apps

---

## 🌐 Custom Domain (Optional)

### Add to Vercel:
1. Buy domain (Namecheap, GoDaddy, etc.)
2. Go to Vercel → Project Settings → Domains
3. Add your domain
4. Update DNS records as instructed

### Add to Render:
1. Go to Render → Settings → Custom Domains
2. Add your domain
3. Update DNS records

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Guide](https://docs.atlas.mongodb.com)
- [MERN Stack Deployment](https://www.mongodb.com/languages/mern-stack-tutorial)

---

## 🎉 Success!

Your appointment scheduling system is now live and accessible worldwide! 🌍

**Share your app URL with:**
- Students
- Teachers
- Department heads

---

**Need Help?** Check the troubleshooting section or review deployment logs.

**Last Updated:** October 14, 2025

