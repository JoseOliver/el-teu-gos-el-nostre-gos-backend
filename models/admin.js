'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Admin extends Model {
        static associate(models) {
            Admin.belongsTo(
                models.Usuario
            )
        }
    }
    Admin.init({
        id: { type: DataTypes.UUID, validate: { isUUID: 4 }, primaryKey: true }
    }, {
        sequelize,
        modelName: 'Admin',
    });
    return Admin;
};