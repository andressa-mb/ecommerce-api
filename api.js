const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const dotenv = require('dotenv');
const orderModel = require('./order-model');
const httpStatus = require('./http-status');

dotenv.config();
app.use(express.json());

app.get('/', async (req, res) => {  
  const orders = await orderModel.find({});  
  return res.status(httpStatus.OK).json({
    message: "Orders",
    data: orders
  });  
})

app.get('/order/:id', async (req, res) => {
  const {id} = req.params;

  try{
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Order ID is not valid."
      });
    }   
    const foundOrder = await orderModel.findById(id);  
    if(!foundOrder) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Order ID not found."
      });
    }
    return res.status(httpStatus.OK).json({
      message: "Order ID found successfully.",
      data: foundOrder
    });
  } catch(e){
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error while getting order by id." + e
    })
  }
})

app.post('/order', async (req, res) => {
  const data = req.body;

  try{
    const createOrder = await orderModel.create(data);
    
    return res.status(httpStatus.OK).json({
      message: "Order created successfully.",
      data: createOrder
    });
  }catch(e){
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "Error while created a new order. " + e
    })
  }   
})

app.put('/order/:id', async (req, res) => {
  const {id} = req.params;

  try{
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Order ID is not valid."
      });
    }
    const foundOrder = await orderModel.findByIdAndUpdate({_id: id }, req.body, {new: true});  
    if(!foundOrder){
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Order ID not found."
      });
    }
    return res.status(httpStatus.OK).json({
      message: "Order updated successfully.",
      data: foundOrder
    });
  }catch(e){
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error while edit order by ID." + e
    })
  }
})

app.delete('/order/:id', async (req, res) => {
  const {id} = req.params;
  try{
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Order ID not found."
      });
    }    
    const foundOrder = await orderModel.findById(id);
    
    if(!foundOrder){
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Order ID not found."
      });
    }
    await orderModel.deleteOne(foundOrder);    
    return res.status(httpStatus.OK).json({
      message: "Order deleted successfully.",
      data: foundOrder
    }); 
  }catch(e){
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Error while deleting order ID."
    })
  }
})

app.listen(port, async () => {
    try{
      await mongoose.connect(process.env.DB_URL);
      console.log(`Listening at: http://localhost:${port}`);
    } catch(e){
      console.log("Failed to connect. " + e);
    }
});
