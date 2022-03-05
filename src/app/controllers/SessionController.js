import { response } from 'express';

import axios from 'axios';
import dateFormat from 'dateformat';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import Queue from '../../lib/Queue';
import NewSessionMail from '../jobs/NewSessionMail';
import LogsAccounts from '../models/LogsAccounts';
import Uploads from '../models/Uploads';
import UsersTokens from '../models/UsersTokens';
import Usuario from '../models/Usuario';

class SessionController {
  async createSession(req, res) {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    try {
      const { email, senha, recaptchaToken } = req.body;

      const verifyHuman = await axios.get(
        `https://google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptchaToken}`
      );

      const responseRecaptcha = verifyHuman.data;

      if (
        responseRecaptcha.success !== undefined &&
        !responseRecaptcha.success
      ) {
        return res.status(401).json({
          success: false,
          message: 'Failed captcha verification',
          data: responseRecaptcha,
        });
      }

      const usuario = await Usuario.findOne({
        where: { email },
        include: [
          {
            model: Uploads,
            as: 'avatar',
            attributes: ['path', 'url', 'id', 'tipo'],
          },
        ],
      });

      if (!usuario) {
        return res.status(401).json({
          status: 401,
          type: 'Session.Accounts.Unauthorized.Session',
          message: 'Email e/ou senha inválidos.',
          instance: '/api/v1/auth/login',
        });
      }

      if (!(await usuario.checkPassword(senha))) {
        return res.status(401).json({
          status: 401,
          type: 'Session.Accounts.Unauthorized.Session',
          message: 'Email e/ou senha inválidos.',
          instance: '/api/v1/auth/login',
        });
      }

      const { id, nome, avatar } = usuario;
      const { ipInfo } = req;

      const horario = dateFormat(new Date(), 'dd/mm/yyyy "às" hh:MM:ss');

      const refreshToken = await jwt.sign({ id }, authConfig.refreshSecret, {
        expiresIn: authConfig.refreshExpires,
      });

      const refreshExpiracao = new Date();
      refreshExpiracao.setHours(
        refreshExpiracao.getHours() + process.env.AUTH_REFRESH_EXPIRES_AUX * 24
      );

      await UsersTokens.create({
        user_id: id,
        refresh_token: refreshToken,
        expires_date: refreshExpiracao,
      });

      await LogsAccounts.create({
        user_id: usuario.id,
        ip: req.ipInfo,
      });

      // await Queue.add(NewSessionMail.key, {
      //   usuario,
      //   ipInfo,
      //   horario,
      // });

      return res.json({
        user: {
          id,
          nome,
          email,
          avatar,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
        refresh_token: refreshToken,
        responseRecaptcha,
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        type: 'Session.Accounts.Unexpected.Create',
        title: 'Ocorreu um erro durante a execução.',
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
      const logs = await LogsAccounts.findAll({ order: [['id', 'desc']] });
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
