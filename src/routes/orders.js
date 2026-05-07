const express = require('express');
const router = express.Router();
const db = require('../db/database');
const auth = require('../middleware/auth');

// POST crear orden desde el carrito
router.post('/', auth, (req, res) => {
  const cartItems = db.prepare('SELECT c.*, p.price FROM cart c JOIN products p ON c.product_id = p.id WHERE c.user_id = ?').all(req.user.id);
  if (cartItems.length === 0)
    return res.status(400).json({ error: 'Cart is empty' });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = db.prepare('INSERT INTO orders (user_id, total) VALUES (?, ?)').run(req.user.id, total);

  const insertItem = db.prepare('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
  cartItems.forEach(item => insertItem.run(order.lastInsertRowid, item.product_id, item.quantity, item.price));

  db.prepare('DELETE FROM cart WHERE user_id = ?').run(req.user.id);

  res.status(201).json({ id: order.lastInsertRowid, total, items: cartItems.length });
});

// GET órdenes del usuario
router.get('/', auth, (req, res) => {
  const orders = db.prepare('SELECT * FROM orders WHERE user_id = ?').all(req.user.id);
  res.json(orders);
});

module.exports = router;