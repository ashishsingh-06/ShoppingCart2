const Order = require('./order-model');
const Product = require('../products/product-model');
const mongoose = require('mongoose');

exports.create_order = (req,res,next)=>{

        const userId = req.body.userId;
        const shippingAddress = req.body.shippingAddress;
        const city = req.body.city;
        const zipCode = req.body.zipCode
        
        Product.findById(req.body.productId).then((result)=>{
                

                if(!result)
                {
                    return res.status(404).json({

                        message: 'Product not found'

                    });
                }

                const order = new Order({

                        _id : mongoose.Types.ObjectId(),
                        quantity: req.body.quantity,
                        product: req.body.productId,
                        userId: userId,
                        shippingAddress: shippingAddress,
                        city: city,
                        zipCode: zipCode
                });

                //console.log(order);
                

                return order.save();

        }).then((data)=>{

                Product.findById(data.product).then((result)=>{

                        const amount = data.quantity* parseInt(result.price);
                        const orderResult = {

                                productId : result._id,
                                productName : result.name,
                                category: result.category,

                                userId: data.userId,
                                orderId: data._id,
                                shippingAddress: data.shippingAddress,
                                city: data.city,
                                zipCode: data.zipCode,  

                                amount: amount

                        }

                        res.status(201).json({
                                message: 'Order Placed',
                                data: orderResult
                            });
                        
                });

               

        }).catch((err)=>{
            
            res.status(404).json({
                error:err
              });

        });

}

exports.delete_order = (req,res,next)=>{

    Order.remove({_id:req.params.orderId}).exec().then((result)=>{

        res.status(200).json({
                message: "order deleted"
        });

    }).catch((err)=>{

            res.status(500).json({

                    error : err
            });
    });
}

exports.get_user_order = (req,res,next)=>{

        const id = req.params.userId;
        console.log(id);
        Order.find({userId: id}).then((result)=>{

                res.status(200).json({
                        data: result
                });
        }).catch((err)=>{

                res.status(500).json({
                        error : err
                });
        })

}


exports.get_orders = (req,res,next)=>{

        Order.find().select('_id product quantity userId shippingAddress').populate('product','name').then((result)=>{

            res.status(200).json({
                message : "orders fetched",
                Orders: result,
                total_orders: result.length
            });

        }).catch((err)=>{

                res.status(500).json({
                    
                        error: err
                });
        });
}