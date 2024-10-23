const repository = require('./order.repository');

async function createOrder(body){
    return repository.createOrder(body);
}

async function getOrders(){
    return repository.findOrders();
}

async function findById(id){
    return repository.findById(id);
}

module.exports = { createOrder, getOrders, findById }
