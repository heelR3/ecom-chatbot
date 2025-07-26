// models/Order.js

const pool = require('../database/connection');

async function getOrderStatus(orderId) {
  const res = await pool.query(
    'SELECT order_status FROM orders WHERE id = $1',
    [orderId]
  );
  return res.rows[0];
}

module.exports = {
  getOrderStatus,
};
