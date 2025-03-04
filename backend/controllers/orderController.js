const Order = require("../models/orderModel");

exports.getAllOrders = (req, res) => {
  Order.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getOrderById = (req, res) => {
  Order.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0] || {});
  });
};

exports.createOrder = (req, res) => {
  Order.create(req.body, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: results.insertId, ...req.body });
  });
};

exports.updateOrder = (req, res) => {
  Order.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Pedido atualizado com sucesso!" });
  });
};

exports.deleteOrder = (req, res) => {
  Order.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Pedido removido com sucesso!" });
  });
};
