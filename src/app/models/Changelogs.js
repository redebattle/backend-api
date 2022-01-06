import Sequelize, { Model } from 'sequelize';

class Changelogs extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: Sequelize.STRING,
        topicos: Sequelize.STRING,
        categoria: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Changelogs;
