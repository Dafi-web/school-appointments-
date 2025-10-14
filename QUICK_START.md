# Quick Start Guide

## 🚀 Running the Application

### **1. Start Backend**
```bash
cd backend
npm run dev
```
Expected output:
```
✅ Connected to MongoDB
✅ Database seeded with default users
🚀 Server running on http://localhost:5000
```

### **2. Start Frontend** (in a new terminal)
```bash
cd frontend
npm run dev
```
Expected output:
```
VITE v5.x.x ready in XXX ms
➜ Local: http://localhost:5173
```

### **3. Or Run Both Together**
```bash
npm run dev
```

---

## 🔑 First Account Setup

### **⚠️ Demo Accounts Disabled**
Demo accounts are **disabled** for security. You need to create your first admin account manually.

### **Create First Admin:**
See **`FIRST_ADMIN_SETUP.md`** for detailed instructions on:
- Using MongoDB Compass
- Using setup script
- Using MongoDB Shell
- Temporary seeding option

### **Quick Method:**
1. Register a student account at `/register`
2. Manually change role to `"admin"` in MongoDB
3. Logout and login again as admin

### **After First Admin:**
- Login as admin
- Use "Create User" to add teachers
- Students can self-register at `/register`

---

## 📍 Key URLs

| Page | URL | Access |
|------|-----|--------|
| **Login** | `/login` | Public |
| **Register** | `/register` | Public (students only) |
| **Student Dashboard** | `/student/dashboard` | Students |
| **Teacher Dashboard** | `/teacher/dashboard` | Teachers |
| **Admin Dashboard** | `/admin/dashboard` | Admins |

---

## 👥 User Roles & Capabilities

### **🎓 Student**
- ✅ Register themselves (public)
- ✅ Book appointments with teachers
- ✅ View their own appointments
- ✅ Cancel their own appointments
- ❌ Cannot approve/reject appointments
- ❌ Cannot create users

### **👨‍🏫 Teacher**
- ❌ Cannot self-register (admin creates account)
- ✅ View student appointment requests
- ✅ Approve/Reject appointment requests
- ✅ Manage their appointments
- ❌ Cannot create users
- ❌ Cannot access admin features

### **👑 Admin**
- ❌ Cannot self-register (seeded or created by another admin)
- ✅ View ALL appointments
- ✅ Manage all appointments
- ✅ Create teacher accounts
- ✅ Create admin accounts
- ✅ View all users
- ✅ Full system access

---

## 📋 Common Tasks

### **Create a New Student** (Anyone)
1. Go to `/register`
2. Enter name, email, password
3. Click "Create Account"
4. Automatically logged in as student
5. Redirected to student dashboard

### **Create a Teacher** (Admin Only)
1. Login as admin
2. Go to admin dashboard
3. Click "Create User" button
4. Fill in teacher details
5. Select "Teacher" role
6. Submit

### **Book an Appointment** (Student)
1. Login as student
2. Click "Book Appointment"
3. Select teacher
4. Choose date and time
5. Enter subject and notes
6. Submit

### **Approve Appointment** (Teacher)
1. Login as teacher
2. See pending requests at top
3. Click "Approve" or "Reject"
4. Appointment status updated

---

## 🔒 Security Features

### **Public Registration**
- ✅ Only creates student accounts
- ✅ No role selection available
- ✅ Cannot elevate privileges
- ✅ Automatic student role assignment

### **Privileged Account Creation**
- ✅ Admin-only access
- ✅ Requires authentication
- ✅ JWT token validation
- ✅ Role-based authorization

### **Dashboard Access**
- ✅ Role-based routing
- ✅ Automatic redirection
- ✅ Protected routes
- ✅ No unauthorized access

---

## 🛠️ Troubleshooting

### **Backend won't start**
**Problem:** MongoDB connection error
```
Error: bad auth : authentication failed
```
**Solution:**
1. Check MongoDB Atlas credentials
2. Verify IP is whitelisted
3. Update `MONGODB_URI` in `backend/.env`
4. See `MONGODB_SETUP.md` for details

### **Frontend can't connect to backend**
**Problem:** Network error
```
Error: Network Error
```
**Solution:**
1. Ensure backend is running on port 5000
2. Check `frontend/src/utils/api.js` points to correct port
3. Verify no firewall blocking

### **Redirected to wrong dashboard**
**Problem:** Wrong dashboard after login
**Solution:**
- Check user role in browser DevTools → Application → Local Storage
- Logout and login again
- Clear browser cache

### **Can't create teacher/admin**
**Problem:** "Permission denied" error
**Solution:**
- Must be logged in as admin
- Use "Create User" button in admin dashboard
- Cannot use public registration for teachers/admins

---

## 📁 Project Structure

```
school-appointments/
├── backend/                    # Node.js/Express backend
│   ├── config/
│   │   └── database.js        # MongoDB connection & schemas
│   ├── controllers/
│   │   ├── authController.js  # Auth logic (login, register, createUser)
│   │   ├── userController.js  # User management
│   │   └── appointmentController.js
│   ├── middleware/
│   │   └── auth.js            # JWT authentication
│   ├── routes/
│   │   ├── authRoutes.js      # /api/auth/*
│   │   ├── userRoutes.js      # /api/users/*
│   │   └── appointmentRoutes.js # /api/appointments/*
│   └── server.js              # Entry point
│
├── frontend/                   # React/Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx  # Role-based routing
│   │   │   ├── AppointmentCard.jsx
│   │   │   ├── BookAppointment.jsx
│   │   │   └── CreateUser.jsx      # Admin user creation
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Auth state management
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx        # Student registration only
│   │   │   ├── StudentDashboard.jsx ✨ New
│   │   │   ├── TeacherDashboard.jsx ✨ New
│   │   │   └── AdminDashboard.jsx   ✨ New
│   │   ├── utils/
│   │   │   └── api.js              # Axios config
│   │   ├── App.jsx                 # Role-based routing
│   │   └── index.css               # Styles
│   └── index.html
│
└── Documentation/
    ├── README.md                    # Main readme
    ├── SECURITY_GUIDE.md           # Security implementation
    ├── ROLE_BASED_DASHBOARDS.md    # Dashboard system
    ├── MONGODB_SETUP.md            # MongoDB setup guide
    └── QUICK_START.md              # This file
```

---

## 🎯 Next Steps

1. **Start the application** (see above)
2. **Login as admin** to explore admin features
3. **Create a teacher account** using admin dashboard
4. **Login as teacher** to test teacher features
5. **Register a student** via public registration
6. **Book appointments** and test the flow

---

## 📚 Documentation

- **SECURITY_GUIDE.md** - Security implementation details
- **ROLE_BASED_DASHBOARDS.md** - Dashboard features and comparison
- **MONGODB_SETUP.md** - MongoDB connection troubleshooting
- **README.md** - Original project overview

---

## ✨ Key Features Summary

✅ **Secure Registration** - Students only, no privilege escalation
✅ **Role-Based Dashboards** - Custom UI for each role
✅ **Admin User Management** - Create teachers/admins securely
✅ **Appointment System** - Book, approve, manage appointments
✅ **JWT Authentication** - Secure token-based auth
✅ **MongoDB Database** - Cloud-based data storage
✅ **Responsive Design** - Modern, mobile-friendly UI

---

**Need Help?** Check the documentation files or the troubleshooting section above!

**Last Updated:** October 14, 2025

