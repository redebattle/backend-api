import Sequelize, { Model } from 'sequelize';

class Banimentos extends Model {
  static init(sequelize) {
    super.init(
      {
        uuid: Sequelize.STRING,
        reason: Sequelize.STRING,
        banned_by_name: Sequelize.STRING,
        removed_by_name: Sequelize.STRING,
        removed_by_date: Sequelize.DATE,
        time: Sequelize.INTEGER,
        until: Sequelize.INTEGER,
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
    });
  }
}

export default Banimentos;
