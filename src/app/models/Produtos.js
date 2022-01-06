import Sequelize, { Model } from 'sequelize';

class Produtos extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        valor: Sequelize.DECIMAL,
        imagem: Sequelize.STRING,
        descricao: Sequelize.STRING,
        comandos: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Servidores, {
      foreignKey: 'servidor_id',
      as: 'servidor',
    });
  }
}

export default Produtos;
