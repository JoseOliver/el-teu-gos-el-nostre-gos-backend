'use strict';

const dotenv = require('dotenv');
const { QueryInterface } = require('sequelize');
dotenv.config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios', {
      id: { type: Sequelize.INTEGER, validate: { isInt: true }, autoIncrement: true, primaryKey: true },
      nombre: { type: Sequelize.STRING(40) , allowNull: false, notEmpty: true,  validate: {len: [2, 40]}},
      apellido: { type: Sequelize.STRING(40), allowNull: false, notEmpty: true,  validate: {len: [2, 40]}},
      telefono: { type: Sequelize.STRING(20), allowNull: false, notEmpty: true,  validate: {len: [3, 20]}},
      email: { type: Sequelize.STRING(25), allowNull: false, unique: true, notEmpty: true,  validate:{ isEmail: true }},
      contraseña: { type: Sequelize.STRING(64), allowNull: false, notEmpty: true,  validate:{ is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm }},
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Usuarios');
  }
};
