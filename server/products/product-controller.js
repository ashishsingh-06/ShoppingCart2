const express = require('express');
const Product = require('./product-model');


exports.create_product = (req,res,next)=>{

        const product = new Product({

                name: req.body.name,
                category: req.body.category,
                price: req.body.price
        });

        product.save().then((result)=>{

            res.status(201).json({

                    message: 'product created successfully',
                    createdProdcut: {

                        id: result.id,
                        name: result.name,
                        category: result.category,
                        price: result.price
                        
                    }
            });
    
        }).catch((err)=>{

            res.status(500).json({
                error: err
            });

        });
}


// exports.get_all_products = (req,res,next)=>{

//     Product.find().select('name category price _id').exec().then((docs)=>{

//         if(docs.length>0)
//         {
//             const result = {
//                 products: docs.map(docs=>{
//                     return {
//                         name: docs.name,
//                         category: docs.category,
//                         price: docs.price,
//                         id: docs._id,
//                     }
//                 })
//             }

//         res.status(200).json({
//             message: 'products fetched',
//             data: result,
//             product_count : docs.length
//         });
//     }
//     else
//     {
//         res.status(200).json({
//             message: 'No products found'
//         });
//     }

//     }).catch((err)=>{
//         res.status(500).json({
//             error: err
//         });
//     });
// }


// exports.get_Product_By_Id = (req,res,next)=>{

//         const id = req.params.productId;
//         console.log(id);
        
//         Product.findById(id).select('name price _id').exec().then((data)=>{
//             console.log(data);
            
//                 if(data){
//                     res.json({

//                             status:200,
//                             data: data,
//                     });
//                 }
//                 else
//                 {
//                     res.status(404).json({
//                         message: 'No product found with associated id'
//                     });
//                 }

//         }).catch((err)=>{

//                 res.status(500).json({
//                     error: err
//                 });
//         });
// }

exports.get_Product_By_category = (req,res,next)=>{

    const category = req.params.category;
    //console.log(category);

    if(category==="all")
    {
        Product.find().exec().then((data)=>{

                if(data.length<1)
                {
                    res.status(404).json({
                        message: 'No product found with associated category'
                    });
                }
                else
                {
                    res.status(200).json({
                        data: data,
                        count: data.length
                    });
                }
        }).catch((err)=>{

            res.status(500).json({
                error: err
            });

        });
    }
    else
    {


        Product.find({category: category}).then((data)=>{
            
            if(data.length<1)
            {
                res.status(404).json({
                    message: 'No product found with associated category'
                });
            }
            else
            {
                res.status(200).json({
                    data: data,
                });
            }
        }).catch((err)=>{

            res.status(500).json({
                error: err
            });
        });
    }
    
}

exports.delete_product = (req,res,next)=>{

        const id = req.params.productId;
        Product.findByIdAndDelete(id).then((data)=>{

            if(data==null)
            {
                res.status(404).json({

                        message: 'Product not found, It may have been already deleted'
                });
            }
            else
            {
                res.status(200).json({

                        message: "Product Deleted",
                });
            }

        }).catch((err)=>{

            res.status(500).json({
                
                error: err
            }); 
            
        });
}