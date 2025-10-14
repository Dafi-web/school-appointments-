# First Admin Account Setup

## 🚨 Important: Demo Accounts Disabled

Demo accounts are **disabled** for security reasons. You need to create your first admin account manually.

---

## 📋 Options to Create First Admin

### **Option 1: Using MongoDB Compass (Recommended)**

1. **Install MongoDB Compass** (if not already installed)
   - Download from: https://www.mongodb.com/products/compass

2. **Connect to Your Database**
   - Open MongoDB Compass
   - Use your connection string:
     ```
     mongodb+srv://wediabrhana:yesno1212@cluster4.9cf8d.mongodb.net/
     ```

3. **Navigate to Your Database**
   - Select your database (usually `test` or create new one)
   - Click on `users` collection (create if doesn't exist)

4. **Insert First Admin User**
   - Click "Add Data" → "Insert Document"
   - Paste this document:
   ```json
   {
     "email": "admin@yourschool.com",
     "password": "$2a$10$YourHashedPasswordHere",
     "full_name": "System Administrator",
     "role": "admin",
     "created_at": {"$date": "2025-10-14T00:00:00.000Z"}
   }
   ```

5. **Generate Password Hash**
   - Use the hash generator script (see below)
   - Replace `$2a$10$YourHashedPasswordHere` with generated hash

---

### **Option 2: Using MongoDB Shell**

1. **Connect to MongoDB**
   ```bash
   mongosh "mongodb+srv://wediabrhana:yesno1212@cluster4.9cf8d.mongodb.net/"
   ```

2. **Select Database**
   ```javascript
   use test  // or your database name
   ```

3. **Insert Admin User**
   ```javascript
   db.users.insertOne({
     email: "admin@yourschool.com",
     password: "$2a$10$YourHashedPasswordHere",  // Replace with hashed password
     full_name: "System Administrator",
     role: "admin",
     created_at: new Date()
   })
   ```

---

### **Option 3: Using Node.js Script** (Easiest)

1. **Create a setup script** `backend/setup-admin.js`:

```javascript
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb+srv://wediabrhana:yesno1212@cluster4.9cf8d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster4");
    console.log('✅ Connected to MongoDB');

    // User schema
    const userSchema = new mongoose.Schema({
      email: String,
      password: String,
      full_name: String,
      role: String,
      created_at: { type: Date, default: Date.now }
    });
    
    const User = mongoose.model('User', userSchema);

    // Get admin details
    rl.question('Enter admin email: ', async (email) => {
      rl.question('Enter admin password: ', async (password) => {
        rl.question('Enter admin full name: ', async (fullName) => {
          
          // Hash password
          const hashedPassword = await bcrypt.hash(password, 10);
          
          // Create admin
          const admin = await User.create({
            email: email,
            password: hashedPassword,
            full_name: fullName,
            role: 'admin'
          });
          
          console.log('✅ Admin account created successfully!');
          console.log('Email:', admin.email);
          console.log('Name:', admin.full_name);
          
          rl.close();
          process.exit(0);
        });
      });
    });

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createAdmin();
```

2. **Run the script:**
   ```bash
   cd backend
   node setup-admin.js
   ```

3. **Follow the prompts:**
   - Enter admin email
   - Enter password
   - Enter full name

---

### **Option 4: Temporary Re-enable Seeding**

If you need demo accounts temporarily:

1. **Edit `backend/config/database.js`**

2. **Uncomment the seeding code** or add:
   ```javascript
   async function seedDatabase() {
     try {
       const userCount = await User.countDocuments();
       
       if (userCount === 0) {
         const hashedPassword = bcrypt.hashSync('yourpassword', 10);
         
         await User.create({
           email: 'admin@yourschool.com',
           password: hashedPassword,
           full_name: 'System Admin',
           role: 'admin'
         });
         
         console.log('✅ Admin account created');
       }
     } catch (error) {
       console.error('Error:', error);
     }
   }
   ```

3. **Restart the server**

4. **Disable seeding again after first run**

---

## 🔐 Password Hash Generator

### **Quick Hash Generator Script:**

```javascript
// hash-password.js
import bcrypt from 'bcryptjs';

const password = process.argv[2] || 'defaultPassword123';
const hash = bcrypt.hashSync(password, 10);

console.log('Password:', password);
console.log('Hash:', hash);
console.log('\nCopy the hash above to use in MongoDB');
```

**Usage:**
```bash
node hash-password.js "yourpassword"
```

---

## 🚀 Quick Start Steps

### **Method 1: Using Setup Script (Recommended)**

1. **Create `backend/setup-admin.js`** (code above)

2. **Run the script:**
   ```bash
   cd backend
   node setup-admin.js
   ```

3. **Enter details when prompted**

4. **Start your application:**
   ```bash
   npm run dev
   ```

5. **Login with your admin credentials**

---

### **Method 2: Register as Student, Then Upgrade**

1. **Start the application**
   ```bash
   npm run dev
   ```

2. **Register a student account** at `/register`

3. **Manually upgrade in MongoDB:**
   - Open MongoDB Compass
   - Find the user in `users` collection
   - Change `role` from `"student"` to `"admin"`
   - Save

4. **Logout and login again** - You're now admin!

---

## ⚠️ Security Notes

1. **Never commit admin credentials** to version control
2. **Change default passwords** immediately
3. **Use strong passwords** (min 12 characters)
4. **Enable 2FA** when available
5. **Regularly rotate** admin passwords
6. **Limit admin accounts** to necessary users only

---

## 📝 After Creating First Admin

Once you have your first admin account:

1. **Login as admin**
2. **Go to Admin Dashboard**
3. **Click "Create User"** to add teachers
4. **Students can self-register** at `/register`

---

## 🔍 Verify Admin Account

### **Check in MongoDB:**
```javascript
db.users.findOne({ role: "admin" })
```

Should return:
```json
{
  "_id": ObjectId("..."),
  "email": "admin@yourschool.com",
  "password": "$2a$10$...",
  "full_name": "System Administrator",
  "role": "admin",
  "created_at": ISODate("...")
}
```

### **Test Login:**
1. Go to `/login`
2. Enter admin email and password
3. Should redirect to `/admin/dashboard`
4. Should see "Create User" button

---

## 🆘 Troubleshooting

### **Can't Connect to MongoDB**
- Check connection string
- Verify IP is whitelisted in MongoDB Atlas
- Check username/password

### **Password Won't Work**
- Make sure password is hashed with bcrypt
- Hash must start with `$2a$10$` or `$2b$10$`
- Use the hash generator script

### **Account Created but Can't Login**
- Verify role is exactly `"admin"` (lowercase)
- Check email matches exactly
- Try resetting password

### **No Users Collection**
- Start the backend server once
- It will create the collection automatically
- Then add your admin user

---

## 📚 Related Documentation

- **SECURITY_GUIDE.md** - Security best practices
- **MONGODB_SETUP.md** - MongoDB connection guide
- **QUICK_START.md** - General setup guide

---

**Important:** After creating your first admin, you can use the admin dashboard to create additional teachers and admins securely!

**Last Updated:** October 14, 2025

