module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('cargos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      posicao: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: '0',
      },
      cor: {
        type: Sequelize.STRING,
        allowNull: false,
        default: '#FFF',
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
    return queryInterface.dropTable('cargos');
  },
};
