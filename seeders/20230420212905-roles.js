'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Rols', [
      {id: 2, rol: "dueño", createdAt: '2023-04-21 00:00', updatedAt: '2023-04-21 00:00'},
      {id: 3, rol: "cuidador", createdAt: '2023-04-21 00:00', updatedAt: '2023-04-21 00:00'},
      {id: 4, rol: "autor", createdAt: '2023-04-21 00:00', updatedAt: '2023-04-21 00:00'},
      {id: 1, rol: "admin", createdAt: '2023-04-21 00:00', updatedAt: '2023-04-21 00:00'}
    ],{});
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
