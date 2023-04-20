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
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, validate: { isUUID: 4 }, primaryKey: true },
        rol_id: { type: DataTypes.UUID, validate: { isInt: true }, allowNull: false },
        usuario_id: { type: DataTypes.UUID, validate: { isInt: true }, allowNull: false }
    }, {
        sequelize,
        modelName: 'U_Tiene_R',
    });
    return U_Tiene_R;
};