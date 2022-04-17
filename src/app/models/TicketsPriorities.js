import Sequelize, { Model } from 'sequelize';

class TicketsPriorities extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        color: Sequelize.STRING,
        urgency: Sequelize.STRING,
        is_public: Sequelize.BOOLEAN,
        status: Sequelize.BOOLEAN,
      },
      {
        tableName: 'tickets_priorities',
        sequelize,
      }
    );
    return this;
  }
}

export default TicketsPriorities;
