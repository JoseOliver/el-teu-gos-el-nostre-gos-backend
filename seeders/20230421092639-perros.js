'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Perros', [{
      id: 1, nombre: 'Roque', fecha_nacimiento: '2010-11-01', anotaciones: 'Es bueno', revisado: false, precio_dia: 15, dueño_id:1
    }],{});
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
