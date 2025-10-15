import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Settings, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const handleSettings = () => {
    navigate('/settings');
    setIsMobileMenuOpen(false);
  };

  const handleHome = () => {
    const dashboardPath = user ? `/${user.role}/dashboard` : '/login';
    navigate(dashboardPath);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '1rem 0',
      position: 'relative'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative'
      }}>
        {/* Brand/Logo */}
        <div 
          onClick={handleHome}
          className="navbar-brand"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            cursor: 'pointer',
            flex: 1
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
            fontSize: '1.25rem',
            flexShrink: 0
          }}>
            DU
          </div>
          <div style={{ minWidth: 0 }}>
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
        
        {/* Mobile Menu Toggle */}
        {user && (
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              transition: 'all 0.3s ease'
            }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
        
        {/* Desktop Menu */}
        {user && (
          <div className="desktop-menu" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1.5rem' 
          }}>
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
      
      {/* Mobile Menu */}
      {user && isMobileMenuOpen && (
        <div className="mobile-menu" style={{
          background: 'rgba(30, 64, 175, 0.95)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '1rem',
          marginTop: '1rem',
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          zIndex: 1000,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}>
          <div className="navbar-mobile" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {/* User Info */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              padding: '0.75rem',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '0.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
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
            
            {/* Action Buttons */}
            <div className="navbar-actions" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <button onClick={handleSettings} className="btn btn-white" style={{ 
                width: '100%', 
                justifyContent: 'center',
                background: 'white',
                color: 'var(--primary)',
                border: '2px solid white',
                fontWeight: '600',
                padding: '0.875rem 1rem',
                fontSize: '0.9rem',
                borderRadius: '0.5rem'
              }}>
                <Settings size={18} />
                Settings
              </button>
              <button onClick={handleLogout} className="btn btn-white-outline" style={{ 
                width: '100%', 
                justifyContent: 'center',
                background: '#ef4444',
                color: 'white',
                border: '2px solid #ef4444',
                fontWeight: '600',
                padding: '0.875rem 1rem',
                fontSize: '0.9rem',
                borderRadius: '0.5rem'
              }}>
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

