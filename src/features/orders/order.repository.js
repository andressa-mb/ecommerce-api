const orderModel = require('./order.model');

async function createOrder(body){
    return orderModel.create(body);
}

module.exports = { createOrder }
