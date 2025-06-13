'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', { 
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
      email: {
        type: Sequelize.STRING, 
        allowNull: false,
        unique: true
      },
      password_hash: {
        type: Sequelize.STRING, 
        allowNull: false,
      },
      provider: {
        type: Sequelize.BOOLEAN, 
        defaultValue: false,
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
    await queryInterface.dropTable('users');
  }
};
