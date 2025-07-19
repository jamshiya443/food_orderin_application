import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './Navbar.css';
import './Footer.css';
import '../styles.css'; 

const Layout = ({ children }) => {
  const location = useLocation();
  const hideLayout = location.pathname === '/login' || location.pathname === '/register';

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
