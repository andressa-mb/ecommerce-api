const orderModel = require('./order.model');

async function find(conditions, paging) {
    return orderModel.find(conditions, paging).exec();
  }
  
  async function findItem(orderId, itemId) {
    return orderModel.findOne({'orderId': orderId, 'items.itemId': itemId}, {items:1}).exec();
  }
  
  async function addItem(orderId, body) {
    const order =  await orderModel.findOne({'orderId': orderId});
    order.items.push(body);
    return orderModel.findOneAndUpdate({'orderId': orderId}, order);
  }
  
  async function insert(body) {
    return orderModel.create(body);
  }
  
  async function update(id, body) {
    return orderModel.findOneAndUpdate({'orderId': id}, body);
  }
  
  async function updateItem(orderId, body) {
    return  orderModel.findOneAndUpdate({'orderId': orderId}, {$set:{items: body}});
  }
  
  async function remove(id) {
    return orderModel.deleteOne(id);
  }
  
  module.exports = { find, addItem, findItem, insert, update, updateItem, remove };