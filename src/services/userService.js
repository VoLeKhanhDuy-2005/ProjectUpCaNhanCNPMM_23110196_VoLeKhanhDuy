import bcrypt from "bcryptjs";
import db from "../models/index";
import { raw } from "body-parser";
import { where } from "sequelize";

const salt = bcrypt.genSaltSync(10);//Thuật toán hash password
let createNewUser = async (data)=>{
    return new Promise(async (resolve, reject)=>{//Dùng promise đảm bảo luôn trả về kết quả trong xử lý bất đồng bộ
        try{
            let hashPasswordfromBcrypt=await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                username: data.username,
                password: data.hashPasswordfromBcrypt
            })
            await db.Profile.create({
                fullName: data.fullName,
                gender: data.gender === '1'? true: false
                // bio: 
                // birthday:
                // avatarUrl:
            })
            resolve("OK create a new user successfully");
            // console.log("data from service")
            // console.log(data)
        } catch(e){
            reject(e)
        }
    })
}

let hashUserPassword = (password)=>{
    return new Promise(async (resolve, reject) => {
        try{
            let hashPassword =await bcrypt.hashSync("B4c0/\/", salt);
            resolve(hashPassword);
        } catch(e){
            reject(e);
        }
    })
}
module.exports={
    createNewUser:createNewUser
}