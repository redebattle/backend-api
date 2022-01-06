module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('produtos', {
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
      servidor_id: {
        type: Sequelize.INTEGER,
        references: { model: 'servidores', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      valor: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      desconto: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        default: 0.0,
      },
      imagem: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      comandos: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expireUnit: {
        type: Sequelize.INTEGER,
      },
      ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: true,
      },
      unico: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
      },
      destaque: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
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
    return queryInterface.dropTable('produtos');
  },
};
