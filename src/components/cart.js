
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, clearCart } from '../redux/cartSlice';
import API_BASE_URL from '../services/api';
import '../styles.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (isCheckingOut) return;

    if (cartItems.length === 0) {
      setCheckoutError('Your cart is empty.');
      return;
    }

    try {
      setIsCheckingOut(true);
      setCheckoutError('');

      const token = localStorage.getItem('token');

      if (!token) {
        localStorage.removeItem('auth');
        dispatch(clearCart());
        navigate('/login', { replace: true });
        return;
      }

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            productId: item.id,
            quantity: item.quantity
          }))
        })
      });

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('auth');
        localStorage.removeItem('cart');

        dispatch(clearCart());
        navigate('/login', { replace: true });
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to place order');
      }

      dispatch(clearCart());
      setOrderConfirmed(true);

      setTimeout(() => {
        setOrderConfirmed(false);
      }, 3000);

    } catch (error) {
      console.error('Checkout error:', error);
      setCheckoutError(error.message || 'Unable to place your order. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="container cart-page">

      <div className="cart-header">
        <div>
          <span className="section-label">YOUR SELECTION</span>
          <h2>My Cart 🛒</h2>
          <p>Review your delicious choices before checkout.</p>
        </div>

        <span className="cart-header-icon">🛍️</span>
      </div>

      {checkoutError && (
        <p className="cart-error">{checkoutError}</p>
      )}

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <span>🍽️</span>
          <h3>Your cart is empty!</h3>
          <p>
            Add some delicious meals to your cart and come back here.
          </p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>

                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>
                    ₹{Number(item.price).toFixed(2)} × {item.quantity}
                  </p>
                </div>

                <div className="cart-item-actions">
                  <strong className="cart-item-total">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </strong>

                  <button
                    type="button"
                    className="cart-remove-btn"
                    disabled={isCheckingOut}
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>

              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-total">
              <span>Total Amount</span>
              <strong>₹{totalAmount.toFixed(2)}</strong>
            </div>

            <div className="cart-actions">
              <button
                type="button"
                className="cart-clear-btn"
                disabled={isCheckingOut}
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>

              <button
                type="button"
                className="cart-checkout-btn"
                onClick={handleCheckout}
                disabled={isCheckingOut || cartItems.length === 0}
              >
                {isCheckingOut ? 'Placing Order...' : 'Proceed to Checkout'}
              </button>
            </div>
          </div>
        </>
      )}

      {orderConfirmed && (
        <div className="order-confirmation">
          <span className="confirmation-icon">✓</span>
          <span>Your order has been confirmed!</span>
        </div>
      )}

    </div>
  );
};

export default Cart;
