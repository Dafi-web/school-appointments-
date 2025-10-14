# Security Implementation Guide

## 🔒 Secure User Registration System

This application now has a secure registration system that prevents unauthorized users from creating admin or teacher accounts.

---

## 📋 How It Works

### **Public Registration (Students Only)**
- **Endpoint:** `POST /api/auth/register`
- **Access:** Public (no authentication required)
- **Creates:** Student accounts ONLY
- **Fields Required:**
  - `email`
  - `password`
  - `full_name`
  
**Note:** The `role` field is NOT accepted. All public registrations are automatically assigned the `student` role.

```javascript
// Example Request
POST /api/auth/register
{
  "email": "student.name@example.com",
  "password": "securePassword123",
  "full_name": "John Doe"
}

// Response
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "student.name@example.com",
    "full_name": "John Doe",
    "role": "student"  // Always student
  }
}
```

---

### **Admin-Only User Creation (Teachers & Admins)**
- **Endpoint:** `POST /api/auth/create-user`
- **Access:** Admin only (requires authentication + admin role)
- **Creates:** Teacher or Admin accounts
- **Fields Required:**
  - `email`
  - `password`
  - `full_name`
  - `role` (must be `teacher` or `admin`)

```javascript
// Example Request (Requires Admin Token)
POST /api/auth/create-user
Authorization: Bearer <admin_token>
{
  "email": "teacher.name@example.com",
  "password": "securePassword123",
  "full_name": "Jane Smith",
  "role": "teacher"
}

// Response
{
  "message": "Teacher account created successfully",
  "user": {
    "id": "user_id",
    "email": "teacher.name@example.com",
    "full_name": "Jane Smith",
    "role": "teacher"
  }
}
```

---

## 🎯 Frontend Implementation

### **Student Registration Page**
- Located at: `/register`
- Simplified form (no role selection)
- Only creates student accounts
- Updated UI messaging

### **Admin User Creation (Dashboard)**
- Only visible to admin users
- "Create User" button in admin dashboard
- Modal form to create teachers/admins
- Includes role selection (Teacher or Admin only)

---

## 🔐 Security Features

### ✅ **What's Protected:**
1. **Public Registration**: Limited to student accounts only
2. **Teacher/Admin Creation**: Requires admin authentication
3. **Role-Based Access Control**: Enforced at both route and controller level
4. **JWT Authentication**: Required for creating privileged accounts

### ❌ **What's Prevented:**
1. Self-registration as teacher or admin
2. Role elevation via public registration
3. Unauthorized teacher/admin account creation
4. API manipulation to bypass restrictions

---

## 🚀 How to Use

### **For Students:**
1. Go to `/register`
2. Fill in: Name, Email, Password
3. Submit → Automatically created as student
4. Login and book appointments

### **For Admins (Creating Teachers/Admins):**
1. Login as admin
2. Go to Dashboard
3. Click "Create User" button
4. Fill in user details
5. Select role (Teacher or Admin)
6. Submit → User created with selected role

---

## 🔑 First Admin Account

To create your first admin account and manage teacher/admin accounts:

1. Use the setup script: `npm run setup-admin` (from the backend directory)
2. Follow the prompts to create your admin account
3. Login with your admin credentials to create additional users

**📚 See:** [FIRST_ADMIN_SETUP.md](FIRST_ADMIN_SETUP.md) for detailed instructions.

---

## 📝 API Endpoints Summary

| Endpoint | Access | Creates | Authentication |
|----------|--------|---------|---------------|
| `/api/auth/register` | Public | Students only | None |
| `/api/auth/create-user` | Admin only | Teachers/Admins | Required + Admin role |
| `/api/auth/login` | Public | N/A | None |

---

## 🛡️ Implementation Details

### **Backend Changes:**
1. **authController.js**
   - `register()`: Modified to only create students
   - `createUser()`: New function for admin-only user creation

2. **authRoutes.js**
   - `/register`: Public route (students only)
   - `/create-user`: Protected route (admin only)

### **Frontend Changes:**
1. **Register.jsx**
   - Removed role selection field
   - Updated messaging
   - Simplified form data

2. **Dashboard.jsx**
   - Added "Create User" button for admins
   - Integrated CreateUser modal

3. **CreateUser.jsx**
   - New component for admin user creation
   - Form validation
   - Role selection (teacher/admin only)

---

## 🔧 Configuration

### **Port Configuration:**
- Backend: `http://localhost:5000`
- Frontend API URL updated to match backend port

### **MongoDB Connection:**
- Connection string: `mongodb+srv://dya-project:yesno1212@cluster0.3gjit.mongodb.net/...`
- Make sure to whitelist your IP in MongoDB Atlas

---

## ✨ Benefits

1. **Enhanced Security**: Prevents unauthorized privilege escalation
2. **Clear Separation**: Different flows for students vs. privileged users
3. **Admin Control**: Full control over teacher/admin account creation
4. **User-Friendly**: Simple registration for students
5. **Auditable**: All privileged account creation requires admin authentication

---

## 🐛 Troubleshooting

### **MongoDB Authentication Error:**
```
Error: bad auth : authentication failed
```
**Solution:** 
- Verify MongoDB credentials
- Check IP whitelist in MongoDB Atlas
- Ensure connection string is correct

### **Cannot Create Teacher/Admin:**
```
Error: You do not have permission to access this resource
```
**Solution:**
- Login as admin first
- Use the dashboard "Create User" button
- Don't try to use public registration

### **API Port Mismatch:**
```
Error: Network Error
```
**Solution:**
- Check frontend `api.js` points to correct backend port (5000)
- Ensure backend is running on correct port
- Verify .env PORT setting

---

## 📚 Additional Resources

- [MongoDB Atlas Setup](https://www.mongodb.com/cloud/atlas)
- [JWT Authentication](https://jwt.io/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)

---

**Last Updated:** October 14, 2025

