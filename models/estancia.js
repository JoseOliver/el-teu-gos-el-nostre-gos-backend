'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Estancia extends Model {
        static associate(models) {
            Estancia.belongsTo(
                models.Perro
            ),
            Estancia.belongsTo(
                models.Usuario
            )
        }
    }
    Estancia.init({
        id: { type: DataTypes.UUID, validate: { isUUID: 4 }, defaultValue: DataTypes.UUIDV4, primaryKey: true }, // Or DataTypes.UUIDV1
        inicio: { type: DataTypes.DATE , allowNull: false },
        fin: { type: DataTypes.DATE , allowNull: false },
        verificada: { type: DataTypes.BOOLEAN, defaultValue: false },
        finalizada: { type: DataTypes.BOOLEAN, defaultValue: false },
        perro_id: { type: DataTypes.UUID, validate: { isUUID: 4 }, allowNull: false, notEmpty: true },
        cuidador_id: { type: DataTypes.UUID, validate: { isUUID: 4 }, allowNull: false, notEmpty: true }
    }, {
        sequelize,
        modelName: 'Estancia',
    });
    return Estancia;
};