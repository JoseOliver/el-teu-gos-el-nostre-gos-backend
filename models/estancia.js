'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Estancia extends Model {
        static associate(models) {
            Estancia.belongsTo(
                models.Perro
            ),
            Estancia.belongsTo(
                models.Cuidador
            )
        }
    }
    Estancia.init({
        id: { type: DataTypes.UUID, validate: { isUUID: 4 }, defaultValue: DataTypes.UUIDV4, primaryKey: true }, // Or DataTypes.UUIDV1
        inicio: { type: DataTypes.DATEONLY , allowNull: false },
        fin: { type: DataTypes.DATEONLY , allowNull: false },
        verificada: { type: DataTypes.BOOLEAN, defaultValue: false },
        finalizada: { type: DataTypes.BOOLEAN, defaultValue: false },
        perro_id: { type: DataTypes.INTEGER, validate: { isInt: true }},
        cuidador_id: { type: DataTypes.INTEGER, validate: { isInt: true }}
    }, {
        sequelize,
        modelName: 'Estancia',
    });
    return Estancia;
};