import Sequelize, { Model } from 'sequelize';

class LogsAccounts extends Model {
  static init(sequelize) {
    super.init(
      {
        ip: Sequelize.STRING,
      },
      {
        tableName: 'users_sessions_logs',
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' });
  }
}

export default LogsAccounts;
