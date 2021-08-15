'use strict'

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      status: {
        allowNull: false,
        type: DataTypes.TINYINT,
        defaultValue: 0,
        index: true
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      reference: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: ''
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
  }, {
    tableName: 'todos',
    timestamps: true,
  })

  Todo.associate = function (models) {
    // associations
  }

  // hooks

  return Todo
}