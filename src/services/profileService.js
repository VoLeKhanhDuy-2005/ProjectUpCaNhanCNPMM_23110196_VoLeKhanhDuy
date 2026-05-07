let getInfoById=(userId)=>{
    return new Promise(async (resolve, reject)=>{
        try{
            let user = await db.User.findOne({
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
            let user=await db.User.findOne({
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
    updateProfile:updateProfile
}