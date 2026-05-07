import { Sequelize } from "sequelize";

const sequelize = new Sequelize('languageLearning', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    logging: 'false'
});
let connectDB = async()=>{
    try{
        await sequelize.authenticate();
        console.log('Connection has been established sucessfully.');
    }
    catch(error){
        console.error("Unable to connect the database:", error);
    }
}
module.exports= connectDB;