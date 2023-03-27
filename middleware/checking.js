const UserModel = require("../model/user.model")

const check=async (req,res,next)=>{
    const user =await UserModel.find(req.body)
    if(user){
        res.status(401).send({"msg":"User already exist"})
    }else{
        next()
    }
}
module.exports=check