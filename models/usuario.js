'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Usuario extends Model {
        static associate(models) {
            Usuario.hasMany(
                models.Perro, {
                    foreignKey: 'dueño_id'
                }
            ),
            Usuario.hasMany(
                models.Entrada, {
                    foreignKey: 'autor_id'
                }
            ),
            Usuario.hasMany(
                models.Estancia, {
                    foreignKey: 'cuidador_id'
                }
            ),
            Usuario.hasMany(
                models.U_Tiene_R, {
                    foreignKey: 'usuario_id'
                }
            )
        }
    }
    Usuario.init({
        id: { type: DataTypes.INTEGER, validate: { isInt: true }, autoIncrement: true, primaryKey: true }, // Or DataTypes.UUIDV1
        nombre: { type: DataTypes.STRING(40), allowNull: false, notEmpty: true,  validate: {len: [2, 40]}},
        apellido: { type: DataTypes.STRING(40), allowNull: false, notEmpty: true,  validate: {len: [2, 40]}},
        telefono: { type: DataTypes.STRING(20), allowNull: false, notEmpty: true,  validate: {len: [3, 20]}},
        email: { type: DataTypes.STRING(25), allowNull: false, unique: true, notEmpty: true,  validate:{ isEmail: true }},
        contraseña: { type: DataTypes.STRING(64), allowNull: false, notEmpty: true,  validate:{ is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm }}
    }, {
        sequelize,
        modelName: 'Usuario',
    });
    return Usuario;
};