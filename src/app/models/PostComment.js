import Sequelize, { Model } from 'sequelize';

class PostComment extends Model {
  static init(sequelize) {
    super.init(
      {
        content: Sequelize.STRING,
        edited: Sequelize.STRING,
      },
      {
        tableName: 'posts_comments',
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
    this.belongsTo(models.PostArticle, {
      foreignKey: 'post_id',
      as: 'post',
    });
  }
}

export default PostComment;
