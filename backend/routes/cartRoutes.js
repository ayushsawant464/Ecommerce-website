const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/auth');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const JWT_SECRET = process.env.JWT_SECRET;

// // Middleware to authenticate user
// function authenticate(req, res, next) {
//   const token = req.headers.authorization;
//   if (!token) return res.status(401).send('Access Denied');
//   try {
//       const verified = jwt.verify(token, JWT_SECRET);
//       req.user = verified;
//       next();
//   } catch {
//       res.status(400).send('Invalid Token');
//   }
// }

//get cart of user
router.get('/user', async (req, res) => {
    try {
      const { email } = req.query;  
      if (!email) {
        return res.status(400).send('Email is required');
      }
  
      const cart = await Cart.findOne({ email });
      if (!cart) {
        return res.status(404).send('Cart not found');
      }
  
      res.status(200).json(cart);  
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
  

router.post('/add', async (req, res) => {
  try {
      const { email ,name, quantity, price } = req.body;
      console.log('gg');
      let cart = await Cart.findOne({ email });
      if (!cart) cart = new Cart({ email, items: [] });

      cart.items.push({ name, quantity, price });
      await cart.save();
      res.status(200).send('Product added to cart');
  } catch (error) {
      res.status(500).send(error.message);
  }
});

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { email } = req.query;    
    const cart = await Cart.findOne({ email });
    if (!cart) return res.status(404).send('Cart not found');

    const totalAmount = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, 
      currency: 'eur',
      description: 'Your order payment',
    });
    cart.items = [];  
    cart.paymentStatus = 'Completed';
    await cart.save();

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


module.exports = router;
