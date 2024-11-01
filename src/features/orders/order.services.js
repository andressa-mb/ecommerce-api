const repository = require('./order.repository');

async function createOrder(body){
    return repository.createOrder(body);
}

async function getOrders(){
    console.log("Passou na service");
    return repository.findOrders();
}

async function findById(id){
    return repository.findById(id);
}

async function updateOrder(id, body){
    return repository.updateOrder(id, body);
}

async function deleteOrder(id){
	return repository.deleteOrder(id);
}

module.exports = { createOrder, getOrders, findById, updateOrder, deleteOrder }
