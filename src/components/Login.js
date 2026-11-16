
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Invalid email or password');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem(
        'auth',
        JSON.stringify({
          ...data.user,
          isLoggedIn: true,
        })
      );

      const role = data.user.role.toLowerCase();

      navigate(role === 'admin' ? '/admin-panel' : '/user-panel');

    } catch (error) {
      console.error('Login error:', error);
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
          <h2>Welcome Back</h2>
          <p>Sign in to continue to your account.</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">

          <div className="auth-form-group">
            <label htmlFor="loginEmail">Email Address</label>
            <input
              id="loginEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="loginPassword">Password</label>
            <input
              id="loginPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn">
            Sign In
          </button>

        </form>

        <p className="auth-switch">
          Don't have an account?{' '}
          <Link to="/register">Create Account</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
