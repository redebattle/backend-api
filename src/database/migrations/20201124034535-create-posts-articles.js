module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('posts_articles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'posts_categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      banner_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: true,
      },
      link: {
        type: Sequelize.STRING,
      },
      is_external: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      allow_comments: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: true,
      },
      pinned: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      access: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0,
      },
      total_comments: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0,
      },
      total_reactions: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0,
      },
      edited: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      created_by: {
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'users', key: 'id' },
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

  down: async (queryInterface) => queryInterface.dropTable('posts_articles'),
};
