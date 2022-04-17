module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('tickets', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      priority_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'tickets_priorities', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      status_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'tickets_status', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      category_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'tickets_categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      attachment_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'uploads', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      author_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      server_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'servers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      unread: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: true,
      },
      closed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      closed_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      reopened: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      reopened_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      reopened_by: {
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: true,
      },
      is_answered: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      last_message_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      last_response_at: {
        type: Sequelize.DATE,
        allowNull: true,
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

  down: async (queryInterface) => queryInterface.dropTable('tickets'),
};
