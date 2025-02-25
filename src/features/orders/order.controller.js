const httpStatus = require("../../../http-status");
const orderService = require("./order.services");

async function createOrder(req, res) {
  const data = req.body;
  try {
    const createdOrder = await orderService.createOrder(data);
    res.status(httpStatus.CREATED).json({
      message: "Order created successfully.",
      data: createdOrder,
    });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: `Error while creating a new order. Error: ${e}`,
    });
  }
}

async function getOrders(req, res) {
  try {
    const getOrders = await orderService.getOrders();
    res.json(getOrders);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Error to get orders. Error: ${err}` });
  }
}

async function getOrderById(req, res) {
  const { id } = req.params;
  try {
    const foundOrder = await orderService.findById(id);
    if (!foundOrder) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Order ID not found.",
      });
    }
    return res.status(httpStatus.OK).json({
      message: "Order ID found successfully.",
      data: foundOrder,
    });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: `Error while getting order by id. Error: ${e}`,
    });
  }
}

async function updateOrder(req, res) {
  const { id } = req.params;
  try {
    const updateOrder = await orderService.updateOrder(id, req.body);
    if (!updateOrder) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Error while updating order.",
      });
    }
    return res.status(httpStatus.OK).json({
      message: "Order Updated Successfully.",
      data: updateOrder,
    });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: `Error updating order. Error: ${e}`,
    });
  }
}

async function deleteOrder(req, res) {
  const { id } = req.params;
  try {
    const deleteOrder = await orderService.deleteOrder(id);
    if (!deleteOrder) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "Order ID not found.",
      });
    }
    return res.status(httpStatus.OK).json({
      message: "Order deleted successfully.",
    });
  } catch (e) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: `Error while deleting order ID. Error: ${e}`,
    });
  }
}

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
