const express = require('express')
const userrouter = express.Router()
const UserModel = require("../model/user.model")
const bcrypt = require('bcrypt')
const check=require("../middleware/checking")
const jwt=require('jsonwebtoken')

userrouter.post("/register",async (req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body
    bcrypt.hash(password, 5,async function(err, hash) {
        const user=new UserModel({name,email,gender,password:hash,age,city,is_married})
        await user.save()
        res.send({"msg":"Registration succesful"})
    });
})

userrouter.post("/login",async (req,res)=>{
    const {email,password}=req.body
    const user=await UserModel.findOne({email})
   if(user){
    bcrypt.compare(password,user.password ,async function(err, result) {
        if(result){
            res.send({"msg":"login succesful","token":jwt.sign({"userID":user._id}, 'marvel',{expiresIn:"4h"})})
        }else{
            res.send({"msg":"wrong credintiels"})
        }
    })
   }else{
    res.status(400).send({"msg":"User Not found"})
   }
})

module.exports = userrouter