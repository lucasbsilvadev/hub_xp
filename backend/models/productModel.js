const db = require("../config/db");

const Product = {
  getAll: (callback) => {
    db.query(
      "SELECT p.*, c.name AS category FROM products p LEFT JOIN categories c ON p.categoryId = c.id",
      callback
    );
  },
  getById: (id, callback) => {
    db.query(
      "SELECT p.*, c.name AS category FROM products p LEFT JOIN categories c ON p.categoryId = c.id WHERE p.id = ?",
      [id],
      callback
    );
  },
  getByCategory: (categoryId, callback) => {
    db.query(
      "SELECT p.*, c.name AS category FROM products p LEFT JOIN categories c ON p.categoryId = c.id WHERE p.categoryId = ?",
      [categoryId],
      callback
    );
  },
  create: (product, callback) => {
    db.query("INSERT INTO products (name, description, price, imageUrl, categoryId) VALUES (?, ?, ?, ?, ?)",
      [product.name, product.description, product.price, product.imageUrl, product.categoryId], callback);
  },
  update: (id, product, callback) => {
    db.query("UPDATE products SET name=?, description=?, price=?, imageUrl=?, categoryId=? WHERE id=?",
      [product.name, product.description, product.price, product.imageUrl, product.categoryId, id], callback);
  },
  delete: (id, callback) => {
    db.query("DELETE FROM products WHERE id = ?", [id], callback);
  }
};

module.exports = Product;