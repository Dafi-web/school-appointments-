# 🚀 Quick Deployment Guide

Deploy your app in **3 simple steps**!

---

## 📋 Prerequisites

1. ✅ MongoDB Atlas account (already set up)
2. ✅ GitHub account
3. ✅ Code pushed to GitHub

---

## Step 1️⃣: Deploy Backend (Render)

### 1. Go to [render.com](https://render.com) and sign up with GitHub

### 2. Click "New +" → "Web Service"

### 3. Select your repository

### 4. Configure:
```
Name: appointment-backend
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

### 5. Add Environment Variables:
```
MONGODB_URI = (your MongoDB connection string)
JWT_SECRET = any_random_long_string_here
PORT = 5000
NODE_ENV = production
```

### 6. Click "Create Web Service"

### 7. ⏰ Wait 2-3 minutes, then **copy your backend URL**
Example: `https://appointment-backend-xyz.onrender.com`

---

## Step 2️⃣: Deploy Frontend (Vercel)

### 1. Go to [vercel.com](https://vercel.com) and sign up with GitHub

### 2. Click "Add New" → "Project"

### 3. Import your repository

### 4. Configure:
```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
```

### 5. Add Environment Variable:
```
VITE_API_URL = https://your-backend-url.onrender.com/api
```
*Replace with your actual Render URL from Step 1*

### 6. Click "Deploy"

### 7. ⏰ Wait 1-2 minutes - Done! 🎉

---

## Step 3️⃣: Configure MongoDB Atlas

### 1. Go to [MongoDB Atlas](https://cloud.mongodb.com)

### 2. Click "Network Access"

### 3. Click "Add IP Address"

### 4. Click "Allow Access from Anywhere"
- Enter: `0.0.0.0/0`
- Click "Confirm"

This allows your deployed backend to connect to MongoDB.

---

## ✅ Test Your Deployment

1. Visit your Vercel URL
2. Register a new account
3. Login
4. Create an appointment
5. ✨ Success!

---

## 🔄 How to Update After Deployment

### Backend Updates:
1. Push code to GitHub
2. Render auto-deploys automatically

### Frontend Updates:
1. Push code to GitHub  
2. Vercel auto-deploys automatically

**That's it!** No manual deployment needed.

---

## 🐛 Common Issues

### ❌ "Network Error" or "Cannot connect to backend"
**Fix:** 
- Check if VITE_API_URL is correct in Vercel
- Should be: `https://your-backend.onrender.com/api` (with `/api`)

### ❌ "MongoDB connection failed"
**Fix:**
- Go to MongoDB Atlas → Network Access
- Add `0.0.0.0/0` to IP whitelist

### ❌ Backend is slow on first load
**Fix:**
- This is normal on Render free tier
- Backend sleeps after 15 min inactivity
- First request takes ~30 seconds to wake up

---

## 📊 What You Get (FREE)

✅ **Render Backend**
- Always online (but sleeps when idle)
- Auto-deploys from GitHub
- Free SSL certificate

✅ **Vercel Frontend**
- Lightning fast CDN
- Auto-deploys from GitHub
- Free SSL certificate
- Custom domain support

✅ **MongoDB Atlas**
- 512MB free storage
- Perfect for small apps

---

## 🌐 Optional: Add Custom Domain

### For Vercel (Frontend):
1. Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain
3. Follow DNS instructions

### For Render (Backend):
1. Render Dashboard → Your Service → Settings → Custom Domains
2. Add your domain
3. Follow DNS instructions

---

## 🎉 You're Live!

Your appointment scheduling system is now online and accessible worldwide!

Share your app:
- Students can register and book appointments
- Teachers can manage requests
- Admins can manage users

---

**Need detailed help?** See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

**Last Updated:** October 14, 2025

