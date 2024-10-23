const httpStatus = require('../../../http-status');
const mongoose = require('mongoose');
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

async function getOrders(req, res){
    try{
        const getOrders = await orderService.getOrders();
        res.status(httpStatus.OK).json({
          message: "Retrieved orders successfully",
          data: getOrders
        });
    }catch(e){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: `Error to get orders + ${e}`
        })
    }
}

async function getOrderById(req, res){
    const {id} = req.params;
    try{
        const foundOrder = await orderService.findById(id);
        if(!foundOrder) {
        return res.status(httpStatus.NOT_FOUND).json({
            message: "Order ID not found."
        });
        }
        return res.status(httpStatus.OK).json({
        message: "Order ID found successfully.",
        data: foundOrder
        });
    }catch(e){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: `Error while getting order by id. Error: ${e}`
        })
    }
}

module.exports = { createOrder, getOrders, getOrderById }
