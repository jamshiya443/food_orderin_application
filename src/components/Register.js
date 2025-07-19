import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Social media icons 
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path fill="#EA4335" d="M12 10.8v3.6h5.1c-.3 1.5-1.8 4.2-5.1 4.2-3.1 0-5.7-2.6-5.7-5.8s2.6-5.8 5.7-5.8c1.8 0 3 .8 3.7 1.5l2.5-2.5C16.7 4.3 14.6 3.5 12 3.5 6.9 3.5 3 7.4 3 12s3.9 8.5 9 8.5c5.2 0 8.6-3.6 8.6-8.6 0-.6-.1-1.1-.2-1.6H12z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.408.593 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.797.143v3.24h-1.918c-1.505 0-1.796.715-1.796 1.763v2.31h3.59l-.467 3.622h-3.123V24h6.116C23.407 24 24 23.408 24 22.674V1.326C24 .593 23.407 0 22.675 0z"/>
  </svg>
);

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const emailExists = users.some(user => user.email === email);

    if (emailExists) {
      alert('Email already registered');
      return;
    }

    const newUser = { name, email, password, role };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! Please login.');
    navigate('/login');
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>TastyCart</h1>
      <p style={{ textAlign: 'center', color: 'var(--color-primary)', fontWeight: 600 }}>
        Create your account to start ordering delicious food
      </p>

      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Sign Up</h2>

      <form onSubmit={handleRegister}>
        <label>Name</label>
        <input 
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <label>Email</label>
        <input 
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input 
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <label>Role</label>
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="btn-primary" style={{ marginTop: '1.5rem', width: '100%' }}>
          Register
        </button>
      </form>

      {/* Optional social login icons */}
      <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.95rem', color: '#888' }}>
        — or sign up with —
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          <div style={{ cursor: 'pointer' }} onClick={() => alert('Google signup coming soon')}>
            <GoogleIcon />
          </div>
          <div style={{ cursor: 'pointer' }} onClick={() => alert('Facebook signup coming soon')}>
            <FacebookIcon />
          </div>
        </div>
      </div>

      <p style={{ marginTop: '2rem', textAlign: 'center' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'none' }}>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
