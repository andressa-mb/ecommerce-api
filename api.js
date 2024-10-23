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

app.put('/order/:id', async (req, res) => {
  const {id} = req.params;
  try{
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Order ID is not valid."
      });
    }
    const updatedOrder = await orderModel.findByIdAndUpdate({_id: id }, req.body, {new: true}); 
    if(!updatedOrder){
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Order ID not found."
      });
    }
    return res.status(httpStatus.OK).json({
      message: "Order updated successfully.",
      data: updatedOrder
    });
  }catch(e){
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: `Error while updating order by ID. Error: ${e}`
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
      message: "Order deleted successfully."
    }); 
  }catch(e){
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: `Error while deleting order ID. Error: ${e}`
    })
  }
})

app.listen(port, async () => {
    try{
      await mongoose.connect(process.env.DB_URL);
      console.log(`Listening at: http://localhost:${port}`);
    } catch(e){
      console.log(`Failed to connect. Error: ${e}`);
    }
});
