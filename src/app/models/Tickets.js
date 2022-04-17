import Sequelize, { Model } from 'sequelize';

class Tickets extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        unread: Sequelize.BOOLEAN,
        closed: Sequelize.BOOLEAN,
        closed_at: Sequelize.DATE,
        reopened: Sequelize.BOOLEAN,
        reopened_at: Sequelize.DATE,
        is_answered: Sequelize.BOOLEAN,
        is_deleted: Sequelize.BOOLEAN,
        deleted_at: Sequelize.DATE,
        last_message_at: Sequelize.DATE,
        last_response_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.TicketsCategories, {
      foreignKey: 'category_id',
      as: 'category',
    });
    this.belongsTo(models.TicketsPriorities, {
      foreignKey: 'priority_id',
      as: 'priority',
    });
    this.belongsTo(models.TicketsStatus, {
      foreignKey: 'status_id',
      as: 'status',
    });
    this.belongsTo(models.Users, {
      foreignKey: 'author_id',
      as: 'author',
    });
    this.belongsTo(models.Users, {
      foreignKey: 'reopened_by',
      as: 'user',
    });
    this.belongsTo(models.Uploads, {
      foreignKey: 'attachment_id',
      as: 'attachment',
    });
    this.belongsTo(models.Servers, {
      foreignKey: 'server_id',
      as: 'server',
    });
  }
}

export default Tickets;
