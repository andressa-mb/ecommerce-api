const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
//const helmet = require('helmet');
const orderRoutes = require('../src/features/orders/order.routes');
const orderModel = require('../src/features/orders/order.model');

const app = express();
const port = 3000;

dotenv.config();
app.use(express.json());
app.use(cors());
//app.use('/orders', orderRoutes);

// Configuração geral de segurança com helmet
/* app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "api.js"],
    styleSrc: ["'self'"],
    imgSrc: ["'self'", "*"],
  },
})); */

app.get('/ping', (req, res) => {
  console.log("ping");
  return res.status(200).json({
    message: "pong"
  })
})

app.get('/orders', (req, res) => {
  res.status(200).json({ message: 'Rota /orders acessível!' });
});

app.get('/check-env', (req, res) => {
  res.status(200).json({ dbUrl: process.env.DB_URL || "Variable not set" });
});

app.get('/test-query', async (req, res) => {
  try {
    const orders = await orderModel.find().limit(10).exec();
    console.log(orders);
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro de consulta!' });
  }
});

app.get('/test-connection', async (req, res) => {
  try {
    await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    res.status(200).json({ message: 'Conexão bem-sucedida com o MongoDB!' });
  } catch (error) {
    console.error('Erro ao conectar:', error);
    res.status(500).json({ message: 'Erro de conexão', error });
  }
});

app.listen(port, async () => {
    try{
      await mongoose.connect(process.env.DB_URL, {
        serverSelectionTimeoutMS: 5000, // tenta conectar por até 5 segundos antes de dar erro
        connectTimeoutMS: 10000, // tenta a conexão por até 10 segundos
      });
      console.log(`Conexão com MongoDB estabelecida!`);
      console.log(`Listening at: http://localhost:${port}`);
    } catch(e){
      console.log(`Failed to connect. Error: ${e}`);
    }
});

