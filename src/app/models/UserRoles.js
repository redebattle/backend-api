import { Model } from 'sequelize';

class UserRoles extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'user_id', as: 'usuarios' });
    this.belongsTo(models.Roles, { foreignKey: 'role_id', as: 'role' });
    this.belongsTo(models.Usuario, {
      foreignKey: 'created_by',
      as: 'autor',
    });
  }
}

export default UserRoles;
