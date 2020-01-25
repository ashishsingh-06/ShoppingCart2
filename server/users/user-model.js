const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

        email:{
            type: String,
            required: true,
            unique: true,
            match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

        },

        name: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        address: {
            type: String,
            required:true
        },

        city:{
            type: String,
            required: true
        },
        
        zipCode:{
            type: String,
            required: true
        },

        phone:{
            type: String,
            required: true
        }
});

module.exports = mongoose.model('User',UserSchema);