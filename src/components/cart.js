import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/cartSlice';
import '../styles.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    setOrderConfirmed(true);
    dispatch(clearCart());
    setTimeout(() => setOrderConfirmed(false), 3000);
  };

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <h2 style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p
          style={{
            textAlign: 'center',
            marginTop: '3rem',
            fontStyle: 'italic',
            color: 'var(--color-primary)',
            fontSize: '1.1rem',
          }}
        >
          🍽️ Your cart is empty. Add some delicious meals to get started!
        </p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cartItems.map((item) => (
              <li
                key={item.id}
                style={{
                  backgroundColor: 'var(--color-light)',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                }}
              >
                <strong style={{ fontSize: '1.1rem' }}>{item.name}</strong>
                <br />
                Price: ${item.price.toFixed(2)} × {item.quantity}
                <br />
                <span>Total: ${(item.price * item.quantity).toFixed(2)}</span>
                <br />
                <button
                  style={{
                    backgroundColor: '#f44336',
                    marginTop: '0.5rem',
                    borderRadius: '6px',
                    padding: '6px 14px',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'background-color 0.3s ease',
                  }}
                  onClick={() => dispatch(removeFromCart(item.id))}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#d32f2f'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = '#f44336'}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <h3 style={{ color: 'var(--color-secondary)', marginTop: '1rem' }}>
            Total: ${totalAmount.toFixed(2)}
          </h3>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>

            {/* clear cart button  */}
            <button
              style={{
                backgroundColor: 'var(--color-secondary)',
                borderRadius: '6px',
                padding: '12px 24px',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
                transition: 'background-color 0.3s ease',
                flex: 1,
              }}
              onClick={() => dispatch(clearCart())}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#a9b84b'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-secondary)'}
            >
              Clear Cart
            </button>
            
           {/* chekout button */}
            <button
              style={{
                backgroundColor: 'var(--color-primary)',
                borderRadius: '6px',
                padding: '12px 24px',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem',
                transition: 'background-color 0.3s ease',
                flex: 1,
              }}
              onClick={handleCheckout}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#459a7c'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
            >
              Checkout
            </button>
          </div>
        </>
      )}

      {/* order onfirmd  */}
      {orderConfirmed && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#4caf50',
            color: 'white',
            padding: '1.5rem 2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            fontWeight: '600',
            fontSize: '1.2rem',
            zIndex: 9999,
            minWidth: '300px',
            justifyContent: 'center',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="white"
            strokeWidth="3"
            viewBox="0 0 24 24"
            width="28"
            height="28"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          🎉 Your order has been confirmed!
        </div>
      )}
    </div>
  );
};

export default Cart;
