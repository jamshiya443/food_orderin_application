import React, { useState } from 'react';

const LogoutButton = () => {
  const [hover, setHover] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('cart');
    window.location.href = '/login';
  };

  return (
    <div style={styles.wrapper}>
      <button
        onClick={handleLogout}
        style={{
          ...styles.button,
          backgroundColor: hover ? 'var(--color-secondary)' : 'var(--color-primary)',
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Logout
      </button>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem',
  },
  button: {
    color: '#fff',
    border: 'none',
    padding: '10px 25px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
};

export default LogoutButton;
