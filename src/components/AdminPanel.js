import React, { useState, useEffect } from 'react';
import LogoutButton from './LogoutButton';
import '../styles.css';

const AdminPanel = () => {
  const [product, setProduct] = useState({ name: '', price: '', stock: '', image: '' });
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('products')) || [];
    setProductList(stored);
  }, []);

  const handleChange = (e) => {
    setProduct(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!product.name || !product.price || !product.stock) return;

    const newProduct = {
      id: Date.now(),
      name: product.name,
      price: parseFloat(product.price),
      stock: parseInt(product.stock),
      image: product.image || 'https://via.placeholder.com/250x150?text=No+Image',
    };

    const updatedList = [...productList, newProduct];
    setProductList(updatedList);
    localStorage.setItem('products', JSON.stringify(updatedList));
    setProduct({ name: '', price: '', stock: '', image: '' });
  };

  return (
    <div className="container">
      <h2 style={{ color: 'var(--color-secondary)', marginBottom: '0.5rem' }}>Admin Panel</h2>
      <p style={{ fontStyle: 'italic', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
        Add and manage delicious meals to keep your menu fresh and appetizing!
      </p>

      <form onSubmit={handleAddProduct} style={{ marginBottom: '2rem' }}>
        <label>Product Name</label>
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="E.g., Classic Margherita Pizza"
          required
        />

        <label>Price ($)</label>
        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={product.price}
          onChange={handleChange}
          placeholder="E.g., 12.99"
          required
        />

       
        <label>Image URL</label>
        <input
          name="image"
          type="url"
          placeholder="Optional image URL (e.g. https://...)"
          value={product.image}
          onChange={handleChange}
        />

        <button type="submit" style={{ marginTop: '1rem' }}>Add Product</button>
      </form>

      <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Current Menu</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {productList.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: 'gray' }}>No products added yet. Start adding some delicious dishes!</p>
        ) : (
          productList.map(prod => (
            <li
              key={prod.id}
              style={{
                backgroundColor: 'var(--color-light)',
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <img
                src={prod.image || 'https://via.placeholder.com/80x60?text=No+Image'}
                alt={prod.name}
                style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
              />
              <div>
                <strong>{prod.name}</strong> <br />
                Price: ${prod.price.toFixed(2)} <br />
                Stock: {prod.stock}
              </div>
            </li>
          ))
        )}
      </ul>

      <LogoutButton />
    </div>
  );
};

export default AdminPanel;
