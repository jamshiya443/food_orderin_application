
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../services/api';
import '../styles.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          localStorage.removeItem('auth');
          navigate('/login', { replace: true });
          return;
        }

        const response = await fetch(`${API_BASE_URL}/orders/my-orders`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('auth');
          localStorage.removeItem('cart');

          navigate('/login', { replace: true });
          return;
        }

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch orders.');
        }

        setOrders(data.orders || []);

      } catch (err) {
        console.error('Fetch orders error:', err);
        setError(err.message || 'Unable to load your orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [navigate]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'status-pending';

      case 'Confirmed':
        return 'status-confirmed';

      case 'Preparing':
        return 'status-preparing';

      case 'Out for Delivery':
        return 'status-out-for-delivery';

      case 'Delivered':
        return 'status-delivered';

      case 'Cancelled':
        return 'status-cancelled';

      default:
        return 'status-pending';
    }
  };

  const formatDate = (date) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return 'Date unavailable';
    }

    return parsedDate.toLocaleString();
  };

  if (loading) {
    return (
      <div className="container orders-page">
        <p className="orders-loading">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container orders-page">
        <div className="orders-error">
          <h2>Unable to Load Orders</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-wide orders-page">

      <div className="orders-header">
        <div>
          <span className="section-label">YOUR ACCOUNT</span>
          <h2>My Orders</h2>
          <p>Keep track of your delicious orders.</p>
        </div>

        <span className="orders-header-icon">📦</span>
      </div>

      <div className="orders-count">
        <strong>{orders.length}</strong>
        <span>{orders.length === 1 ? 'Order placed' : 'Orders placed'}</span>
      </div>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <span>🍽️</span>
          <h3>No orders yet!</h3>
          <p>
            Your order history will appear here once you place your first order.
          </p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>

              <div className="order-card-header">
                <div>
                  <span className="order-number-label">ORDER NUMBER</span>
                  <h3>#{order._id.slice(-6)}</h3>
                </div>

                <span className={`order-status ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="order-date">
                <span>📅</span>
                <span>{formatDate(order.createdAt)}</span>
              </div>

              <div className="order-items-section">
                <h4>Ordered Items</h4>

                {order.items.map((item, index) => (
                  <div className="order-item" key={item._id || index}>
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <strong>
                      ₹{(Number(item.price) * item.quantity).toFixed(2)}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="order-total">
                <span>Total Amount</span>
                <strong>
                  ₹{Number(order.totalAmount).toFixed(2)}
                </strong>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default MyOrders;
