import crypto from 'crypto';
import fs from 'fs';
import { resolve } from 'path';

import Queue from '../../lib/Queue';
import CadastroMail from '../jobs/CadastroMail';
import ForgotPasswordMail from '../jobs/ForgotPasswordMail';
import ResendForgotPasswordMail from '../jobs/ResendForgotPasswordMail';
import ResetPasswordEmail from '../jobs/ResetPasswordEmail';
import PreUser from '../models/PreUsers';
import Roles from '../models/Roles';
import Tokens from '../models/Tokens';
import Uploads from '../models/Uploads';
import UserRoles from '../models/UserRoles';
import Usuario from '../models/Usuario';

class UsuarioController {
  async createPreUser(req, res) {
    try {
      const userExist = await Usuario.findOne({
        where: { email: req.body.email },
      });

      if (userExist) {
        return res.status(400).json({ error: 'Email já cadastrado.' });
      }

      const preUser = await PreUser.findOne({
        where: { email: req.body.email },
      });

      if (preUser) {
        return res.status(400).json({ error: 'Email já cadastrado na lista.' });
      }

      const cadastroUrl = `${process.env.FRONT_URL}/auth/cadastro?email=${req.body.email}`;

      await Queue.add(CadastroMail.key, {
        usuario: req.body.email,
        cadastroUrl,
      });

      const create = await PreUser.create({
        email: req.body.email,
        created_by: req.userId,
      });

      return res.json(create);
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Erro ao criar o registro.', message: e.message });
    }
  }

  async createUser(req, res) {
    try {
      const preUser = await PreUser.findOne({
        where: { email: req.body.email, usado: false },
      });

      if (!preUser) {
        return res
          .status(400)
          .json({ error: 'Você não possui um convite para se cadastrar.' });
      }

      const userExist = await Usuario.findOne({
        where: { email: req.body.email },
      });

      if (userExist) {
        return res
          .status(400)
          .json({ error: 'Já existe um usuário cadastrado com esse email.' });
      }

      if (req.body.nivel || req.body.nivel === 'ADMIN') {
        return res.status(401).json({ error: 'Você não pode fazer isso.' });
      }

      const { id, nome, email } = await Usuario.create(req.body);
      await preUser.update({ usado: true });

      return res.json({ id, nome, email });
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Erro ao criar o registro.', message: e.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { email, senhaatual } = req.body;

      const user = await Usuario.findByPk(req.userId);
      // const avatarIsExist = await Uploads.findByPk(req.body.avatar_id);

      if (email !== user.email) {
        const userExists = await Usuario.findOne({ where: { email } });

        if (userExists) {
          return res
            .status(400)
            .json({ error: 'Já existe um usuário cadastrado com esse email.' });
        }
      }

      // if (!avatarIsExist) {
      //   return res.status(401).json({ error: 'ID do avatar não encontrado.' });
      // }

      if (senhaatual && !(await user.checkPassword(senhaatual))) {
        return res.status(401).json({ error: 'Senha atual incorreta.' });
      }

      if (req.body.avatar_id) {
        if (user.avatar_id !== null) {
          const userAvatar = await Uploads.findByPk(user.avatar_id);
          const folderDestination = resolve(
            __dirname,
            '..',
            '..',
            '..',
            'tmp',
            'uploads',
            'img',
            userAvatar.path
          );

          const avatarExist = await fs.promises.stat(folderDestination);

          if (avatarExist) {
            const newAvatarExist = await Uploads.findByPk(req.body.avatar_id);

            if (user.avatar_id === req.body.avatar_id) {
              return res.send();
            }

            if (!newAvatarExist) {
              return res
                .status(400)
                .json({ error: 'ID do avatar não encontrado.' });
            }

            // eslint-disable-next-line no-unused-vars
            await fs.unlink(folderDestination, function (err, data) {
              if (err) console.log(err);
            });

            await userAvatar.destroy();
          }
        }
      }

      await user.update(req.body);

      const { id, nome, avatar } = await Usuario.findByPk(req.userId, {
        include: [
          {
            model: Uploads,
            as: 'avatar',
            attributes: ['path', 'url', 'id', 'tipo'],
          },
        ],
      });

      return res.json({
        id,
        nome,
        email,
        avatar,
      });
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Erro ao atualizar o registro.', message: e.message });
    }
  }

  async showUser(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.userId, {
        attributes: {
          exclude: ['avatar_id', 'senha_hash', 'createdAt', 'updatedAt', 'id'],
        },
        include: [
          {
            model: Uploads,
            as: 'avatar',
            attributes: ['path', 'url', 'id', 'tipo'],
          },
        ],
      });

      const roles = await UserRoles.findAndCountAll({
        include: [{ model: Roles, as: 'role', attributes: ['nome', 'id'] }],
        where: { user_id: req.userId },
        attributes: [],
      });

      return res.json({
        usuario,
        permissoes: roles,
      });
    } catch (e) {
      return res.status(400).json({
        error: 'Ocorreu um erro na busca do usuário.',
        message: e.message,
      });
    }
  }

  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario) {
        res.status(400).json({ error: 'Usuário não encontrado.' });
      }

      const userID = usuario.id;

      const checkToken = await Tokens.findOne({
        where: { user_id: userID, type: 'forgotpassword', used: false },
      });

      if (checkToken) {
        if (checkToken.expired_at > new Date()) {
          // fazer função reenviar email
          return res.status(400).json({
            error:
              'Já existe um pedido de recuperação para essa conta. Verifique seu email.',
          });
        }
        await Tokens.destroy({ where: { id: checkToken.id } });
      }

      const token = crypto.randomBytes(24).toString('HEX');

      const expiracao = new Date();
      expiracao.setHours(expiracao.getHours() + 1);

      await Tokens.create({
        token,
        type: 'forgotpassword',
        user_id: userID,
        expired_at: expiracao,
      });

      const resetPasswordUrl = `${process.env.FRONT_URL}/admin/auth/reset-password?token=${token}&email=${usuario.email}`;

      await Queue.add(ForgotPasswordMail.key, {
        usuario,
        resetPasswordUrl,
      });

      return res.json({
        sucess:
          'Um email com as instruções para a recuperação de senha foi enviado.',
      });
    } catch (e) {
      return res.status(400).json({
        error: 'Ocorreu um erro ao tentar recuperar a senha.',
        message: e.message,
      });
    }
  }

  async resetPassword(req, res) {
    const { email, token, senha } = req.body;

    try {
      const user = await Usuario.findOne({ where: { email } });
      const getToken = await Tokens.findOne({
        where: { token, type: 'forgotpassword', used: false },
      });

      if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado.' });
      }

      if (!getToken) {
        return res.status(400).json({ error: 'Token inserido é inválido.' });
      }

      if (await user.checkPassword(req.body.senha)) {
        return res
          .status(401)
          .json({ error: 'Você não pode utilizar a mesma senha.' });
      }

      const now = new Date();

      if (now > getToken.expired_at) {
        return res.status(400).json({ error: 'Token expirado.' });
      }

      user.senha = senha;
      await user.save();

      getToken.used = true;
      await getToken.save();

      await Queue.add(ResetPasswordEmail.key, {
        user,
      });

      return res.json({ sucess: 'Senha alterada com sucesso!' });
    } catch (e) {
      return res.status(400).json({
        error: 'Ocorreu um erro ao tentar resetar a senha.',
        message: e.message,
      });
    }
  }

  async resendEmailForgotPassword(req, res) {
    const { email } = req.body;
    const user = await Usuario.findOne({ where: { email } });
    const now = new Date();

    try {
      if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado.' });
      }

      const getToken = await Tokens.findOne({
        where: { user_id: user.id, type: 'forgotpassword', used: false },
      });

      if (!getToken) {
        return res.status(400).json({
          error:
            'Não foi encontrado um pedido de recuperação de senha para essa conta.',
        });
      }

      const newExpire = new Date();
      newExpire.setHours(now.getHours() + 1);

      getToken.expired_at = newExpire;
      await getToken.save();

      const resetPasswordUrl = `${process.env.FRONT_URL}/admin/auth/reset-password?token=${getToken.token}&email=${user.email}`;

      await Queue.add(ResendForgotPasswordMail.key, {
        user,
        resetPasswordUrl,
      });

      return res.json({ sucess: 'O email foi reenviado.' });
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Ocorreu um erro.', message: e.message });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await Usuario.findAll({
        attributes: {
          exclude: [
            'senha_hash',
            'email',
            'nivel',
            'avatar_id',
            'createdAt',
            'updatedAt',
            'minotar',
          ],
        },
      });
      return res.json(users);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível listar os registros.',
        message: e.message,
      });
    }
  }
}
export default new UsuarioController();
