import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, Mail, Lock } from 'lucide-react';
import Footer from '../components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userData = await login(email, password);
      // Redirect to role-specific dashboard
      const dashboardPath = `/${userData.role}/dashboard`;
      navigate(dashboardPath);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
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
            Welcome Back
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
              📅 Appointment Scheduling System
            </p>
            <p style={{ 
              color: 'var(--gray-700)', 
              fontSize: '0.8rem',
              lineHeight: '1.5',
              marginBottom: 0
            }}>
              Meet your teachers and department heads easily. 
              <strong style={{ color: 'var(--primary)' }}> Schedule appointments at your convenience!</strong>
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
              <Mail size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Email
            </label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' }}>
              Register here
            </Link>
          </p>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;

