import Sequelize, { Model } from 'sequelize';

class MedalsCategories extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        position: Sequelize.INTEGER,
        status: Sequelize.BOOLEAN,
      },
      {
        tableName: 'medals_categories',
        sequelize,
      }
    );
    return this;
  }
}

export default MedalsCategories;
