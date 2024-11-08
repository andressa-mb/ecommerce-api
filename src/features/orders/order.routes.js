const express = require('express');
const router = express.Router();
const orderController = require('./order.controller');

router.post('/', orderController.createOrder);
router.get('/', (req, res, next) => {
    console.log('Chamou a rota de obtenção de pedidos!');
    orderController.getOrders(req,res,next)
});
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
