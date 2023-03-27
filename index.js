const express=require('express')
require('dotenv').config()
const connection=require('./connection/db')
const userrouter=require("./routes/user.router")
const postrouter=require("./routes/post.router")
const auth=require("./middleware/auth")
const app=express()

app.use(express.json())
app.use("/users",userrouter)
app.use(auth)
app.use("/posts",postrouter)






app.listen(process.env.port,async ()=>{
    await connection
    console.log("connected")
})