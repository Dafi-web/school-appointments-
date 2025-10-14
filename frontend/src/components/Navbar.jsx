import { useAuth } from '../context/AuthContext';
import { LogOut, User, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  const handleHome = () => {
    const dashboardPath = user ? `/${user.role}/dashboard` : '/login';
    navigate(dashboardPath);
  };

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '1rem 0'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div 
          onClick={handleHome}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            cursor: 'pointer'
          }}
        >
          {/* Logo placeholder - users can add their logo here */}
          <div style={{
            width: '50px',
            height: '50px',
            background: 'white',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#1e40af',
            fontSize: '1.25rem'
          }}>
            DU
          </div>
          <div>
            <h1 style={{ 
              fontSize: '1.1rem', 
              fontWeight: 'bold', 
              color: 'white',
              margin: 0,
              lineHeight: 1.2
            }}>
              School of Electrical & Computer Engineering
            </h1>
            <p style={{
              fontSize: '0.875rem',
              color: 'rgba(255, 255, 255, 0.9)',
              margin: 0
            }}>
              Dilla University, Ethiopia
            </p>
          </div>
        </div>
        
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={20} color="white" />
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: '500', color: 'white' }}>
                  {user.full_name}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </div>
              </div>
            </div>
            <button onClick={handleSettings} className="btn btn-white">
              <Settings size={16} />
              Settings
            </button>
            <button onClick={handleLogout} className="btn btn-white-outline">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

