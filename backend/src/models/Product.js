// backend/src/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  category: {
    type: String,
    required: true
  },
  specifications: {
    type: Map,
    of: String
  },
  pricePerUnit: {
    type: Number,
    required: true
  },
  availableStock: {
    type: Number,
    required: true
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);