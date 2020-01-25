const jwt = require('jsonwebtoken');
const User = require('../users/user-model');

require('dotenv').config();

exports.admin_login = (req,res,next)=>{
    
    const username = req.body.email;
    const password = req.body.password;

    if(username===process.env.Admin_username)
    {
            if(password===process.env.Admin_password)
            {
                    const token = jwt.sign({

                            email: username,
                            password: password
                    },'thisisadminkey',{expiresIn:"1h"});

                    res.status(200).json({

                            message: 'Login successful',
                            token : token
                    });
            }
            else
            {
                    res.json({
                            message: 'Email and password do not match'
                    })
            }
    }
    else
    {
            res.json({
                    message: 'Email Id does not exists'
            });
    } 
}

exports.get_all_users = (req,res,next)=>{

        User.find().select('_id email name address city zipCode phone').exec().then((result)=>{

                if(result.length<1)
                {
                        res.status(404).json({
  
                                message: 'No user found'
                        });
                }
                else
                {
                        res.status(200).json({
                                data: result
                        });
                }
        }).catch((err)=>{

                res.status(500).json({
                        error : err
                });
        });

}