import { response } from 'express';

import axios from 'axios';
import dateFormat from 'dateformat';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import Queue from '../../lib/Queue';
import NewSessionMail from '../jobs/NewSessionMail';
import Medals from '../models/Medals';
import Uploads from '../models/Uploads';
import Users from '../models/Users';
import UsersSessionLogs from '../models/UsersSessionLogs';

class SessionController {
  async createSession(req, res) {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    try {
      const { email, password, recaptcha_token } = req.body;
      const { ipInfo } = req;
      const horario = dateFormat(new Date(), 'dd/mm/yyyy "às" hh:MM:ss');

      // const verifyHuman = await axios.get(
      //   `https://google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptcha_token}`
      // );

      // const responseRecaptcha = verifyHuman.data;

      // if (
      //   responseRecaptcha.success !== undefined &&
      //   !responseRecaptcha.success
      // ) {
      //   return res.status(401).json({
      //     success: false,
      //     message: 'Failed captcha verification',
      //     data: responseRecaptcha,
      //   });
      // }

      const usuario = await Users.findOne({
        where: { email },
        include: [
          {
            model: Uploads,
            as: 'avatar',
            attributes: ['url'],
          },
        ],
      });

      if (!usuario) {
        return res.status(401).json({
          status: 401,
          success: false,
          type: 'Session.Accounts.Unauthorized.Session',
          error: 'Ocorreu um erro durante a execução.',
          message: 'Email e/ou senha inválidos.',
          instance: '/api/v1/auth/login',
        });
      }

      if (!(await usuario.checkPassword(password))) {
        return res.status(401).json({
          status: 401,
          success: false,
          type: 'Session.Accounts.Unauthorized.Session',
          error: 'Ocorreu um erro durante a execução.',
          message: 'Email e/ou senha inválidos.',
          instance: '/api/v1/auth/login',
        });
      }

      const { id, name, avatar, is_administrator } = usuario;

      const refreshToken = await jwt.sign({ id }, authConfig.refreshSecret, {
        expiresIn: authConfig.refreshExpires,
      });

      const refreshExpiracao = new Date();
      refreshExpiracao.setHours(
        refreshExpiracao.getHours() + process.env.AUTH_REFRESH_EXPIRES_AUX * 24
      );

      await usuario.update({
        refresh_token: refreshToken,
        token_expires_date: refreshExpiracao,
      });

      await UsersSessionLogs.create({
        user_id: usuario.id,
        ip:
          req.header('x-forwarded-for') ||
          req.connection.remoteAddress ||
          req.ip ||
          'Não Informado',
      });

      // await Queue.add(NewSessionMail.key, {
      //   usuario,
      //   ipInfo,
      //   horario,
      // });

      return res.json({
        user: {
          id,
          name,
          email,
          avatar,
          is_administrator,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
        refresh_token: refreshToken,
        // responseRecaptcha,
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Session.Accounts.Unexpected.Create',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro na autenticação.',
        details: e.message,
        instance: '/api/v1/auth/login',
      });
    }
  }

  async refreshToken(req, res) {
    const { token } = req.body;

    try {
      const decode = jwt.verify(token, authConfig.refreshSecret);
      const user_id = decode.sub;

      const userToken = await UsersTokens.findOne({
        where: { user_id, refresh_token: token },
      });

      if (!userToken) {
        return res.status(404).json({ error: 'Refresh Token não existe.' });
      }
      return res.status(400);
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Ocorreu um erro.', message: e.message });
    }
  }

  async getAccountsLog(req, res) {
    try {
      const logs = await UsersSessionLogs.findAll({
        order: [['id', 'desc']],
        include: [
          {
            model: Users,
            as: 'user',
            include: [
              { model: Uploads, as: 'avatar' },
              { model: Medals, as: 'medals' },
            ],
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
          },
        ],
      });
      if (!logs) {
        return res.status(404).json({
          status: 404,
          type: 'Session.Accounts.NotFound.Logs',
          title: 'Ocorreu um erro durante a execução.',
          message: 'Nenhum registro encontrado.',
          details: 'Não foi encontrado registros no banco de dados.',
          instance: '/api/v1/sessions/log',
        });
      }
      return res.json(logs);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        type: 'Session.Accounts.Unexpected.Logs',
        title: 'Ocorreu um erro durante a execução.',
        message: 'Não foi possível listar os registros.',
        details: e.message,
        instance: '/api/v1/sessions/log',
      });
    }
  }
}
export default new SessionController();
