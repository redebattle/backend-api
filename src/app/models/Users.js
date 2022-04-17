import bcrypt from 'bcryptjs';
import Sequelize, { Model } from 'sequelize';

class Users extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        username: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        confirm_password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        refresh_token: Sequelize.STRING,
        token_expires_date: Sequelize.DATE,
        level: Sequelize.STRING,
        is_validated: Sequelize.BOOLEAN,
        is_administrator: Sequelize.BOOLEAN,
        is_email_notification_enable: Sequelize.BOOLEAN,
        is_verified: Sequelize.BOOLEAN,
        is_banned: Sequelize.BOOLEAN,
        minecraft_avatar: {
          type: Sequelize.VIRTUAL,
          get() {
            return `https://minotar.net/helm/${this.username}/100.png`;
          },
        },
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Uploads, { foreignKey: 'avatar_id', as: 'avatar' });

    this.belongsToMany(models.Medals, {
      through: 'medals_users',
      as: 'medals',
      foreignKey: 'user_id',
    });

    this.belongsToMany(models.Roles, {
      through: 'UserRoles',
      as: 'roles',
      foreignKey: 'user_id',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Users;
