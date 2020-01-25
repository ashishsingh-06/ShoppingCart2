const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./user-model');
const nodemailer = require('nodemailer');


// var transport = nodemailer.createTransport({
    
//         service: 'gmail',
//         auth: {
//             user: '6ashishsingh@gmail.com',
//             pass: ''    
//         }
// });



exports.user_signup = (req,res,next)=>{

    const name = req.body.name;
    const passwordP = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const address = req.body.address;
    const city = req.body.city;
    const zipCode = req.body.zipCode;
    const phone = req.body.phone;
    

    User.find({email:req.body.email}).exec().then((result)=>{

            if(result.length>=1)
            {
                res.status(409).json({

                        message: "email exists, please provide another email Id"
                });
            }
            else
            {
                if(!name || !passwordP || !confirmPassword || !address || !city || !zipCode || !phone)
                {
                    res.json({
                        message: 'please fill all the required details'
                    })
                }  
                else
                {

                    if(passwordP === confirmPassword)
                    {
                
                        bcrypt.hash(req.body.password,10,(err,hash)=>{

                                if(err)
                                {
                                    return res.status(500).json({
                                        error: err
                                    });
                                }
                                else
                                {
                                    const user = new User({
                                        email : req.body.email,
                                        name: name,
                                        password: hash,
                                        address: address,
                                        city: city,
                                        zipCode: zipCode,
                                        phone: phone
                                    });

                                    user.save().then((result)=>{

                                        // var mailOptions = {
                                        //     from: '6ashishsingh@gmail.com',
                                        //     to: req.body.email,
                                        //     subject: 'Welcome to Shopping Cart',
                                        //     text: `Hello ${name}, Enjoy Shopping with us, You can login using username ${req.body.email} and password ${passwordP}`
                                        // };

                                        // transport.sendMail(mailOptions,function(error,info){

                                        //     if(error)
                                        //     {
                                        //         console.log(error);
                                        //     }
                                        //     else
                                        //     {
                                        //         console.log('email sent');
                                        //         console.log(info);
                                                
                                                
                                        //     }
                                        //  });

                                        res.status(201).json({

                                                message: 'Sign up successful, please note your Id for hassel free shopping',
                                                UserId :  result._id
                                        });

                                    }).catch((err)=>{

                                            res.status(409).json({
                                                error: err
                                            });

                                    });
                                }
                        });


                    }
                    else
                    {
                        res.json({
                            message: 'please confirm the password'
                        });
                    }
                }
            
            }
    }).catch((err)=>{

        console.log(err);
        
        res.status(409).json({
            message : 'please fill all the required details'
      });

    });
}

exports.user_login = (req,res,next)=>{

        User.find({email:req.body.email}).then((user)=>{

                if(user.length<1)
                {
                    return res.status(401).json({

                            message: 'Email id not registered, Please sign up to continue'
                    });
                }
                
                bcrypt.compare(req.body.password,user[0].password,(err,result)=>{

                        if(err)
                        {
                            return res.status(401).json({
                                message: 'Email and password do not match'
                            });
                        }
                        if(result)
                        {
                            const token = jwt.sign({
                              email: user[0].email,
                              userId  : user[0]._id
                            },"thiskeyissecure",{expiresIn: "1h"});

                            return res.status(200).json({
                                message: "Authentication successfull",
                                token : token,
                                userId: user[0]._id
                            });
                        }

                        return res.status(401).json({
                            message: "Email and password do not match"
                        });
                });

        }).catch((err)=>{

            res.status(500).json({
                error : err
            });

        });
}


exports.get_users = (req,res,next)=>{


    User.find().then(result=>{

              res.status(200).json({
                  no_of_users : result.length,
                  test_User: result[0].email
              });


    }).catch(err=>{

          res.status(500).json({
                error : err
          });
    });
}

exports.update_user = (req,res,next)=>{

    const id = req.params.userId;
    User.findByIdAndUpdate({_id: id},{
        $set : req.body
    }).then(()=>{
        res.status(200).json({
            message: 'details updated successfully'
        });
    }).catch(()=>{
        res.status(500).json({
            message: 'internal  server error'
        })
    });

}