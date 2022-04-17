import crypto from 'crypto';
import fs from 'fs';
import { resolve } from 'path';

import Queue from '../../lib/Queue';
import CadastroMail from '../jobs/CadastroMail';
import ForgotPasswordMail from '../jobs/ForgotPasswordMail';
import ResendForgotPasswordMail from '../jobs/ResendForgotPasswordMail';
import ResetPasswordEmail from '../jobs/ResetPasswordEmail';
import Medals from '../models/Medals';
import PreUser from '../models/PreRegistrations';
import Roles from '../models/Roles';
import Uploads from '../models/Uploads';
import Users from '../models/Users';
import UsersTokens from '../models/UsersTokens';

class UsuarioController {
  async createPreUser(req, res) {
    try {
      const userExist = await Users.findOne({
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
        where: { email: req.body.email, used: false },
      });

      if (!preUser) {
        return res.status(400).json({
          status: 400,
          sucess: false,
          error: 'Ocorreu um erro durante a execução.',
          message: 'Você não possui um convite para se cadastrar.',
        });
      }

      const userExist = await Users.findOne({
        where: { email: req.body.email },
      });

      const usernameExist = await Users.findOne({
        where: { username: req.body.username },
      });

      if (usernameExist) {
        return res.status(400).json({
          error: 'Já existe um usuário cadastrado com esse username.',
        });
      }

      if (userExist) {
        return res
          .status(400)
          .json({ error: 'Já existe um usuário cadastrado com esse email.' });
      }

      if (
        req.body.level ||
        req.body.nivel === 'ADMIN' ||
        req.body.is_administrator
      ) {
        return res.status(401).json({ error: 'Você não pode fazer isso.' });
      }

      const { id, name, username, email } = await Users.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        refresh_token: 'none',
        token_expires_date: new Date(),
        is_validated: false,
        is_administrator: false,
        is_email_notification_enable: false,
        is_verified: false,
        is_banned: false,
      });
      await preUser.update({ usado: true });

      return res.json({ id, name, username, email });
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Erro ao criar o registro.', message: e.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { email, password } = req.body;

      const user = await Users.findByPk(req.userId);
      // const avatarIsExist = await Uploads.findByPk(req.body.avatar_id);

      if (email !== user.email) {
        const userExists = await Users.findOne({ where: { email } });

        if (userExists) {
          return res
            .status(400)
            .json({ error: 'Já existe um usuário cadastrado com esse email.' });
        }
      }

      // if (!avatarIsExist) {
      //   return res.status(401).json({ error: 'ID do avatar não encontrado.' });
      // }

      if (password && !(await user.checkPassword(password))) {
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
            await fs.unlink(folderDestination, (err, data) => {
              if (err) console.log(err);
            });

            await userAvatar.destroy();
          }
        }
      }

      await user.update(req.body);

      const { id, nome, avatar } = await Users.findByPk(req.userId, {
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
      const usuario = await Users.findByPk(req.userId, {
        attributes: {
          exclude: [
            'avatar_id',
            'password_hash',
            'createdAt',
            'updatedAt',
            'refresh_token',
            'token_expires_date',
          ],
        },
        include: [
          {
            model: Uploads,
            as: 'avatar',
            attributes: ['path', 'url', 'id', 'type'],
          },
          {
            model: Medals,
            as: 'medals',
          },
          {
            model: Roles,
            as: 'roles',
          },
        ],
      });

      if (usuario === null) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      return res.json(usuario);
    } catch (e) {
      return res.status(400).json({
        error: 'Ocorreu um erro na busca do usuário.',
        message: e.message,
      });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await Users.findAll({
        attributes: {
          exclude: [
            'password_hash',
            'email',
            'level',
            'refresh_token',
            'token_expires_date',
            'is_administrator',
            'avatar_id',
            'createdAt',
            'updatedAt',
          ],
        },
        include: [
          {
            model: Medals,
            as: 'medals',
          },
          { model: Uploads, as: 'avatar' },
        ],
      });
      return res.json(users);
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível listar os registros.',
        message: e.message,
      });
    }
  }

  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const usuario = await Users.findOne({ where: { email } });

      if (!usuario) {
        res.status(400).json({ error: 'Usuário não encontrado.' });
      }

      const userID = usuario.id;

      const checkToken = await UsersTokens.findOne({
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
        await UsersTokens.destroy({ where: { id: checkToken.id } });
      }

      const token = crypto.randomBytes(24).toString('HEX');

      const expiracao = new Date();
      expiracao.setHours(expiracao.getHours() + 1);

      await UsersTokens.create({
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
    const { email, token, password } = req.body;

    try {
      const user = await Users.findOne({ where: { email } });
      const getToken = await UsersTokens.findOne({
        where: { token, type: 'forgotpassword', used: false },
      });

      if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado.' });
      }

      if (!getToken) {
        return res.status(400).json({ error: 'Token inserido é inválido.' });
      }

      if (await user.checkPassword(req.body.password)) {
        return res
          .status(401)
          .json({ error: 'Você não pode utilizar a mesma senha.' });
      }

      const now = new Date();

      if (now > getToken.expired_at) {
        return res.status(400).json({ error: 'Token expirado.' });
      }

      user.password = password;
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
    const user = await Users.findOne({ where: { email } });
    const now = new Date();

    try {
      if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado.' });
      }

      const getToken = await UsersTokens.findOne({
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
}
export default new UsuarioController();
