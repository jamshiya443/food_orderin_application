
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const auth = JSON.parse(localStorage.getItem('auth'));
  const isAdmin = auth?.role === 'admin';
  const isUser = auth?.role === 'user';

  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-brand">
          <Link
  to={isAdmin ? '/admin-panel' : '/user-panel'}
  className="footer-brand-link"
>
  TastyCart<span>.</span>
</Link>
          <p>Fresh flavours, delivered with love.</p>
        </div>

        <div className="footer-links">
          <Link to={isAdmin ? '/admin-panel' : '/user-panel'}>
            Home
          </Link>

          <Link to="/contact">
            Contact
          </Link>

          {isUser && (
            <Link to="/my-orders">
              My Orders
            </Link>
          )}
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} TastyCart. All rights reserved.
          </p>
          <p>Made for food lovers.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
