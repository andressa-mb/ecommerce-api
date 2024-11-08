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
        console.log("Passou no controller");
        const getOrders = await orderService.find({});
        console.log("mostra as orders: ");
        console.log(`ORDERS: ${getOrders}`);
        return res.status(httpStatus.OK).json({
          message: "Retrieved orders successfully",
          data: getOrders
        });
    }catch(e){
        console.error(e);
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

async function updateOrder(req, res){
    const {id} = req.params;
    try{
        
        const updateOrder = await orderService.updateOrder(id, req.body);
        if(!updateOrder){
            return res.status(httpStatus.NOT_FOUND).json({
                message: "Order ID not found to updated."
            });
        }
        return res.status(httpStatus.OK).json({
            message: "Order ID updated.",
            data: updateOrder
        });
    }catch(e){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: `Error while getting order ID to updated. Error: ${e}`
        })
    }
}

async function deleteOrder(req, res){
	const {id} = req.params;
	try{
		const deleteOrder = await orderService.deleteOrder(id);
		if(!deleteOrder){
			return res.status(httpStatus.NOT_FOUND).json({
				message: "Order ID not found."
			});
		}
		return res.status(httpStatus.OK).json({
			message: "Order deleted successfully."
		});
	}catch(e){
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: `Error while deleting order ID. Error: ${e}`
    })
  }
}

module.exports = { createOrder, getOrders, getOrderById, updateOrder, deleteOrder }
