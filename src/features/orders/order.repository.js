const orderModel = require('./order.model');

async function createOrder(body){
    return orderModel.create(body);
}

async function findOrders(){
    return orderModel.find({});
}

async function findById(id){
    return orderModel.findOne({orderId: id});
}

module.exports = { createOrder, findOrders, findById }
