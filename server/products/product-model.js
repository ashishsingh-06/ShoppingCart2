const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema({

        name:{
            type: String,
            required: true
        },

        category:{
            type: String,
            required: true
        },
        
        price:{
            type: String,
            required: true
        }
});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;