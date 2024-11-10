const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
//const helmet = require('helmet');
const orderRoutes = require('../src/features/orders/order.routes');

const app = express();
const port = 3000;

dotenv.config();
app.use(express.json());
app.use(cors());
app.use('/test-orders', orderRoutes);
app.use('/orders', orderRoutes);

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

app.use('/orders', (req, res, next) => {
  console.log("Rota /orders foi chamada");
  next();
}, orderRoutes);

app.get('/test', (req, res) => {
  console.log("Rota /test foi chamada");
  res.json({ message: "Rota de teste funcionando!" });
});
/*
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
*/
async function startServer() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 5000, // tenta conectar por até 5 segundos antes de dar erro
      connectTimeoutMS: 10000, // tenta a conexão por até 10 segundos
    });
    console.log('Conexão com MongoDB estabelecida!');
    
    app.listen(port, () => {
      console.log(`Servidor escutando na porta ${port}`);
    });
  } catch (err) {
    console.error('Erro ao conectar com MongoDB:', err);
  }
}

startServer();
