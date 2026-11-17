
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import API_BASE_URL from '../services/api';
import '../styles.css';
import './AdminOrders.css';

const initialProduct = {
  name: '',
  description: '',
  price: '',
  stock: '',
  category: '',
  image: ''
};

const ORDER_STATUSES = [
  'Pending',
  'Confirmed',
  'Preparing',
  'Out for Delivery',
  'Delivered',
  'Cancelled'
];

const AdminPanel = () => {
  const [product, setProduct] = useState(initialProduct);
  const [productList, setProductList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Orders state
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState('');
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const navigate = useNavigate();

  const handleSessionExpired = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    localStorage.removeItem('cart');

    navigate('/login', { replace: true });
  };

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      setError('');

      const response = await fetch(`${API_BASE_URL}/products`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch products');
      }

      setProductList(data.products || []);

    } catch (error) {
      console.error('Fetch products error:', error);
      setError(error.message || 'Unable to load products.');
    } finally {
      setLoading(false);
    }
  };

  // FETCH ALL ORDERS (ADMIN)
  const fetchOrders = async () => {
    try {
      setOrdersError('');

      const token = localStorage.getItem('token');

      if (!token) {
        handleSessionExpired();
        return;
      }

      const response = await fetch(`${API_BASE_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.status === 401) {
        handleSessionExpired();
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch orders');
      }

      setOrders(data.orders || []);

    } catch (error) {
      console.error('Fetch orders error:', error);
      setOrdersError(error.message || 'Unable to load orders.');
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  // PRODUCT FORM
  const handleChange = (e) => {
    setProduct(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateProduct = () => {
    if (
      !product.name.trim() ||
      !product.description.trim() ||
      !product.category.trim() ||
      !product.image.trim()
    ) {
      return 'Please fill in all product details.';
    }

    const price = Number(product.price);
    const stock = Number(product.stock);

    if (product.price === '' || !Number.isFinite(price) || price < 0) {
      return 'Please enter a valid non-negative price.';
    }

    if (
      product.stock === '' ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      return 'Stock must be a non-negative whole number.';
    }

    try {
      const imageUrl = new URL(product.image);

      if (!['http:', 'https:'].includes(imageUrl.protocol)) {
        return 'Please enter a valid HTTP or HTTPS image URL.';
      }
    } catch {
      return 'Please enter a valid image URL.';
    }

    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSaving) return;

    setError('');
    setMessage('');

    const validationError = validateProduct();

    if (validationError) {
      setError(validationError);
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      handleSessionExpired();
      return;
    }

    setIsSaving(true);

    try {
      const url = editingId
        ? `${API_BASE_URL}/products/${editingId}`
        : `${API_BASE_URL}/products`;

      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...product,
          name: product.name.trim(),
          description: product.description.trim(),
          category: product.category.trim(),
          image: product.image.trim(),
          price: Number(product.price),
          stock: Number(product.stock)
        })
      });

      const data = await response.json();

      if (response.status === 401) {
        handleSessionExpired();
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || 'Operation failed');
      }

      const wasEditing = Boolean(editingId);

      setMessage(
        wasEditing
          ? 'Product updated successfully!'
          : 'Product added successfully!'
      );

      setProduct(initialProduct);
      setEditingId(null);

      await fetchProducts();

    } catch (error) {
      console.error('Product save error:', error);
      setError(error.message || 'Unable to save product.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (prod) => {
    setProduct({
      name: prod.name,
      description: prod.description,
      price: prod.price,
      stock: prod.stock,
      category: prod.category,
      image: prod.image
    });

    setEditingId(prod._id);
    setMessage('');
    setError('');
  };

  const handleCancelEdit = () => {
    if (isSaving) return;

    setProduct(initialProduct);
    setEditingId(null);
    setMessage('');
    setError('');
  };

  const handleDelete = async (id) => {
    if (deletingId || isSaving) return;

    const confirmed = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirmed) return;

    setError('');
    setMessage('');

    const token = localStorage.getItem('token');

    if (!token) {
      handleSessionExpired();
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(
        `${API_BASE_URL}/products/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        handleSessionExpired();
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete product');
      }

      setMessage('Product deleted successfully!');

      if (editingId === id) {
        setProduct(initialProduct);
        setEditingId(null);
      }

      await fetchProducts();

    } catch (error) {
      console.error('Delete product error:', error);
      setError(error.message || 'Unable to delete product.');
    } finally {
      setDeletingId(null);
    }
  };

  // UPDATE ORDER STATUS
  const handleOrderStatusChange = async (orderId, newStatus) => {
    if (updatingOrderId) return;

    const token = localStorage.getItem('token');

    if (!token) {
      handleSessionExpired();
      return;
    }

    setOrdersError('');
    setUpdatingOrderId(orderId);

    try {
      const response = await fetch(
        `${API_BASE_URL}/orders/${orderId}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            status: newStatus
          })
        }
      );

      const data = await response.json();

      if (response.status === 401) {
        handleSessionExpired();
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update order status');
      }

      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId
            ? { ...order, status: data.order?.status || newStatus }
            : order
        )
      );

    } catch (error) {
      console.error('Update order status error:', error);
      setOrdersError(error.message || 'Unable to update order status.');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'Date unavailable';

    return new Date(date).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container-wide admin-panel">

      {/* ADMIN HEADER */}
      <div className="admin-header">
        <div>
          <span className="section-label">TASTYCART MANAGEMENT</span>
          <h1>Admin Dashboard</h1>
          <p>Manage your food menu and keep everything up to date.</p>
        </div>
        <span className="admin-header-icon">👨‍🍳</span>
      </div>

      {/* MESSAGES */}
      {message && (
        <p className="admin-message success-message">{message}</p>
      )}

      {error && (
        <p className="admin-message error-message">{error}</p>
      )}

      {/* PRODUCT FORM */}
      <section className="admin-form-section">
        <div className="admin-section-heading">
          <h2>
            {editingId ? '✏️ Update Product' : '➕ Add New Product'}
          </h2>
          <p>Enter the details of your food item below.</p>
        </div>

        <form className="admin-product-form" onSubmit={handleSubmit}>
          <div className="admin-form-grid">

            <div className="admin-form-group">
              <label htmlFor="productName">Product Name</label>
              <input
                id="productName"
                name="name"
                type="text"
                autoComplete="off"
                value={product.name}
                onChange={handleChange}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="productDescription">Description</label>
              <input
                id="productDescription"
                name="description"
                type="text"
                autoComplete="off"
                value={product.description}
                onChange={handleChange}
                placeholder="Enter description"
                required
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="productPrice">Price (₹)</label>
              <input
                id="productPrice"
                name="price"
                type="number"
                min="0"
                step="0.01"
                autoComplete="off"
                value={product.price}
                onChange={handleChange}
                placeholder="Enter price"
                required
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="productStock">Stock Quantity</label>
              <input
                id="productStock"
                name="stock"
                type="number"
                min="0"
                step="1"
                autoComplete="off"
                value={product.stock}
                onChange={handleChange}
                placeholder="Enter stock"
                required
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="productCategory">Category</label>
              <input
                id="productCategory"
                name="category"
                type="text"
                autoComplete="off"
                value={product.category}
                onChange={handleChange}
                placeholder="Example: Burger, Pizza"
                required
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="productImage">Image URL</label>
              <input
                id="productImage"
                name="image"
                type="url"
                autoComplete="url"
                value={product.image}
                onChange={handleChange}
                placeholder="Paste image URL"
                required
              />
            </div>

          </div>

          <div className="admin-form-actions">
            <button
              type="submit"
              className="admin-submit-btn"
              disabled={isSaving}
            >
              {isSaving
                ? 'Saving...'
                : editingId
                  ? 'Update Product'
                  : 'Add Product'}
            </button>

            {editingId && (
              <button
                type="button"
                className="admin-cancel-btn"
                onClick={handleCancelEdit}
                disabled={isSaving}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* CURRENT MENU */}
      <section className="admin-menu-section">

        <div className="admin-section-heading">
          <h2>📋 Current Menu</h2>
          <p>View and manage all your available products.</p>
        </div>

        {loading ? (
          <p className="product-message">Loading products...</p>
        ) : productList.length === 0 ? (
          <p className="product-message">No products added yet.</p>
        ) : (
          <div className="admin-products-grid">

            {productList.map(prod => (
              <div className="admin-product-card" key={prod._id}>

                <div className="admin-product-image">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://via.placeholder.com/300x180?text=No+Image';
                    }}
                  />
                </div>

                <div className="admin-product-info">
                  <h3>{prod.name}</h3>

                  <p className="admin-product-category">
                    {prod.category}
                  </p>

                  <p className="admin-product-description">
                    {prod.description}
                  </p>

                  <div className="admin-product-meta">
                    <strong>₹{Number(prod.price).toFixed(2)}</strong>
                    <span>Stock: {prod.stock}</span>
                  </div>

                  <div className="admin-product-actions">
                    <button
                      type="button"
                      className="admin-edit-btn"
                      onClick={() => handleEdit(prod)}
                      disabled={isSaving || Boolean(deletingId)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="admin-delete-btn"
                      onClick={() => handleDelete(prod._id)}
                      disabled={isSaving || Boolean(deletingId)}
                    >
                      {deletingId === prod._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>

              </div>
            ))}

          </div>
        )}

      </section>


      {/* ORDERS MANAGEMENT */}
      
      <section id="orders-management" className="admin-menu-section orders-management">

        <div className="orders-heading">
          <div>
            <span className="orders-eyebrow">TASTYCART MANAGEMENT</span>
            <h2>Orders Management</h2>
            <p>Track customer orders and manage their delivery status.</p>
          </div>
          <div className="orders-total-pill">
            {orders.length} Total Orders
          </div>
        </div>

        <div className="orders-summary-grid">
          <div className="orders-summary-card">
            <span className="summary-icon">🛍️</span>
            <div>
              <span className="summary-label">All Orders</span>
              <strong>{orders.length}</strong>
            </div>
          </div>

          <div className="orders-summary-card summary-pending">
            <span className="summary-icon">🕒</span>
            <div>
              <span className="summary-label">Pending</span>
              <strong>{orders.filter(order => order.status === 'Pending').length}</strong>
            </div>
          </div>

          <div className="orders-summary-card summary-progress">
            <span className="summary-icon">🍳</span>
            <div>
              <span className="summary-label">In Progress</span>
              <strong>
                {orders.filter(order =>
                  ['Confirmed', 'Preparing', 'Out for Delivery'].includes(order.status)
                ).length}
              </strong>
            </div>
          </div>

          <div className="orders-summary-card summary-delivered">
            <span className="summary-icon">✓</span>
            <div>
              <span className="summary-label">Delivered</span>
              <strong>{orders.filter(order => order.status === 'Delivered').length}</strong>
            </div>
          </div>
        </div>

        {ordersLoading ? (
          <div className="orders-empty-state">
            <span className="orders-empty-icon">⏳</span>
            <p>Loading orders...</p>
          </div>
        ) : ordersError && orders.length === 0 ? (
          <p className="admin-message error-message">{ordersError}</p>
        ) : orders.length === 0 ? (
          <div className="orders-empty-state">
            <span className="orders-empty-icon">🛍️</span>
            <h3>No orders yet</h3>
            <p>New customer orders will appear here.</p>
          </div>
        ) : (
          <div className="orders-cards-grid">
            {orders.map(order => (
              <article className="order-admin-card" key={order._id}>

                <div className="order-card-top">
                  <div>
                    <span className="order-number-label">ORDER ID</span>
                    <h3>#{order._id.slice(-6).toUpperCase()}</h3>
                  </div>
                  <span
                    className={`order-status-badge status-${(order.status || 'pending').toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {order.status || 'Pending'}
                  </span>
                </div>

                <div className="order-customer-block">
                  <div className="order-customer-avatar">
                    {(order.user?.name || 'C').charAt(0).toUpperCase()}
                  </div>
                  <div className="order-customer-details">
                    <strong>{order.user?.name || 'Customer'}</strong>
                    <span>{order.user?.email || 'Email not available'}</span>
                  </div>
                </div>

                <div className="order-date-row">
                  <span>📅 Order placed</span>
                  <strong>{formatDate(order.createdAt)}</strong>
                </div>

                <div className="order-items-block">
                  <div className="order-items-heading">
                    <strong>Order items</strong>
                    <span>{order.items?.length || 0} item(s)</span>
                  </div>

                  {order.items?.map((item, index) => (
                    <div className="order-item-row" key={item._id || index}>
                      <div>
                        <strong>{item.name}</strong>
                        <span>Qty: {item.quantity}</span>
                      </div>
                      <strong>
                        ₹{(Number(item.price) * Number(item.quantity)).toFixed(2)}
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="order-total-row">
                  <span>Total amount</span>
                  <strong>₹{Number(order.totalAmount || 0).toFixed(2)}</strong>
                </div>

                <div className="order-status-control">
                  <label htmlFor={`status-${order._id}`}>Update order status</label>
                  <select
                    id={`status-${order._id}`}
                    value={order.status || 'Pending'}
                    onChange={(e) =>
                      handleOrderStatusChange(order._id, e.target.value)
                    }
                    disabled={Boolean(updatingOrderId)}
                  >
                    {ORDER_STATUSES.map(status => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  {updatingOrderId === order._id && (
                    <small>Saving status...</small>
                  )}
                </div>

              </article>
            ))}
          </div>
        )}

        {ordersError && orders.length > 0 && (
          <p className="admin-message error-message">{ordersError}</p>
        )}

      </section>

      {/* LOGOUT */}
      <div className="admin-logout">
        <LogoutButton />
      </div>

    </div>
  );
};

export default AdminPanel;
