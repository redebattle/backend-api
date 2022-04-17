import Sequelize, { Model } from 'sequelize';

class TicketsStatus extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        color: Sequelize.STRING,
        status: Sequelize.BOOLEAN,
      },
      {
        tableName: 'tickets_status',
        sequelize,
      }
    );
    return this;
  }
}

export default TicketsStatus;
