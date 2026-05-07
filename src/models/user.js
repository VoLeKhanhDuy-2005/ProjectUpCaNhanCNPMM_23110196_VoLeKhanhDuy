"use strict"
const {
    Model
}=require("sequelize")
module.exports=(sequelize, DataTypes)=>{
    class User extends Model{
        static associate(models){
            User.hasOne(models.Profile, { 
                foreignKey: 'userId',
                as: 'profileData' // Tên alias để sau này include dữ liệu cho dễ
            });
        }
    }
    User.init({
        email: DataTypes.STRING,
        password: DataTypes.STRING
    },{
        sequelize,
        modelName: "User",
    });
    return User;
};