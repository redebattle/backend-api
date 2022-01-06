import bcrypt from 'bcryptjs';
import Sequelize, { Model } from 'sequelize';

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        senha: Sequelize.VIRTUAL,
        confirmarsenha: Sequelize.VIRTUAL,
        senha_hash: Sequelize.STRING,
        nivel: Sequelize.STRING,
        minotar: {
          type: Sequelize.VIRTUAL,
          get() {
            return `https://minotar.net/helm/${this.nome}/100.png`;
          },
        },
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async (user) => {
      if (user.senha) {
        user.senha_hash = await bcrypt.hash(user.senha, 8);
      }
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Uploads, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.senha_hash);
  }
}

export default Usuario;
