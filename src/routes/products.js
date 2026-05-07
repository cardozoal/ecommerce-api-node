const express = require('express');
const router = express.Router();
const db = require('../db/database');
const auth = require('../middleware/auth');

// GET todos los productos
router.get('/', (req, res) => {
  const products = db.prepare('SELECT * FROM products').all();
  res.json(products);
});

// GET producto por id
router.get('/:id', (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// POST crear producto (requiere auth)
router.post('/', auth, (req, res) => {
  const { name, description, price, stock, category_id } = req.body;
  if (!name || !price) return res.status(400).json({ error: 'Name and price are required' });

  const result = db.prepare(
    'INSERT INTO products (name, description, price, stock, category_id) VALUES (?, ?, ?, ?, ?)'
  ).run(name, description, price, stock || 0, category_id);

  res.status(201).json({ id: result.lastInsertRowid, name, price });
});

// PUT actualizar producto (requiere auth)
router.put('/:id', auth, (req, res) => {
  const { name, description, price, stock, category_id } = req.body;
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  db.prepare(
    'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ? WHERE id = ?'
  ).run(
    name || product.name,
    description || product.description,
    price || product.price,
    stock ?? product.stock,
    category_id || product.category_id,
    req.params.id
  );

  res.json({ message: 'Product updated' });
});

// DELETE producto (requiere auth)
router.delete('/:id', auth, (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
  res.json({ message: 'Product deleted' });
});

module.exports = router;