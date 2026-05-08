import bcrypt from "bcryptjs";
import db from "../models/index";
import { raw } from "body-parser";
import { where } from "sequelize";

const salt = bcrypt.genSaltSync(10); //Thuật toán hash password
let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    //Dùng promise đảm bảo luôn trả về kết quả trong xử lý bất đồng bộ
    try {
      let hashPasswordfromBcrypt = await hashUserPassword(data.password);
      let newUser = await db.User.create({
        email: data.email,
        password: hashPasswordfromBcrypt,
      });
      await db.Profile.create({
        userId: newUser.id,
        fullName: data.fullname,
        gender: data.gender === "1" ? true : false,
        // bio:
        // birthday:
        // avatarUrl:
      });
      resolve("OK create a new user successfully");
      // console.log("data from service")
      // console.log(data)
    } catch (e) {
      reject(e);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      //let hashPassword =await bcrypt.hashSync("B4c0/\/", salt);
      let hashPassword = bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let getInfoById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let profile = await db.Profile.findOne({
        where: { userId: userId },
        raw: true,
      });
      if (profile) {
        //console.log("Dữ liệu thực tế từ DB:", profile);
        resolve(profile);
      } else {
        resolve([]);
      }
    } catch (e) {
      reject(e);
    }
  });
};

//Hàm put-profile
let updateProfile = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let profile = await db.Profile.findOne({
        where: { userId: data.userId },
        // KHÔNG dùng raw: true ở đây vì chúng ta cần dùng hàm .save() phía dưới
      });
      if (profile) {
        profile.userId = data.userId;
        profile.fullName = data.fullName;
        profile.bio = data.bio;
        profile.gender = data.gender === "1" ? true : false;
        profile.birthday = data.birthday;
        await profile.save();
        resolve(profile);
      } else {
        resolve();
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getInfoById: getInfoById,
  updateProfile: updateProfile,
  createNewUser: createNewUser,
};
