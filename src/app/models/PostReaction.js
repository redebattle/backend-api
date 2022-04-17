import { Model } from 'sequelize';

class PostReaction extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        tableName: 'posts_reactions',
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

export default PostReaction;
