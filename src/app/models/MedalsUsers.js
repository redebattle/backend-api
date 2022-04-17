import { Model } from 'sequelize';

class MedalUser extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        tableName: 'medals_users',
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Medals, { foreignKey: 'medal_id', as: 'medal' });
  }
}

export default MedalUser;
