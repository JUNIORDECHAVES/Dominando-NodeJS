'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('contacts', { 
      id: {
        type :Sequelize.INTEGER,
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
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: { model: 'customers', key: 'id' }, // chave estrangeira, referencia a tabela customers e o campo id
        onUpdate: 'CASCADE', // se o id do cliente for alterado, o id do usuario também será alterado
        onDelete: "CASCADE", // se o id do cliente for deletado, os dados do usuario também serão deletados
        allowNull: false
      }

    });

  },

  async down(queryInterface) {
    await queryInterface.dropTable('contacts');
  }
};
