# 🏗️ Deployment Architecture

Visual guide to understand how your deployed application works.

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                      INTERNET                           │
└─────────────────────────────────────────────────────────┘
                            │
                            │
            ┌───────────────┴───────────────┐
            │                               │
            ▼                               ▼
    ┌──────────────┐              ┌──────────────────┐
    │   FRONTEND   │              │    USERS         │
    │   (Vercel)   │              │  (Students,      │
    │              │◄─────────────│   Teachers,      │
    │  React App   │              │   Admins)        │
    └──────────────┘              └──────────────────┘
            │
            │ HTTPS API Calls
            │
            ▼
    ┌──────────────┐
    │   BACKEND    │
    │   (Render)   │
    │              │
    │  Node.js API │
    └──────────────┘
            │
            │ MongoDB Protocol
            │
            ▼
    ┌──────────────┐
    │   DATABASE   │
    │  (MongoDB    │
    │   Atlas)     │
    │              │
    └──────────────┘
```

---

## 🔄 Request Flow

### When a User Books an Appointment:

```
1. User clicks "Book Appointment"
   ↓
2. Frontend (Vercel) sends HTTPS request
   ↓
3. Backend (Render) receives request
   ↓
4. Backend validates JWT token
   ↓
5. Backend queries MongoDB Atlas
   ↓
6. MongoDB returns data
   ↓
7. Backend processes & sends response
   ↓
8. Frontend displays appointment
```

---

## 🌐 Component Details

### Frontend (Vercel)
```
URL: https://your-app.vercel.app
Tech: React + Vite
Hosting: Vercel CDN (Global)
SSL: Automatic HTTPS
Cost: FREE

Features:
- Static file hosting
- Global CDN
- Auto-deploy from GitHub
- Custom domains
- Analytics
```

### Backend (Render)
```
URL: https://your-backend.onrender.com
Tech: Node.js + Express
Hosting: Render Cloud
SSL: Automatic HTTPS
Cost: FREE

Features:
- API endpoints
- Authentication
- Business logic
- Auto-deploy from GitHub
- Environment variables
```

### Database (MongoDB Atlas)
```
URL: cluster0.mongodb.net
Tech: MongoDB
Hosting: MongoDB Atlas Cloud
SSL: Automatic TLS
Cost: FREE (512MB)

Features:
- Document storage
- Automatic backups
- Global replication
- Monitoring
- Security
```

---

## 🔐 Security Flow

### Authentication Process:

```
┌─────────┐     1. Login       ┌─────────┐
│  User   │ ──────────────────>│ Backend │
└─────────┘                     └─────────┘
                                     │
                                     │ 2. Verify credentials
                                     │    with MongoDB
                                     ▼
                                ┌─────────┐
                                │ MongoDB │
                                └─────────┘
                                     │
                                     │ 3. User found
                                     ▼
                                ┌─────────┐
                                │ Backend │
                                └─────────┘
                                     │
                                     │ 4. Generate JWT
                                     ▼
┌─────────┐  5. Return JWT     ┌─────────┐
│  User   │ <──────────────────│ Backend │
└─────────┘   + User Data      └─────────┘
     │
     │ 6. Store JWT in
     │    localStorage
     ▼
┌──────────────────┐
│  Browser Storage │
└──────────────────┘
```

### Subsequent Requests:

```
┌─────────┐                    ┌─────────┐
│  User   │ ───── Request ────>│ Backend │
└─────────┘  (with JWT token)  └─────────┘
                                     │
                                     │ Verify JWT
                                     │
                                     ▼
                            ┌─────────────────┐
                            │ JWT Valid?      │
                            └─────────────────┘
                                 │       │
                           YES   │       │   NO
                                 ▼       ▼
                            ┌────────┐ ┌────────┐
                            │Process │ │ Reject │
                            │Request │ │ 401    │
                            └────────┘ └────────┘
```

---

## 🌍 Geographic Distribution

```
┌─────────────────────────────────────────────────┐
│             GLOBAL INFRASTRUCTURE               │
├─────────────────────────────────────────────────┤
│                                                 │
│  Frontend (Vercel CDN)                         │
│  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  │
│  │  USA  │  │  EU   │  │ Asia  │  │Africa │  │
│  └───────┘  └───────┘  └───────┘  └───────┘  │
│     ↓           ↓           ↓          ↓      │
│  Cached content served from nearest location   │
│                                                 │
│  Backend (Render)                              │
│  ┌──────────────────┐                         │
│  │  Single Region   │                         │
│  │  (Your Choice)   │                         │
│  └──────────────────┘                         │
│                                                 │
│  Database (MongoDB Atlas)                      │
│  ┌──────────────────┐                         │
│  │  Single Region   │                         │
│  │  (Auto Backup)   │                         │
│  └──────────────────┘                         │
└─────────────────────────────────────────────────┘
```

---

## 🔄 Deployment Pipeline

```
┌──────────────┐
│  Developer   │
│  (You)       │
└──────────────┘
       │
       │ git push
       ▼
┌──────────────┐
│   GitHub     │
│  Repository  │
└──────────────┘
       │
       ├─────────────────┬─────────────────┐
       │                 │                 │
       ▼                 ▼                 ▼
┌─────────┐      ┌─────────┐      ┌─────────┐
│ Vercel  │      │ Render  │      │ MongoDB │
│ (Auto)  │      │ (Auto)  │      │ (Manual)│
└─────────┘      └─────────┘      └─────────┘
       │                 │                 │
       ▼                 ▼                 ▼
┌─────────┐      ┌─────────┐      ┌─────────┐
│Frontend │      │Backend  │      │Database │
│  Live   │      │  Live   │      │  Live   │
└─────────┘      └─────────┘      └─────────┘
```

---

## 📡 API Communication

### Development:
```
Frontend (localhost:5173)
    │
    │ HTTP
    ▼
Backend (localhost:5000/api)
    │
    │ MongoDB Protocol
    ▼
Database (MongoDB Atlas)
```

### Production:
```
Frontend (your-app.vercel.app)
    │
    │ HTTPS
    ▼
Backend (your-backend.onrender.com/api)
    │
    │ MongoDB+SRV (TLS)
    ▼
Database (cluster.mongodb.net)
```

---

## 🛡️ Security Layers

```
┌─────────────────────────────────────────┐
│         Layer 1: HTTPS/TLS              │
│  All communication encrypted in transit │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│         Layer 2: CORS Protection        │
│  Only allowed origins can access API    │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│         Layer 3: JWT Authentication     │
│  Users must have valid token            │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│         Layer 4: Role-Based Access      │
│  Users can only access allowed routes   │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│         Layer 5: Input Validation       │
│  All data validated before processing   │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│         Layer 6: Database Security      │
│  MongoDB Atlas network isolation        │
└─────────────────────────────────────────┘
```

---

## 💾 Data Flow

### Creating an Appointment:

```
1. Student Dashboard
   └─> User fills appointment form
       └─> Click "Book Appointment"
           │
           ▼
2. Frontend Validation
   └─> Check required fields
       └─> Prepare API request
           │
           ▼
3. API Request
   └─> POST /api/appointments
       └─> Headers: { Authorization: "Bearer JWT" }
       └─> Body: { teacher_id, date, time, reason }
           │
           ▼
4. Backend Processing
   └─> Verify JWT token
       └─> Check user role (student)
       └─> Validate appointment data
       └─> Check teacher availability
           │
           ▼
5. Database Operation
   └─> Insert new appointment document
       └─> Update teacher schedule
           │
           ▼
6. Response
   └─> Success: 201 Created
       └─> Return appointment data
           │
           ▼
7. Frontend Update
   └─> Display success message
       └─> Refresh appointment list
       └─> Update UI
```

---

## 🔧 Environment Variables Flow

```
Development:
┌─────────────┐
│  .env file  │ (Local, NOT committed)
└─────────────┘
       │
       ▼
┌─────────────┐
│Application  │
└─────────────┘

Production:
┌─────────────────┐
│ Render Dashboard│ → Backend environment variables
└─────────────────┘
       │
       ▼
┌─────────────────┐
│ Backend App     │
└─────────────────┘

┌─────────────────┐
│ Vercel Dashboard│ → Frontend environment variables
└─────────────────┘
       │
       ▼
┌─────────────────┐
│ Frontend App    │
└─────────────────┘
```

---

## 📊 Monitoring & Logs

```
┌──────────────┐
│    Users     │
└──────────────┘
       │
       ▼
┌──────────────┐     Logs    ┌──────────────┐
│   Frontend   │ ──────────> │    Vercel    │
│   (Vercel)   │             │   Analytics  │
└──────────────┘             └──────────────┘
       │
       ▼
┌──────────────┐     Logs    ┌──────────────┐
│   Backend    │ ──────────> │    Render    │
│   (Render)   │             │     Logs     │
└──────────────┘             └──────────────┘
       │
       ▼
┌──────────────┐   Metrics   ┌──────────────┐
│   Database   │ ──────────> │   MongoDB    │
│   (Atlas)    │             │   Metrics    │
└──────────────┘             └──────────────┘
```

---

## 🚀 Scaling Options

### Current (Free Tier):
```
Frontend: Vercel (Unlimited deployments)
Backend:  Render (1 instance, auto-sleep)
Database: MongoDB Atlas (512MB)
```

### Future Scaling:
```
Frontend: Vercel Pro (More bandwidth)
Backend:  Render Pro (Multiple instances, no sleep)
Database: MongoDB Shared/Dedicated (More storage)
```

---

## 📝 Summary

Your application is deployed across three separate services, each handling a specific function:

1. **Vercel** - Serves your React frontend globally via CDN
2. **Render** - Runs your Node.js backend API
3. **MongoDB Atlas** - Stores all your data securely

All three work together seamlessly, with automatic HTTPS, continuous deployment from GitHub, and professional-grade infrastructure - all for **FREE**! 🎉

---

**Designed by Dawit Abrha (DafiTech)**

**Last Updated:** October 14, 2025

