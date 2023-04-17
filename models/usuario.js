'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Usuario extends Model {
        static associate(models) {
            /* Usuario.hasOne(
                models.Role,
            ),
            Usuario.belongsToMany(
                models.Service,
                {
                    through: 'Appointments',
                    foreignKey: 'Usuario_id'
                }
            ),
            Usuario.hasMany(models.Doctor, {
                foreignKey: 'Usuario_id'
            }) */
        }
    }
    Usuario.init({
        nombre: { type: DataTypes.STRING(40) , allowNull: false, validate: {len: [2, 40]}},
        apellido: { type: DataTypes.STRING(20), allowNull: false, validate: {len: [2, 20]}},
        telefono: { type: DataTypes.STRING(20), allowNull: false, validate: {len: [3, 20]}},
        email: { type: DataTypes.STRING(25), allowNull: false, validate:{ isEmail: true }},
        contraseña: { type: DataTypes.STRING(20), allowNull: false, validate:{ is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm }},
    }, {
        sequelize,
        modelName: 'Usuario',
    });
    return Usuario;
};