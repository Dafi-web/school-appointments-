# 🎓 School Appointments Web App

A full-stack web application for managing appointments at the School of Electrical & Computer Engineering, Dilla University, Ethiopia.

## ✨ Features

- 🔐 **Secure Authentication** (Students, Teachers, Admin)
- 📅 **Appointment Scheduling** with teachers and department heads
- 👥 **Role-based Access Control** - Different dashboards for each role
- 📊 **Analytics Dashboard** - Track appointments and users
- ⏰ **Real-time availability checking**
- 🎨 **Modern, responsive UI** with Dilla University branding
- ⚙️ **User Settings** - Change password and email
- 🔒 **Secure Registration** - Only students can self-register

## 🛠 Tech Stack

### Backend
- Node.js + Express
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt for password hashing

### Frontend
- React 18
- Vite
- React Router
- Axios for API calls
- Lucide React Icons
- Modern CSS with custom theme

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install all dependencies:
```bash
npm run install-all
```

2. Set up environment variables:

**Backend** - Create `.env` in backend directory (or copy from `env.template`):
```env
PORT=5000
JWT_SECRET=your-secret-key-here
NODE_ENV=development
MONGODB_URI=your-mongodb-connection-string
FRONTEND_URL=http://localhost:5173
```

**Frontend** - Create `.env` in frontend directory (or copy from `env.template`):
```env
VITE_API_URL=http://localhost:5000/api
```

3. Run the application:
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend dev server on http://localhost:5173

## First Admin Setup

**⚠️ Demo accounts are disabled for security.**

To create your first admin account, see **`FIRST_ADMIN_SETUP.md`** for detailed instructions.

**Quick Method:**
1. Register as student at `/register`
2. Change role to `"admin"` in MongoDB
3. Login as admin
4. Create teachers via admin dashboard

## Project Structure

```
school-appointments/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   └── App.jsx
│   └── index.html
└── package.json
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user

### Users
- GET /api/users/profile - Get current user profile
- GET /api/users/teachers - Get all teachers (for booking)

### Appointments
- GET /api/appointments - Get user appointments
- POST /api/appointments - Create new appointment
- PUT /api/appointments/:id - Update appointment
- DELETE /api/appointments/:id - Cancel appointment
- GET /api/appointments/teacher/:id/availability - Check teacher availability

## 🚀 Deployment

Deploy your app online for FREE!

### Quick Deploy (3 Steps):
1. **Backend** → Deploy to [Render](https://render.com)
2. **Frontend** → Deploy to [Vercel](https://vercel.com)
3. **Database** → MongoDB Atlas (already set up)

### Deployment Guides:
- 📖 **[QUICK_DEPLOY.md](QUICK_DEPLOY.md)** - Simple 3-step guide
- 📋 **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Complete checklist
- 📚 **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Detailed guide

### What You'll Need:
- GitHub account (free)
- Render account (free)
- Vercel account (free)
- MongoDB Atlas (already set up)

**Total Deployment Time:** ~15 minutes ⏱️

---

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Getting started guide
- **[FIRST_ADMIN_SETUP.md](FIRST_ADMIN_SETUP.md)** - Create first admin
- **[SECURITY_GUIDE.md](SECURITY_GUIDE.md)** - Security implementation
- **[ROLE_BASED_DASHBOARDS.md](ROLE_BASED_DASHBOARDS.md)** - Dashboard system
- **[MONGODB_SETUP.md](MONGODB_SETUP.md)** - MongoDB configuration
- **[SETTINGS_GUIDE.md](SETTINGS_GUIDE.md)** - User settings feature

---

## 👨‍💻 Developer

**Designed by Dawit Abrha (DafiTech)**

---

## 📄 License

MIT

