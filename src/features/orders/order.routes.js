const express = require('express');
const router = express.Router();
const orderController = require('./order.controller');

router.post('/', orderController.create);
router.delete('/:id', orderController.remove);
router.put('/:id', orderController.update);
router.get('/', orderController.list);
router.get('/:id', orderController.listById);
router.get('/:id/item/:itemId', orderController.listItem);
router.post('/:id/item', orderController.addItem);
router.patch('/:id/item/:itemid', orderController.updateItem); //item/id -> id do item

module.exports = router;