const express = require('express');
const { addItem, getInventory } = require('../controllers/inventoryController');
const router = express.Router();

router.post('/', addItem);
router.get('/', getInventory);

module.exports = router;