// backend/src/controllers/customerController.js
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const { generateInvoice } = require('../utils/invoiceGenerator');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ availableStock: { $gt: 0 } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { items, deliveryAddress } = req.body;
    const customerId = req.user.userId;

    // Validate items
    const products = await Product.find({
      '_id': { $in: items.map(item => item.productId) }
    });

    // Calculate total and validate stock
    let total = 0;
    const orderItems = [];
    
    for (const item of items) {
      const product = products.find(p => p._id.equals(item.productId));
      if (!product) throw new Error(`Product ${item.productId} not found`);
      if (product.availableStock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
        priceAtOrder: product.pricePerUnit
      });

      total += product.pricePerUnit * item.quantity;
      product.availableStock -= item.quantity;
      await product.save();
    }

    // Create order
    const order = new Order({
      customerId,
      items: orderItems,
      totalAmount: total,
      deliveryAddress,
      invoiceNumber: `INV-${Date.now()}`
    });

    await order.save();
    await generateInvoice(order); // Implement this helper function

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.user.userId })
      .populate('items.productId', 'name pricePerUnit');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.downloadInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    res.download(`./invoices/${order.invoiceNumber}.pdf`);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};