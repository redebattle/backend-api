module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.addColumn('postagens', 'acessos', {
      type: Sequelize.INTEGER,
      default: 0,
      allowNull: false,
    }),

  down: async (queryInterface) =>
    queryInterface.removeColumn('postagens', 'acessos'),
};
