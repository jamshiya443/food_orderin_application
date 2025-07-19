import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 <strong>My E-Commerce App</strong>. All rights reserved.</p>

        <div className="footer-links">
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>

        <div className="social-icons">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
              <path d="M12 0.297C5.37 0.297 0 5.667 0 12.297c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.256c-3.338.726-4.033-1.416-4.033-1.416-.547-1.387-1.335-1.756-1.335-1.756-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.419-1.305.762-1.605-2.665-.304-5.467-1.332-5.467-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.51 11.51 0 013.003-.404c1.02.004 2.047.138 3.003.404 2.289-1.552 3.295-1.23 3.295-1.23.655 1.653.243 2.873.12 3.176.77.84 1.233 1.911 1.233 3.221 0 4.61-2.807 5.624-5.48 5.921.43.37.823 1.102.823 2.222v3.293c0 .319.192.694.8.576C20.565 22.092 24 17.594 24 12.297 24 5.667 18.627 0.297 12 0.297z" />
            </svg>
          </a>

          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
              <path d="M4.98 3.5C4.98 5 3.88 6 2.5 6 1.12 6 0 5 0 3.5 0 2 1.12 1 2.5 1 3.88 1 4.98 2 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-.8 1.8-2.2 4-2.2 4.2 0 5 2.8 5 6.5V24h-4v-7.5c0-1.8-.1-4-2.5-4-2.5 0-2.9 2-2.9 4V24h-4V8z" />
            </svg>
          </a>

          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg viewBox="0 0 24 24" fill="currentColor" className="icon">
              <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.93 4.93 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.944 13.944 0 011.671 3.149a4.917 4.917 0 001.523 6.574 4.897 4.897 0 01-2.229-.616c-.053 2.281 1.581 4.415 3.949 4.89a4.902 4.902 0 01-2.224.084 4.918 4.918 0 004.6 3.417A9.867 9.867 0 010 19.54a13.94 13.94 0 007.548 2.209c9.142 0 14.307-7.721 13.995-14.646A9.935 9.935 0 0024 4.557z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
