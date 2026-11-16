
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from '../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Registration failed');
        return;
      }

      alert('Registration successful! Please login.');
      navigate('/login');

    } catch (error) {
      console.error('Registration error:', error);
      alert('Unable to connect to the server. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="auth-heading">
          <h1>TastyCart<span>.</span></h1>
          <p>Fresh flavours, delivered with love.</p>
        </div>

        <div className="auth-form-heading">
          <h2>Create Your Account</h2>
          <p>Join us and start ordering your favourites.</p>
        </div>

        <form onSubmit={handleRegister} className="auth-form">

          <div className="auth-form-group">
            <label htmlFor="registerName">Full Name</label>
            <input
              id="registerName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              autoComplete="name"
              required
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="registerEmail">Email Address</label>
            <input
              id="registerEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="registerPassword">Password</label>
            <input
              id="registerPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              autoComplete="new-password"
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn">
            Create Account
          </button>

        </form>

        <p className="auth-switch">
          Already have an account?{' '}
          <Link to="/login">Sign In</Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
