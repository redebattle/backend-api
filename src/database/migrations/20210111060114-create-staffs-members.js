module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('staffs_members', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      group_id: {
        type: Sequelize.INTEGER,
        references: { model: 'staffs_groups', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      title_id: {
        type: Sequelize.INTEGER,
        references: { model: 'staffs_titles', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      // twitter: {
      //   type: Sequelize.STRING,
      // },
      // discord: {
      //   type: Sequelize.STRING,
      // },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: async (queryInterface) => queryInterface.dropTable('staffs_members'),
};
