const productController = require('./server/products/product-controller');
const userController = require('./server/users/user-controller');
const orderController = require('./server/orders/order-controller');
const adminController = require('./server/admin/admin-controller');
const authController = require('./server/auth/check-auth');
const adminAuthController = require('./server/auth/check-admin-auth');


const initEndPoints = (app)=>{

        /**
         * @swagger
         * securityDefinitions:
         *     Admin:
         *         type: apiKey
         *         name: Authorization
         *         in: header
         *     User:
         *         type: apiKey
         *         name: Authorization
         *         in: header
         * /admin/login:
         *      post:
         *         tags:
         *         - admin
         *         summary: admin login
         *         description: login to create products and view users
         *         consumes:
         *         - application/json
         *         produces:
         *         - application/json
         *         parameters:
         *         - in: body
         *           name: body
         *           description: admin object
         *           required: true
         *           schema:
         *               $ref: "#/definitions/Login"
         *         responses:
         *                 200:
         *                   description: successful operation
         *                 500:
         *                   description: internal server error
         * /admin/users:
         *      get:
         *        security:
         *        - Admin: []
         *        tags:
         *        - admin
         *        summary: get registered users
         *        produces:
         *        - application/json
         *        parameters: []
         *        responses:
         *                200:
         *                   description: successful operation
         *                404:
         *                   description: users not found
         *                500:
         *                   description: internal server error
         * /product:    
         *      post:
         *          security:
         *          - Admin : []
         *          tags:
         *          - product
         *          summary: create product
         *          description: this can only be done by admin
         *          consumes:
         *          - application/json
         *          produces:
         *          - application/json
         *          parameters:
         *          - in: body
         *            name: body
         *            description: product object
         *            required: true
         *            schema:
         *                $ref: "#/definitions/Product"
         *            example:
         *                name: Amazing spiderman 2
         *                price: 5000
         *          responses:
         *               201:
         *                 description: product created
         *               500:
         *                 description: internal server error
         * 
         * /product/{category}:
         *      get:
         *         tags:
         *         - product
         *         summary: get products based on categories
         *         produces:
         *         - application/json
         *         parameters:
         *         - name: category
         *           in : path
         *           description: The category to be fetched
         *           required: true
         *           type: array
         *           items:
         *              type: string
         *              enum:
         *              - all
         *              - movies
         *              - games
         *              default: all
         *           collectionFormat: multi    
         *         responses:
         *                 200:
         *                   description: successful operation
         *                 404:
         *                   description: product not found
         *                 500:
         *                   description: internal server error
         * 
         * 
         * /product/{productId}:
         *      delete:
         *          security:
         *          - Admin: []
         *          tags:
         *          - product
         *          summary: delete product
         *          description: this can only be done by admin
         *          produces:
         *          - application/json
         *          parameters:
         *          - name: productId
         *            in : path
         *            description: The Id that needs to be deleted
         *            required: true
         *            type: string
         *          responses:
         *              200:
         *                description: successful operation
         *              404:    
         *                description: product not found
         *              500:
         *                description: internal server error
         * 
         * 
         * /user/signup:
         *           post:
         *              tags:
         *              - user
         *              summary: user signup
         *              consumes:
         *              - application/json
         *              produces:
         *              - application/json
         *              parameters:
         *              - in: body
         *                name: body
         *                description: user object
         *                required: true
         *                schema:
         *                    $ref: "#definitions/User"
         *              responses:
         *                      201:
         *                        description: successful operation
         *                      409:
         *                        description: user already exists
         *                      500:
         *                        description: internal server error 
         * 
         * /user/login:
         *           post:
         *              tags:
         *              - user
         *              summary: user login
         *              consumes:
         *              - application/json
         *              produces:
         *              - application/json
         *              parameters:
         *              - in: body
         *                name: body
         *                description: user object
         *                required: true
         *                schema:       
         *                    $ref: "#definitions/Login"
         *              responses:
         *                      200:
         *                        description: successful operation
         *                      401:
         *                        description: email and password does not match
         *                      500:
         *                        description: internal server error   
         * 
         * /user/update/{userId}:
         *            patch:
         *                security:
         *                    - User: []
         *                tags:
         *                - user
         *                summary: update user
         *                consumes:
         *                - application/json
         *                produces:
         *                - application/json
         *                parameters:
         *                - name: userId
         *                  in : path
         *                  description: The Id that needs to be updated
         *                  required: true
         *                  type: string
         *                - name: body
         *                  in: body
         *                  description: user object
         *                  required: false
         *                responses:
         *                        200: 
         *                          description: successful operation
         *                        500:
         *                          description: internal server error
         * 
         * /order:
         *      get:
         *         security:
         *              - Admin: []
         *         tags:
         *         - order
         *         summary: get  orders
         *         description: see placed orders here
         *         produces:
         *         - application/json
         *         parameters: []
         *         responses:
         *                 200:
         *                   description: successful operation
         *                 404: 
         *                   description: orders not found
         *                 500:
         *                   description: internal server error
         *         
         *         
         *      post:
         *         security:
         *            - User: []
         *         tags:
         *         - order 
         *         summary: place order
         *         description: This can only be done by logged in user
         *         consumes:
         *         - application/json
         *         produces:
         *         - application/json
         *         parameters:
         *         - in: body
         *           name: body
         *           description: place order for purchasing a product
         *           required: true
         *           schema:
         *              $ref: "#definitions/Order"
         *         responses:
         *                 201:
         *                   description: successful operation
         *                 404:
         *                   description: product not found
         *      delete:
         *          security:
         *              - User: []
         *          tags:
         *          - order
         *          summary: delete order
         *          description: This can only be done by logged in user
         *          produces:
         *          - application/json
         *          parameters:
         *          - name: productId
         *            in: path
         *            description: The Id that needs to be deleted
         *            required: true
         *            type: string
         *          responses:
         *                  200:
         *                    description: successful operation
         *                  500:        
         *                    description: internal server error    
         *          
         * /order/{userId}:
         *              get:
         *                security:
         *                      - User: []
         *                tags:
         *                - order
         *                summary: get your orders
         *                produces:
         *                - application/json
         *                parameters:
         *                - name: userId
         *                  in : path   
         *                  description: userId to see orders
         *                  required: true  
         *                  type: string
         *                responses:
         *                        200:
         *                          description: suucessful operation
         *
         * 
         * security:
         *     - bearerAuth: []
         *  
         * definitions:
         *      Product:
         *           type: object
         *           properties: 
         *               name:
         *                  type: string
         *               category:
         *                   type: string
         *               price:
         *                  type: string
         * 
         *      User:
         *           type: object
         *           properties:
         *                   email:
         *                      type: string
         *                   name:
         *                      type: string
         *                   password:
         *                      type: string
         *                   confirmPassword:
         *                           type: string
         *                   address:
         *                         type: string
         *                   city:
         *                      type: string
         *                   zipCode:
         *                      type: string
         *                   phone: 
         *                      type: string
         *
         *                   
         *      Order:
         *           type: object
         *           properties:
         *                    productId: 
         *                          type: string
         *                    userId:
         *                          type: string
         *                    shippingAddress:
         *                           type: string
         *                    city: 
         *                        type: string
         *                    zipCode:
         *                           type: string
         *                    quantity:
         *                           type: number
         * 
         *      Login:
         *           type: object
         *           properties:
         *                    email:
         *                        type: string
         *                    password:
         *                         type: string
         * 
         *           
         */


        // admin routes
        app.post('/admin/login',adminController.admin_login);
        app.get('/admin/users',adminAuthController,adminController.get_all_users);

        // product routes
        app.post('/product',adminAuthController,productController.create_product);
        // app.get('/product',productController.get_all_products);
        app.get('/product/:category',productController.get_Product_By_category);
        //app.get('/product/:productId',productController.get_Product_By_Id);
        app.delete('/product/:productId',adminAuthController,productController.delete_product);
        

        // user routes
        app.post('/user/signup',userController.user_signup);
        app.post('/user/login',userController.user_login);
        app.patch('/user/update/:userId',authController,userController.update_user);
        app.get('/user',userController.get_users);

        // order routes
        app.get('/order',adminAuthController,orderController.get_orders);
        app.get('/order/:userId',authController,orderController.get_user_order);
        app.post('/order',authController,orderController.create_order);
        app.delete('/order',adminAuthController,orderController.delete_order);
}

module.exports = initEndPoints;