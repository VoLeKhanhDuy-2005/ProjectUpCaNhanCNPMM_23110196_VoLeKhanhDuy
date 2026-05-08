import express from "express"
import profileController from "../controller/profileController"

let router = express.Router();

let initWebRoutes=(app)=>{
    router.get("/profile", profileController.getProfile);
    router.post('/post-profile', profileController.postProfile);//
    router.get("/edit-profile", profileController.getEditProfile);
    router.post("/put-profile", profileController.putProfile);
    //return app.use("/profile", router);//default url
    return app.use("/", router);
}
module.exports=initWebRoutes;