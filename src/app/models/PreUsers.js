import Sequelize, { Model } from 'sequelize';

class PreUsers extends Model {
  static init(sequelize) {
    super.init(
      {
        email: Sequelize.STRING,
        usado: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuario, { foreignKey: 'created_by' });
  }
}

export default PreUsers;
