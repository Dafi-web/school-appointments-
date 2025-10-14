import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, CheckCircle, UserPlus, Users, GraduationCap, Shield } from 'lucide-react';
import api from '../utils/api';
import AppointmentCard from '../components/AppointmentCard';
import CreateUser from '../components/CreateUser';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState('all');
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pending: 0,
    approved: 0,
    totalStudents: 0,
    totalTeachers: 0,
    totalAdmins: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [appointmentsRes, usersRes] = await Promise.all([
        api.get('/appointments'),
        api.get('/users')
      ]);
      
      setAppointments(appointmentsRes.data);
      setAllUsers(usersRes.data);
      
      // Calculate stats
      const totalAppointments = appointmentsRes.data.length;
      const pending = appointmentsRes.data.filter(a => a.status === 'pending').length;
      const approved = appointmentsRes.data.filter(a => a.status === 'approved').length;
      const totalStudents = usersRes.data.filter(u => u.role === 'student').length;
      const totalTeachers = usersRes.data.filter(u => u.role === 'teacher').length;
      const totalAdmins = usersRes.data.filter(u => u.role === 'admin').length;
      
      setStats({ totalAppointments, pending, approved, totalStudents, totalTeachers, totalAdmins });
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setLoading(false);
    }
  };

  const handleUpdateAppointment = async (id, updates) => {
    try {
      await api.put(`/appointments/${id}`, updates);
      fetchData();
    } catch (err) {
      console.error('Error updating appointment:', err);
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await api.delete(`/appointments/${id}`);
        fetchData();
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
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Admin Dashboard
            </h1>
            <p style={{ color: 'var(--gray-600)' }}>
              Manage all appointments and users
            </p>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateUserModal(true)}
          >
            <UserPlus size={20} />
            Create User
          </button>
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
                  {stats.totalAppointments}
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

        {/* User Stats Cards */}
        <div className="grid grid-3" style={{ marginBottom: '2rem' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ 
                background: '#10b981', 
                color: 'white', 
                padding: '0.75rem', 
                borderRadius: '0.5rem' 
              }}>
                <Users size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                  Total Students
                </div>
                <div style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>
                  {stats.totalStudents}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ 
                background: '#8b5cf6', 
                color: 'white', 
                padding: '0.75rem', 
                borderRadius: '0.5rem' 
              }}>
                <GraduationCap size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                  Total Teachers
                </div>
                <div style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>
                  {stats.totalTeachers}
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ 
                background: '#ef4444', 
                color: 'white', 
                padding: '0.75rem', 
                borderRadius: '0.5rem' 
              }}>
                <Shield size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                  Total Admins
                </div>
                <div style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>
                  {stats.totalAdmins}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Users List by Type */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
              Recent Users
            </h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setSelectedUserType('all')}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  border: 'none',
                  background: selectedUserType === 'all' ? 'var(--primary)' : 'var(--gray-100)',
                  color: selectedUserType === 'all' ? 'white' : 'var(--gray-700)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                All ({allUsers.length})
              </button>
              <button
                onClick={() => setSelectedUserType('student')}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  border: 'none',
                  background: selectedUserType === 'student' ? '#10b981' : 'var(--gray-100)',
                  color: selectedUserType === 'student' ? 'white' : 'var(--gray-700)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                Students ({stats.totalStudents})
              </button>
              <button
                onClick={() => setSelectedUserType('teacher')}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  border: 'none',
                  background: selectedUserType === 'teacher' ? '#8b5cf6' : 'var(--gray-100)',
                  color: selectedUserType === 'teacher' ? 'white' : 'var(--gray-700)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                Teachers ({stats.totalTeachers})
              </button>
              <button
                onClick={() => setSelectedUserType('admin')}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  border: 'none',
                  background: selectedUserType === 'admin' ? '#ef4444' : 'var(--gray-100)',
                  color: selectedUserType === 'admin' ? 'white' : 'var(--gray-700)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                Admins ({stats.totalAdmins})
              </button>
            </div>
          </div>
          
          <div className="card" style={{ padding: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: 'var(--gray-50)', borderBottom: '1px solid var(--gray-200)' }}>
                <tr>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600' }}>Name</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600' }}>Email</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600' }}>Role</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600' }}>Joined</th>
                </tr>
              </thead>
              <tbody>
                {allUsers
                  .filter(u => selectedUserType === 'all' || u.role === selectedUserType)
                  .slice(0, 10)
                  .map((u) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid var(--gray-200)' }}>
                    <td style={{ padding: '0.75rem' }}>{u.full_name}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--gray-600)' }}>{u.email}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        backgroundColor: u.role === 'admin' ? '#fee2e2' : 
                                       u.role === 'teacher' ? '#ede9fe' : 
                                       '#dcfce7',
                        color: u.role === 'admin' ? '#ef4444' : 
                               u.role === 'teacher' ? '#8b5cf6' : 
                               '#10b981'
                      }}>
                        {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                      {new Date(u.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {allUsers.filter(u => selectedUserType === 'all' || u.role === selectedUserType).length === 0 && (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--gray-500)' }}>
                No {selectedUserType === 'all' ? 'users' : selectedUserType + 's'} found
              </div>
            )}
          </div>
        </div>

        {/* Appointments List */}
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          All Appointments
        </h2>

        {appointments.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <Calendar size={48} color="var(--gray-300)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              No appointments yet
            </h3>
            <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
              No appointments have been scheduled in the system
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

      {showCreateUserModal && (
        <CreateUser
          onClose={() => setShowCreateUserModal(false)}
          onSuccess={() => {
            setShowCreateUserModal(false);
            fetchData();
          }}
        />
      )}
      <Footer />
    </>
  );
};

export default AdminDashboard;

