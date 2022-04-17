import Sequelize, { Model } from 'sequelize';

class ReportsComments extends Model {
  static init(sequelize) {
    super.init(
      {
        comment_id: { type: Sequelize.INTEGER, primaryKey: true },
        report_id: Sequelize.INTEGER,
        status: Sequelize.STRING,
        date: Sequelize.STRING,
        author: Sequelize.STRING,
        message: Sequelize.TEXT,
      },
      {
        tableName: 'tigerreports_comments',
        timestamps: false,
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.ReportsUsers, {
      foreignKey: 'author',
      targetKey: 'uuid',
      as: 'user',
    });
  }
}

export default ReportsComments;
