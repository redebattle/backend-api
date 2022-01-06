import Sequelize, { Model } from 'sequelize';

class Postagens extends Model {
  static init(sequelize) {
    super.init(
      {
        titulo: Sequelize.STRING,
        slug: Sequelize.STRING,
        conteudo: Sequelize.STRING,
        link: Sequelize.STRING,
        header: Sequelize.STRING,
        acessos: Sequelize.INTEGER,
        visivel: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Usuario, {
      foreignKey: 'created_by',
      as: 'autor',
    });
    this.belongsTo(models.Categoria, {
      foreignKey: 'categoria_id',
      as: 'categoria',
    });
  }
}

export default Postagens;
