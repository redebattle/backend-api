import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

import nLoginController from '../../app/controllers/nLoginController';
import SessionController from '../../app/controllers/SessionController';
import UsuarioController from '../../app/controllers/UsuarioController';
import validateSessionCreate from '../../app/validators/Session/SessionCreate';
import validateForgotPasswordCreate from '../../app/validators/User/forgotPasswordCreate';
import validatePreUser from '../../app/validators/User/PreUser';
import validateResetPasswordCreate from '../../app/validators/User/resetPasswordCreate';
import validateUserCreate from '../../app/validators/User/UserCreate';
import validateUserUpdate from '../../app/validators/User/UserUpdate';

export default (routes, auth) => {
  const bruteStore = new BruteRedis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  });

  const bruteForce = new Brute(bruteStore);

  routes.post(
    '/api/v1/auth/register',
    validateUserCreate,
    UsuarioController.createUser
  );

  routes.post(
    '/api/v1/auth/resend-email',
    validateForgotPasswordCreate,
    UsuarioController.resendEmailForgotPassword
  );

  routes.post(
    '/api/v1/auth/forgot-password',
    validateForgotPasswordCreate,
    UsuarioController.forgotPassword
  );

  routes.post(
    '/api/v1/auth/reset-password',
    validateResetPasswordCreate,
    UsuarioController.resetPassword
  );

  routes.post(
    '/api/v1/auth/login',
    validateSessionCreate,
    // bruteForce.prevent,
    SessionController.createSession
  );

  // Routes Private

  routes.post(
    '/api/v1/auth/pre-cadastro',
    auth,
    validatePreUser,
    UsuarioController.createPreUser
  );

  routes.put(
    '/api/v1/user/usuario',
    auth,
    validateUserUpdate,
    UsuarioController.updateUser
  );

  routes.get(
    '/api/v1/user/profile',
    auth,
    validateUserUpdate,
    UsuarioController.showUser
  );

  routes.get('/api/v1/sessions/logs', auth, SessionController.getAccountsLog);

  routes.get('/api/v1/users/get', auth, UsuarioController.getUsers);

  // routes.get('/api/v1/auth/nlogin', nLoginController.checkRegister);
};
