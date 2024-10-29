const express = require('express');
const router = express.Router();
const orderController = require('./order.controller');

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);

module.exports = router;
