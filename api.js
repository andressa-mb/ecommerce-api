const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const orderRoutes = require('./src/features/orders/order.routes');

const app = express();
const port = 3000;

dotenv.config();
app.use(express.json());
app.use('/orders', orderRoutes);

// Configuração do cookie específica para __vercel_live_token
app.use((req, res, next) => {
  res.cookie("_vercel_live_token", req.cookies._vercel_live_token, {
  secure: true,
  sameSite: 'none',
  httpOnly: true,
  });
  next();
  });
  
// Configuração geral de segurança com helmet
app.use(helmet.contentSecurityPolice({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "/api.js"],
      styleSrc: ["'self'"],
    },
}));

app.get('/ping', (req, res) => {
  console.log("ping");
  return res.status(200).json({
    message: "pong"
  })
})

app.listen(port, async () => {
    try{
      await mongoose.connect(process.env.MONGODB_URI);
      console.log(`Listening at: http://localhost:${port}`);
    } catch(e){
      console.log(`Failed to connect. Error: ${e}`);
    }
});

