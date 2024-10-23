const repository = require('./order.repository');

async function createOrder(body){
    return repository.createOrder(body);
}

module.exports = { createOrder }
