# Role-Based Dashboard System

## 🎯 Overview

The application now has **separate, customized dashboards** for each user role:
- **Student Dashboard** - Book and manage appointments
- **Teacher Dashboard** - Review and approve student requests
- **Admin Dashboard** - Manage all users and appointments

---

## 📍 Dashboard Routes

### **Student Dashboard**
- **URL:** `/student/dashboard`
- **Access:** Students only
- **Features:**
  - View all their appointments
  - Book new appointments with teachers
  - Cancel their own appointments
  - See stats: Total, Pending, Approved

### **Teacher Dashboard**
- **URL:** `/teacher/dashboard`
- **Access:** Teachers only
- **Features:**
  - View all student appointment requests
  - Approve/Reject pending requests
  - Manage approved appointments
  - See stats: Total, Pending, Approved, Rejected
  - Highlighted pending requests section

### **Admin Dashboard**
- **URL:** `/admin/dashboard`
- **Access:** Admins only
- **Features:**
  - View ALL appointments in the system
  - Manage all appointments (update/delete)
  - Create new teacher/admin users
  - View all users with roles
  - See comprehensive stats: Appointments, Students, Teachers
  - User management table

---

## 🔐 Access Control

### **Automatic Redirection**
- Users are automatically redirected to their role-specific dashboard after login
- If a user tries to access a dashboard they don't have permission for, they're redirected to their correct dashboard

### **Protected Routes**
```javascript
// Example: Only teachers can access teacher dashboard
/teacher/dashboard → Only accessible by teachers
/student/dashboard → Only accessible by students  
/admin/dashboard → Only accessible by admins
```

---

## 🎨 Dashboard Features Comparison

| Feature | Student | Teacher | Admin |
|---------|---------|---------|-------|
| **View Own Appointments** | ✅ | ✅ | ✅ |
| **Book Appointments** | ✅ | ❌ | ❌ |
| **Approve/Reject Requests** | ❌ | ✅ | ✅ |
| **View All Appointments** | ❌ | Own only | ✅ All |
| **Create Users** | ❌ | ❌ | ✅ |
| **User Management** | ❌ | ❌ | ✅ |
| **Delete Any Appointment** | Own only | Own only | ✅ All |

---

## 📊 Dashboard Layouts

### **Student Dashboard**
```
┌─────────────────────────────────────┐
│  My Appointments    [Book Appointment]│
├─────────────────────────────────────┤
│  📊 Stats: Total | Pending | Approved │
├─────────────────────────────────────┤
│  📅 My Appointments List             │
│  - Appointment Card 1                │
│  - Appointment Card 2                │
└─────────────────────────────────────┘
```

### **Teacher Dashboard**
```
┌─────────────────────────────────────┐
│  Student Appointments                │
├─────────────────────────────────────┤
│  📊 Stats: Total | Pending | Approved | Rejected │
├─────────────────────────────────────┤
│  ⚠️ Pending Requests (if any)        │
│  - Request 1 [Approve/Reject]        │
│  - Request 2 [Approve/Reject]        │
├─────────────────────────────────────┤
│  📅 All Appointments                 │
│  - Appointment Card 1                │
│  - Appointment Card 2                │
└─────────────────────────────────────┘
```

### **Admin Dashboard**
```
┌─────────────────────────────────────┐
│  Admin Dashboard      [Create User]  │
├─────────────────────────────────────┤
│  📊 Stats: Appointments | Pending | Approved | Students | Teachers │
├─────────────────────────────────────┤
│  👥 Recent Users                     │
│  Table: Name | Email | Role | Joined │
├─────────────────────────────────────┤
│  📅 All Appointments                 │
│  - Appointment Card 1                │
│  - Appointment Card 2                │
└─────────────────────────────────────┘
```

---

## 🚀 How Login Works

### **Login Flow:**
```
1. User logs in
2. Backend returns user data with role
3. Frontend redirects based on role:
   - student → /student/dashboard
   - teacher → /teacher/dashboard
   - admin → /admin/dashboard
```

### **Registration Flow:**
```
1. User registers (always as student)
2. Backend creates student account
3. Frontend redirects to /student/dashboard
```

---

## 🛠️ Technical Implementation

### **Files Created:**
```
frontend/src/pages/
├── StudentDashboard.jsx    ✅ New
├── TeacherDashboard.jsx    ✅ New
├── AdminDashboard.jsx      ✅ New
└── Dashboard.jsx           (Legacy - kept for compatibility)
```

### **Files Updated:**
```
frontend/src/
├── App.jsx                 ✅ Updated (role-based routing)
├── components/
│   └── ProtectedRoute.jsx  ✅ Updated (role checks)
├── pages/
│   ├── Login.jsx           ✅ Updated (smart redirect)
│   └── Register.jsx        ✅ Updated (smart redirect)
└── index.css              ✅ Updated (grid-4, grid-5)
```

---

## 📝 Component Features

### **StudentDashboard.jsx**
- Clean, student-focused interface
- Prominent "Book Appointment" button
- Shows teacher names and appointment status
- Can only cancel own appointments

### **TeacherDashboard.jsx**
- Pending requests highlighted at top
- Quick approve/reject actions
- Shows student names
- 4-column stats layout
- Can update status of appointments

### **AdminDashboard.jsx**
- Comprehensive overview of entire system
- User management table
- 5-column stats layout
- Create user button
- Full CRUD on all appointments
- View all users with role badges

---

## 🎨 Styling Features

### **New CSS Variables:**
```css
--primary-light: #e0e7ff;
--secondary-light: #d1fae5;
--error: #ef4444;
--error-light: #fee2e2;
```

### **New Grid Layouts:**
```css
.grid-4 → 4-column responsive grid
.grid-5 → 5-column responsive grid
```

### **Role Badge Colors:**
- **Admin:** Red background (`--error-light`)
- **Teacher:** Blue background (`--primary-light`)
- **Student:** Green background (`--secondary-light`)

---

## 🔄 Navigation Between Dashboards

Users **cannot** manually navigate between different role dashboards:
- A student trying to access `/teacher/dashboard` will be redirected to `/student/dashboard`
- A teacher trying to access `/admin/dashboard` will be redirected to `/teacher/dashboard`
- Protection is enforced at the route level via `ProtectedRoute` component

---

## ✅ Benefits

1. **Better UX:** Each role sees only what's relevant to them
2. **Clearer Interface:** No clutter from irrelevant features
3. **Security:** Role-based access control prevents unauthorized access
4. **Optimized Workflows:** Each dashboard is optimized for its role's tasks
5. **Scalability:** Easy to add role-specific features in the future

---

## 🧪 Testing the System

### **Test Student Access:**
1. Register a new account → Automatically student
2. Login → Redirected to `/student/dashboard`
3. Try accessing `/teacher/dashboard` → Redirected back to `/student/dashboard`

### **Test Teacher Access:**
1. Login as admin (use your admin credentials)
2. Create a teacher account
3. Logout and login as teacher
4. Should see `/teacher/dashboard` with pending requests

### **Test Admin Access:**
1. Login as admin (use your admin credentials)
2. Should see `/admin/dashboard` with user table
3. Can access create user functionality
4. Can manage all appointments

---

## 📚 Future Enhancements

Possible additions for each dashboard:

**Student:**
- Calendar view of appointments
- Teacher ratings
- Appointment history

**Teacher:**
- Availability settings
- Bulk approve/reject
- Student notes

**Admin:**
- Analytics dashboard
- System settings
- Audit logs
- Export data

---

**Last Updated:** October 14, 2025

