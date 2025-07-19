import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import FoodCategories from './FoodCategories';
import productsData from '../data/products.json';
import '../styles.css';
import { useNavigate } from 'react-router-dom';

const UserPanel = () => {
  const [productList, setProductList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('products'));
    if (stored && stored.length) {
      setProductList(stored);
    } else {
      setProductList(productsData);
      localStorage.setItem('products', JSON.stringify(productsData));
    }
  }, []);

  const handleAddToCart = (product) => {
    const current = cartItems.find(item => item.id === product.id);
    const qty = current ? current.quantity : 0;
    if (qty >= product.stock) {
      alert('Reached max stock limit.');
      return;
    }
    dispatch(addToCart(product));
  };

  const handleLogout = () => {
    
    navigate('/login');
  };

  // Filter the  products by  category :
  const filteredProducts = selectedCategory === 'All'
    ? productList
    : productList.filter(prod =>
        prod.category && prod.category.toLowerCase() === selectedCategory.toLowerCase()
      );

  return (
    <div className="container-wide">
      <h2 style={{ color: 'var(--color-secondary)', textAlign: 'center' }}>
        🍽️ Welcome to the Food Panel
      </h2>
      <h3 style={{ color: 'var(--color-primary)', textAlign: 'center' }}>
        Available Dishes
      </h3>

      <FoodCategories
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="products-grid">
        {filteredProducts.map(prod => (
          <div className="product-card" key={prod.id}>
            <div className="image-wrapper">
              <img
                src={prod.image}
                alt={prod.name}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x180?text=No+Image';
                }}
              />
            </div>
            <h3>{prod.name}</h3>
            <p>${prod.price.toFixed(2)}</p>

            <button className="btn-primary" onClick={() => handleAddToCart(prod)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Logout button */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserPanel;
