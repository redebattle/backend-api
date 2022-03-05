import Sequelize, { Model } from 'sequelize';

class LogsAccounts extends Model {
  static init(sequelize) {
    super.init(
      {
        ip: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'user_id', as: 'usuario' });
  }
}

export default LogsAccounts;
