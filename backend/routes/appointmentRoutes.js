import express from 'express';
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getTeacherAvailability
} from '../controllers/appointmentController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, getAppointments);
router.post('/', authenticateToken, createAppointment);
router.put('/:id', authenticateToken, updateAppointment);
router.delete('/:id', authenticateToken, deleteAppointment);
router.get('/teacher/:teacherId/availability', authenticateToken, getTeacherAvailability);

export default router;

