'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Estancia extends Model {
        static associate(models) {
            Estancia.belongsTo(
                models.Perro, {
                    foreignKey: 'perro_id'
                }
            ),
            Estancia.belongsTo(
                models.Usuario, {
                    foreignKey: 'cuidador_id'
                }
            )
        }
    }
    Estancia.init({
        id: { type: DataTypes.INTEGER, validate: { isInt: true }, autoIncrement: true, primaryKey: true }, // Or DataTypes.UUIDV1
        inicio: { type: DataTypes.DATE , allowNull: false },
        fin: { type: DataTypes.DATE , allowNull: false },
        verificada: { type: DataTypes.BOOLEAN, defaultValue: false },
        finalizada: { type: DataTypes.BOOLEAN, defaultValue: false },
        perro_id: { type: DataTypes.INTEGER, allowNull: false, notEmpty: true },
        cuidador_id: { type: DataTypes.INTEGER, allowNull: false, notEmpty: true },
        createdAt: { allowNull: false, type: DataTypes.DATE },
        updatedAt: { allowNull: false, type: DataTypes.DATE }
    }, {
        sequelize,
        modelName: 'Estancia',
    });
    return Estancia;
};