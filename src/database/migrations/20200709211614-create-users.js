module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        // defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      refresh_token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      token_expires_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      level: {
        type: Sequelize.STRING,
        defaultValue: 'USER',
      },
      is_validated: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      is_administrator: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      is_email_notification_enable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      is_banned: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      avatar_id: {
        type: Sequelize.INTEGER,
        references: { model: 'uploads', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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

  down: async (queryInterface) => queryInterface.dropTable('users'),
};
