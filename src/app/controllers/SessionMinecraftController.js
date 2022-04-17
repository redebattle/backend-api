import { response } from 'express';

import axios from 'axios';
import dateFormat from 'dateformat';
import jwt from 'jsonwebtoken';
import nLogin from 'nlogin';

import authConfig from '../../config/auth';
import Queue from '../../lib/Queue';
import NewSessionMail from '../jobs/NewSessionMail';
import Medals from '../models/Medals';
import Uploads from '../models/Uploads';
import Users from '../models/Users';
import UsersSessionLogs from '../models/UsersSessionLogs';

class SessionMinecraftController {
  async createSession(req, res) {
    try {
      const secret = process.env.RECAPTCHA_SECRET_KEY;
      const { username, password, recaptcha_token } = req.body;
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
        where: { username },
        include: [
          {
            model: Uploads,
            as: 'avatar',
            attributes: ['url'],
          },
        ],
      });

      if (!usuario) {
        const nloginInstance = new nLogin(
          process.env.DB_HOST_BUNGEE,
          process.env.DB_USER_BUNGEE,
          process.env.DB_PASS_BUNGEE,
          process.env.DB_NAME_BUNGEE,
          (err) => {
            console.log(err == null ? 'Connected!' : 'Error connecting!');
          }
        );

        nloginInstance.checkPassword(username, password, async (callback) => {
          if (callback) {
            const cadastro = await Users.create({
              name: req.body.username,
              username,
              email: 'none',
              password,
              refresh_token: 'none',
              token_expires_date: new Date(),
              is_validated: false,
              is_administrator: false,
              is_email_notification_enable: false,
              is_verified: false,
              is_banned: false,
            });
          }
        });

        return res.json({ error: 'Usuário/Senha inválidos.' });
      }
      const nloginInstance = new nLogin(
        process.env.DB_HOST_BUNGEE,
        process.env.DB_USER_BUNGEE,
        process.env.DB_PASS_BUNGEE,
        process.env.DB_NAME_BUNGEE,
        (err) => {
          console.log(err == null ? 'Connected!' : 'Error connecting!');
        }
      );
      nloginInstance.checkPassword(username, password, (callback) => {
        if (callback) {
          const { id, name, email } = usuario;
          return res.json({
            user: {
              id,
              username,
              name,
              email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
              expiresIn: authConfig.expiresIn,
            }),
          });
        }
        return res.status(400).json({ error: 'Usuário/Senha inválidos.' });
      });
    } catch (e) {
      return res
        .status(400)
        .json({ error: 'Ocorreu um erro.', message: e.message });
    }
  }
  // async createSession(req, res) {
  //   const secret = process.env.RECAPTCHA_SECRET_KEY;
  //   try {
  //     const { username, password, recaptcha_token } = req.body;
  //     const { ipInfo } = req;
  //     const horario = dateFormat(new Date(), 'dd/mm/yyyy "às" hh:MM:ss');
  //     // const verifyHuman = await axios.get(
  //     //   `https://google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptcha_token}`
  //     // );
  //     // const responseRecaptcha = verifyHuman.data;
  //     // if (
  //     //   responseRecaptcha.success !== undefined &&
  //     //   !responseRecaptcha.success
  //     // ) {
  //     //   return res.status(401).json({
  //     //     success: false,
  //     //     message: 'Failed captcha verification',
  //     //     data: responseRecaptcha,
  //     //   });
  //     // }
  //     const usuario = await Users.findOne({
  //       where: { username },
  //       include: [
  //         {
  //           model: Uploads,
  //           as: 'avatar',
  //           attributes: ['url'],
  //         },
  //       ],
  //     });
  //     if (!usuario) {
  //       const nloginInstance = new nLogin(
  //         process.env.DB_HOST_BUNGEE,
  //         process.env.DB_USER_BUNGEE,
  //         process.env.DB_PASS_BUNGEE,
  //         process.env.DB_NAME_BUNGEE,
  //         (err) => {
  //           console.log(err == null ? 'Connected!' : 'Error connecting!');
  //         }
  //       );
  //       nloginInstance.checkPassword(
  //         username,
  //         password,
  //         async (isCorrectPass) => {
  //           console.log(isCorrectPass);
  //           if (isCorrectPass) {
  //               const cadastro = await Users.create({
  //                 name: req.body.username,
  //                 username,
  //                 email: 'none',
  //                 password,
  //                 refresh_token: 'none',
  //                 token_expires_date: new Date(),
  //                 is_validated: false,
  //                 is_administrator: false,
  //                 is_email_notification_enable: false,
  //                 is_verified: false,
  //                 is_banned: false,
  //               });
  //               console.log(cadastro);
  //             }
  //           }
  //         }
  //       );
  //     }
  //     const refreshToken = await jwt.sign({ id }, authConfig.refreshSecret, {
  //       expiresIn: authConfig.refreshExpires,
  //     });
  //     const refreshExpiracao = new Date();
  //     refreshExpiracao.setHours(
  //       refreshExpiracao.getHours() + process.env.AUTH_REFRESH_EXPIRES_AUX * 24
  //     );
  //     await usuario.update({
  //       refresh_token: refreshToken,
  //       token_expires_date: refreshExpiracao,
  //     });
  //     await UsersSessionLogs.create({
  //       user_id: usuario.id,
  //       ip:
  //         req.header('x-forwarded-for') ||
  //         req.connection.remoteAddress ||
  //         req.ip ||
  //         'Não Informado',
  //     });
  //     // await Queue.add(NewSessionMail.key, {
  //     //   usuario,
  //     //   ipInfo,
  //     //   horario,
  //     // });
  //     return res.json({
  //       user: {
  //         id,
  //         name,
  //         email,
  //         avatar,
  //       },
  //       token: jwt.sign({ id }, authConfig.secret, {
  //         expiresIn: authConfig.expiresIn,
  //       }),
  //       refresh_token: refreshToken,
  //       // responseRecaptcha,
  //     });
  //   } catch (e) {
  //     return res.status(400).json({
  //       status: 400,
  //       success: false,
  //       type: 'Session.Accounts.Unexpected.Create',
  //       error: 'Ocorreu um erro durante a execução.',
  //       message: 'Ocorreu um erro na autenticação.',
  //       details: e.message,
  //       instance: '/api/v1/auth/login',
  //     });
  //   }
  // }
}
export default new SessionMinecraftController();
