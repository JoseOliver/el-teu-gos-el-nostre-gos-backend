'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Tiene extends Model {
        static associate(models) {
            Tiene.belongsTo(
                models.Usuario, {
                    foreignKey: { name: 'usuario_id' }
                }
            )
            Tiene.belongsTo(
                models.Rol, {
                    foreignKey: { name: 'rol_id' }
                }
            )
        }
    }
    Tiene.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        rol_id: { type: DataTypes.INTEGER, allowNull: false, notEmpty: true },
        usuario_id: { type: DataTypes.INTEGER, allowNull: false, notEmpty: true },
        createdAt: { allowNull: false, type: DataTypes.DATE },
        updatedAt: { allowNull: false, type: DataTypes.DATE }
    }, {
        sequelize,
        modelName: 'Tiene',
    });
    return Tiene;
};