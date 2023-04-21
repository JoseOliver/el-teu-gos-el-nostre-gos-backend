'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Estancias', [{
      id: 1, inicio: '2022-04-22 12:00', fin: '2022-04-23 12:00', verificada: false, finalizada: false, perro_id: 1, cuidador_id:1
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
