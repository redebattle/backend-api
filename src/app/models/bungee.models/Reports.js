import Sequelize, { Model } from 'sequelize';

class Reports extends Model {
  static init(sequelize) {
    super.init(
      {
        report_id: { type: Sequelize.INTEGER, primaryKey: true },
        status: Sequelize.STRING,
        appreciation: Sequelize.STRING,
        date: Sequelize.STRING,
        reported_uuid: Sequelize.STRING,
        reporter_uuid: Sequelize.STRING,
        reason: Sequelize.STRING,
        reported_location: Sequelize.STRING,
        reported_messages: Sequelize.TEXT,
        reported_gamemode: Sequelize.STRING,
        reported_on_ground: Sequelize.STRING,
        reported_sneak: Sequelize.STRING,
        reported_sprint: Sequelize.STRING,
        reported_health: Sequelize.STRING,
        reported_food: Sequelize.STRING,
        reported_effects: Sequelize.TEXT,
        reporter_location: Sequelize.TEXT,
        reporter_messages: Sequelize.TEXT,
        archived: Sequelize.TINYINT,
      },
      {
        tableName: 'tigerreports_reports',
        timestamps: false,
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.ReportsUsers, {
      foreignKey: 'reported_uuid',
      targetKey: 'uuid',
      as: 'reported',
    });
    this.belongsTo(models.ReportsUsers, {
      foreignKey: 'reporter_uuid',
      targetKey: 'uuid',
      as: 'reporter',
    });
    this.belongsTo(models.ReportsComments, {
      foreignKey: 'report_id',
      targetKey: 'report_id',
      as: 'comments',
    });
  }
}

export default Reports;
