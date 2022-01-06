module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('configuracoes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      site_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      site_desc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      manutencao: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      manutencao_mensagem: {
        type: Sequelize.STRING,
      },
      server_ip: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      server_port: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      discord_guild_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      discord_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      facebook_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      instagram_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      twitter_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      youtube_url: {
        type: Sequelize.STRING,
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

  down: async (queryInterface) => queryInterface.dropTable('configuracoes'),
};
