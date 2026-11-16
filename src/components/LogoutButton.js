
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    localStorage.removeItem('cart');

    dispatch(clearCart());

    navigate('/login');
  };

  return (
    <div style={styles.wrapper}>
      <button
        type="button"
        onClick={handleLogout}
        style={styles.button}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-secondary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-primary)';
        }}
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
    backgroundColor: 'var(--color-primary)',
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
