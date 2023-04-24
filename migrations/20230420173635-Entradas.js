'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Entradas', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      texto: { type: Sequelize.TEXT , allowNull: false, validate: { len: [2, 40] }},
      descripcion: { type: Sequelize.STRING(150), allowNull: false, validate: { len: [2, 150] }},
      enlace_album: { type: Sequelize.STRING(150), allowNull: true, validate: { len: [3, 150] }},
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
      autor_id: { references: {
        model: "Usuarios",
        key:"id"
      }, type: Sequelize.INTEGER, validate: { isInt: true }}
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Entradas');
  }
};
