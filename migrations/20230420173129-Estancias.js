'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Estancia', {
      id: { type: Sequelize.INTEGER, validate: { isInt: true }, autoIncrement: true, primaryKey: true }, // Or Sequelize.UUIDV1
      inicio: { type: Sequelize.DATE , allowNull: false },
      fin: { type: Sequelize.DATE , allowNull: false },
      verificada: { type: Sequelize.BOOLEAN, defaultValue: false },
      finalizada: { type: Sequelize.BOOLEAN, defaultValue: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
      perro_id: { references: {
        model: "Perros",
        key:"id"
      },type: Sequelize.INTEGER, validate: { isInt: true }},
      cuidador_id: { references: {
        model: "Usuarios",
        key:"id"
      },type: Sequelize.INTEGER, validate: { isInt: true }}
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Estancia');
  }
};
