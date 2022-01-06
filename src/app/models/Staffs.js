import Sequelize, { Model } from 'sequelize';

class Staffs extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        twitter: Sequelize.STRING,
        discord: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Cargos, {
      foreignKey: 'cargo_id',
      as: 'cargos',
    });
  }
}

export default Staffs;
