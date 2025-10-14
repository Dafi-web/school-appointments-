import express from 'express';
import { getProfile, updateProfile, updatePassword, getTeachers, getUsers } from '../controllers/userController.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.put('/password', authenticateToken, updatePassword);
router.get('/teachers', authenticateToken, getTeachers);
router.get('/', authenticateToken, authorizeRoles('admin'), getUsers);

export default router;

