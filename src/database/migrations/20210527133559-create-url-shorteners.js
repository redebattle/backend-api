module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('url_shorteners', {
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
      access: {
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
    }),

  down: async (queryInterface) => queryInterface.dropTable('url_shorteners'),
};
