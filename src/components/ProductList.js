
import React from 'react';

const ProductList = ({ products = [], handleAddToCart }) => {
  return (
    <div className="products-grid">
      {products.length === 0 ? (
        <p className="product-message">No products available.</p>
      ) : (
        products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="image-wrapper">
              <img
                src={product.image || 'https://via.placeholder.com/250x150'}
                alt={product.name}
              />
            </div>

            <div className="product-details">
              <h3>{product.name}</h3>

              <p className="product-price">
                ₹{Number(product.price).toFixed(2)}
              </p>

              <p className="stock-info">
                {product.stock > 0
                  ? `In Stock: ${product.stock}`
                  : 'Out of Stock'}
              </p>

              <button
                type="button"
                className="add-cart-btn"
                disabled={product.stock <= 0}
                onClick={() => handleAddToCart(product)}
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
