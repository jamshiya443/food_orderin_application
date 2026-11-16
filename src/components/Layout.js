
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './Navbar.css';
import './Footer.css';
import '../styles.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideLayout =
    location.pathname === '/login' ||
    location.pathname === '/register';

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <div className="app-wrapper">
      <Navbar />

      <main className="main-content">
        {children}
      </main>

      <Footer />

      {/* Scroll Buttons */}
      <div className="scroll-buttons">
        <button
          type="button"
          className="scroll-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          ↑
        </button>

        <button
          type="button"
          className="scroll-btn"
          onClick={scrollToBottom}
          aria-label="Scroll to bottom"
          title="Scroll to bottom"
        >
          ↓
        </button>
      </div>
    </div>
  );
};

export default Layout;
