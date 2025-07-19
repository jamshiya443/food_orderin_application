import React from "react";

const ProductList = ({ products, handleAddToCart }) => {
  return (
    <div style={styles.container}>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map((product) => (
          <div key={product.id} style={styles.card}>
            <img
              src={product.image || "https://via.placeholder.com/250x150"}
              alt={product.name}
              style={styles.image}
            />
            <h3 style={styles.name}>{product.name}</h3>
            <p style={styles.price}>${product.price.toFixed(2)}</p>
            <p style={{ color: product.stock > 0 ? "#53a687" : "#e55353" }}>
              {product.stock > 0
                ? `In Stock: ${product.stock}`
                : "Out of Stock"}
            </p>
            <button
              style={{
                ...styles.button,
                backgroundColor: product.stock > 0 ? "#53a687" : "#ccc",
                cursor: product.stock > 0 ? "pointer" : "not-allowed",
              }}
              disabled={product.stock === 0}
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#e8faf4",
  },
  card: {
    borderRadius: "8px",
    backgroundColor: "#def294",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    padding: "15px",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "150px",
    borderRadius: "8px",
    objectFit: "cover",
    marginBottom: "10px",
  },
  name: {
    margin: "10px 0 5px",
    color: "#336633",
    fontFamily: "'Roboto', sans-serif",
  },
  price: {
    margin: "0 0 10px",
    fontWeight: "bold",
    color: "#53a687",
  },
  button: {
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    color: "white",
    fontWeight: "bold",
  },
};

export default ProductList;
