module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('cupons', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      porcentagem: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      qtd_usos: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      expire_as: {
        type: Sequelize.DATE,
        allowNull: false,
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

  down: async (queryInterface) => queryInterface.dropTable('cupons'),
};
