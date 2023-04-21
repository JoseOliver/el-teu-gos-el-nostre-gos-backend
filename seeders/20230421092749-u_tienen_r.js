'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('U_Tienen_R', [
      { id: 1, usuario_id: 1, rol_id: 1 },
      { id: 2, usuario_id: 1, rol_id: 2 },
      { id: 3, usuario_id: 1, rol_id: 3 },
      { id: 4, usuario_id: 1, rol_id: 4 },

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
