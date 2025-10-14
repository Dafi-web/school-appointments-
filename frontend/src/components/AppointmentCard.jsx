import { Calendar, Clock, User, FileText, CheckCircle, XCircle, Ban } from 'lucide-react';
import { format } from 'date-fns';

const AppointmentCard = ({ appointment, onUpdate, onDelete, userRole }) => {
  const statusConfig = {
    pending: { badge: 'badge-pending', icon: Clock },
    approved: { badge: 'badge-approved', icon: CheckCircle },
    rejected: { badge: 'badge-rejected', icon: XCircle },
    cancelled: { badge: 'badge-cancelled', icon: Ban }
  };

  const config = statusConfig[appointment.status];
  const StatusIcon = config.icon;

  const handleStatusChange = (newStatus) => {
    onUpdate(appointment.id, { status: newStatus });
  };

  return (
    <div className="card" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            {appointment.subject}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--gray-600)' }}>
              <Calendar size={16} />
              {format(new Date(appointment.date), 'MMMM d, yyyy')}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--gray-600)' }}>
              <Clock size={16} />
              {appointment.start_time} - {appointment.end_time}
            </div>
            {userRole === 'student' && appointment.teacher_name && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                <User size={16} />
                Teacher: {appointment.teacher_name}
              </div>
            )}
            {userRole === 'teacher' && appointment.student_name && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                <User size={16} />
                Student: {appointment.student_name}
              </div>
            )}
            {userRole === 'admin' && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                  <User size={16} />
                  Teacher: {appointment.teacher_name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                  <User size={16} />
                  Student: {appointment.student_name}
                </div>
              </>
            )}
            {appointment.notes && (
              <div style={{ display: 'flex', alignItems: 'start', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--gray-600)', marginTop: '0.5rem' }}>
                <FileText size={16} style={{ marginTop: '0.125rem' }} />
                <span>{appointment.notes}</span>
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <StatusIcon size={20} />
          <span className={`badge ${config.badge}`}>
            {appointment.status}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--gray-200)' }}>
        {userRole === 'teacher' && appointment.status === 'pending' && (
          <>
            <button 
              className="btn btn-success" 
              style={{ fontSize: '0.75rem' }}
              onClick={() => handleStatusChange('approved')}
            >
              Approve
            </button>
            <button 
              className="btn btn-danger" 
              style={{ fontSize: '0.75rem' }}
              onClick={() => handleStatusChange('rejected')}
            >
              Reject
            </button>
          </>
        )}
        {userRole === 'student' && ['pending', 'approved'].includes(appointment.status) && (
          <button 
            className="btn btn-secondary" 
            style={{ fontSize: '0.75rem' }}
            onClick={() => handleStatusChange('cancelled')}
          >
            Cancel Appointment
          </button>
        )}
        {userRole === 'admin' && (
          <button 
            className="btn btn-danger" 
            style={{ fontSize: '0.75rem' }}
            onClick={() => onDelete(appointment.id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;

