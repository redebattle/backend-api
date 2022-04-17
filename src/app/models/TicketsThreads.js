import Sequelize, { Model } from 'sequelize';

class TicketsThreads extends Model {
  static init(sequelize) {
    super.init(
      {
        agent: Sequelize.STRING,
        content: Sequelize.STRING,
        is_internal: Sequelize.BOOLEAN,
        ip_address: Sequelize.STRING,
        reaction: Sequelize.STRING,
      },
      {
        tableName: 'tickets_threads',
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}

export default TicketsThreads;
