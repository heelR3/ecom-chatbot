const fs = require('fs');
const csv = require('csv-parser');
const pool = require('./database/connection');

async function loadProducts() {
  const results = [];
  fs.createReadStream('path/to/products.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      for (const row of results) {
        await pool.query(
          'INSERT INTO products (product_name, category, price, stock) VALUES ($1, $2, $3, $4)',
          [row.product_name, row.category, row.price, row.stock]
        );
      }
      console.log('Products loaded');
    });
}

loadProducts();
