const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swagger: '2.0',
    swaggerDefinition:{
        info:{
            title: 'Shopping cart api',
            version: '2.0.0',
            description: 'A shopping cart api for users to buy products',
            contact:{
                email: '6ashishsingh@gmail.com'
            }
        },

        basePath: '/',
    },
    apis: ['endpoints.js'],
};

const specs = swaggerJsdoc(options);

module.exports = (app)=>{
    app.use('/docs',swaggerUi.serve,swaggerUi.setup(specs));
};