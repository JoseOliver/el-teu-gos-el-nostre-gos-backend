'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasOne(
                models.Role,
            ),
            User.belongsToMany(
                models.Service,
                {
                    through: 'Appointments',
                    foreignKey: 'user_id'
                }
            ),
            User.hasMany(models.Doctor, {
                foreignKey: 'user_id'
            })
        }
    }
    User.init({
        name: DataTypes.STRING,
        first_surname: DataTypes.STRING,
        second_surname: DataTypes.STRING,
        phone: DataTypes.STRING,
        email: DataTypes.STRING,
        address: DataTypes.STRING,
        password: DataTypes.STRING,
        role_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};