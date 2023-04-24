'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Rol extends Model {
        static associate(models) {
            Rol.hasMany(
                models.Tiene, {
                    foreignKey: 'rol_id'
                }
            )
        }
    }
    Rol.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        rol: { type: DataTypes.STRING(20), validate: { len: [3, 20] }, allowNull: false },
        createdAt: { allowNull: false, type: DataTypes.DATE },
        updatedAt: { allowNull: false, type: DataTypes.DATE }
    }, {
        sequelize,
        modelName: 'Rol',
    });
    return Rol;
};