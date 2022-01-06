import Sequelize, { Model } from 'sequelize';

class Autores extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        profissao: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Uploads, {
      foreignKey: 'avatar_id',
      as: 'avatar',
    });
  }
}

export default Autores;
