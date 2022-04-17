import Sequelize, { Model } from 'sequelize';

class ChangelogFeedbacks extends Model {
  static init(sequelize) {
    super.init(
      {
        reaction: Sequelize.STRING,
        content: Sequelize.STRING,
      },
      {
        tableName: 'changelog_feedbacks',
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'author_id', as: 'author' });
    this.belongsTo(models.ChangelogPosts, {
      foreignKey: 'changelog_id',
      as: 'changelog',
    });
  }
}

export default ChangelogFeedbacks;
