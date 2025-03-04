const Category = require("../models/categoryModel");

exports.getAllCategories = (req, res) => {
  Category.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getCategoryById = (req, res) => {
  const categoryId = req.params.id;
  if (!categoryId) {
    return res.status(400).json({ error: "ID da categoria é obrigatório." });
  }
  Category.getById(categoryId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) {
      return res.status(404).json({ error: "Categoria não encontrada." });
    }
    res.json(results[0]);
  });
};

exports.createCategory = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "O nome da categoria é obrigatório." });
  }
  Category.create(req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: results.insertId, ...req.body });
  });
};

exports.updateCategory = (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;
  if (!categoryId || !name) {
    return res.status(400).json({ error: "ID e nome da categoria são obrigatórios." });
  }
  Category.update(categoryId, req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Categoria atualizada com sucesso!" });
  });
};

exports.deleteCategory = (req, res) => {
  const categoryId = req.params.id;
  if (!categoryId) {
    return res.status(400).json({ error: "ID da categoria é obrigatório." });
  }
  Category.delete(categoryId, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Categoria removida com sucesso!" });
  });
};