"use strict"
const{
    Model,
}=require('sequelize');
module.exports=(sequelize, DataTypes)=>{
    class Profile extends Model{
        static associate(models){
            //Định nghĩa mối quan hệ
            // Định nghĩa: Profile này thuộc về User nào
            Profile.belongsTo(models.User, { 
                foreignKey: 'userId',
                targetKey: 'id',
                as: 'userData'
            });
        }
    }
    Profile.init({
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        fullName: DataTypes.STRING,
        gender: DataTypes.BOOLEAN,
        bio: DataTypes.STRING,
        birthday: DataTypes.DATE,
        avatarName: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "Profile",
    });
    return Profile;
};