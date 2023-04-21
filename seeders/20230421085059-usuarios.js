'use strict';

const bcrypt = require('bcrypt');
const passwordJose = 'Root1234';
const encryptedPasswordJose = bcrypt.hashSync(passwordJose, 10);

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Usuarios', [{
      id: 1, nombre: 'Jose', apellido: 'Oliver Abel', telefono: '666555444', email: 'jose@jose.com', contraseña: encryptedPasswordJose
    }],{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
