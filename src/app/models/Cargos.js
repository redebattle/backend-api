import Sequelize, { Model } from 'sequelize';

class Cargos extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        posicao: Sequelize.INTEGER,
        cor: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Users, {
      foreignKey: 'created_by',
      as: 'author',
    });
  }
}

export default Cargos;
