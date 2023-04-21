'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Rol extends Model {
        static associate(models) {
            Rol.hasMany(
                models.U_Tiene_R, {
                    foreignKey: 'rol_id'
                }
            )
        }
    }
    Rol.init({
        id: { type: DataTypes.INTEGER, validate: { isInt: true }, autoIncrement: true, primaryKey: true },
        rol: { type: DataTypes.STRING(20), validate: { len: [3, 20] }, allowNull: false },
        createdAt: { allowNull: false, type: DataTypes.DATE },
        updatedAt: { allowNull: false, type: DataTypes.DATE }
    }, {
        sequelize,
        modelName: 'Rol',
    });
    return Rol;
};