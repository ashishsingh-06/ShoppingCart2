// require modules
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const swaggerDoc = require('./swaggerDoc');
const initEndPoints = require('./endpoints');
require('dotenv').config();



// mongoose connect
const mongoUri = 'mongodb://localhost:27017/newShoppingCart';
const config = {
    useNewUrlParser : true,
    useCreateIndex: true,
    useUnifiedTopology: true
}

mongoose.connect(mongoUri,config).then((result)=>{
    console.log('database connected');
}).catch((err)=>{console.log(err)});


// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
initEndPoints(app);
swaggerDoc(app);

module.exports = app;