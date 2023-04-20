'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Estancias', {
      id: { type: Sequelize.UUID, validate: { isUUID: 4 }, defaultValue: Sequelize.UUIDV4, primaryKey: true }, // Or Sequelize.UUIDV1
      inicio: { type: Sequelize.DATE , allowNull: false },
      fin: { type: Sequelize.DATE , allowNull: false },
      verificada: { type: Sequelize.BOOLEAN, defaultValue: false },
      finalizada: { type: Sequelize.BOOLEAN, defaultValue: false },
      perro_id: { references: {
        model: "Perros",
        key:"id"
      },type: Sequelize.UUID, validate: { isUUID: 4 }},
      cuidador_id: { references: {
        model: "Usuarios",
        key:"id"
      },type: Sequelize.UUID, validate: { isUUID: 4 }}
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Estancias');
  }
};
