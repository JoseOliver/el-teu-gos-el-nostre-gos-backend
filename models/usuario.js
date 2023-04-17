'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Usuario extends Model {
        static associate(models) {
            Usuario.hasOne(
                models.Dueño, {
                    foreignKey: 'id'
                }
            ),
            Usuario.hasOne(
                models.Autor, {
                    foreignKey: 'id'
                }
            ),
            Usuario.hasOne(
                models.Cuidador, {
                    foreignKey: 'id'
                }
            ),
            Usuario.hasOne(
                models.Admin, {
                    foreignKey: 'id'
                }
            )
        }
    }
    Usuario.init({
        id: { type: DataTypes.UUID, validate: { isUUID: 4 }, defaultValue: DataTypes.UUIDV4, primaryKey: true }, // Or DataTypes.UUIDV1
        nombre: { type: DataTypes.STRING(40) , allowNull: false, notEmpty: true,  validate: {len: [2, 40]}},
        apellido: { type: DataTypes.STRING(40), allowNull: false, notEmpty: true,  validate: {len: [2, 40]}},
        telefono: { type: DataTypes.STRING(20), allowNull: false, notEmpty: true,  validate: {len: [3, 20]}},
        email: { type: DataTypes.STRING(25), allowNull: false, unique: true, notEmpty: true,  validate:{ isEmail: true }},
        contraseña: { type: DataTypes.STRING(20), allowNull: false, notEmpty: true,  validate:{ is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm }, 
        set(value) {
            // Storing passwords in plaintext in the database is terrible.
            // Hashing the value with an appropriate cryptographic hash function is better.
            this.setDataValue('contraseña', hash(value));
        }
    },
    }, {
        sequelize,
        modelName: 'Usuario',
    });
    return Usuario;
};