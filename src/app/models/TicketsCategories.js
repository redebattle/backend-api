import Sequelize, { Model } from 'sequelize';

class TicketsCategories extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
      },
      {
        tableName: 'tickets_categories',
        sequelize,
      }
    );
    return this;
  }
}

export default TicketsCategories;
