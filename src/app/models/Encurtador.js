import Sequelize, { Model } from 'sequelize';

class Encurtador extends Model {
  static init(sequelize) {
    super.init(
      {
        original_url: Sequelize.STRING,
        short_url: Sequelize.STRING,
        slug: Sequelize.STRING,
        acess: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Encurtador;
