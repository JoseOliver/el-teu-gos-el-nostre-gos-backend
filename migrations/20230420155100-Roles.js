'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Roles', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, validate: { isUUID: 4 }, primaryKey: true },
      rol: { type: Sequelize.STRING(20), validate: { len: [3, 20] }, allowNull: false }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Roles');
  }
};
