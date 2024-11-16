const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Get all products (tested)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err });
  }
});

module.exports = router;
