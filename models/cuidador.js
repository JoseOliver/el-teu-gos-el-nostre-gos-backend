'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cuidador extends Model {
        static associate(models) {
            Cuidador.belongsTo(
                models.Usuario
            )
            Cuidador.hasMany(
                models.Estancia, {
                    foreignKey: 'cuidador_id'
                }
            )
        }
    }
    Cuidador.init({
        id: { type: DataTypes.UUID, validate: { isUUID: 4 }, primaryKey: true }
    }, {
        sequelize,
        modelName: 'Cuidador',
    });
    return Cuidador;
};