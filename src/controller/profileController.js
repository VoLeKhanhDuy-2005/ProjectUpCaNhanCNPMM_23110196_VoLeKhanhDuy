import sharp from "sharp";
import db from "../models/index";
import profileService from "../services/profileService";
import { S3Client, PutObjectCommand, GetObjectCommand, Bucket$ } from "@aws-sdk/client-s3";
import crypto from "crypto"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

require("dotenv").config();

const bucketName=process.env.BUCKET_NAME

const randomImageName=(bytes=32)=>crypto.randomBytes(bytes).toString("hex")

const s3=new S3Client({
  credentials:{
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.BUCKET_REGION,
});

let getProfile = async (req, res) => {
  let userId = req.query.id;
  let profileData = await profileService.getInfoById(userId);
  if (userId) {
    const getObjectParams={
      Bucket:bucketName,
      Key:profileData.avatarName,
    }
    const command = new GetObjectCommand(getObjectParams);
    const imagePresignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    profileData.imagePresignedUrl=imagePresignedUrl
    return res.render("profiles/profile.ejs", {
      data: profileData,
    });
  } else {
    return res.send("Không lấy được id");
  }
};

let postProfile = async (req, res) => {
  let message = await profileService.createNewUser(req.body);
  // console.log(req.body);
  return res.send("Post crud to server");
};

let getEditProfile = async (req, res) => {
  let userId = req.query.userId;
  console.log(userId);
  if (userId) {
    let profileData = await profileService.getInfoById(userId);
    const getObjectParams={
      Bucket:bucketName,
      Key:profileData.avatarName,
    }
    const command = new GetObjectCommand(getObjectParams);
    const imagePresignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    profileData.imagePresignedUrl=imagePresignedUrl
    return res.render("profiles/updateProfile.ejs", {
      data: profileData,
    });
  } else {
    return res.send("Không lấy được id");
  }
};

let putProfile = async (req, res) => {
  const imageName=randomImageName()
  const buffer=await sharp(req.file.buffer).resize({height:500,width:500,fit:"contain"}).toBuffer()
  const params={
    Bucket:bucketName,
    Key:imageName,
    Body:buffer,
    ContentType:req.file.mimetype,
  }
  const command=new PutObjectCommand(params)
  await s3.send(command)
  req.body.avatarName = imageName
  let profileData = await profileService.updateProfile(req.body);
  const getObjectParams={
    Bucket:bucketName,
    Key:profileData.avatarName,
  }
  const getCommand = new GetObjectCommand(getObjectParams);
  const imagePresignedUrl = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });
  profileData.imagePresignedUrl=imagePresignedUrl
  return res.render("profiles/profile.ejs", {
    data: profileData,
  });
};
module.exports = {
  getProfile: getProfile,
  postProfile: postProfile,
  getEditProfile: getEditProfile,
  putProfile: putProfile,
};
