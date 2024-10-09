const mongoose = require('mongoose');
const url = "mongodb+srv://ecommerce-api:ecommerce-api@order.lr7fy.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=order";
//"mongodb+srv://username:password@order.lr7fy.mongodb.net/databaseName?retryWrites=true&w=majority&appName=order"           


mongoose.connect(url);
  mongoose.connection.on('connected', () => {
    console.log("Mongooo");
  });

  mongoose.connection.on('Erro: ', () => {
    console.log("errooo")
  });


