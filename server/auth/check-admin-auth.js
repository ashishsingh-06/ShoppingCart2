const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    
        try{

                const token = req.headers.authorization.split(" ")[1];

                jwt.verify(token,"thisisadminkey",null,(err,result)=>{

                        if(err)
                        {
                            return res.status(401).json({
                                message : "Auth failed"
                            });
                        }
                        else
                        {
                            next();
                        }
                });
        }
        catch(error){

            return res.status(401).json({
                message : "Please Log in to continue"
            });
        }
}