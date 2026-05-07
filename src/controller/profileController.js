import db from "../models/index"
//import userService from "../services/userService"
import profileService from "../services/profileService"

let getHomePage=async (req, res)=>{
    try{
        let data=await db.User.findAll();
        return res.render("homepage.ejs",{
            data: JSON.stringify(data)//Trả dữ liệu data về view
        });
    }catch(e){
        console.log(e);
    }
}

let getUser=(req,res)=>{
    return res.render("users/user.ejs");
}

let getFindAllUsers=async (req,res)=>{
    let data=await profileService.getAllUser();
    return res.render("users/findAllUser.ejs",{
        datalist: data
    })
}

let postUser=async(req,res)=>{
    let message=await profileService.createNewUser(req.body);
    // console.log(req.body);
    return res.send("Post crud to server");
}

let getEditUser=async(req,res)=>{
    let userId=req.query.id;
    if(userId){
        let userData=await profileService.getInfoById(userId);
        return res.render("users/editUser.ejs",{
            data:userData
        });
    } else{
        return res.send("Không lấy được id")
    }
}

let putUser = async(req,res)=>{
    let data=await profileService.updateProfile(req.body);
    return res.render("users/findAllUser.ejs", {
        datalist: data
    })
}
module.exports={
    getHomePage:getHomePage,
    getUser: getUser,
    getFindAllUsers: getFindAllUsers,
    postUser: postUser,
    getEditUser: getEditUser,
    putUser: putUser
}