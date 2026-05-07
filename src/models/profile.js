"use strict"
const{
    Model,
}=require('sequelize');
module.exports=(sequelize, DataTypes)=>{
    class Profile extends Model{
        static associate(models){
            //Định nghĩa mối quan hệ
        }
    }
    Profile.init({
        userId: DataTypes.STRING,
        fullName: DataTypes.STRING,
        gender: DataTypes.STRING,
        bio: DataTypes.STRING,
        birthday: DataTypes.DATE,
        avatarUrl: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "Profile",
    });
    return Profile;
};