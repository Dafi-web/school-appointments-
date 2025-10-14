const Logo = ({ size = 'medium', showText = true }) => {
  const sizes = {
    small: { box: '40px', font: '1rem', text: '0.75rem' },
    medium: { box: '50px', font: '1.25rem', text: '0.875rem' },
    large: { box: '80px', font: '2rem', text: '1rem' }
  };

  const currentSize = sizes[size];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: showText ? '1rem' : '0' }}>
      {/* Logo - Replace the DU text with your actual logo image */}
      <div style={{
        width: currentSize.box,
        height: currentSize.box,
        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        borderRadius: size === 'large' ? '12px' : '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        color: 'white',
        fontSize: currentSize.font,
        overflow: 'hidden'
      }}>
        {/* 
          To use your actual logo:
          1. Add your logo image to: frontend/public/logo.png
          2. Uncomment the img tag below
          3. Comment out or remove the "DU" text
        */}
        {/* <img 
          src="/logo.png" 
          alt="Dilla University Logo" 
          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }}
        /> */}
        DU
      </div>
      
      {showText && (
        <div>
          <div style={{ 
            fontSize: currentSize.text, 
            fontWeight: 'bold', 
            color: 'inherit',
            lineHeight: 1.2
          }}>
            School of Electrical & Computer Engineering
          </div>
          {size !== 'small' && (
            <div style={{
              fontSize: size === 'large' ? '0.875rem' : '0.75rem',
              color: 'inherit',
              opacity: 0.9
            }}>
              Dilla University, Ethiopia
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;

