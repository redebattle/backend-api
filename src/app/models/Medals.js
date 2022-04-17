import Sequelize, { Model } from 'sequelize';

class Medals extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        image: Sequelize.STRING,
        status: Sequelize.BOOLEAN,
        position: Sequelize.INTEGER,
      },
      {
        tableName: 'medals',
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.MedalsCategories, {
      foreignKey: 'category_id',
      as: 'category',
    });
  }
}

export default Medals;
