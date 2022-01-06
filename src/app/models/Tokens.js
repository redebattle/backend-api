import Sequelize, { Model } from 'sequelize';

class Tokens extends Model {
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
    this.belongsTo(models.Usuario, { foreignKey: 'user_id', as: 'usuarios' });
  }
}

export default Tokens;
