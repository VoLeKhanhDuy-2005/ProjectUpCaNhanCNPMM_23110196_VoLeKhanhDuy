"use strict"

const { DataTypes } = require("sequelize")

/** @type {import("sequelize-cli").Migration} */
module.exports={
    async up(queryInterface, Sequelize){
        await queryInterface.createTable("profiles", {
            userId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'users', // Tên bảng thực tế trong database 
                    key: 'id' // Cột mà nó tham chiếu tới
                },
                onUpdate: 'CASCADE', // Nếu id user đổi, userId ở profile cũng đổi theo
                onDelete: 'CASCADE' // Nếu user bị xóa, profile của user đó cũng bị xóa
            },
            fullName: {
                type: Sequelize.STRING
            },
            gender: {
                type: DataTypes.BOOLEAN
            },
            bio: {
                type: DataTypes.STRING
            },
            birthday: {
                type: DataTypes.DATEONLY
            },
            avatarName: {
                type: DataTypes.STRING
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("profiles");
    }
};