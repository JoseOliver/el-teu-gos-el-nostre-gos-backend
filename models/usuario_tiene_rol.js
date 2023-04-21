'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class U_Tiene_R extends Model {
        static associate(models) {
            U_Tiene_R.belongsTo(
                models.Usuario
            )
            U_Tiene_R.belongsTo(
                models.Rol
            )
        }
    }
    U_Tiene_R.init({
        id: { type: DataTypes.INTEGER, validate: { isInt: true }, autoIncrement: true, primaryKey: true },
        rol_id: { type: DataTypes.UUID, validate: { isUUID: 4 }, allowNull: false, notEmpty: true },
        usuario_id: { type: DataTypes.UUID, validate: { isUUID: 4 }, allowNull: false, notEmpty: true },
        createdAt: { allowNull: false, type: DataTypes.DATE },
        updatedAt: { allowNull: false, type: DataTypes.DATE }
    }, {
        sequelize,
        modelName: 'U_Tiene_R',
    });
    return U_Tiene_R;
};