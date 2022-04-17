import Sequelize, { Model } from 'sequelize';

class PostCategory extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        color: Sequelize.STRING,
      },
      {
        tableName: 'posts_categories',
        sequelize,
      }
    );
    return this;
  }
}

export default PostCategory;
