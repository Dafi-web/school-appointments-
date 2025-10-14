import express from 'express';
import { register, login, createUser } from '../controllers/authController.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);  // Only creates students
router.post('/login', login);

// Admin-only route to create teachers and admins
router.post('/create-user', authenticateToken, authorizeRoles('admin'), createUser);

export default router;

