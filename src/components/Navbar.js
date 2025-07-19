import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem('auth'));

  const handleBrandClick = () => {
    if (auth?.role === 'admin') {
      navigate('/admin-panel');
    } else {
      navigate('/user-panel');
    }
  };

  return (
    <nav className="navbar">
    <div className="navbar__left" onClick={handleBrandClick}>
  <span className="navbar__brand">TastyCart.</span>
</div>

      <div className="navbar__right">
         <Link to="/user-panel" className="navbar__link">Home</Link>
  <Link to="/contact" className="navbar__link">Contact</Link>
        <input
          type="text"
          placeholder="🔍What do you want to Eat..."
          className="navbar__search"
        />
        {auth?.role === 'user' && (
          <Link to="/cart" className="navbar__link navbar__cart">
            🛒Cart
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
