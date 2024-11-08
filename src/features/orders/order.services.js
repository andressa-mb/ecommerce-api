const repository = require('./order.repository');

async function createOrder(body){
    return repository.createOrder(body);
}

async function getOrders(){
    console.log('Service: Buscando orders...');
    try {
      const orders = await repository.findOrders();
      console.log('Service: Orders encontrados:', orders);
      return orders;
    } catch (err) {
      console.error('Service: Erro ao buscar orders:', err);
      throw err;
    }
/*     try{
        console.log("Passou na service");
        return repository.findOrders();
    } catch(e){
        console.error(`Erro no service ${e}`);
    } */

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
