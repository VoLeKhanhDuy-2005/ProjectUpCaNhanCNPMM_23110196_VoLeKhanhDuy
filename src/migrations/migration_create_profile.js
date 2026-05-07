"use strict"

const { DataTypes } = require("sequelize")

/** @type {import("sequelize-cli").Migration} */
module.exports={
    async up(queryInterface, Sequelize){
        await queryInterface.createTable("profiles", {
            userId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
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
                type: DataTypes.DATE
            },
            avatarUrl: {
                type: DataTypes.STRING
            },
            createdAt: {
                type: DataTypes.DATE
            },
            updatedAt: {
                type: DataTypes.DATE
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("profiles");
    }
};