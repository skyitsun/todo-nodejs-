'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'todos',
      [
        {
          title: 'test@test.com'
        },
        {
          title: 'test1@test.com'
        },
        {
          title: 'test2@test.com'
        }
      ], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('todos', null, {})
  }
};
