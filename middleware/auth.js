const jwt = require("jsonwebtoken");

const auth = (req,res,next)=>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token,"Avishek",(err,decode)=>{
            if(decode){
                req.body.title = decode.title
                next()
            }
            else{
                res.status.send({"msg":"Please Login"});
            }
        });
    }
    else{
        res.status.send({"msg":"Please Login"});
    }
};

module.exports={auth};