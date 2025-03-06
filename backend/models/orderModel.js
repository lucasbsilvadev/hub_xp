const db = require("../config/db");

const Order = {
  getAll: (callback) => {
    const query = `
      SELECT 
        orders.id AS orderId,
        orders.date,
        orders.total,
        products.id AS productId,
        products.name,
        products.price,
        order_products.quantity
      FROM orders
      LEFT JOIN order_products ON orders.id = order_products.orderId
      LEFT JOIN products ON order_products.productId = products.id
    `;
    db.query(query, (err, results) => {
      if (err) return callback(err);

      // Agrupa os produtos por pedido
      const ordersMap = new Map();
      results.forEach((row) => {
        const orderId = row.orderId;
        if (!ordersMap.has(orderId)) {
          ordersMap.set(orderId, {
            id: orderId,
            date: row.date,
            total: row.total,
            products: [],
          });
        }

        if (row.productId) {
          ordersMap.get(orderId).products.push({
            id: row.productId,
            name: row.name,
            price: row.price,
            quantity: row.quantity,
          });
        }
      });

      // Converte o Map para um array de pedidos
      const orders = Array.from(ordersMap.values());
      callback(null, orders);
    });
  },
  getById: (id, callback) => {
    db.query("SELECT * FROM orders WHERE id = ?", [id], callback);
  },
  create: (order, callback) => {
    // Converte a data ISO para o formato MySQL (YYYY-MM-DD HH:MM:SS)
    const mysqlDate = new Date(order.date).toISOString().slice(0, 19).replace('T', ' ');

    console.log("Data formatada para MySQL:", mysqlDate); // Log para depuração

    db.query(
      "INSERT INTO orders (date, total) VALUES (?, ?)",
      [mysqlDate, order.total],
      (err, result) => {
        if (err) {
          console.error("Erro ao inserir na tabela orders:", err); // Log para depuração
          return callback(err);
        }

        const orderId = result.insertId;
        console.log("Pedido criado com ID:", orderId); // Log para depuração

        const values = order.productIds.map((productId) => [orderId, productId]);
        console.log("Valores para order_products:", values); // Log para depuração

        db.query(
          "INSERT INTO order_products (orderId, productId) VALUES ?",
          [values],
          (err) => {
            if (err) {
              console.error("Erro ao inserir na tabela order_products:", err); // Log para depuração
              return callback(err);
            }
            callback(null, result);
          }
        );
      }
    );
  },
  update: (id, order, callback) => {
    db.query("UPDATE orders SET date=?, total=? WHERE id=?", [order.date, order.total, id], callback);
  },
  delete: (id, callback) => {
    db.query("DELETE FROM order_products WHERE orderId = ?", [id], (err) => {
      if (err) return callback(err);
      db.query("DELETE FROM orders WHERE id = ?", [id], callback);
    });
  },
};

module.exports = Order;