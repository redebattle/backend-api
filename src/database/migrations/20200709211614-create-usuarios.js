module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        primaryKey: true,
        // autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      senha_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nivel: {
        type: Sequelize.STRING,
        defaultValue: 'USER',
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

  down: async (queryInterface) => queryInterface.dropTable('usuarios'),
};
