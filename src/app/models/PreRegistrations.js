import Sequelize, { Model } from 'sequelize';

class PreRegistrations extends Model {
  static init(sequelize) {
    super.init(
      {
        email: Sequelize.STRING,
        used: Sequelize.BOOLEAN,
      },
      {
        tableName: 'pre_registrations',
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'created_by' });
  }
}

export default PreRegistrations;
