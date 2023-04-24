'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Tienes', {
      id: { type: Sequelize.INTEGER, validate: { isInt: true }, autoIncrement: true, primaryKey: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
      rol_id: { references: {
        model: "Rols",
        key:"id"
      }, type: Sequelize.INTEGER, validate: { isInt: true }},
      usuario_id: { references: {
        model: "Usuarios",
        key:"id"
      }, type: Sequelize.INTEGER, validate: { isInt: true }}
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Tienes');
  }
};
