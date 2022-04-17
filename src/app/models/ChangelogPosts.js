import Sequelize, { Model } from 'sequelize';

class ChangelogPosts extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        content: Sequelize.STRING,
        access: Sequelize.INTEGER,
        status: Sequelize.BOOLEAN,
        pinned: Sequelize.BOOLEAN,
      },
      {
        tableName: 'changelog_posts',
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'author_id', as: 'author' });

    this.belongsToMany(models.ChangelogCategories, {
      through: 'changelog_post_category',
      as: 'categories',
      foreignKey: 'changelog_id',
    });
  }
}

export default ChangelogPosts;
