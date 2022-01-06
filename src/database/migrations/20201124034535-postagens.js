module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('postagens', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      conteudo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      header: {
        type: Sequelize.STRING,
      },
      link: {
        type: Sequelize.STRING,
      },
      visivel: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: true,
      },
      categoria_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'categoria', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      created_by: {
        type: Sequelize.DataTypes.UUID,
        references: { model: 'usuarios', key: 'id' },
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
    });
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('postagens');
  },
};
