import Sequelize, { Model } from 'sequelize';

class Uploads extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        path: Sequelize.STRING,
        tamanho: Sequelize.NUMBER,
        tipo: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/uploads/${this.tipo}/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Uploads;
