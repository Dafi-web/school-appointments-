# MongoDB Connection Setup Guide

## ❌ Current Error:
```
bad auth : authentication failed
```

This means your MongoDB credentials are incorrect or your IP address is not whitelisted.

---

## 🔧 How to Fix:

### **Step 1: Check Your MongoDB Atlas Credentials**

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Login to your account
3. Navigate to **Database Access** (left sidebar)
4. Check if user `dya-project` exists
5. If not, create a new database user or use existing credentials

### **Step 2: Get Your Correct Connection String**

1. In MongoDB Atlas, click **"Connect"** button on your cluster
2. Choose **"Connect your application"**
3. Copy the connection string
4. Replace `<password>` with your actual password

Example:
```
mongodb+srv://dya-project:YOUR_ACTUAL_PASSWORD@cluster0.3gjit.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

### **Step 3: Whitelist Your IP Address**

1. In MongoDB Atlas, go to **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. Options:
   - **For Development:** Click "Allow Access from Anywhere" (0.0.0.0/0)
   - **For Production:** Add your specific IP address

### **Step 4: Update Your .env File**

Update your `backend/.env` file with:

```env
PORT=5000
JWT_SECRET=your-secret-key-here-change-this-in-production
NODE_ENV=development
MONGODB_URI=mongodb+srv://dya-project:YOUR_ACTUAL_PASSWORD@cluster0.3gjit.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

Replace `YOUR_ACTUAL_PASSWORD` with your real MongoDB password.

---

## 🚀 Alternative: Use a Different Connection String

If you have a different MongoDB cluster, you can use any valid connection string:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

---

## ✅ After Configuration:

1. Save the `.env` file
2. Restart your backend server:
   ```bash
   cd backend
   npm run dev
   ```

3. You should see:
   ```
   ✅ Connected to MongoDB
   ✅ Database seeded with default users
   🚀 Server running on http://localhost:5000
   ```

---

## 🔍 Common Issues:

### **Issue: Authentication Failed**
- **Cause:** Wrong username/password
- **Fix:** Double-check credentials in MongoDB Atlas

### **Issue: Connection Timeout**
- **Cause:** IP not whitelisted
- **Fix:** Add your IP in Network Access settings

### **Issue: Database User Not Found**
- **Cause:** User doesn't exist in MongoDB Atlas
- **Fix:** Create database user in Database Access

---

## 📝 Current Configuration:

The app now supports both:
1. **Hardcoded connection** (fallback in code)
2. **Environment variable** `MONGODB_URI` (recommended)

If `MONGODB_URI` is set in `.env`, it will use that. Otherwise, it uses the hardcoded fallback.

---

## 🔐 Security Note:

**Never commit `.env` files to version control!**

The `.env` file is already in `.gitignore` to protect your credentials.

---

## 💡 Quick Fix for Testing:

If you want to test quickly, you can temporarily use a local MongoDB:

```bash
# Install MongoDB locally (macOS)
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Update .env to use local connection
MONGODB_URI=mongodb://localhost:27017/school-appointments
```

---

**Need Help?**
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Mongoose Connection Guide](https://mongoosejs.com/docs/connections.html)

