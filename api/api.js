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
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
      });
      console.log('Conection succeeded with MongoDB!'); 
      
      await app.listen(port, () => {
        console.log(`Server listening port: ${port}`);
      });     
  } catch (err) {
    console.error('Error to connect to MongoDB:', err);
  }
}

startServer();

module.exports = app;