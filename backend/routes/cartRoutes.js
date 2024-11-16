const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/auth');
const router = express.Router();
const stripe = require('stripe')('sk_test_51QL6AwLghG2tL7v5henOBnTEZVi8Qbw1P13SZ7lOJX5upMvj7rcNU9s5Hl3dySiloOL7zVSGq18QOY3Nj987p6bL00skoG8rRX');
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
      const { email } = req.query;  // Extract email from query parameter
      if (!email) {
        return res.status(400).send('Email is required');
      }
  
      // Find the cart based on the email
      const cart = await Cart.findOne({ email });
      if (!cart) {
        return res.status(404).send('Cart not found');
      }
  
      // Return the cart with items
      res.status(200).json(cart);  // This will include the _id, email, items, etc.
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
    const { email } = req.query; // Get userId from the authenticated user
    const cart = await Cart.findOne({ email });
    if (!cart) return res.status(404).send('Cart not found');

    // Calculate the total amount from the cart
    const totalAmount = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create a PaymentIntent with the total amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // Stripe requires the amount in cents
      currency: 'usd', // Change this based on your preferred currency
      description: 'Your order payment',
    });
    cart.items = [];  // Clear items
    cart.paymentStatus = 'Completed';
    await cart.save();

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


module.exports = router;
