'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('U_Tienen_R', {
      id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, validate: { isUUID: 4 }, primaryKey: true },
      rol_id: { references: {
        model: "Roles",
        key:"id"
      }, type: Sequelize.UUID, validate: { isUUID: 4 }},
      usuario_id: { references: {
        model: "Usuarios",
        key:"id"
      }, type: Sequelize.UUID, validate: { isUUID: 4 }}
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('U_Tienen_R');
  }
};
