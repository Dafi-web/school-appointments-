import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
      color: 'white',
      padding: '1.5rem 0',
      marginTop: 'auto',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem'
      }}>
        <span>Designed by</span>
        <span style={{ 
          fontWeight: '600',
          color: 'white'
        }}>
          Dawit Abrha
        </span>
        <span>(</span>
        <span style={{
          background: 'rgba(255, 255, 255, 0.2)',
          padding: '0.125rem 0.5rem',
          borderRadius: '0.25rem',
          fontWeight: '500'
        }}>
          DafiTech
        </span>
        <span>)</span>
        <Heart size={16} fill="white" style={{ marginLeft: '0.25rem' }} />
      </div>
    </footer>
  );
};

export default Footer;

