# Settings & Profile Management Guide

## 🔧 Overview

The Settings page allows all users to manage their account information and security settings:
- ✅ Update profile information (name & email)
- ✅ Change password securely
- ✅ View current role

---

## 📍 Accessing Settings

### **From Any Dashboard:**
Click the **"Settings"** button in the navigation bar (next to Logout)

### **Direct URL:**
`/settings`

**Access:** All authenticated users (Students, Teachers, Admins)

---

## 👤 Profile Information

### **What You Can Update:**
- **Full Name** - Your display name
- **Email Address** - Your login email

### **What You Cannot Change:**
- **Role** - Only admins can change user roles (for security)

### **How to Update Profile:**

1. Navigate to Settings page
2. Edit the fields in the "Profile Information" section
3. Click "Save Changes"
4. If email changed, you'll be logged out to re-login

---

## 🔐 Change Password

### **Security Requirements:**
- Must provide current password
- New password must be at least 6 characters
- New password and confirmation must match

### **How to Change Password:**

1. Navigate to Settings page
2. In "Change Password" section:
   - Enter your **current password**
   - Enter your **new password**
   - **Confirm** new password
3. Click "Update Password"
4. You'll be automatically logged out
5. Login again with your new password

### **Important Notes:**
- ⚠️ You'll be logged out after password change
- ⚠️ Make sure you remember your new password
- ✅ Password is encrypted before saving

---

## 📊 Settings Page Layout

```
┌─────────────────────────────────────────────┐
│  Account Settings                           │
│  Manage your profile and account security   │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────┐  ┌──────────────────┐ │
│  │ 👤 Profile Info │  │ 🔒 Change Pwd    │ │
│  ├─────────────────┤  ├──────────────────┤ │
│  │                 │  │                  │ │
│  │ Full Name       │  │ Current Password │ │
│  │ Email           │  │ New Password     │ │
│  │ Role (locked)   │  │ Confirm Password │ │
│  │                 │  │                  │ │
│  │ [Save Changes]  │  │ [Update Password]│ │
│  └─────────────────┘  └──────────────────┘ │
└─────────────────────────────────────────────┘
```

---

## 🔄 Backend API Endpoints

### **Update Profile**
```
PUT /api/users/profile
Authorization: Bearer <token>

Body:
{
  "full_name": "New Name",
  "email": "newemail@example.com"
}

Response:
{
  "message": "Profile updated successfully",
  "user": {
    "id": "user_id",
    "email": "newemail@example.com",
    "full_name": "New Name",
    "role": "student"
  }
}
```

### **Update Password**
```
PUT /api/users/password
Authorization: Bearer <token>

Body:
{
  "currentPassword": "oldpass123",
  "newPassword": "newpass123"
}

Response:
{
  "message": "Password updated successfully"
}
```

---

## ✅ Validation & Security

### **Profile Update Validation:**
- ✅ Email format validation
- ✅ Email uniqueness check (no duplicates)
- ✅ Full name required
- ✅ Authentication required

### **Password Update Validation:**
- ✅ Current password verification
- ✅ New password length (minimum 6 characters)
- ✅ Password confirmation match
- ✅ Password encryption (bcrypt)
- ✅ Authentication required

### **Security Features:**
- 🔒 All endpoints require JWT authentication
- 🔒 Passwords are hashed with bcrypt
- 🔒 Email changes trigger re-authentication
- 🔒 Password changes trigger re-authentication
- 🔒 Role cannot be self-modified

---

## 🎯 User Flows

### **Scenario 1: Update Name**
```
1. User clicks "Settings" in navbar
2. Changes "Full Name" field
3. Clicks "Save Changes"
4. ✅ Success message appears
5. Name updated across all pages
```

### **Scenario 2: Change Email**
```
1. User clicks "Settings" in navbar
2. Changes "Email" field
3. Clicks "Save Changes"
4. ✅ Success message appears
5. Auto-logout after 2 seconds
6. User logs in with new email
```

### **Scenario 3: Change Password**
```
1. User clicks "Settings" in navbar
2. Enters current password
3. Enters new password (min 6 chars)
4. Confirms new password
5. Clicks "Update Password"
6. ✅ Success message appears
7. Auto-logout after 2 seconds
8. User logs in with new password
```

---

## 🚨 Error Handling

### **Common Errors & Solutions:**

**Email Already in Use**
- **Error:** "Email already in use"
- **Solution:** Choose a different email address

**Current Password Incorrect**
- **Error:** "Current password is incorrect"
- **Solution:** Verify your current password and try again

**Passwords Don't Match**
- **Error:** "New passwords do not match"
- **Solution:** Make sure both new password fields are identical

**Password Too Short**
- **Error:** "New password must be at least 6 characters"
- **Solution:** Use a password with 6 or more characters

**Unauthorized**
- **Error:** 401 or 403 error
- **Solution:** Login again (session may have expired)

---

## 📁 Files Involved

### **Backend:**
```
backend/
├── controllers/userController.js
│   ├── updateProfile()      ✨ New
│   └── updatePassword()     ✨ New
└── routes/userRoutes.js
    ├── PUT /users/profile   ✨ New
    └── PUT /users/password  ✨ New
```

### **Frontend:**
```
frontend/src/
├── pages/
│   └── Settings.jsx         ✨ New
├── components/
│   └── Navbar.jsx           ✅ Updated (Settings button)
└── App.jsx                  ✅ Updated (Settings route)
```

---

## 🔍 Testing the Feature

### **Test Profile Update:**
1. Login as any user
2. Go to Settings
3. Change name to "Test User"
4. Save changes
5. ✅ Verify name appears in navbar
6. ✅ Verify success message

### **Test Email Change:**
1. Login as student
2. Go to Settings  
3. Change email to unique address
4. Save changes
5. ✅ Verify logout happens
6. ✅ Login with new email
7. ✅ Old email no longer works

### **Test Password Change:**
1. Login as any user
2. Go to Settings
3. Enter current password
4. Enter new password (min 6 chars)
5. Confirm new password
6. Update password
7. ✅ Verify logout happens
8. ✅ Login with new password
9. ✅ Old password no longer works

### **Test Validation:**
1. Try email already in use → ❌ Error
2. Try wrong current password → ❌ Error
3. Try password < 6 chars → ❌ Error
4. Try mismatched passwords → ❌ Error

---

## 💡 Best Practices

### **For Users:**
1. ✅ Use strong passwords (mix of letters, numbers, symbols)
2. ✅ Change password regularly
3. ✅ Keep email address up to date
4. ✅ Remember your credentials after changes

### **For Developers:**
1. ✅ Always hash passwords (never store plain text)
2. ✅ Validate email uniqueness
3. ✅ Require current password for changes
4. ✅ Logout users after security changes
5. ✅ Show clear success/error messages

---

## 🎨 UI Features

### **Design Elements:**
- Side-by-side layout for Profile & Password
- Clear section headers with icons
- Helpful hint text (gray, small)
- Disabled role field (visual indicator)
- Success/error alerts at top
- Responsive grid layout

### **User Experience:**
- Auto-logout on security changes
- Clear warning messages
- Password visibility toggle (optional enhancement)
- Form validation feedback
- Loading states on buttons

---

## 🚀 Future Enhancements

Possible additions:
- [ ] Password strength indicator
- [ ] Email verification system
- [ ] Two-factor authentication
- [ ] Profile picture upload
- [ ] Account deletion
- [ ] Activity log
- [ ] Session management
- [ ] Password recovery via email

---

## 📚 Related Documentation

- **SECURITY_GUIDE.md** - Overall security implementation
- **ROLE_BASED_DASHBOARDS.md** - Dashboard system
- **QUICK_START.md** - Getting started guide

---

**Last Updated:** October 14, 2025

