const orderService = require('./order.service');
const httpStatus = require('../../http-status');

async function create(req, res) {
    try {
        if(req.body.shippingValue > req.body.orderValue) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'Error shipping value is more bigger then order value'
        });
        } 
        const order = await orderService.insert(req.body);
        res.status(httpStatus.CREATED).json({
            message: "Order created successfully.",
            data: order
        });
    } catch(err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Error to create order'
        });
    }
}

async function addItem(req, res) {
    try { 
        const order = await orderService.addItem(req.params.id, req.body);
        res.status(httpStatus.CREATED).json({
            message: "Item created successfully.",
            data: order
        });
    } catch(err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'Error to add item'
    });
    }
}

async function list(req, res) {
    try {
        const order = await orderService.list(req.query);
        res.status(200).json(order);
    } catch(err) {
        res.status(400).json('Error to list item');
    }
}

async function listById(req, res) {
    try {
        const order = await orderService.listById(req.params.id);
        res.status(200).json(order);
    } catch(err) {
        res.status(400).json('Error to list item');
    }
}

async function listItem(req, res) {
    try {
        const {id, itemId} = req.params;
        const {items} = await orderService.listItem(id, itemId);
        const foundItem = items.find(item => item.itemId == itemId);
        res.status(200).json(foundItem);
    } catch(err){
        res.status(400).json({'code': 400, 'message': 'Error to list items', 'details': err.stack});
    }   
}

async function update(req, res) {
    try {
        const order = await orderService.update(req.params.id, req.body);
        res.status(201).json(order);
    } catch(err){
        res.status(400).json('Error to update in database');
    }  
}

async function updateItem(req, res) {
    try {
        const order = await orderService.updateItem(req.params.id, req.body);
        res.status(201).json(order);
    } catch(err){
        res.status(400).json('Error to update in database');
    }  
}

async function remove(req, res) {
    try{
        const order = await orderService.remove(req.params.id);
        res.status(204).json();
    } catch(err){
        res.status(400).json('Error to remove in database');
    }
}

module.exports = { create, addItem, list, listById, listItem, update, updateItem, remove };