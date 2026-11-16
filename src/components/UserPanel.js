
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart } from '../redux/cartSlice';
import FoodCategories from './FoodCategories';
import '../styles.css';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../services/api';

const UserPanel = () => {
  const [productList, setProductList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch products');
        }

        const formattedProducts = data.products.map(product => ({
          ...product,
          id: product._id,
        }));

        setProductList(formattedProducts);
      } catch (error) {
        console.error('Fetch products error:', error);
        setError('Unable to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const current = cartItems.find(item => item.id === product.id);
    const qty = current ? current.quantity : 0;

    if (qty >= product.stock) {
      alert('Reached max stock limit.');
      return;
    }

    if (product.stock <= 0 || !product.isAvailable) {
      alert('This product is currently unavailable.');
      return;
    }

    dispatch(addToCart(product));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('auth');
    localStorage.removeItem('cart');

    dispatch(clearCart());

    navigate('/login');
  };

  const filteredProducts = selectedCategory === 'All'
    ? productList
    : productList.filter(prod =>
        prod.category &&
        prod.category.toLowerCase() === selectedCategory.toLowerCase()
      );

  return (
    <div className="container-wide user-panel">

      <div className="user-hero">
        <div>
          <span className="hero-label">WELCOME TO TASTYCART</span>
          <h1>Good food, good mood! 🍽️</h1>
          <p>Discover your favourites and enjoy every bite.</p>
        </div>
        <span className="hero-emoji">🥗</span>
      </div>

      <div className="menu-heading">
        <div>
          <span className="section-label">OUR MENU</span>
          <h2>Explore Our Dishes</h2>
          <p>Fresh flavours, prepared just for you.</p>
        </div>
      </div>

      <FoodCategories
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {loading ? (
        <p className="product-message">Loading delicious dishes...</p>
      ) : error ? (
        <p className="product-message error-message">{error}</p>
      ) : filteredProducts.length === 0 ? (
        <p className="product-message">
          No products available in this category.
        </p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(prod => (
            <div className="product-card" key={prod.id}>

              <div className="image-wrapper">
                <img
                  src={prod.image}
                  alt={prod.name}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://via.placeholder.com/300x180?text=No+Image';
                  }}
                />

                <span className={`availability-badge ${
                  prod.stock > 0 && prod.isAvailable
                    ? 'available'
                    : 'unavailable'
                }`}>
                  {prod.stock > 0 && prod.isAvailable
                    ? 'Available'
                    : 'Unavailable'}
                </span>
              </div>

              <div className="product-details">
                <h3>{prod.name}</h3>

                <p className="product-category">
                  {prod.category || 'Freshly Prepared'}
                </p>

                <p className="product-description">
                  {prod.description ||
                    'A delicious dish prepared fresh for you.'}
                </p>

                <div className="product-bottom">
                  <div>
                    <span className="product-price">
                      ₹{Number(prod.price).toFixed(2)}
                    </span>

                    <p className="stock-info">
                      {prod.stock > 0
                        ? `${prod.stock} in stock`
                        : 'Out of stock'}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="add-cart-btn"
                    disabled={prod.stock <= 0 || !prod.isAvailable}
                    onClick={() => handleAddToCart(prod)}
                  >
                    + Add
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      <div className="user-logout">
        <button
          type="button"
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

    </div>
  );
};

export default UserPanel;
