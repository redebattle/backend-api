import Sequelize, { Model } from 'sequelize';

class ChangelogCategories extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        color: Sequelize.STRING,
        image: Sequelize.STRING,
        position: Sequelize.INTEGER,
        status: Sequelize.BOOLEAN,
      },
      {
        tableName: 'changelog_categories',
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.ChangelogPosts, {
      through: 'changelog_post_category',
      as: 'changelog',
      foreignKey: 'category_id',
    });
  }
}

export default ChangelogCategories;
