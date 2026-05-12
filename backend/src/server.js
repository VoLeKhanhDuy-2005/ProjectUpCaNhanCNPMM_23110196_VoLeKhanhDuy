import express from "express"
import connectDB from './config/configdb'
require("dotenv").config();//Để chạy lệnh process.env.PORT

let app=express()

//config app
connectDB();

let port=process.env.PORT || 6969;
//chạy server
app.listen(port, ()=>{
    //callback
    console.log("Backend Nodejs is running on the port: "+port)
})
