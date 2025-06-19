'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('files', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false, // não pode ser nulo
        autoIncrement: true, // vai ter um autoencremente
        primaryKey:true // chave primaria
      },
      name: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      path: {
        type: Sequelize.STRING, 
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('files');
  }
};
