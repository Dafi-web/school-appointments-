import { Appointment, User, TeacherAvailability } from '../config/database.js';

export const getAppointments = async (req, res) => {
  try {
    let query = {};
    let populate = [];

    if (req.user.role === 'student') {
      query = { student_id: req.user.id };
      populate = [{ path: 'teacher_id', select: 'full_name email' }];
    } else if (req.user.role === 'teacher') {
      query = { teacher_id: req.user.id };
      populate = [{ path: 'student_id', select: 'full_name email' }];
    } else {
      // Admin can see all appointments
      populate = [
        { path: 'student_id', select: 'full_name email' },
        { path: 'teacher_id', select: 'full_name email' }
      ];
    }

    const appointments = await Appointment.find(query)
      .populate(populate)
      .sort({ date: -1, start_time: -1 });

    const formattedAppointments = appointments.map(apt => {
      const result = {
        id: apt._id,
        student_id: apt.student_id._id || apt.student_id,
        teacher_id: apt.teacher_id._id || apt.teacher_id,
        date: apt.date,
        start_time: apt.start_time,
        end_time: apt.end_time,
        subject: apt.subject,
        notes: apt.notes,
        status: apt.status,
        created_at: apt.created_at
      };

      if (apt.student_id.full_name) {
        result.student_name = apt.student_id.full_name;
        result.student_email = apt.student_id.email;
      }
      if (apt.teacher_id.full_name) {
        result.teacher_name = apt.teacher_id.full_name;
        result.teacher_email = apt.teacher_id.email;
      }

      return result;
    });

    res.json(formattedAppointments);
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const { teacher_id, date, start_time, end_time, subject, notes } = req.body;

    // Validate input
    if (!teacher_id || !date || !start_time || !end_time || !subject) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Check if teacher exists
    const teacher = await User.findOne({ _id: teacher_id, role: 'teacher' });
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Check for conflicting appointments
    const conflicts = await Appointment.find({
      teacher_id,
      date,
      status: { $nin: ['cancelled', 'rejected'] },
      $or: [
        { start_time: { $lt: end_time }, end_time: { $gt: start_time } },
        { start_time: { $lt: end_time }, end_time: { $gt: start_time } },
        { start_time: { $gte: start_time }, end_time: { $lte: end_time } }
      ]
    });

    if (conflicts.length > 0) {
      return res.status(400).json({ message: 'This time slot is already booked' });
    }

    // Create appointment
    const student_id = req.user.role === 'student' ? req.user.id : req.body.student_id;

    const appointment = await Appointment.create({
      student_id,
      teacher_id,
      date,
      start_time,
      end_time,
      subject,
      notes: notes || '',
      status: 'pending'
    });

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('teacher_id', 'full_name email')
      .populate('student_id', 'full_name email');

    res.status(201).json({
      message: 'Appointment created successfully',
      appointment: {
        id: populatedAppointment._id,
        student_id: populatedAppointment.student_id._id,
        teacher_id: populatedAppointment.teacher_id._id,
        date: populatedAppointment.date,
        start_time: populatedAppointment.start_time,
        end_time: populatedAppointment.end_time,
        subject: populatedAppointment.subject,
        notes: populatedAppointment.notes,
        status: populatedAppointment.status,
        teacher_name: populatedAppointment.teacher_id.full_name,
        teacher_email: populatedAppointment.teacher_id.email,
        student_name: populatedAppointment.student_id.full_name,
        student_email: populatedAppointment.student_id.email,
        created_at: populatedAppointment.created_at
      }
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, date, start_time, end_time, subject, notes } = req.body;

    // Get appointment
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check permissions
    if (req.user.role === 'student' && appointment.student_id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only update your own appointments' });
    }
    if (req.user.role === 'teacher' && appointment.teacher_id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only update appointments assigned to you' });
    }

    // Update appointment
    const updates = {};

    if (status && ['pending', 'approved', 'rejected', 'cancelled'].includes(status)) {
      updates.status = status;
    }
    if (date) {
      updates.date = date;
    }
    if (start_time) {
      updates.start_time = start_time;
    }
    if (end_time) {
      updates.end_time = end_time;
    }
    if (subject) {
      updates.subject = subject;
    }
    if (notes !== undefined) {
      updates.notes = notes;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No updates provided' });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    )
      .populate('teacher_id', 'full_name email')
      .populate('student_id', 'full_name email');

    res.json({
      message: 'Appointment updated successfully',
      appointment: {
        id: updatedAppointment._id,
        student_id: updatedAppointment.student_id._id,
        teacher_id: updatedAppointment.teacher_id._id,
        date: updatedAppointment.date,
        start_time: updatedAppointment.start_time,
        end_time: updatedAppointment.end_time,
        subject: updatedAppointment.subject,
        notes: updatedAppointment.notes,
        status: updatedAppointment.status,
        teacher_name: updatedAppointment.teacher_id.full_name,
        teacher_email: updatedAppointment.teacher_id.email,
        student_name: updatedAppointment.student_id.full_name,
        student_email: updatedAppointment.student_id.email,
        created_at: updatedAppointment.created_at
      }
    });
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    // Get appointment
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check permissions
    if (req.user.role === 'student' && appointment.student_id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own appointments' });
    }
    if (req.user.role === 'teacher' && appointment.teacher_id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete appointments assigned to you' });
    }

    // Delete appointment
    await Appointment.findByIdAndDelete(id);

    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Delete appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTeacherAvailability = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { date } = req.query;

    // Get teacher availability
    const availability = await TeacherAvailability.find({ teacher_id: teacherId })
      .sort({ day_of_week: 1, start_time: 1 });

    const formattedAvailability = availability.map(avail => ({
      id: avail._id,
      teacher_id: avail.teacher_id,
      day_of_week: avail.day_of_week,
      start_time: avail.start_time,
      end_time: avail.end_time
    }));

    // Get existing appointments for the teacher
    let appointments = [];
    if (date) {
      const aptList = await Appointment.find({
        teacher_id: teacherId,
        date,
        status: { $nin: ['cancelled', 'rejected'] }
      }).sort({ start_time: 1 });

      appointments = aptList.map(apt => ({
        id: apt._id,
        student_id: apt.student_id,
        teacher_id: apt.teacher_id,
        date: apt.date,
        start_time: apt.start_time,
        end_time: apt.end_time,
        subject: apt.subject,
        notes: apt.notes,
        status: apt.status,
        created_at: apt.created_at
      }));
    }

    res.json({
      availability: formattedAvailability,
      appointments
    });
  } catch (error) {
    console.error('Get teacher availability error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

