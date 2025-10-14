import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, CheckCircle, XCircle, Users } from 'lucide-react';
import api from '../utils/api';
import AppointmentCard from '../components/AppointmentCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
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
      const rejected = response.data.filter(a => a.status === 'rejected').length;
      setStats({ total, pending, approved, rejected });
      
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
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Student Appointments
          </h1>
          <p style={{ color: 'var(--gray-600)' }}>
            Review and manage appointment requests from students
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-4" style={{ marginBottom: '2rem' }}>
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
                  Total
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

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ 
                background: 'var(--error)', 
                color: 'white', 
                padding: '0.75rem', 
                borderRadius: '0.5rem' 
              }}>
                <XCircle size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                  Rejected
                </div>
                <div style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>
                  {stats.rejected}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Appointments Section */}
        {stats.pending > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Pending Requests ({stats.pending})
            </h2>
            <div className="grid grid-2">
              {appointments
                .filter(apt => apt.status === 'pending')
                .map(appointment => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onUpdate={handleUpdateAppointment}
                    onDelete={handleDeleteAppointment}
                    userRole={user.role}
                  />
                ))}
            </div>
          </div>
        )}

        {/* All Appointments */}
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          All Appointments
        </h2>

        {appointments.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <Users size={48} color="var(--gray-300)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              No appointments yet
            </h3>
            <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
              Students haven't booked any appointments with you yet
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
      <Footer />
    </>
  );
};

export default TeacherDashboard;

