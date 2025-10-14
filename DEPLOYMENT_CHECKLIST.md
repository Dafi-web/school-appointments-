# ✅ Deployment Checklist

Use this checklist to ensure smooth deployment.

---

## 📝 Before You Start

- [ ] MongoDB Atlas is set up and working locally
- [ ] You have a GitHub account
- [ ] Your code is pushed to GitHub
- [ ] App works correctly on localhost

---

## 🔧 Pre-Deployment Setup

### MongoDB Atlas Configuration
- [ ] Login to [MongoDB Atlas](https://cloud.mongodb.com)
- [ ] Go to "Network Access"
- [ ] Click "Add IP Address"
- [ ] Select "Allow Access from Anywhere" (0.0.0.0/0)
- [ ] Click "Confirm"
- [ ] Copy your connection string

### GitHub Repository
- [ ] Create repository on GitHub
- [ ] Push all code to GitHub
- [ ] Verify all files are uploaded
- [ ] Make note of repository URL

---

## 🚀 Backend Deployment (Render)

### Render Setup
- [ ] Go to [render.com](https://render.com)
- [ ] Sign up/Login with GitHub
- [ ] Click "New +" → "Web Service"
- [ ] Select your repository

### Configuration
- [ ] Name: `appointment-backend` (or your choice)
- [ ] Root Directory: `backend`
- [ ] Environment: `Node`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Instance Type: `Free`

### Environment Variables (Add in Render)
- [ ] `MONGODB_URI` = (paste your MongoDB connection string)
- [ ] `JWT_SECRET` = (create a strong random string)
- [ ] `PORT` = `5000`
- [ ] `NODE_ENV` = `production`
- [ ] `FRONTEND_URL` = (will add after frontend deployment)

### Deploy
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (2-5 minutes)
- [ ] Check logs for errors
- [ ] Copy backend URL (e.g., `https://appointment-backend-xyz.onrender.com`)
- [ ] Test health endpoint: `your-backend-url/api/health`

---

## 🎨 Frontend Deployment (Vercel)

### Vercel Setup
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Sign up/Login with GitHub
- [ ] Click "Add New" → "Project"
- [ ] Select your repository

### Configuration
- [ ] Framework Preset: `Vite`
- [ ] Root Directory: `frontend`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`

### Environment Variables (Add in Vercel)
- [ ] `VITE_API_URL` = `https://your-backend-url.onrender.com/api`
  - Replace with your actual Render backend URL
  - Don't forget the `/api` at the end

### Deploy
- [ ] Click "Deploy"
- [ ] Wait for deployment (1-3 minutes)
- [ ] Copy frontend URL (e.g., `https://your-app.vercel.app`)

---

## 🔄 Update Backend with Frontend URL

### Go back to Render
- [ ] Open your backend service on Render
- [ ] Go to "Environment" tab
- [ ] Add/Update: `FRONTEND_URL` = `https://your-app.vercel.app`
- [ ] Click "Save Changes"
- [ ] Wait for automatic redeploy

---

## 🧪 Testing

### Test Registration
- [ ] Visit your Vercel URL
- [ ] Click "Register"
- [ ] Create a student account
- [ ] Verify successful registration

### Test Login
- [ ] Login with created account
- [ ] Should redirect to student dashboard
- [ ] Verify user info displays correctly

### Test Appointments
- [ ] Try to create an appointment
- [ ] Check if appointment appears
- [ ] Refresh page - data should persist
- [ ] Check MongoDB Atlas - data should be there

### Test Different Roles
- [ ] Create admin account (using setup script or MongoDB)
- [ ] Login as admin
- [ ] Create a teacher account
- [ ] Login as teacher
- [ ] Verify all dashboards work

---

## 🔍 Troubleshooting

### If Frontend Can't Connect to Backend
- [ ] Check browser console for errors
- [ ] Verify `VITE_API_URL` in Vercel is correct
- [ ] Ensure backend URL ends with `/api`
- [ ] Check if backend is running (visit `/api/health`)

### If Backend Has Errors
- [ ] Check Render logs
- [ ] Verify all environment variables are set
- [ ] Check MongoDB connection string
- [ ] Ensure MongoDB IP whitelist is `0.0.0.0/0`

### If Database Connection Fails
- [ ] Go to MongoDB Atlas
- [ ] Check Network Access settings
- [ ] Ensure `0.0.0.0/0` is whitelisted
- [ ] Verify connection string is correct
- [ ] Check username/password in connection string

---

## 🎉 Final Steps

### Verify Everything Works
- [ ] Registration works
- [ ] Login works
- [ ] Student can book appointments
- [ ] Teacher can manage appointments
- [ ] Admin can create users
- [ ] Settings page works
- [ ] Password change works
- [ ] Data persists after refresh

### Share Your App
- [ ] Share frontend URL with students
- [ ] Share frontend URL with teachers
- [ ] Share frontend URL with admin
- [ ] Create first admin using setup script
- [ ] Document admin credentials securely

### Optional Enhancements
- [ ] Add custom domain to Vercel
- [ ] Add custom domain to Render
- [ ] Set up monitoring/alerts
- [ ] Add error tracking (Sentry)
- [ ] Set up backup strategy

---

## 📊 Monitoring

### Things to Monitor
- [ ] Check Render dashboard regularly
- [ ] Monitor MongoDB Atlas usage
- [ ] Check Vercel analytics
- [ ] Review error logs periodically

### Auto-Deploy Setup
- [ ] Ensure auto-deploy is enabled on Render
- [ ] Ensure auto-deploy is enabled on Vercel
- [ ] Test by pushing a small change to GitHub
- [ ] Verify automatic deployment works

---

## 🆘 Get Help

### Resources
- [ ] Read [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- [ ] Read [QUICK_DEPLOY.md](QUICK_DEPLOY.md)
- [ ] Check Render documentation
- [ ] Check Vercel documentation
- [ ] Check MongoDB Atlas documentation

### Common Issues & Solutions
- [ ] Review troubleshooting sections
- [ ] Check deployment logs
- [ ] Verify environment variables
- [ ] Test API endpoints individually

---

## ✅ Success Criteria

Your deployment is successful when:
- [x] Frontend loads without errors
- [x] Users can register and login
- [x] Appointments can be created and viewed
- [x] Data persists in MongoDB
- [x] All dashboards work correctly
- [x] Settings page works
- [x] No console errors

---

## 🎊 Congratulations!

If all items are checked, your appointment scheduling system is successfully deployed and running online! 🚀

**Your App is Live at:**
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.onrender.com`

---

**Last Updated:** October 14, 2025

