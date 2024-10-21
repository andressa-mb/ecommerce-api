const httpStatus = require('../../../http-status');
const orderService = require('./order.services');

async function createOrder(req, res){
    const data = req.body;
    try{
        const createOrder = await orderService.createOrder(data);
        res.status(httpStatus.CREATED).json({
            message: "Order created successfully.",
            data: createOrder
        })
    } catch(e){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: `Error while created a new order. Error: ${e}`
          })
    }
}

module.exports = { createOrder }
