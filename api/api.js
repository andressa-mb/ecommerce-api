const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const orderRoutes = require('../src/features/orders/order.routes');

const app = express();
const port = 3000;

dotenv.config();
app.use(express.json());
app.use('/orders', orderRoutes);

async function startServer() {
  try {
        await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000, // tenta conectar com o servidor por até 5 segundos
        connectTimeoutMS: 10000, // tenta a conexão por até 10 segundos
      });
      console.log('Conexão com MongoDB estabelecida!'); 
      
      await app.listen(port, () => {
        console.log(`Servidor escutando na porta ${port}`);
      });     
  } catch (err) {
    console.error('Erro ao conectar com MongoDB:', err);
  }
}

startServer();
console.log("ESTOU NA API");

module.exports = app;