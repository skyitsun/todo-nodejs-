'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.TINYINT,
        defaultValue: 0,
        index: true
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      reference: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(function () {
      return queryInterface.sequelize.query(
        'CREATE INDEX `status_idx` ON todos(`status`)'
      )
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('todos');
  }
};