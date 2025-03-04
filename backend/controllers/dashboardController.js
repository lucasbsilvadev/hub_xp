// controllers/dashboardController.js
const Order = require("../models/orderModel");

exports.getDashboardStats = (req, res) => {
    Order.getAll((err, orders) => {
      if (err) return res.status(500).json({ error: err.message });
  
      const totalOrders = orders.length;
      const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total), 0);
      const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  
      res.json({
        totalOrders,
        avgOrderValue: parseFloat(avgOrderValue.toFixed(2)), // Garante que é um número
        totalRevenue: parseFloat(totalRevenue.toFixed(2)) // Garante que é um número
      });
    });
  };