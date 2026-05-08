import db from "../models/index";
import profileService from "../services/profileService";

let getProfile = (req, res) => {
  return res.render("users/user.ejs");
};

let postProfile = async (req, res) => {
  let message = await profileService.createNewUser(req.body);
  // console.log(req.body);
  return res.send("Post crud to server");
};

let getEditProfile = async (req, res) => {
  let userId = req.query.id;
  console.log(userId);
  if (userId) {
    let userData = await profileService.getInfoById(userId);
    return res.render("users/updateUser.ejs", {
      data: userData,
    });
  } else {
    return res.send("Không lấy được id");
  }
};

let putProfile = async (req, res) => {
  let data = await profileService.updateProfile(req.body);
  return res.render("users/user.ejs", {
    datalist: data,
  });
};
module.exports = {
  getProfile: getProfile,
  postProfile: postProfile,
  getEditProfile: getEditProfile,
  putProfile: putProfile,
};
