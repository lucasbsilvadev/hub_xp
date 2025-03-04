const Product = require("../models/productModel");

exports.getAllProducts = (req, res) => {
  Product.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getProductById = (req, res) => {
  Product.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0] || {});
  });
};

exports.createProduct = (req, res) => {
  Product.create(req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: results.insertId, ...req.body });
  });
};

exports.getProductsByCategory = (req, res) => {
  const { categoryId } = req.params;
  if (!categoryId) {
    return res.status(400).json({ error: "ID da categoria é obrigatório." });
  }
  
  Product.getByCategory(categoryId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};


exports.updateProduct = (req, res) => {
  Product.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Produto atualizado com sucesso!" });
  });
};

exports.deleteProduct = (req, res) => {
  Product.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Produto removido com sucesso!" });
  });
};