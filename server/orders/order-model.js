const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({

        product:{
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required : true
        },

        userId : {
            type: String,
            required: true
        },

        shippingAddress: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        zipCode:{
            type:String,
            required: true
        },

        quantity: {
            type: Number,
            default: 1
        },

        date: {
            type: Date,
            default: Date.now
        }
}); 

module.exports = mongoose.model('Order',OrderSchema);

