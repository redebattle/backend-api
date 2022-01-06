module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('postagens', 'acessos', {
      type: Sequelize.INTEGER,
      default: 0,
      allowNull: false,
    });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('postagens', 'acessos');
  },
};
