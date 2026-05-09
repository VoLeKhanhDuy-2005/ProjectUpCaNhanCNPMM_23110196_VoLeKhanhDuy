import sharp from "sharp";
import db from "../models/index";
import profileService from "../services/profileService";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto"

require("dotenv").config();

const randomImageName=(bytes=32)=>crypto.randomBytes(bytes).toString("hex")

const s3=new S3Client({
  credentials:{
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.BUCKET_REGION,
});

let getProfile = (req, res) => {
  return res.render("profiles/profile.ejs");
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
    return res.render("profiles/updateProfile.ejs", {
      data: userData,
    });
  } else {
    return res.send("Không lấy được id");
  }
};

let putProfile = async (req, res) => {
  const imageName=randomImageName()
  const buffer=await sharp(req.file.buffer).resize({height:500,width:500,fit:"contain"}).toBuffer()
  const params={
    Bucket:process.env.BUCKET_NAME,
    Key:imageName,
    Body:buffer,
    ContentType:req.file.mimetype,
  }
  const command=new PutObjectCommand(params)
  await s3.send(command)
  req.body.avatarUrl = imageName
  let data = await profileService.updateProfile(req.body);
  return res.render("profiles/profile.ejs", {
    datalist: data,
  });
};
module.exports = {
  getProfile: getProfile,
  postProfile: postProfile,
  getEditProfile: getEditProfile,
  putProfile: putProfile,
};
