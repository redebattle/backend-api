import Sequelize, { Model } from 'sequelize';

class Categoria extends Model {
  static init(sequelize) {
    super.init(
      {
        codigo: Sequelize.INTEGER,
        descricao: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Categoria;
