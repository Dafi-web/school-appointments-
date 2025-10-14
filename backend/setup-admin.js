import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import readline from 'readline';
import dotenv from 'dotenv';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// User schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['student', 'teacher', 'admin']
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

async function createAdmin() {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || "mongodb+srv://wediabrhana:yesno1212@cluster4.9cf8d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster4";
    
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB\n');

    const User = mongoose.model('User', userSchema);

    // Check for existing admins
    const adminCount = await User.countDocuments({ role: 'admin' });
    
    if (adminCount > 0) {
      console.log('⚠️  Admin account(s) already exist in the database.');
      rl.question('Do you want to create another admin? (yes/no): ', async (answer) => {
        if (answer.toLowerCase() !== 'yes' && answer.toLowerCase() !== 'y') {
          console.log('Setup cancelled.');
          rl.close();
          process.exit(0);
        }
        await promptForAdminDetails(User);
      });
    } else {
      console.log('📝 No admin accounts found. Let\'s create one!\n');
      await promptForAdminDetails(User);
    }

  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    rl.close();
    process.exit(1);
  }
}

async function promptForAdminDetails(User) {
  rl.question('Enter admin email: ', async (email) => {
    
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ Error: Email already exists!');
      rl.close();
      process.exit(1);
    }

    rl.question('Enter admin password (min 6 characters): ', async (password) => {
      
      if (password.length < 6) {
        console.log('❌ Error: Password must be at least 6 characters!');
        rl.close();
        process.exit(1);
      }

      rl.question('Enter admin full name: ', async (fullName) => {
        
        try {
          // Hash password
          const hashedPassword = await bcrypt.hash(password, 10);
          
          // Create admin
          const admin = await User.create({
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            full_name: fullName.trim(),
            role: 'admin'
          });
          
          console.log('\n✅ Admin account created successfully!');
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log('📧 Email:', admin.email);
          console.log('👤 Name:', admin.full_name);
          console.log('🔑 Role:', admin.role);
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
          console.log('\n🚀 You can now login with these credentials!');
          console.log('   URL: http://localhost:5173/login\n');
          
        } catch (error) {
          console.error('❌ Error creating admin:', error.message);
        } finally {
          rl.close();
          process.exit(0);
        }
      });
    });
  });
}

// Run the setup
createAdmin();

