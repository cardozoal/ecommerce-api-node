const express = require('express');
const router = express.Router();
const db = require('../db/database');
const auth = require('../middleware/auth');

// GET carrito del usuario
router.get('/', auth, (req, res) => {
  const items = db.prepare(`
    SELECT c.id, c.quantity, p.name, p.price, (c.quantity * p.price) as subtotal
    FROM cart c JOIN products p ON c.product_id = p.id
    WHERE c.user_id = ?
  `).all(req.user.id);
  res.json(items);
});

// POST agregar al carrito
router.post('/', auth, (req, res) => {
  const { product_id, quantity } = req.body;
  if (!product_id) return res.status(400).json({ error: 'product_id is required' });

  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(product_id);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  const existing = db.prepare('SELECT * FROM cart WHERE user_id = ? AND product_id = ?').get(req.user.id, product_id);

  if (existing) {
    db.prepare('UPDATE cart SET quantity = quantity + ? WHERE id = ?').run(quantity || 1, existing.id);
  } else {
    db.prepare('INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)').run(req.user.id, product_id, quantity || 1);
  }

  res.status(201).json({ message: 'Product added to cart' });
});

// DELETE vaciar carrito
router.delete('/', auth, (req, res) => {
  db.prepare('DELETE FROM cart WHERE user_id = ?').run(req.user.id);
  res.json({ message: 'Cart cleared' });
});

module.exports = router;