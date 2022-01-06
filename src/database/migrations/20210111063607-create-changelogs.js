module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('changelogs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      topicos: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      categoria: {
        type: Sequelize.STRING,
        allowNull: false,
        default: 'normal',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: async (queryInterface) => queryInterface.dropTable('changelogs'),
};
