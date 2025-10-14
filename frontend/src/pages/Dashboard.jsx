import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus, Calendar, Clock, CheckCircle, UserPlus } from 'lucide-react';
import api from '../utils/api';
import AppointmentCard from '../components/AppointmentCard';
import BookAppointment from '../components/BookAppointment';
import CreateUser from '../components/CreateUser';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments');
      setAppointments(response.data);
      
      // Calculate stats
      const total = response.data.length;
      const pending = response.data.filter(a => a.status === 'pending').length;
      const approved = response.data.filter(a => a.status === 'approved').length;
      setStats({ total, pending, approved });
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setLoading(false);
    }
  };

  const handleUpdateAppointment = async (id, updates) => {
    try {
      await api.put(`/appointments/${id}`, updates);
      fetchAppointments();
    } catch (err) {
      console.error('Error updating appointment:', err);
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await api.delete(`/appointments/${id}`);
        fetchAppointments();
      } catch (err) {
        console.error('Error deleting appointment:', err);
      }
    }
  };

  const getDashboardTitle = () => {
    switch (user.role) {
      case 'student':
        return 'My Appointments';
      case 'teacher':
        return 'Student Appointments';
      case 'admin':
        return 'All Appointments';
      default:
        return 'Dashboard';
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="spinner" />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>
            {getDashboardTitle()}
          </h1>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {user.role === 'student' && (
              <button 
                className="btn btn-primary"
                onClick={() => setShowBookingModal(true)}
              >
                <Plus size={20} />
                Book Appointment
              </button>
            )}
            {user.role === 'admin' && (
              <button 
                className="btn btn-primary"
                onClick={() => setShowCreateUserModal(true)}
              >
                <UserPlus size={20} />
                Create User
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-3" style={{ marginBottom: '2rem' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ 
                background: 'var(--primary)', 
                color: 'white', 
                padding: '0.75rem', 
                borderRadius: '0.5rem' 
              }}>
                <Calendar size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                  Total Appointments
                </div>
                <div style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>
                  {stats.total}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ 
                background: 'var(--warning)', 
                color: 'white', 
                padding: '0.75rem', 
                borderRadius: '0.5rem' 
              }}>
                <Clock size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                  Pending
                </div>
                <div style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>
                  {stats.pending}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ 
                background: 'var(--secondary)', 
                color: 'white', 
                padding: '0.75rem', 
                borderRadius: '0.5rem' 
              }}>
                <CheckCircle size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                  Approved
                </div>
                <div style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>
                  {stats.approved}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        {appointments.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <Calendar size={48} color="var(--gray-300)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              No appointments yet
            </h3>
            <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
              {user.role === 'student' 
                ? 'Book your first appointment with a teacher' 
                : 'No appointments scheduled'}
            </p>
          </div>
        ) : (
          <div className="grid grid-2">
            {appointments.map(appointment => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onUpdate={handleUpdateAppointment}
                onDelete={handleDeleteAppointment}
                userRole={user.role}
              />
            ))}
          </div>
        )}
      </div>

      {showBookingModal && (
        <BookAppointment
          onClose={() => setShowBookingModal(false)}
          onSuccess={fetchAppointments}
        />
      )}

      {showCreateUserModal && (
        <CreateUser
          onClose={() => setShowCreateUserModal(false)}
          onSuccess={() => {
            setShowCreateUserModal(false);
          }}
        />
      )}
    </>
  );
};

export default Dashboard;

