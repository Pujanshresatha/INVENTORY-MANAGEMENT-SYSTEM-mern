// backend/src/routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const { getProducts, createOrder, getOrderHistory, downloadInvoice } = require('../controllers/customerController');
const authMiddleware = require('../middleware/auth');

// Get available products
router.get('/products', getProducts);

// Create new order
router.post('/orders', authMiddleware('customer'), createOrder);

// Get order history
router.get('/orders', authMiddleware('customer'), getOrderHistory);

// Download invoice
router.get('/invoice/:orderId', authMiddleware('customer'), downloadInvoice);

module.exports = router;