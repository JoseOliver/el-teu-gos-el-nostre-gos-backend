'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Entrada extends Model {
        static associate(models) {
            Entrada.belongsTo(
                models.Usuario
            )
        }
    }
    Entrada.init({
        id: { type: DataTypes.INTEGER, validate: { isInt: true }, autoIncrement: true, primaryKey: true }, // Or DataTypes.UUIDV1
        texto: { type: DataTypes.TEXT , allowNull: false, validate: { len: [2, 40] }},
        descripcion: { type: DataTypes.STRING(150), allowNull: false, validate: { len: [2, 150] }},
        enlace_album: { type: DataTypes.STRING(150), allowNull: false, validate: { len: [3, 150] }},
        autor_id: { type: DataTypes.INTEGER, allowNull: false, notEmpty: true },
        createdAt: { allowNull: false, type: DataTypes.DATE },
        updatedAt: { allowNull: false, type: DataTypes.DATE }
    }, {
        sequelize,
        modelName: 'Entrada',
    });
    return Entrada;
};