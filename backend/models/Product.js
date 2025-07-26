// models/Product.js

const pool = require('../database/connection');

async function getTopProducts(limit = 5) {
  const res = await pool.query(
    'SELECT * FROM products ORDER BY stock DESC LIMIT $1',
    [limit]
  );
  return res.rows;
}

async function getStockByName(name) {
  const res = await pool.query(
    'SELECT stock FROM products WHERE product_name ILIKE $1',
    [`%${name}%`]
  );
  return res.rows[0];
}

module.exports = {
  getTopProducts,
  getStockByName,
};
