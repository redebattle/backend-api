import Sequelize, { Model } from 'sequelize';

class PostArticle extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        content: Sequelize.STRING,
        slug: Sequelize.STRING,
        banner_url: Sequelize.STRING,
        active: Sequelize.BOOLEAN,
        link: Sequelize.STRING,
        is_external: Sequelize.BOOLEAN,
        allow_comments: Sequelize.BOOLEAN,
        pinned: Sequelize.BOOLEAN,
        edited: Sequelize.BOOLEAN,
        access: Sequelize.INTEGER,
        total_comments: Sequelize.INTEGER,
        total_reactions: Sequelize.INTEGER,
      },
      {
        tableName: 'posts_articles',
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Users, {
      foreignKey: 'created_by',
      as: 'author',
    });
    this.belongsTo(models.PostCategory, {
      foreignKey: 'category_id',
      as: 'category',
    });
  }
}

export default PostArticle;
