import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Save } from 'lucide-react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Settings = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Profile form state
  const [profileData, setProfileData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || ''
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await api.put('/users/profile', profileData);
      
      // Update local storage with new user data
      const updatedUser = { ...user, ...response.data.user };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setMessage({ type: 'success', text: response.data.message });
      
      // If email changed, logout user to re-login
      if (profileData.email !== user.email) {
        setTimeout(() => {
          logout();
        }, 2000);
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Validate passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      setLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'New password must be at least 6 characters' });
      setLoading(false);
      return;
    }

    try {
      const response = await api.put('/users/password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      setMessage({ type: 'success', text: response.data.message });
      
      // Clear password form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      // Logout user after password change
      setTimeout(() => {
        logout();
      }, 2000);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update password' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Account Settings
          </h1>
          <p style={{ color: 'var(--gray-600)' }}>
            Manage your profile and account security
          </p>
        </div>

        {message.text && (
          <div className={`alert alert-${message.type}`} style={{ marginBottom: '1.5rem' }}>
            {message.text}
          </div>
        )}

        <div className="grid grid-2">
          {/* Profile Settings */}
          <div className="card">
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <User size={20} color="var(--primary)" />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>
                  Profile Information
                </h2>
              </div>
              <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                Update your name and email address
              </p>
            </div>

            <form onSubmit={handleProfileSubmit}>
              <div className="form-group">
                <label className="form-label">
                  <User size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  className="form-input"
                  value={profileData.full_name}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Mail size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  required
                />
                <p style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                  You'll be logged out if you change your email
                </p>
              </div>

              <div className="form-group">
                <label className="form-label">Role</label>
                <input
                  type="text"
                  className="form-input"
                  value={user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                  disabled
                  style={{ backgroundColor: 'var(--gray-100)', cursor: 'not-allowed' }}
                />
                <p style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                  Role cannot be changed
                </p>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: '100%' }}
              >
                <Save size={20} />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Password Settings */}
          <div className="card">
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Lock size={20} color="var(--primary)" />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>
                  Change Password
                </h2>
              </div>
              <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
                Update your password to keep your account secure
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label className="form-label">
                  <Lock size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  className="form-input"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Enter current password"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Lock size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  className="form-input"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Enter new password"
                />
                <p style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                  Must be at least 6 characters
                </p>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Lock size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-input"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Confirm new password"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: '100%' }}
              >
                <Lock size={20} />
                {loading ? 'Updating...' : 'Update Password'}
              </button>

              <p style={{ fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.75rem', textAlign: 'center' }}>
                You'll be logged out after changing your password
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Settings;

