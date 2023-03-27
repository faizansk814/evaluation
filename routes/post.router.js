const express=require('express')
const PostModel = require('../model/post.model')
const jwt=require('jsonwebtoken')
const postrouter=express.Router()


postrouter.get("/",async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
    const  decoded = jwt.verify(token, 'marvel')
    try {
        const post=await PostModel.find({"userID":decoded.userID})
        res.status(200).send(post)
    } catch (error) {
        res.status(401).send({"msg":error.message})
    }
})

postrouter.post("/add",async (req,res)=>{
    try {
       const post=new PostModel(req.body)
       await post.save() 
       res.status(200).send(post)
    } catch (error) {
        res.status(200).send({"msg":error.message})
    }
})

postrouter.get("/top",async (req,res)=>{
    let {page,sort}=req.query
    let value=sort=="asc"?1:-1
    let limit=3
    let skip=(+page-1)*limit
    let data=await PostModel.find().sort({device:value}).skip(skip).limit(limit)
    res.status(200).send(data)
})

postrouter.delete("/delete/:id",async (req,res)=>{
    const {id}=req.params
    try {
        const post=await PostModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":"Post deleted"})
    } catch (error) {
        res.status(401).send({"msg":error.message})
    }
})


postrouter.patch("/update/:id",async (req,res)=>{
    const {id}=req.params
    const payload=req.body
    try {
        const post=await PostModel.findByIdAndUpdate({_id:id},payload)
        res.status(200).send({"msg":"Post Updated"})
    } catch (error) {
        res.status(401).send({"msg":error.message})
    }
})



module.exports=postrouter