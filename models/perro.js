'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Perro extends Model {
        static associate(models) {
            /* Perro.hasOne(
                models.Role,
            ),
            Perro.belongsToMany(
                models.Service,
                {
                    through: 'Appointments',
                    foreignKey: 'Perro_id'
                }
            ),
            Perro.hasMany(models.Doctor, {
                foreignKey: 'Perro_id'
            }) */
        }
    }
    Perro.init({
        nombre: { type: DataTypes.STRING(40) , allowNull: false, validate: { len: [2, 40]}},
        anotaciones: { type: DataTypes.TEXT },
        revisado: { type: DataTypes.BOOLEAN, defaultValue: false },
        precio_dia: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 15.0, validate: { isNumeric: true }},
        dueño_id: { type: DataTypes.INTEGER, validate: { isInt: true }},
        fecha_nacimiento: { type: DataTypes.DATEONLY, validate: { isDate: true }}
    }, {
        sequelize,
        modelName: 'Perro',
    });
    return Perro;
};