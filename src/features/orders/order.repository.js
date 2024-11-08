const orderModel = require('./order.model');

async function createOrder(body){
    return orderModel.create(body);
}

async function findOrders(){
    try{
        console.log("passou no repository");
        return orderModel.find({});
    }catch(e){
        console.error(e);
    }

}

async function findById(id){
    return orderModel.findOne({orderId: id});
}

async function updateOrder(id, body){
    return orderModel.findOneAndUpdate({orderId: id}, body, {new: true});
}

async function deleteOrder(id){
	return orderModel.findOne({orderId: id});
}

module.exports = { createOrder, findOrders, findById, updateOrder, deleteOrder }
