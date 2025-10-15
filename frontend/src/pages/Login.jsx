import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, Mail, Lock, GraduationCap, BookOpen, Users, Clock } from 'lucide-react';
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
      <div className="animated-bg" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        position: 'relative'
      }}>
        {/* Floating Background Elements */}
        <div className="floating-element">
          <div className="floating-icon">
            <GraduationCap size={20} />
          </div>
        </div>
        <div className="floating-element">
          <div className="floating-icon">
            <BookOpen size={20} />
          </div>
        </div>
        <div className="floating-element">
          <div className="floating-icon">
            <Users size={20} />
          </div>
        </div>
        <div className="floating-element">
          <div className="floating-icon">
            <Clock size={20} />
          </div>
        </div>
        
        {/* Main Login Card */}
        <div className="glass-card" style={{ 
          maxWidth: '450px', 
          width: '100%',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '1rem',
          padding: '2rem',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            {/* Animated Logo */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginBottom: '1.5rem',
              animation: 'float 3s ease-in-out infinite'
            }}>
              <div style={{
                width: '90px',
                height: '90px',
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                color: 'white',
                fontSize: '2.5rem',
                boxShadow: '0 10px 30px rgba(30, 64, 175, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                  animation: 'shimmer 2s infinite'
                }}></div>
                DU
              </div>
            </div>
            
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: 'bold', 
              marginBottom: '0.5rem', 
              color: 'var(--primary)',
              background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Welcome Back
            </h2>
            <p style={{ color: 'var(--gray-600)', fontSize: '0.9rem', fontWeight: '500' }}>
              School of Electrical & Computer Engineering
            </p>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
              Dilla University, Ethiopia
            </p>
            
            {/* Enhanced Welcome Message */}
            <div style={{ 
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', 
              padding: '1.25rem', 
              borderRadius: '0.75rem',
              border: '1px solid #bfdbfe',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #1e40af, #3b82f6, #60a5fa)',
                animation: 'gradientShift 3s ease infinite'
              }}></div>
              <p style={{ 
                color: 'var(--primary)', 
                fontSize: '0.9rem', 
                fontWeight: '600',
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
            <div className="alert alert-error" style={{
              animation: 'shake 0.5s ease-in-out'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '600',
                color: 'var(--gray-700)'
              }}>
                <Mail size={18} />
                Email Address
              </label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@school.com"
                required
                style={{
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '600',
                color: 'var(--gray-700)'
              }}>
                <Lock size={18} />
                Password
              </label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={{
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ 
                width: '100%',
                padding: '0.875rem',
                fontSize: '1rem',
                fontWeight: '600',
                borderRadius: '0.75rem',
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                border: 'none',
                boxShadow: '0 4px 15px rgba(30, 64, 175, 0.3)',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              disabled={loading}
            >
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--gray-600)' }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ 
                color: 'var(--primary)', 
                textDecoration: 'none', 
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}>
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .form-input:focus {
          border-color: var(--primary) !important;
          box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1) !important;
          transform: translateY(-1px);
        }
        
        .btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(30, 64, 175, 0.4) !important;
        }
      `}</style>
      
      <Footer />
    </>
  );
};

export default Login;

