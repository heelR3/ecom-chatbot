// routes/chatRoutes.js

const express = require('express');
const router = express.Router();
const { getTopProducts, getStockByName } = require('../models/Product');
const { getOrderStatus } = require('../models/Order');

router.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: 'Message is required' });

  let response = "Sorry, I didn't understand that.";

  try {
    if (message.toLowerCase().includes('top')) {
      const products = await getTopProducts();
      response = products.map((p, i) => `${i + 1}. ${p.product_name} (${p.stock} in stock)`).join('\n');
    } else if (message.toLowerCase().includes('status of order id')) {
      const orderId = message.match(/\d+/)?.[0];
      if (orderId) {
        const status = await getOrderStatus(orderId);
        response = status ? `Order status: ${status.order_status}` : 'Order not found';
      }
    } else if (message.toLowerCase().includes('how many')) {
      const productName = message.replace(/how many/i, '').replace(/are left in stock/i, '').trim();
      const stock = await getStockByName(productName);
      response = stock ? `${productName} has ${stock.stock} items left.` : 'Product not found';
    }
  } catch (err) {
    console.error(err);
    response = 'Something went wrong on the server.';
  }

  res.json({ reply: response });
});

module.exports = router;
