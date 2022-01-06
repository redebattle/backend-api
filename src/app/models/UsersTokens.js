import { Model, Sequelize } from 'sequelize';

class UsersTokens extends Model {
  static init(sequelize) {
    super.init(
      {
        refresh_token: Sequelize.STRING,
        expires_date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'user_id', as: 'usuarios' });
  }
}

export default UsersTokens;
