'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Entradas', {
      id: { type: Sequelize.UUID, validate: { isUUID: 4 }, defaultValue: Sequelize.UUIDV4, primaryKey: true }, // Or Sequelize.UUIDV1
      texto: { type: Sequelize.TEXT , allowNull: false, validate: { len: [2, 40] }},
      descripcion: { type: Sequelize.STRING(150), allowNull: false, validate: { len: [2, 150] }},
      enlace_album: { type: Sequelize.STRING(150), allowNull: false, validate: { len: [3, 150] }},
      autor_id: { references: {
        model: "Usuarios",
        key:"id"
      }, type: Sequelize.UUID, validate: { isUUID: 4 }}
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Entradas');
  }
};
