import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// MongoDB Connection
export async function connectDatabase() {
  try {
    const mongoURI = process.env.MONGODB_URI || "mongodb+srv://wediabrhana:yesno1212@cluster4.9cf8d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster4";
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");
    await seedDatabase();
  } catch (err) {
    console.error("❌ Error connecting to MongoDB", err);
    console.error("Make sure your MongoDB credentials are correct and your IP is whitelisted");
    process.exit(1);
  }
}

// User Schema
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

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teacher_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String,
    required: true
  },
  start_time: {
    type: String,
    required: true
  },
  end_time: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'approved', 'rejected', 'cancelled'],
    default: 'pending'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Teacher Availability Schema
const teacherAvailabilitySchema = new mongoose.Schema({
  teacher_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  day_of_week: {
    type: Number,
    required: true,
    min: 0,
    max: 6
  },
  start_time: {
    type: String,
    required: true
  },
  end_time: {
    type: String,
    required: true
  }
});

// Create Models
export const User = mongoose.model('User', userSchema);
export const Appointment = mongoose.model('Appointment', appointmentSchema);
export const TeacherAvailability = mongoose.model('TeacherAvailability', teacherAvailabilitySchema);

// Seed database with default users (DISABLED - No demo accounts)
async function seedDatabase() {
  // Demo accounts seeding is disabled
  // Users must be created manually or via registration
  console.log('ℹ️  Database seeding skipped - No demo accounts created');
  console.log('ℹ️  Create your first admin account manually in MongoDB or use registration');
}

export default mongoose;

