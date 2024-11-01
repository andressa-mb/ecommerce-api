const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const orderModel = require('./src/features/orders/order.model');
const httpStatus = require('./http-status');
const orderRoutes = require('./src/features/orders/order.routes');

const app = express();
const port = 3000;

dotenv.config();
app.use(express.json());
app.use('/orders', orderRoutes);

app.get('/ping', (req, res) => {
  return res.status(200).json({
    message: "pong"
  })
})

app.listen(port, async () => {
    try{
      await mongoose.connect(process.env.DB_URL);
      console.log(`Listening at: http://localhost:${port}`);
    } catch(e){
      console.log(`Failed to connect. Error: ${e}`);
    }
});

