import Sequelize, { Model } from 'sequelize';

class Configuracoes extends Model {
  static init(sequelize) {
    super.init(
      {
        site_name: Sequelize.STRING,
        site_desc: Sequelize.STRING,
        manutencao: Sequelize.BOOLEAN,
        manutencao_mensagem: Sequelize.STRING,
        server_ip: Sequelize.STRING,
        server_port: Sequelize.STRING,
        discord_guild_id: Sequelize.STRING,
        discord_url: Sequelize.STRING,
        facebook_url: Sequelize.STRING,
        instagram_url: Sequelize.STRING,
        twitter_url: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Configuracoes;
