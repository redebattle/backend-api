import Sequelize, { Model } from 'sequelize';

class HistoricoBanimentos extends Model {
  static init(sequelize) {
    super.init(
      {
        date: Sequelize.DATE,
        name: Sequelize.STRING,
        uuid: Sequelize.STRING,
        avatar: {
          type: Sequelize.VIRTUAL,
          get() {
            return `https://minotar.net/armor/bust/${this.name}`;
          },
        },
      },
      {
        tableName: 'litebans_history',
        timestamps: false,
        sequelize,
      }
    );
    return this;
  }
}

export default HistoricoBanimentos;
