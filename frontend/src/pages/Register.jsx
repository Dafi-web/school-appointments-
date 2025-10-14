import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, Mail, Lock, User } from 'lucide-react';
import Footer from '../components/Footer';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userData = await register(formData);
      // Redirect to role-specific dashboard (always student for public registration)
      const dashboardPath = `/${userData.role}/dashboard`;
      navigate(dashboardPath);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}>
      <div className="card" style={{ maxWidth: '450px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {/* Logo */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              color: 'white',
              fontSize: '2rem'
            }}>
              DU
            </div>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--primary)' }}>
            Create Student Account
          </h2>
          <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
            School of Electrical & Computer Engineering
          </p>
          <p style={{ color: 'var(--gray-500)', fontSize: '0.75rem', marginBottom: '1rem' }}>
            Dilla University, Ethiopia
          </p>
          
          {/* Welcome Message */}
          <div style={{ 
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            border: '1px solid #bfdbfe'
          }}>
            <p style={{ 
              color: 'var(--primary)', 
              fontSize: '0.875rem', 
              fontWeight: '500',
              marginBottom: '0.5rem',
              lineHeight: '1.6'
            }}>
              📅 Want to make an appointment?
            </p>
            <p style={{ 
              color: 'var(--gray-700)', 
              fontSize: '0.8rem',
              lineHeight: '1.5',
              marginBottom: 0
            }}>
              Want to meet your teacher? Department head? 
              <strong style={{ color: 'var(--primary)' }}> Feel free and make an appointment!</strong>
            </p>
          </div>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              <User size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              className="form-input"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Mail size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@school.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Lock size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' }}>
              Sign in here
            </Link>
          </p>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;

