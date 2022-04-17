import Sequelize, { Model } from 'sequelize';

class Banimentos extends Model {
  static init(sequelize) {
    super.init(
      {
        uuid: Sequelize.STRING,
        reason: Sequelize.STRING,
        // ip: Sequelize.STRING,
        banned_by_name: Sequelize.STRING,
        removed_by_name: Sequelize.STRING,
        removed_by_reason: Sequelize.STRING,
        removed_by_date: Sequelize.DATE,
        time: Sequelize.BIGINT,
        until: Sequelize.BIGINT,
        ipban: Sequelize.INTEGER,
        silent: Sequelize.INTEGER,
        active: Sequelize.INTEGER,
      },
      {
        tableName: 'litebans_bans',
        timestamps: false,
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.HistoricoBanimentos, {
      foreignKey: 'uuid',
      targetKey: 'uuid',
      as: 'user',
    });
  }
}

export default Banimentos;
