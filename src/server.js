import express from "express"
import bodyParser from "body-parser"//Để lấy tham số từ client vd: /user?id=7
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
import connectDB from './config/configdb'
require("dotenv").config();//Để chạy lệnh process.env.PORT

let app=express()

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
viewEngine(app);
initWebRoutes(app);
connectDB();

let port=process.env.PORT || 6969;
//chạy server
app.listen(port, ()=>{
    //callback
    console.log("Backend Nodejs is running on the port: "+port)
})
