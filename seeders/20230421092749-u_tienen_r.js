'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tienes', [
      { id: 1, usuario_id: 1, rol_id: 1, createdAt: '2023-04-21 00:00', updatedAt: '2023-04-21 00:00'},
      { id: 2, usuario_id: 1, rol_id: 2, createdAt: '2023-04-21 00:00', updatedAt: '2023-04-21 00:00'},
      { id: 3, usuario_id: 1, rol_id: 3, createdAt: '2023-04-21 00:00', updatedAt: '2023-04-21 00:00'},
      { id: 4, usuario_id: 1, rol_id: 4, createdAt: '2023-04-21 00:00', updatedAt: '2023-04-21 00:00'}
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
