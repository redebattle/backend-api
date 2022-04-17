module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('changelog_post_category', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      changelog_id: {
        type: Sequelize.INTEGER,
        references: { model: 'changelog_posts', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: { model: 'changelog_categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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

  down: async (queryInterface) =>
    queryInterface.dropTable('changelog_post_category'),
};
