const mongoose = require('mongoose');
const { Schema } =  mongoose;

const orderSchema = new Schema({ 
        orderId: {
            type: Number,
            required: true,
            unique: true
        },
        orderDate: Date,
        orderStatus: {
            type: String,
            enum: ['OPEN', 'PAYED', 'FINISH'],
            default: 'OPEN'
        },
        clientName: String,
        clientEmail: String,
        orderValue: Number,
        shippingValue: Number,
        address: {
            cep: Number,
            street: String,
        },
        paymentMethod: {
            enum: ['CREDIT', 'DEBIT', 'CASH'],
            type: String
        },
        items: [{
            itemId: Number,
            itemDescription: String,
            itemValue: Number,
            itemQuantity: Number,
            discount: Number,
        }], 
});

module.exports = mongoose.model('orders', orderSchema);
