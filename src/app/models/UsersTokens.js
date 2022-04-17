import Sequelize, { Model } from 'sequelize';

class UsersTokens extends Model {
  static init(sequelize) {
    super.init(
      {
        token: Sequelize.STRING,
        type: Sequelize.STRING,
        expired_at: Sequelize.DATE,
        used: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' });
  }
}

export default UsersTokens;
