import express from "express"
import profileController from "../controller/profileController"
import multer from "multer"

let router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

let initWebRoutes=(app)=>{
    router.get("/profile", profileController.getProfile);
    router.post('/post-profile', profileController.postProfile);//
    router.get("/edit-profile", profileController.getEditProfile);
    router.post("/put-profile", upload.single("avatar"), profileController.putProfile);
    //return app.use("/profile", router);//default url
    return app.use("/", router);
}
module.exports=initWebRoutes;