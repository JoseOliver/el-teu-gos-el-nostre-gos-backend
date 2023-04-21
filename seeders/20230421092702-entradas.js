'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Entradas', [{
      id: 1, descripcion: 'Bienvenidos!', texto: 'Hola! Soy Jose, estoy realizando todos los preparativos para pronto tener abierta la web. Pronto podreis solicitar nuestros servicios en nuestra pagina web. Un saludo!', autor_id: 1
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
