const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const connectBc = require('./connectDb');
const orderModel = require('./order-model');

app.use(express.json());

app.get('/', async (req, res) => {
  console.log("GET");
  
  const orders = await orderModel.find({});
  //ou .exec()
  console.log(orders);
  
  return res.status(200).json(orders);
  
})

app.get('/order/:id', async (req, res) => {
  const getId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(getId)) {
    console.error('ID inválido');
    return res.status(404).json("id invalido");
  } 

  const existId = await orderModel.findById(getId);

  if(!existId) {
    console.log("ID não encontrado no banco");
    return res.status(404).json("Id não encontrado");
  }

  console.log("ID encontrado: " + getId);
  return res.status(200).json("ID encontrado " + getId);

})

app.post('/order', async (req, res) => {
  const data = req.body;
  console.log(req.body);

  const sendOrders = await orderModel.create(data);
    
  return res.status(200).json(sendOrders);
    
})

app.put('/order/:id', async (req, res) => {
  const getId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(getId)) {
    console.error('ID inválido');
    return res.status(404).json("id invalido");
  } 

  console.log("iniciei a edição");
  const order = await orderModel.findByIdAndUpdate({_id: getId }, req.body, {new: true});
  console.log("olha o order");
  console.log(order);

  if(!order){
    console.log("não encontrado");
    return res.status(404).json("Não existe no banco");
  }

  console.log("Deu tudo certo, olha o order");
  return res.status(200).json(order);
})

app.delete('/order/:id', async (req, res) => {
  const getId = req.params.id;
  console.log("id a ser deletado: " + getId);
  
  
if (!mongoose.Types.ObjectId.isValid(getId)) {
  console.error('ID inválido');
  return res.status(404).json("id invalido");
} 

const existId = await orderModel.findById(getId);

if(!existId){
  return res.status(404).json("id não existe no banco");
}
  await orderModel.deleteOne(existId)

  console.log("ID que achou no find" + existId);
  return res.status(200).json("ID excluído do banco: " + existId);
  

})

app.listen(port, () => {
    console.log(`Funcionando na porta ${port}`);
});