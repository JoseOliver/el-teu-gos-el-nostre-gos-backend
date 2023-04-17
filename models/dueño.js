'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Dueño extends Model {
        static associate(models) {
            Dueño.belongsTo(
                models.Usuario
            ),
            Dueño.hasMany(
                models.Perro, {
                    foreignKey: 'dueño_id'
                }
            )
        }
    }
    Dueño.init({
        id: { type: DataTypes.UUID, validate: { isUUID: 4 }, primaryKey: true }
    }, {
        sequelize,
        modelName: 'Dueño',
    });
    return Dueño;
};