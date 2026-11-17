
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem('auth'));

  const isAdmin = auth?.role === 'admin';
  const isUser = auth?.role === 'user';

  const handleBrandClick = () => {
    navigate(isAdmin ? '/admin-panel' : '/user-panel');
  };

  return (
    <nav className="navbar">
      <div
        className="navbar__left"
        onClick={handleBrandClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleBrandClick();
          }
        }}
      >
        <span className="navbar__brand">
          TastyCart<span>.</span>
        </span>
      </div>

      <div className="navbar__right">

        <Link
          to={isAdmin ? '/admin-panel' : '/user-panel'}
          className="navbar__link"
        >
          Home
        </Link>

        {isAdmin && (
          <a
  href="#orders-management"
  className="navbar__link"
  onClick={(e) => {
    e.preventDefault();

    const ordersSection = document.getElementById('orders-management');

    if (ordersSection) {
      ordersSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }}
>
  Orders
</a>
        )}

        {isUser && (
          <Link to="/my-orders" className="navbar__link">
            My Orders
          </Link>
        )}

        <Link to="/contact" className="navbar__link">
          Contact
        </Link>

        {isUser && (
          <Link to="/cart" className="navbar__cart">
            Cart
          </Link>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
