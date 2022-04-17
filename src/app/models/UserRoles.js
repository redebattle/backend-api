import { Model } from 'sequelize';

class UserRoles extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        tableName: 'users_roles',
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Roles, { foreignKey: 'role_id', as: 'role' });
    this.belongsTo(models.Users, {
      foreignKey: 'created_by',
      as: 'author',
    });
  }
}

export default UserRoles;
