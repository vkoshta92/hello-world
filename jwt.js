const jwt = require('jsonwebtoken');


const jwtAuthMiddleware= (req,res,next)=>{
// first check request headers has authorization or not
const authorization= req.headers.autorization;
if(!authorization) return res.status(401).json({error:' token  not found'})
    // extract the jwt token from the tequest headers

    const token=req.headers.autorization.split(' ')[1];
    if(!token) return  res.status(401).json({error:'Unauthrized'});

    try{
        //verify token
     const decoded=  jwt.verify(token,process.env.JWT_SECRET);

     //attach user information to the request object
     req.user= decoded; // jwt user payload ak key add kar di pura payload server ke pas chala gaya.
     next();
    }
    catch(err){
        console.error(err);
        res.status(401).json({error:'Invalid Token'});
    }

}

//function to genertae jwt token
const generateToken=(userData)=>{
    return jwt.sign({userData},process.env.JWT_SECRET,{expiresIn:30000});
}



module.exports={jwtAuthMiddleware,generateToken};