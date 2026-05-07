import bcrypt from "bcryptjs";
import db from "../models/index";
import { raw } from "body-parser";
import { where } from "sequelize";

const salt = bcrypt.genSaltSync(10);//Thuật toán hash password
let createNewUser = async (data)=>{
    return new Promise(async (resolve, reject)=>{//Dùng promise đảm bảo luôn trả về kết quả trong xử lý bất đồng bộ
        try{
            let hashPasswordfromBcrypt=await hashUserPassword(data.password)
            let newUser = await db.User.create({
                email: data.email,
                password: hashPasswordfromBcrypt
            })
            await db.Profile.create({
                userId: newUser.id,
                fullName: data.fullname,
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
            //let hashPassword =await bcrypt.hashSync("B4c0/\/", salt);
            let hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch(e){
            reject(e);
        }
    })
}

let getInfoById=(userId)=>{
    return new Promise(async (resolve, reject)=>{
        try{
            let user = await db.Profile.findOne({
                where: {id:userId},
                raw: true
            });
            if(user){
                resolve(user);
            }else{
                resolve([]);
            }
        } catch(e){
            reject(e)
        }
    })
}

//Hàm put-profile 
let updateProfile=(data)=>{
    return new Promise(async (resolve, reject)=>{
        try{
            let user=await db.Profile.findOne({
                where: {id: data.id}
            });
            if(user){
                user.username = data.username
                user.email = data.email
                user.password = data.password
                await user.save();
                resolve(user)
            }else{
                resolve();
            }
        }catch(e){
            reject(e);
        }
    })
}
module.exports={
    getInfoById:getInfoById,
    updateProfile:updateProfile,
    createNewUser:createNewUser
}