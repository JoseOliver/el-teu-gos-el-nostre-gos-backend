'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Autor extends Model {
        static associate(models) {
            Autor.belongsTo(
                models.Usuario
            )
            Autor.hasMany(
                models.Entrada, {
                    foreignKey: 'autor_id'
                }
            )
        }
    }
    Autor.init({
        id: { type: DataTypes.UUID, validate: { isUUID: 4 }, primaryKey: true }
    }, {
        sequelize,
        modelName: 'Autor',
    });
    return Autor;
};