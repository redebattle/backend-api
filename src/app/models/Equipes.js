import Sequelize, { Model } from 'sequelize';

class Equipes extends Model {
  static init(sequelize) {
    super.init(
      {
        cargo_id: Sequelize.INTEGER,
        staff_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Staffs, {
      foreignKey: 'staff_id',
      as: 'staffs',
    });

    this.belongsTo(models.Cargos, {
      foreignKey: 'cargo_id',

    });
  }
}

export default Equipes;
