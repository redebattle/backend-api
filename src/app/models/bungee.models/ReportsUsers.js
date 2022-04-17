import Sequelize, { Model } from 'sequelize';

class ReportsUsers extends Model {
  static init(sequelize) {
    super.init(
      {
        uuid: { type: Sequelize.STRING, primaryKey: true },
        name: Sequelize.STRING,
        cooldown: Sequelize.STRING,
        immunity: Sequelize.STRING,
        notifications: Sequelize.TEXT,
        true_appreciations: Sequelize.INTEGER,
        uncertain_appreciations: Sequelize.INTEGER,
        false_appreciations: Sequelize.INTEGER,
        reports: Sequelize.INTEGER,
        reported_times: Sequelize.INTEGER,
        processed_reports: Sequelize.INTEGER,
      },
      {
        tableName: 'tigerreports_users',
        timestamps: false,
        sequelize,
      }
    );
    return this;
  }
}

export default ReportsUsers;
