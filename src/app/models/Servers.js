import Sequelize, { Model } from 'sequelize';

class Servers extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        slug: Sequelize.STRING,
        color: Sequelize.STRING,
        image: Sequelize.STRING,
        status: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Servers;
