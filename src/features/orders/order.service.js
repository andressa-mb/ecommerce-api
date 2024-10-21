const repository = require('./order.repository');

async function insert(body) {
  return repository.insert(body);
}

async function addItem(orderId, body) {
  return repository.addItem(orderId, body);
}

async function list(params) {
  const conditions = params;
  const paging = {};
  return repository.find(conditions, paging); 
}

async function listById(id) {
   return repository.find({'orderId': id });
}

async function listItem(orderId, itemId) {
  return repository.findItem(orderId, itemId);
}

async function update(id, body) {
  return repository.update(id, body);
}

async function updateItem(orderId, body) {
  return repository.updateItem(orderId, body);
}

async function remove(id) {
  return repository.remove({'orderId': id});
}

module.exports = { addItem, list, listById, listItem, insert, update, updateItem, remove };