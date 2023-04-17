'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Perro extends Model {
        static associate(models) {
            Perro.belongsTo(
                models.Dueño
            )
            Perro.hasMany(
                models.Estancia, {
                    foreignKey: 'perro_id'
                }
            )
        }
    }
    Perro.init({
        id: { type: DataTypes.UUID, validate: { isUUID: 4 }, defaultValue: DataTypes.UUIDV4, primaryKey: true }, // Or DataTypes.UUIDV1
        nombre: { type: DataTypes.STRING(40) , allowNull: false, validate: { len: [2, 40]}},
        fecha_nacimiento: { type: DataTypes.DATEONLY, validate: { isDate: true }},
        anotaciones: { type: DataTypes.TEXT },
        revisado: { type: DataTypes.BOOLEAN, defaultValue: false },
        precio_dia: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 15.0, validate: { isNumeric: true }},
        dueño_id: { type: DataTypes.INTEGER, validate: { isInt: true }}
    }, {
        sequelize,
        modelName: 'Perro',
    });
    return Perro;
};