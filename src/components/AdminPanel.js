
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import API_BASE_URL from '../services/api';
import '../styles.css';

const initialProduct = {
  name: '',
  description: '',
  price: '',
  stock: '',
  category: '',
  image: ''
};

const AdminPanel = () => {
  const [product, setProduct] = useState(initialProduct);
  const [productList, setProductList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSessionExpired = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    localStorage.removeItem('cart');

    navigate('/login', { replace: true });
  };

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

  useEffect(() => {
    fetchProducts();
  }, []);

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

      <div className="admin-logout">
        <LogoutButton />
      </div>

    </div>
  );
};

export default AdminPanel;
