'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Perros', {
      id: { type: Sequelize.UUID, validate: { isUUID: 4 }, defaultValue: Sequelize.UUIDV4, primaryKey: true }, // Or Sequelize.UUIDV1
      nombre: { type: Sequelize.STRING(40) , allowNull: false, validate: { len: [2, 40]}},
      fecha_nacimiento: { type: Sequelize.DATEONLY, validate: { isDate: true }},
      anotaciones: { type: Sequelize.TEXT },
      revisado: { type: Sequelize.BOOLEAN, defaultValue: false },
      precio_dia: { type: Sequelize.FLOAT, allowNull: false, defaultValue: 15.0, validate: { isNumeric: true }},
      dueño_id: { references: {
        model: "Usuarios",
        key:"id"
      }, type: Sequelize.UUID, validate: { isUUID: 4 }}
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Perros');
  }
};
