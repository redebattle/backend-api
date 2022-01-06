module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('encurtadors', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      original_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      short_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      acess: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('encurtadors');
  },
};
