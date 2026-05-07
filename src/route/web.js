import express from "express"
import profileController from "../controller/profileController"

let router = express.Router();

let initWebRoutes=(app)=>{
    router.get("/profile", profileController.getUser);
    router.post('/post-profile', profileController.postUser);//
    router.get("/edit-profile", profileController.getEditUser);
    router.post("/put-profile", profileController.putUser);
    //return app.use("/profile", router);//default url
    return app.use("/", router);
}
module.exports=initWebRoutes;